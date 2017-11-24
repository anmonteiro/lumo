(ns lumo.build-api-tests
  (:require-macros [cljs.env.macros :as env]
                   [cljs.analyzer.macros :as ana])
  (:require [clojure.test :refer [deftest is testing async]]
            [cljs.env :as env]
            [cljs.analyzer :as ana]
            [lumo.io :refer [spit slurp]]
            [lumo.test-util :as test]
            [lumo.build.api :as build]
            [lumo.closure :as closure]
            fs
            path))

(deftest test-target-file-for-cljs-ns
  (is (= (build/target-file-for-cljs-ns 'example.core-lib nil)
         (test/platform-path "out/example/core_lib.js")))
  (is (= (build/target-file-for-cljs-ns 'example.core-lib "output")
         (test/platform-path "output/example/core_lib.js"))))

(deftest test-cljs-dependents-for-macro-namespaces
  (env/with-compiler-env (env/default-compiler-env)
    (swap! env/*compiler* assoc :cljs.analyzer/namespaces
                                { 'example.core
                                 {:require-macros {'example.macros 'example.macros
                                                   'mac 'example.macros}
                                  :name 'example.core}
                                 'example.util
                                 {:require-macros {'example.macros 'example.macros
                                                   'mac 'example.macros}
                                  :name 'example.util}
                                 'example.helpers
                                 {:require-macros {'example.macros-again 'example.macros-again
                                                   'mac 'example.macros-again}
                                  :name 'example.helpers }
                                 'example.fun
                                 {:require-macros nil
                                  :name 'example.fun }})
    (is (= (set (build/cljs-dependents-for-macro-namespaces ['example.macros]))
           #{'example.core 'example.util}))
    (is (= (set (build/cljs-dependents-for-macro-namespaces ['example.macros-again]))
           #{'example.helpers}))
    (is (= (set (build/cljs-dependents-for-macro-namespaces ['example.macros 'example.macros-again]))
           #{'example.core 'example.util 'example.helpers}))
    (is (= (set (build/cljs-dependents-for-macro-namespaces ['example.not-macros]))
           #{}))))

(def test-cenv (atom {}))
(def test-env (assoc-in (ana/empty-env) [:ns :name] 'cljs.user))

;; basic

(binding [ana/*cljs-ns* 'cljs.user
          ana/*analyze-deps* false]
  (env/with-compiler-env test-cenv
    (ana/no-warn
      (ana/analyze test-env
        '(ns cljs.user
           (:use [clojure.string :only [join]]))))))

;; linear

(binding [ana/*cljs-ns* 'cljs.user
          ana/*analyze-deps* false]
  (env/with-compiler-env test-cenv
    (ana/no-warn
      (ana/analyze test-env
        '(ns foo.core)))))

(binding [ana/*cljs-ns* 'cljs.user
          ana/*analyze-deps* false]
  (env/with-compiler-env test-cenv
    (ana/no-warn
      (ana/analyze test-env
        '(ns bar.core
           (:require [foo.core :as foo]))))))

(binding [ana/*cljs-ns* 'cljs.user
          ana/*analyze-deps* false]
  (env/with-compiler-env test-cenv
    (ana/no-warn
      (ana/analyze test-env
        '(ns baz.core
           (:require [bar.core :as bar]))))))

;; graph

(binding [ana/*cljs-ns* 'cljs.user
          ana/*analyze-deps* false]
  (env/with-compiler-env test-cenv
    (ana/no-warn
      (ana/analyze test-env
        '(ns graph.foo.core)))))

(binding [ana/*cljs-ns* 'cljs.user
          ana/*analyze-deps* false]
  (env/with-compiler-env test-cenv
    (ana/no-warn
      (ana/analyze test-env
        '(ns graph.bar.core
           (:require [graph.foo.core :as foo]))))))

(binding [ana/*cljs-ns* 'cljs.user
          ana/*analyze-deps* false]
  (env/with-compiler-env test-cenv
    (ana/no-warn
      (ana/analyze test-env
        '(ns graph.baz.core
           (:require [graph.foo.core :as foo]
                     [graph.bar.core :as bar]))))))

;; (deftest cljs-1469
;;   (let [out (.getPath (io/file (test/tmp-dir) "loader-test-out"))
;;         srcs "samples/hello/src"
;;         [common-tmp app-tmp] (mapv #(File/createTempFile  % ".js")
;;                                ["common" "app"])
;;         opts {:optimizations :simple
;;               :output-dir out
;;               :modules {:common {:entries #{"hello.foo.bar"}
;;                                  :output-to (.getAbsolutePath common-tmp)}
;;                         :app {:entries #{"hello.core"}
;;                               :output-to (.getAbsolutePath app-tmp)}}}]
;;     (test/delete-out-files out)
;;     (.deleteOnExit common-tmp)
;;     (.deleteOnExit app-tmp)
;;     (is (every? #(zero? (.length %)) [common-tmp app-tmp])
;;       "The initial files are empty")
;;     (build/build srcs opts)
;;     (is (not (every? #(zero? (.length %)) [common-tmp app-tmp]))
;;       "The files are not empty after compilation")))

;; (deftest cljs-1500-test-modules
;;   (let [out (io/file (test/tmp-dir) "cljs-1500-out")
;;         project (test/project-with-modules (str out))
;;         modules (-> project :opts :modules)]
;;     (test/delete-out-files out)
;;     (build/build (build/inputs (:inputs project)) (:opts project))
;;     (is (re-find #"Loading modules A and B" (slurp (-> modules :cljs-base :output-to))))
;;     (is (re-find #"Module A loaded" (slurp (-> modules :module-a :output-to))))
;;     (is (re-find #"Module B loaded" (slurp (-> modules :module-b :output-to))))))

(deftest cljs-1883-test-foreign-libs-use-relative-path
  (let [out (path/join (test/tmp-dir) "cljs-1883-out")
        root (path/join "src" "test" "cljs_build")
        opts {:foreign-libs
              [{:file (str (path/join root "thirdparty" "add.js"))
                :provides  ["thirdparty.add"]}]
              :output-dir (str out)
              :target :nodejs}]
    (test/delete-out-files out)
    (build/build (build/inputs (path/join root "foreign_libs") (path/join root "thirdparty")) opts)
    (let [foreign-lib-file (path/join out (-> opts :foreign-libs first :file))]
      (is (fs/existsSync foreign-lib-file))
      (is (= (->> (fs/readFileSync (path/join out "foreign_libs" "core.js") "utf8")
               (re-matches #"[\s\S]*(goog\.require\('thirdparty.add'\);)[\s\S]*")
               (second))
            "goog.require('thirdparty.add');")))))

(deftest cljs-1537-circular-deps
  (let [out (path/join (test/tmp-dir) "cljs-1537-test-out")
        root "src/test/cljs_build"]
    (test/delete-out-files out)
    (try
      (build/build
        (build/inputs
          (path/join root "circular_deps" "a.cljs")
          (path/join root "circular_deps" "b.cljs"))
        {:main 'circular-deps.a
         :optimizations :none
         :output-dir out}
        (env/default-compiler-env))
      (is false)
      (catch js/Error error
        (is (re-find  #"Circular dependency detected circular-deps.b -> circular-deps.a -> circular-deps.b"
              (-> error .-cause .-message)))))))

;; (defn loader-test-project [output-dir]
;;   {:inputs (str (io/file "src" "test" "cljs_build" "loader_test"))
;;    :opts
;;    {:output-dir output-dir
;;     :optimizations :none
;;     :verbose true
;;     :foreign-libs [{:file "src/test/cljs_build/loader_test/foreignA.js"
;;                     :provides ["foreign.a"]}
;;                    {:file "src/test/cljs_build/loader_test/foreignB.js"
;;                     :provides ["foreign.b"]
;;                     :requires ["foreign.a"]}]
;;     :modules
;;     {:foo
;;      {:output-to (str (io/file output-dir "foo.js"))
;;       :entries #{'loader-test.foo}}
;;      :bar
;;      {:output-to (str (io/file output-dir "bar.js"))
;;       :entries #{'loader-test.bar}}}}})

;; (deftest cljs-2077-test-loader
;;   (let [out (.getPath (io/file (test/tmp-dir) "loader-test-out"))]
;;     (test/delete-out-files out)
;;     (let [{:keys [inputs opts]} (loader-test-project out)
;;           loader (io/file out "cljs" "loader.js")]
;;       (build/build (build/inputs inputs) opts)
;;       (is (.exists loader))
;;       (is (not (nil? (re-find #"[\\/]loader_test[\\/]foo\.js" (slurp loader))))))
;;     (test/delete-out-files out)
;;     (let [{:keys [inputs opts]} (merge-with merge (loader-test-project out)
;;                                   {:opts {:optimizations :advanced
;;                                           :source-map true}})]
;;       (build/build (build/inputs inputs) opts))
;;     (testing "string inputs in modules"
;;       (test/delete-out-files out)
;;       (let [{:keys [inputs opts]} (merge-with merge (loader-test-project out)
;;                                     {:opts {:optimizations :whitespace}})]
;;         (build/build (build/inputs inputs) opts)))
;;     (testing "CLJS-2309 foreign libs order preserved"
;;       (test/delete-out-files out)
;;       (let [{:keys [inputs opts]} (merge-with merge (loader-test-project out)
;;                                     {:opts {:optimizations :advanced}})]
;;         (build/build (build/inputs inputs) opts)
;;         (is (not (nil? (re-find #"foreignA[\s\S]+foreignB" (slurp (io/file out "foo.js"))))))))))

(deftest test-npm-deps
  (testing "simplest case, require"
    (test/delete-node-modules)
    (let [out (path/join (test/tmp-dir) "npm-deps-test-out")
          {:keys [inputs opts]} {:inputs (path/join "src" "test" "cljs_build")
                                 :opts {:main 'npm-deps-test.core
                                        :output-dir out
                                        :optimizations :none
                                        :install-deps true
                                        :npm-deps {:left-pad "1.1.3"}
                                        :closure-warnings {:check-types :off}}}
          cenv (env/default-compiler-env)]
      (test/delete-out-files out)
      (build/build (build/inputs (path/join inputs "npm_deps_test/core.cljs")) opts cenv)
      (is (fs/existsSync (path/join out "node_modules/left-pad/index.js")))
      (is (contains? (:js-module-index @cenv) "left-pad"))))
  (let [cenv (env/default-compiler-env)
        out (path/join (test/tmp-dir) "npm-deps-test-out")
        {:keys [inputs opts]} {:inputs (path/join "src" "test" "cljs_build")
                               :opts {:main 'npm-deps-test.string-requires
                                      :output-dir out
                                      :optimizations :none
                                      :install-deps true
                                      :npm-deps {:react "15.6.1"
                                                 :react-dom "15.6.1"
                                                 :lodash "4.17.4"}
                                      :closure-warnings {:check-types :off
                                                         :non-standard-jsdoc :off}}}]
    (testing "mix of symbol & string-based requires"
      (test/delete-out-files out)
      (test/delete-node-modules)
      (build/build (build/inputs (path/join inputs "npm_deps_test/string_requires.cljs")) opts cenv)
      (is (fs/existsSync (path/join out "node_modules/react/react.js")))
      (is (contains? (:js-module-index @cenv) "react"))
      (is (contains? (:js-module-index @cenv) "react-dom/server")))
    (testing "builds with string requires are idempotent"
      (build/build (build/inputs (path/join inputs "npm_deps_test/string_requires.cljs")) opts cenv)
      (is (not (nil? (re-find #"\.\.[\\/]node_modules[\\/]react-dom[\\/]server\.js" (slurp (path/join out "cljs_deps.js"))))))
      (test/delete-out-files out)))
  (test/delete-node-modules))

(deftest test-preloads
  (let [out (path/join (test/tmp-dir) "preloads-test-out")
        {:keys [inputs opts]} {:inputs (path/join "src" "test" "cljs")
                               :opts {:main 'preloads-test.core
                                      :preloads '[preloads-test.preload]
                                      :output-dir out
                                      :optimizations :none}}
        cenv (env/default-compiler-env)]
    (test/delete-out-files out)
    (build/build
      (build/inputs (path/join inputs "preloads_test/core.cljs"))
      opts cenv)
    (is (fs/existsSync (path/join out "preloads_test/preload.cljs")))
    (is (contains? (get-in @cenv [:cljs.analyzer/namespaces 'preloads-test.preload :defs]) 'preload-var))))

(deftest test-libs-cljs-2152
  (let [out (path/join (test/tmp-dir) "libs-test-out")
        {:keys [inputs opts]} {:inputs (path/join "src" "test" "cljs_build")
                               :opts {:main 'libs-test.core
                                      :output-dir out
                                      :libs ["src/test/cljs/js_libs"]
                                      :optimizations :none
                                      :closure-warnings {:check-types :off}}}
        cenv (env/default-compiler-env)]
    (test/delete-out-files out)
    (build/build (build/inputs
                   (path/join inputs "libs_test/core.cljs")
                   "src/test/cljs/js_libs")
      opts cenv)
    (is (fs/existsSync (path/join out "tabby.js")))))

(defn collecting-warning-handler [state]
  (fn [warning-type env extra]
    (when (warning-type ana/*cljs-warnings*)
      (when-let [s (ana/error-message warning-type extra)]
        (swap! state conj s)))))

(deftest test-emit-node-requires-cljs-2213
  (test/delete-node-modules)
  (testing "simplest case, require"
    (let [ws (atom [])
          out (path/join (test/tmp-dir) "emit-node-requires-test-out")
          {:keys [inputs opts]} {:inputs (path/join "src" "test" "cljs_build")
                                 :opts {:main 'emit-node-requires-test.core
                                        :output-dir out
                                        :optimizations :none
                                        :target :nodejs
                                        :install-deps true
                                        :npm-deps {:react "15.6.1"
                                                   :react-dom "15.6.1"}
                                        :closure-warnings {:check-types :off
                                                           :non-standard-jsdoc :off}}}
          cenv (env/default-compiler-env opts)]
      (test/delete-out-files out)
      (ana/with-warning-handlers [(collecting-warning-handler ws)]
        (build/build (build/inputs (path/join inputs "emit_node_requires_test/core.cljs")) opts cenv))
      ;; wasn't processed by Closure
      (is (not (fs/existsSync (path/join out "node_modules/react/react.js"))))
      (is (fs/existsSync (path/join out "emit_node_requires_test/core.js")))
      (is (true? (boolean (re-find #"emit_node_requires_test\.core\.node\$module\$react_dom_BSLASH_\$server = require\('react-dom/server'\);"
                            (slurp (path/join out "emit_node_requires_test/core.js"))))))
      (is (true? (boolean (re-find #"emit_node_requires_test\.core\.node\$module\$react_dom_BSLASH_\$server\.renderToString"
                            (slurp (path/join out "emit_node_requires_test/core.js"))))))
      (is (empty? @ws))))
  (testing "Node native modules, CLJS-2218"
    (let [ws (atom [])
          out (path/join (test/tmp-dir) "emit-node-requires-test-out")
          {:keys [inputs opts]} {:inputs (path/join "src" "test" "cljs_build")
                                 :opts {:main 'emit-node-requires-test.native-modules
                                        :output-dir out
                                        :optimizations :none
                                        :target :nodejs
                                        :closure-warnings {:check-types :off}}}
          cenv (env/default-compiler-env opts)]
      (test/delete-out-files out)
      (test/delete-node-modules)
      (ana/with-warning-handlers [(collecting-warning-handler ws)]
        (build/build (build/inputs (path/join inputs "emit_node_requires_test/native_modules.cljs")) opts cenv))
      (is (fs/existsSync (path/join out "emit_node_requires_test/native_modules.js")))
      (is (true? (boolean (re-find #"emit_node_requires_test\.native_modules\.node\$module\$path\.isAbsolute"
                                   (slurp (path/join out "emit_node_requires_test/native_modules.js"))))))
      (is (empty? @ws))))
  (test/delete-node-modules))

(deftest cljs-test-compilation
  (testing "success"
    (let [out (path/join (test/tmp-dir) "compilation-test-out")
          root "src/test/cljs_build"]
      (test/delete-out-files out)
      (is (nil? (build/build
                  (path/join root "hello" "world.cljs")
                  {:main 'hello
                   :optimizations :none
                   :output-dir out}
                  (env/default-compiler-env)))
        "Successful compilation should return")))

  (testing "failure"
    (let [out (path/join (test/tmp-dir) "compilation-test-out")
          root "src/test/cljs_build"]
      (test/delete-out-files out)
      (try
        (build/build
          (path/join root "hello" "broken_world.cljs")
          {:main 'hello
           :optimizations :none
           :output-dir out}
          (env/default-compiler-env))
        (is false)
        (catch js/Error e
          (is (some? e) "Failed compilation should throw"))))))

(deftest lumo-273-test
  (let [out (path/join (test/tmp-dir) "lumo-273-test-out")
        root "src/test/cljs_build"]
    (testing ":optimizations :none"
      (test/delete-out-files out)
      (is (nil? (build/build
                  (path/join root "test_check")
                  {:main 'hello
                   :optimizations :none
                   :output-dir out}
                  (env/default-compiler-env))) "It should successfully compile with :optimizations :none")
        (test/delete-out-files out))))

(deftest lumo-308-test
  (let [out (path/join (test/tmp-dir) "lumo-308-test-out")
        root "src/test/cljs_build"
        warning-handlers [(fn [warning-type env extra]
                            (when-let [w (warning-type ana/*cljs-warnings*)]
                              (let [err (ana/error-message warning-type extra)]
                                (println "WARNING:" (ana/message env err))
                                (is (nil? warning-type) "when compiling twice, it should not emit a WARNING for cljs.spec.test.alpha/instrument the second time"))))]]
    (testing "correctly cljs.js/ns-side-effects on read analysis cache"
      (test/delete-out-files out)
      (build/build
        (path/join root "instrument")
       {:main 'instrument.core
        :optimizations :none
        :warning-handlers warning-handlers
        :output-dir out}
       (env/default-compiler-env))
      (build/build
        (path/join root "instrument")
       {:main 'instrument.core
        :optimizations :none
        :warning-handlers warning-handlers
        :output-dir out}
       (env/default-compiler-env))
      (test/delete-out-files out)
      (set! ana/*cljs-warning-handlers* ana/default-warning-handler))))

;; (deftest test-emit-global-requires-cljs-2214
;;   (testing "simplest case, require"
;;     (let [ws (atom [])
;;           out (.getPath (io/file (test/tmp-dir) "emit-global-requires-test-out"))
;;           {:keys [inputs opts]} {:inputs (str (io/file "src" "test" "cljs_build"))
;;                                  :opts {:main 'emit-node-requires-test.core
;;                                         :output-dir out
;;                                         :optimizations :none
;;                                         ;; Doesn't matter what :file is used here, as long at it exists
;;                                         :foreign-libs [{:file "src/test/cljs_build/thirdparty/add.js"
;;                                                         :provides ["react"]
;;                                                         :global-exports '{react React}}
;;                                                        {:file "src/test/cljs_build/thirdparty/add.js"
;;                                                         :provides ["react-dom"]
;;                                                         :requires ["react"]
;;                                                         :global-exports '{react-dom ReactDOM}}
;;                                                        {:file "src/test/cljs_build/thirdparty/add.js"
;;                                                         :provides ["react-dom/server"]
;;                                                         :requires ["react-dom"]
;;                                                         :global-exports '{react-dom/server ReactDOMServer}}]}}
;;           cenv (env/default-compiler-env)]
;;       (test/delete-out-files out)
;;       (ana/with-warning-handlers [(collecting-warning-handler ws)]
;;         (build/build (build/inputs (io/file inputs "emit_global_requires_test/core.cljs")) opts cenv))
;;       (is (.exists (io/file out "emit_global_requires_test/core.js")))
;;       (is (true? (boolean (re-find #"emit_global_requires_test\.core\.global\$module\$react_dom\$server = goog\.global\.ReactDOMServer;"
;;                             (slurp (io/file out "emit_global_requires_test/core.js"))))))
;;       (is (true? (boolean (re-find #"emit_global_requires_test\.core\.global\$module\$react_dom\$server\.renderToString"
;;                             (slurp (io/file out "emit_global_requires_test/core.js"))))))
;;       (is (empty? @ws)))))

;; (deftest test-data-readers
;;   (let [out (.getPath (io/file (test/tmp-dir) "data-readers-test-out"))
;;         {:keys [inputs opts]} {:inputs (str (io/file "src" "test" "cljs"))
;;                                :opts {:main 'data-readers-test.core
;;                                       :output-dir out
;;                                       :optimizations :none
;;                                       :closure-warnings {:check-types :off}}}
;;         cenv (env/default-compiler-env)]
;;     (test/delete-out-files out)
;;     (build/build (build/inputs (io/file inputs "data_readers_test")) opts cenv)
;;     (is (contains? (-> @cenv ::ana/data-readers) 'test/custom-identity))))

;; (deftest test-data-readers-records
;;   (let [out (.getPath (io/file (test/tmp-dir) "data-readers-test-records-out"))
;;         {:keys [inputs opts]} {:inputs (str (io/file "src" "test" "cljs"))
;;                                :opts {:main 'data-readers-test.records
;;                                       :output-dir out
;;                                       :optimizations :none
;;                                       :closure-warnings {:check-types :off}}}
;;         cenv (env/default-compiler-env)]
;;     (test/delete-out-files out)
;;     (build/build (build/inputs (io/file inputs "data_readers_test")) opts cenv)
;;     (is (true? (boolean (re-find #"data_readers_test.records.map__GT_Foo\("
;;                           (slurp (io/file out "data_readers_test" "records.js"))))))))

;; (deftest test-cljs-2249
;;   (let [out (io/file (test/tmp-dir) "cljs-2249-out")
;;         root (io/file "src" "test" "cljs_build")
;;         opts {:output-dir (str out)
;;               :target :nodejs}]
;;     (test/delete-out-files out)
;;     (build/build (build/inputs (io/file root "foreign_libs_cljs_2249")) opts)
;;     (is (.exists (io/file out "calculator_global.js")))
;;     (test/delete-out-files out)
;;     (closure/build (build/inputs (io/file root "foreign_libs_cljs_2249")) opts)
;;     (is (.exists (io/file out "calculator_global.js")))))

;; (deftest test-node-modules-cljs-2246
;;   (test/delete-node-modules)
;;   (.delete (io/file "package-lock.json"))
;;   (spit (io/file "package.json") (json/json-str {:dependencies {:left-pad "1.1.3"}
;;                                                  :devDependencies {"@cljs-oss/module-deps" "*"}}))
;;   (apply sh/sh (cond->> ["npm" "install"]
;;                  util/windows? (into ["cmd" "/c"])))
;;   (let [ws (atom [])
;;         out (.getPath (io/file (test/tmp-dir) "node-modules-opt-test-out"))
;;         {:keys [inputs opts]} {:inputs (str (io/file "src" "test" "cljs_build"))
;;                                :opts {:main 'node-modules-opt-test.core
;;                                       :output-dir out
;;                                       :optimizations :none
;;                                       :closure-warnings {:check-types :off}}}
;;         cenv (env/default-compiler-env opts)]
;;     (test/delete-out-files out)
;;     (ana/with-warning-handlers [(collecting-warning-handler ws)]
;;       (build/build (build/inputs (io/file inputs "node_modules_opt_test/core.cljs")) opts cenv))
;;     (is (.exists (io/file out "node_modules/left-pad/index.js")))
;;     (is (contains? (:js-module-index @cenv) "left-pad"))
;;     (is (empty? @ws)))
;;   (.delete (io/file "package.json"))
;;   (.delete (io/file "package-lock.json"))
;;   (test/delete-node-modules))

;; (deftest test-deps-api-cljs-2255
;;   (let [out (.getPath (io/file (test/tmp-dir) "cljs-2255-test-out"))]
;;     (test/delete-out-files out)
;;     (test/delete-node-modules)
;;     (spit (io/file "package.json") "{}")
;;     (build/install-node-deps! {:left-pad "1.1.3"} {:output-dir out})
;;     (is (.exists (io/file "node_modules/left-pad/package.json")))
;;     (test/delete-out-files out)
;;     (test/delete-node-modules)
;;     (spit (io/file "package.json") "{}")
;;     (build/install-node-deps!
;;       {:react "15.6.1"
;;        :react-dom "15.6.1"}
;;       {:output-dir out})
;;     (let [modules (build/get-node-deps '[react "react-dom/server"] {:output-dir out})]
;;       (is (true? (some (fn [module]
;;                          (= module {:module-type :es6
;;                                     :file (.getAbsolutePath (io/file "node_modules/react/react.js"))
;;                                     :provides ["react"
;;                                                "react/react.js"
;;                                                "react/react"]}))
;;                    modules)))
;;       (is (true? (some (fn [module]
;;                          (= module {:module-type :es6
;;                                     :file (.getAbsolutePath (io/file "node_modules/react/lib/React.js"))
;;                                     :provides ["react/lib/React.js" "react/lib/React"]}))
;;                    modules)))
;;       (is (true? (some (fn [module]
;;                          (= module {:module-type :es6
;;                                     :file (.getAbsolutePath (io/file "node_modules/react-dom/server.js"))
;;                                     :provides ["react-dom/server.js" "react-dom/server"]}))
;;                    modules))))
;;     (test/delete-out-files out)
;;     (test/delete-node-modules)
;;     (.delete (io/file "package.json"))))

;; (deftest test-cljs-2296
;;   (let [out (.getPath (io/file (test/tmp-dir) "cljs-2296-test-out"))
;;         {:keys [inputs opts]} {:inputs (str (io/file "src" "test" "cljs_build"))
;;                                :opts {:main 'foreign_libs_dir_test.core
;;                                       :output-dir out
;;                                       :optimizations :none
;;                                       :target :nodejs
;;                                       ;; :file is a directory
;;                                       :foreign-libs [{:file "src/test/cljs_build/foreign-libs-dir"
;;                                                       :module-type :commonjs}]}}]
;;     (test/delete-out-files out)
;;     (build/build (build/inputs (io/file inputs "foreign_libs_dir_test/core.cljs")) opts)
;;     (is (.exists (io/file out "src/test/cljs_build/foreign-libs-dir/vendor/lib.js")))
;;     (is (true? (boolean (re-find #"goog\.provide\(\"module\$[A-Za-z0-9$_]+?src\$test\$cljs_build\$foreign_libs_dir\$vendor\$lib\"\)"
;;                           (slurp (io/file out "src/test/cljs_build/foreign-libs-dir/vendor/lib.js"))))))))

;; (deftest cljs-1883-test-foreign-libs-use-relative-path
;;   (test/delete-node-modules)
;;   (let [out "cljs-2334-out"
;;         root (io/file "src" "test" "cljs_build")
;;         opts {:foreign-libs
;;               [{:file (str (io/file root "foreign_libs_cljs_2334" "lib.js"))
;;                 :module-type :es6
;;                 :provides  ["mylib"]}]
;;               :npm-deps {:left-pad "1.1.3"}
;;               :install-deps true
;;               :output-dir (str out)}]
;;     (test/delete-out-files out)
;;     (build/build (build/inputs (io/file root "foreign_libs_cljs_2334")) opts)
;;     (let [foreign-lib-file (io/file out (-> opts :foreign-libs first :file))]
;;       (is (.exists foreign-lib-file))
;;       ;; assert Closure finds and processes the left-pad dep in node_modules
;;       ;; if it can't be found the require will be issued to module$left_pad
;;       ;; so we assert it's of the form module$path$to$node_modules$left_pad$index
;;       (is (some? (re-find
;;                    #"(?s).*?goog\.require\(\"[A-Za-z0-9$_]+?node_modules\$left_pad\$index\"\);.*"
;;                    (slurp foreign-lib-file)))))
;;     (test/delete-out-files out)
;;     (test/delete-node-modules)))
