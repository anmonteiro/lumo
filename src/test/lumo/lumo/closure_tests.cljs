(ns lumo.closure-tests
  (:require [clojure.test :refer [deftest is testing]]
            [lumo.build.api :as build]
            [lumo.closure :as closure]
            [lumo.cljs-deps :as deps]
            [lumo.util :as util]
            [lumo.test-util :as test]
            [lumo.io :refer [spit slurp]]
            [clojure.string :as string]
            child_process
            fs
            path))

(deftest test-make-preamble
  (testing "no options"
    (is (= "" (closure/make-preamble {}))))
  (testing "nodejs"
    (testing "with default hashbang"
      (is (= "#!/usr/bin/env node\n" (closure/make-preamble {:target :nodejs}))))
    (testing "with custom hashbang"
      (is (= "#!/bin/env node\n" (closure/make-preamble {:target :nodejs
                                                         :hashbang "/bin/env node"}))))
    (testing "with no hashbang"
      (is (= "" (closure/make-preamble {:target :nodejs
                                        :hashbang false})))
      (testing "and preamble"
        (is (= "var preamble1 = require(\"preamble1\");\n"
              (closure/make-preamble {:target :nodejs
                                      :hashbang false
                                      :preamble ["lumo/preamble1.js"]})))))
    (testing "with preamble"
      (is (= "#!/usr/bin/env node\nvar preamble1 = require(\"preamble1\");\n"
            (closure/make-preamble {:target :nodejs
                                    :preamble ["lumo/preamble1.js"]})))))
  (testing "preamble"
    (is (= "var preamble1 = require(\"preamble1\");\nvar preamble2 = require(\"preamble2\");\n"
          (closure/make-preamble {:preamble ["lumo/preamble1.js"
                                             "lumo/preamble2.js"]})))))

(deftest test-check-sourcemap
  (testing "optimizations none"
    (is (closure/check-source-map {:source-map true
                                   :optimizations :none}))
    (is (closure/check-source-map {:source-map false
                                   :optimizations :none}))
    (is (thrown? js/Error (closure/check-source-map {:source-map "target/build/app.js.map"
                                                     :optimizations :none})))))

