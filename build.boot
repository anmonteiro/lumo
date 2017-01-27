(set-env!
 :source-paths    #{"src/cljs"}
 :asset-paths #{"src/js"}
 :dependencies '[[org.clojure/clojure         "1.9.0-alpha14"]
                 [org.clojure/clojurescript   "1.9.456"]
                 [org.clojure/tools.reader    "1.0.0-beta4"]
                 [com.cognitect/transit-cljs  "0.8.239"]
                 [malabarba/lazy-map          "1.3"]
                 [com.cognitect/transit-clj   "0.8.297"        :scope "test"]
                 [com.cemerick/piggieback     "0.2.1"          :scope "test"]
                 [adzerk/boot-cljs            "1.7.228-2"      :scope "test"]
                 [crisptrutski/boot-cljs-test "0.3.0"          :scope "test"]
                 [org.clojure/tools.nrepl     "0.2.12"         :scope "test"]
                 [weasel                      "0.7.0"          :scope "test"]])

(require
 '[adzerk.boot-cljs      :refer [cljs]]
 '[crisptrutski.boot-cljs-test :refer [test-cljs]]
 '[boot.util             :as util]
 '[clojure.edn           :as edn]
 '[clojure.string        :as str]
 '[clojure.java.io       :as io]
 '[cognitect.transit     :as transit])

(import [java.io ByteArrayOutputStream FileInputStream])

(def windows?
  (.startsWith (.toLowerCase (System/getProperty "os.name")) "windows"))

(deftask testing []
  (set-env! :source-paths #(conj % "test"))
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
        :cljs-opts {:parallel-build true}
        :exit? exit?))))

(deftask auto-test []
  (comp
    (watch)
    (speak)
    (test :exit? false)))

(deftask check-node-modules []
  (with-pass-thru _
    (let [nm (io/file "node_modules")]
      (if-not (and (.exists nm) (.isDirectory nm))
        (do
          (util/info "Installing node dependencies with `yarn install`\n")
          (if windows?
            (dosh "cmd" "/c" "yarn" "install")
            (dosh "yarn" "install")))
        (util/info "Node dependencies already installed, skipping `yarn install`\n")))))

(deftask bundle-js
  [d dev     bool  "Development build"]
  (with-pass-thru _
    (dosh "node" "scripts/build.js" (when dev "--dev"))))

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

(deftask sift-cljs-resources []
  (comp
    (sift :add-jar
      {'org.clojure/clojure #"^clojure[\\\/]template\.clj"
       'org.clojure/clojurescript
       #"^cljs[\\\/](test\.cljc|core\.cljs\.cache\.aot\.edn|reader\.clj|spec(\.cljc|[\\\/]test\.clj[sc]|[\\\/]impl[\\\/]gen\.cljc))$"}
      :move {#"^main.out[\\\/]((cljs|clojure|cognitect|lumo|lazy_map).*)" "$1"})
    (sift :include #{#"^main.js" #"^bundle.js" #"^cljs(?!\.js)"
                     #"^clojure" #"^cognitect" #"^lumo[\\\/]" #"^lazy_map[\\\/]"}
      :to-resource #{#"^lumo[\\\/]repl\.clj$"})
    (sift :include #{#"^cljs[\\\/]core\.cljs\.cache\.json$"} :invert true)))

(deftask compile-cljs []
  (cljs :compiler-options {:hashbang false
                           :target :nodejs
                           :optimizations :simple
                           :main 'lumo.core
                           :cache-analysis true
                           :source-map false
                           :dump-core false
                           :static-fns true
                           :optimize-constants false
                           :verbose true
                           :compiler-stats true
                           :parallel-build true}))

(deftask dev []
  (comp
    (check-node-modules)
    (watch)
    (speak)
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
    (check-node-modules)
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
    (speak)
    (release-ci)))
