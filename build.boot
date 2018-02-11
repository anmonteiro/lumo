(set-env!
 :source-paths #{"src/cljs/snapshot"}
 :asset-paths #{"src/js" "src/cljs/bundled"}
 :dependencies '[[org.clojure/clojure         "1.9.0-RC1"]
                 [org.clojure/clojurescript   "1.9.946"]
                 [org.clojure/tools.reader    "1.1.2"]
                 [com.cognitect/transit-cljs  "0.8.243"]
                 [malabarba/lazy-map          "1.3"]
                 [fipp                        "0.6.12"]
                 [org.clojure/test.check      "0.10.0-alpha2" :scope "test"]
                 [com.cognitect/transit-clj   "0.8.300" :scope "test"]
                 [com.cemerick/piggieback     "0.2.2"   :scope "test"]
                 [adzerk/boot-cljs            "2.1.4"   :scope "test"]
                 [crisptrutski/boot-cljs-test "0.3.4" :scope "test"]
                 [org.clojure/tools.nrepl     "0.2.13"  :scope "test"]
                 [weasel                      "0.7.0"   :scope "test"]
                 [doo                         "0.1.8"   :scope "test"]]
 :exclusions '[org.clojure/clojure org.clojure/clojurescript])

(require
  '[adzerk.boot-cljs      :refer [cljs]]
  '[crisptrutski.boot-cljs-test :refer [test-cljs]]
  '[boot.util             :as util]
  '[clojure.edn           :as edn]
  '[clojure.string        :as str]
  '[clojure.data.json     :as json]
  '[clojure.java.io       :as io]
  '[cognitect.transit     :as transit])

(import [java.io ByteArrayOutputStream FileInputStream])

(def windows?
  (.startsWith (.toLowerCase (System/getProperty "os.name")) "windows"))

(deftask testing []
  (set-env! :source-paths #(conj % "src/test/lumo"))
  identity)

(ns-unmap 'boot.user 'test)

(deftask test
  [e exit?     bool  "Enable flag."]
  (let [exit? (cond-> exit?
                (nil? exit?) not)]
    (comp
      (testing)
      (test-cljs
        :js-env :node
        :namespaces #{'lumo.js-deps-tests 'lumo.repl-tests}
        :cljs-opts {:parallel-build true
                    :target :nodejs
                    :verbose true
                    :asset-path "test_suite.out"}
        :exit? exit?
        :ids #{"lumo_test/test_suite"}))))

(deftask auto-test []
  (comp
    (watch)
    (notify :audible true)
    (test :exit? false)))

(deftask install-node-modules []
  (with-pass-thru _
    (util/info "Installing node dependencies with `yarn install`\n")
    (if windows?
      (dosh "cmd" "/c" "yarn" "install")
      (dosh "yarn" "install"))))

(deftask bundle-js
  [d dev     bool  "Development build"]
  (with-pass-thru _
    (if dev
      (apply dosh
        (cond->> ["yarn" "bundle"]
          windows? (into ["cmd" "/c"])))
      (do
        (apply dosh (cond->> ["yarn" "build"]
                      windows? (into ["cmd" "/c"])))
        (dosh "node" "scripts/bundleForeign.js")))))

(defn write-cache! [cache out-path]
  (let [out (ByteArrayOutputStream. 1000000)
        writer (transit/writer out :json)]
    (transit/write writer cache)
    (spit (doto out-path
            io/make-parents)
      (.toString out))))

(deftask cache-edn->transit []
  (let [tmp (tmp-dir!)]
    (with-pre-wrap fileset
      (empty-dir! tmp)
      (let [input-files (input-files fileset)
            edn-files (by-ext [".edn"] input-files)]
        (doseq [in edn-files]
          (let [in-file  (tmp-file in)
                in-path  (tmp-path in)
                out-path (.replaceAll in-path "\\.edn" ".json")
                out-file (io/file tmp out-path)]
            (write-cache! (edn/read-string (slurp in-file)) out-file)))
        (-> fileset (add-resource tmp) commit!)))))

(deftask write-core-analysis-caches []
  (let [core-caches-re #"^cljs[\\\/]core(\$macros)?\.(cljs\.cache\.aot|cljc\.cache)\.json$"
        tmp (tmp-dir!)]
    (comp
      (with-pre-wrap fileset
        (empty-dir! tmp)
        (let [inputs (input-files fileset)
              caches (by-re [core-caches-re] inputs)]
          (doseq [cache caches]
            (let [cache-file (tmp-file cache)
                  cache-edn (transit/read (transit/reader (FileInputStream. cache-file) :json))]
              (doseq [key (keys cache-edn)]
                (let [out-path (str/replace (tmp-path cache) #"(\.json)$" (str "." (munge key) "$1"))
                      out-file (io/file tmp out-path)]
                  (write-cache! (key cache-edn) out-file)))))
          (-> fileset (add-resource tmp) commit!)))
      (sift :include #{core-caches-re} :invert true))))

(deftask sift-optional-cljs-sources []
  (sift :add-jar {'org.clojure/clojurescript #"^cljs[\\\/]core[\\\/]specs.*"}))

(deftask sift-cljs-resources []
  (comp
    (sift :add-jar
      {'org.clojure/clojure #"^clojure[\\\/]template\.clj"
       'org.clojure/google-closure-library #"^goog[\\\/].*(?<!_test)\.js$"
       'org.clojure/google-closure-library-third-party #"^goog[\\\/].*(?<!_test)\.js$"
       'org.clojure/tools.reader #"^cljs.*clj$"
       'org.clojure/clojurescript #""
       'org.clojure/test.check #""}
      :move {#"^main.out[\\\/]((cljs|clojure|cognitect|lumo|lazy_map|fipp|process).*)" "$1"})
    (sift :include #{#"^main.js" #"^bundle.js" #"^cljs(?!\.js)" #"core\$macros"
                     #"^clojure" #"^cognitect" #"^goog" #"^lumo[\\\/]"
                     #"^lazy_map[\\\/]" #"^fipp[\\\/]" #"^process[\\\/]env"}
      :to-resource #{#"^lumo[\\\/](repl|util)\.clj$"})
    (sift :include #{#"^cljs[\\\/]core\.cljs\.cache\.json$"
                     #"^cljs[\\\/](analyzer[\\\/]utils|build|closure)"
                     #"^cljs[\\\/](core[\\\/]macros|compiler[\\\/]api|repl([\\\/].*|(.cljc))|source_map.*clj$)"
                     #"^cljs[\\\/](externs\.clj|util|js_deps)"
                     #"^cljs_deps.js$"
                     #"^goog[\\\/](test_module.*?|transpile).js"}
      :invert true)))

(def lumo-version
  (get (json/read-str (slurp "package.json")) "version"))

(deftask compile-cljs []
  (cljs :compiler-options {:optimizations :simple
                           :main 'lumo.core
                           :cache-analysis true
                           :source-map false
                           :dump-core false
                           :static-fns true
                           :optimize-constants false
                           :verbose true
                           :closure-defines {'cljs.core/*target* "nodejs"
                                             'lumo.core/*lumo-version* lumo-version}
                           :compiler-stats true
                           :process-shim false
                           :fn-invoke-direct true
                           :parallel-build false}))

(deftask dev []
  (comp
    (install-node-modules)
    (watch)
    (notify :audible true)
    (compile-cljs)
    (sift-cljs-resources)
    (cache-edn->transit)
    (write-core-analysis-caches)
    (target)
    (bundle-js :dev true)))

(deftask prepare-snapshot []
  (with-pass-thru _
    (dosh "node" "scripts/prepare_snapshot.js")))

(deftask package-executable []
  (with-pass-thru _
    (dosh "node" "scripts/package.js")))

(deftask backup-resources
  "Backup resources to be gzipped in the 2nd stage binary
   without having to recompile CLJS"
  []
  (with-pass-thru _
    (if windows?
      (dosh "cmd" "/c" "echo" "d" "|" "xcopy" "target" "resources_bak" "/s" "/e" "/y")
      (dosh "cp" "-R" "target" "resources_bak"))))

(deftask aot-macros []
  (with-pass-thru _
    (if windows?
      (dosh "cmd" "/c" ".\\scripts\\aot-bundle-macros.bat")
      (dosh "./scripts/aot-bundle-macros.sh"))))

(deftask release-ci []
  (comp
    (install-node-modules)
    (sift-optional-cljs-sources)
    (compile-cljs)
    (sift-cljs-resources)
    (cache-edn->transit)
    (write-core-analysis-caches)
    (target)
    (bundle-js)
    (prepare-snapshot)
    (backup-resources)
    ;; Package first stage binary
    (package-executable)
    (aot-macros)
    ;; Package final executable
    (package-executable)))

(deftask release []
  (comp
    (notify :audible true)
    (release-ci)))