;; (deftest test-cljs-1882-constants-table-is-sorted
;;   (let [out (.getPath (io/file (test/tmp-dir) "cljs-1882-out"))
;;         project (test/project-with-modules out)
;;         modules (-> project :opts :modules)]
;;     (test/delete-out-files out)
;;     (build/build (build/inputs (:inputs project)) (:opts project))
;;     (let [compiler (closure/make-closure-compiler)
;;           module (JSModule. "module-c")]
;;       (.initOptions compiler (closure/make-options (:opts project)))
;;       (doseq [file ["cljs/core/constants.js"
;;                     "module_test/modules/a.js"
;;                     "cljs/core.js"]]
;;         (.add module (closure/js-source-file nil (io/file out file))))
;;       (.sortInputsByDeps module compiler)
;;       (is (= (->> (.getInputs module)
;;                   (map #(string/replace
;;                           (.getName %)
;;                           (str (string/replace out #"[\\\/]" "/") "/") "")))
;;              ["cljs/core.js"
;;               "cljs/core/constants.js"
;;               "module_test/modules/a.js"])))))

(deftest test-string-provides
  (is (= ["CB0BFFB"] (deps/-provides "var x = 42;"))))

(deftest test-lib-rel-path-cljs-2152
  (let [ijs {:provides ["tabby"]
             :url "src/test/cljs/js_libs/tabby.js"
             :lib-path "src/test/cljs/js_libs"}]
    (is (= (closure/lib-rel-path ijs) "tabby.js")))
  (let [ijs {:provides ["tabby"]
             :url "src/test/cljs/js_libs/tabby.js"
             :lib-path (path/resolve "src/test/cljs/js_libs/tabby.js")}]
    (is (= (closure/lib-rel-path ijs) "tabby.js"))))

(deftest test-index-node-modules-module-deps-js
  (let [opts {:npm-deps {:left-pad "1.1.3"}}
        out (util/output-directory opts)]
    (test/delete-node-modules)
    (test/delete-out-files out)
    (closure/maybe-install-node-deps! opts)
    (is (true? (some (fn [module]
                       (= module {:module-type :es6
                                  :file (path/resolve "node_modules/left-pad/index.js")
                                  :provides ["left-pad"
                                             "left-pad/index.js"
                                             "left-pad/index"]}))
                 (closure/index-node-modules ["left-pad"] opts))))
    (test/delete-node-modules)
    (test/delete-out-files out)
    (let [opts {:npm-deps {:react "15.6.1"
                           :react-dom "15.6.1"}}
          _ (closure/maybe-install-node-deps! opts)
          modules (closure/index-node-modules ["react" "react-dom" "react-dom/server"] opts)]
      (is (true? (some (fn [module]
                         (= module {:module-type :es6
                                    :file (path/resolve "node_modules/react/react.js")
                                    :provides ["react"
                                               "react/react.js"
                                               "react/react"]}))
                   modules)))
      (is (true? (some (fn [module]
                         (= module {:module-type :es6
                                    :file (path/resolve "node_modules/react/lib/React.js")
                                    :provides ["react/lib/React.js" "react/lib/React"]}))
                   modules)))
      (is (true? (some (fn [module]
                         (= module {:module-type :es6
                                    :file (path/resolve "node_modules/react-dom/server.js")
                                    :provides ["react-dom/server.js" "react-dom/server"]}))
                   modules))))
    (test/delete-node-modules)
    (test/delete-out-files out)
    (let [opts {:npm-deps {:node-fetch "1.7.1"}
                :target :nodejs}]
      (closure/maybe-install-node-deps! opts)
      (is (true? (some (fn [module]
                         (= module {:module-type :es6
                                    :file (path/resolve "node_modules/node-fetch/lib/index.js")
                                    :provides ["node-fetch/lib/index.js"
                                               "node-fetch/lib/index"
                                               "node-fetch/lib"]}))
                   (closure/index-node-modules ["node-fetch/lib"] opts)))))
    (test/delete-node-modules)
    (test/delete-out-files out)
    (let [opts {:npm-deps {"@comandeer/css-filter" "1.0.1"}}]
      (closure/maybe-install-node-deps! opts)
      (is (true? (some (fn [module]
                         (= module
                           {:file (path/resolve "node_modules/@comandeer/css-filter/dist/css-filter.umd.js")
                            :module-type :es6
                            :provides ["@comandeer/css-filter"
                                       "@comandeer/css-filter/dist/css-filter.umd.js"
                                       "@comandeer/css-filter/dist/css-filter.umd"]}))
                   (closure/index-node-modules ["@comandeer/css-filter"] opts)))))
    (test/delete-node-modules)
    (test/delete-out-files out)
    (let [opts {:npm-deps {"jss-extend" "5.0.0"}}]
      (closure/maybe-install-node-deps! opts)
      (is (true? (some (fn [module]
                         (= module
                           {:file (path/resolve "node_modules/jss-extend/lib/index.js")
                            :module-type :es6
                            :provides ["jss-extend"
                                       "jss-extend/lib/index.js"
                                       "jss-extend/lib/index"
                                       "jss-extend/lib"]}))
                   (closure/index-node-modules ["jss-extend"] opts)))))
    (test/delete-node-modules)
    (test/delete-out-files out)))

(deftest test-cljs-2315
  (spit "package.json" (js/JSON.stringify (clj->js {:devDependencies {"@cljs-oss/module-deps" "*"}})))
  (child_process/execSync (string/join " "
                            (cond->> ["npm" "install"]
                              util/windows? (into ["cmd" "/c"]))))
  (let [file (path/join (test/tmp-dir) "cljs-2315-inputs.js")
        _ (spit file "require('./src/test/cljs_build/json_modules_test/a.js');")
        node-inputs (closure/node-inputs [{:file (str file)}])]
    (is (= node-inputs
          [{:file (path/resolve "src/test/cljs_build/json_modules_test/a.js")
            :module-type :es6}
           {:file (path/resolve "src/test/cljs_build/json_modules_test/b.json")
            :module-type :es6}])))
  (test/delete-node-modules))

(deftest test-cljs-2318
  (spit "package.json" "{}")
  (let [opts {:npm-deps {:react     "15.6.1"
                         :react-dom "15.6.1"
                         :react-addons-css-transition-group "15.5.1"
                         "@blueprintjs/core" "1.24.0"}}
        out (util/output-directory opts)]
    (test/delete-node-modules)
    (test/delete-out-files out)
    (closure/maybe-install-node-deps! opts)
    (is (true? (some (fn [module]
                       (= module {:module-type :es6
                                  :file (path/resolve "node_modules/tslib/tslib.es6.js")
                                  :provides ["tslib"
                                             "tslib/tslib.es6.js"
                                             "tslib/tslib.es6"]}))
                 (closure/index-node-modules ["tslib"] opts))))
    (fs/unlinkSync "package.json")
    (test/delete-node-modules)
    (test/delete-out-files out)))

(deftest test-cljs-2327
  (spit "package.json" "{}")
  (let [opts {:npm-deps {:react "16.0.0-beta.5"
                         :react-dom "16.0.0-beta.5"}}
        out (util/output-directory opts)]
    (test/delete-node-modules)
    (test/delete-out-files out)
    (closure/maybe-install-node-deps! opts)
    (let [modules (closure/index-node-modules ["react" "react-dom" "react-dom/server"] opts)]
      (is (true? (some (fn [module]
                         (= module {:module-type :es6
                                    :file (path/resolve "node_modules/react/index.js")
                                    :provides ["react"
                                               "react/index.js"
                                               "react/index"]}))
                   modules)))
      (is (true? (some (fn [module]
                         (= module {:module-type :es6
                                    :file (path/resolve "node_modules/react-dom/index.js")
                                    :provides ["react-dom"
                                               "react-dom/index.js"
                                               "react-dom/index"]}))
                   modules)))
      (is (true? (some (fn [module]
                         (= module {:module-type :es6
                                    :file (path/resolve "node_modules/react-dom/server.browser.js")
                                    :provides ["react-dom/server.js"
                                               "react-dom/server"
                                               "react-dom/server.browser.js"
                                               "react-dom/server.browser"]}))
                   modules))))
    (test/delete-node-modules)
    (test/delete-out-files out)
    (spit "package.json" "{}")
    (let [opts {:npm-deps {:warning "3.0.0"}}
          _ (closure/maybe-install-node-deps! opts)
          modules (closure/index-node-modules ["warning"] opts)]
      (is (true? (some (fn [module]
                         (= module {:module-type :es6
                                    :file (path/resolve "node_modules/warning/browser.js")
                                    :provides ["warning"
                                               "warning/browser.js"
                                               "warning/browser"]}))
                   modules))))
    (test/delete-node-modules)
    (test/delete-out-files out)
    (spit "package.json" "{}")
    (let [opts {:npm-deps {:react-dom "16.0.0-beta.5"
                           :react "16.0.0-beta.5"}
                :target :nodejs}
          _ (closure/maybe-install-node-deps! opts)
          modules (closure/index-node-modules ["react-dom/server"] opts)]
      (is (true? (some (fn [module]
                         (= module {:module-type :es6
                                    :file (path/resolve "node_modules/react-dom/server.js")
                                    :provides ["react-dom/server.js"
                                               "react-dom/server"]}))
                   modules))))
    (fs/unlinkSync "package.json")
    (test/delete-node-modules)
    (test/delete-out-files out)))

(deftest test-cljs-2326
  (spit "package.json" "{}")
  (let [opts {:npm-deps {:bootstrap "4.0.0-beta"}}
        out (util/output-directory opts)]
    (test/delete-node-modules)
    (test/delete-out-files out)
    (closure/maybe-install-node-deps! opts)
    (is (true? (some (fn [module]
                       (= module {:module-type :es6
                                  :file (path/resolve "node_modules/bootstrap/dist/js/bootstrap.js")
                                  :provides ["bootstrap"
                                             "bootstrap/dist/js/bootstrap.js"
                                             "bootstrap/dist/js/bootstrap"]}))
                 (closure/index-node-modules ["bootstrap"] opts))))
    (test/delete-node-modules))
  (fs/unlinkSync "package.json")
  (test/delete-node-modules))

(deftest test-cljs-2332
  (spit "package.json" "{}")
  (let [opts {:npm-deps {"@material/drawer" "0.5.4"}}
        out (util/output-directory opts)]
    (test/delete-node-modules)
    (test/delete-out-files out)
    (closure/maybe-install-node-deps! opts)
    (let [modules (closure/index-node-modules ["@material/drawer"] opts)]
      (is (true? (some (fn [module]
                         (= module {:module-type :es6
                                    :file (path/resolve "node_modules/@material/drawer/slidable/constants.js")
                                    :provides ["@material/drawer/slidable/constants.js"
                                               "@material/drawer/slidable/constants"]}))
                   modules))))
    (fs/unlinkSync "package.json")
    (test/delete-node-modules)
    (test/delete-out-files out)))

(deftest test-cljs-2333
  (spit "package.json" "{}")
  (let [opts {:npm-deps {"asap" "2.0.6"}}
        out (util/output-directory opts)]
    (test/delete-node-modules)
    (test/delete-out-files out)
    (closure/maybe-install-node-deps! opts)
    (let [modules (closure/index-node-modules ["asap"] opts)]
      (is (true? (some (fn [module]
                         (= module {:module-type :es6
                                    :file (path/resolve "node_modules/asap/browser-asap.js")
                                    :provides ["asap/asap",
                                               "asap/asap",
                                               "asap/asap.js",
                                               "asap/asap",
                                               "asap",
                                               "asap/browser-asap.js",
                                               "asap/browser-asap"]}))
                   modules))))
    (fs/unlinkSync "package.json")
    (test/delete-node-modules)
    (test/delete-out-files out)))
