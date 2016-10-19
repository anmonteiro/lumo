(set-env!
 :source-paths    #{"src/cljs"}
 :resource-paths #{"src/js"}
 :dependencies '[[org.clojure/clojure        "1.9.0-alpha13"]
                 [org.clojure/clojurescript   "1.9.293"]
                 [org.clojure/tools.reader    "1.0.0-beta3"]
                 [com.cognitect/transit-cljs  "0.8.239"]
                 [com.cognitect/transit-clj   "0.8.290"        :scope "test"]
                 [com.cemerick/piggieback     "0.2.1"          :scope "test"]
                 [adzerk/boot-cljs            "1.7.228-1"      :scope "test"]
                 [crisptrutski/boot-cljs-test "0.2.2-SNAPSHOT" :scope "test"]
                 [org.clojure/tools.nrepl     "0.2.12"         :scope "test"]
                 [weasel                      "0.7.0"          :scope "test"]])

(require
 '[adzerk.boot-cljs      :refer [cljs]]
 '[crisptrutski.boot-cljs-test :refer [test-cljs]]
 '[boot.util             :as util]
 '[clojure.edn           :as edn]
 '[clojure.java.io       :as io]
 '[cognitect.transit     :as transit])

(import [java.io ByteArrayOutputStream FileInputStream])

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
        :namespaces #{'lumo.js-deps-tests}
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
          (dosh "yarn" "install"))
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

(deftask sift-cljs-resources []
  (comp
    (sift :add-jar
      {'org.clojure/clojure #"^clojure/template\.clj"
       'org.clojure/clojurescript
       #"^cljs/(test\.cljc|core\.cljs\.cache\.aot\.edn|spec(\.cljc|/test\.clj[sc]|/impl/gen\.cljc))$"}
      :move {#"^main.out/((cljs|clojure|cognitect|lumo).*)" "$1"})
    (sift :include #{#"^main.js" #"^bundle.js" #"^cljs(?!\.js)"
                     #"^clojure" #"^cognitect" #"^lumo/"})))

(deftask dev []
  (comp
    (check-node-modules)
    (watch)
    (speak)
    (cljs :compiler-options {:hashbang false
                             :target :nodejs
                             :optimizations :simple
                             :main 'lumo.core
                             :cache-analysis true
                             :source-map false
                             :dump-core false
                             :static-fns true
                             :optimize-constants true
                             :verbose true
                             :compiler-stats true
                             :parallel-build true})
    (sift-cljs-resources)
    (cache-edn->transit)
    (target)
    (bundle-js :dev true)))

(deftask prepare-snapshot []
  (with-pass-thru _
    (dosh "node" "scripts/prepare_snapshot.js")))

(deftask package-executable []
  (with-pass-thru _
    (dosh "node" "scripts/package")))

(deftask backup-resources
  "Backup resources to be gzipped in the 2nd stage binary
   without having to recompile CLJS"
  []
  (with-pass-thru _
    (dosh "cp" "-R" "target" "resources_bak")))

(deftask aot-macros []
  (with-pass-thru _
    (dosh "./scripts/aot-bundle-macros.sh")))

(deftask release []
  (comp
    (check-node-modules)
    (speak)
    (cljs :compiler-options {:hashbang false
                             :target :nodejs
                             :optimizations :simple
                             :main 'lumo.core
                             :cache-analysis true
                             :source-map false
                             :dump-core false
                             :static-fns true
                             :optimize-constants true
                             :verbose true
                             :compiler-stats true
                             :parallel-build true})
    (sift-cljs-resources)
    (cache-edn->transit)
    (target)
    (bundle-js)
    (prepare-snapshot)
    (backup-resources)
    ;; Package first stage binary
    (package-executable)
    (aot-macros)
    ;; Package final executable
    (package-executable)))
