(set-env!
 :source-paths #{"src/cljs/snapshot"}
 :asset-paths #{"src/js" "src/cljs/bundled"}
 :dependencies '[[org.clojure/clojure         "1.9.0-beta4"]
                 [org.clojure/clojurescript   "1.9.946"]
                 [org.clojure/tools.reader    "1.1.0"]
                 [com.cognitect/transit-cljs  "0.8.243"]
                 [malabarba/lazy-map          "1.3"]
                 [fipp                        "0.6.10"]
                 [me.raynes/fs                "1.4.6"]
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
  '[cognitect.transit     :as transit]
  '[me.raynes.fs          :as fs])

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
    (speak)
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
    ;; (speak)
    (compile-cljs)
    (sift-cljs-resources)
    (cache-edn->transit)
    (write-core-analysis-caches)
    (target)
    (bundle-js :dev true)))

(deftask pkg-install-node-modules
  [p ppath PROJECTPATH str "String with absolute path to project root-dir."]
  (let [target-path (-> (io/file "target") .getAbsolutePath)
        project-directory-list (->> (io/file ppath)
                                    .listFiles
                                    (map #(.getName %)))
        package-json-exists? (some #(= "package.json" %) project-directory-list)
        node-modules-exists? (some #(= "node_modules" %) project-directory-list)
        sep (if windows? "\\" "/")]
    (with-pass-thru _
      (if-not package-json-exists?
        (util/warn (str "package.json was not found in " ppath "\n"))
        (do
          (when node-modules-exists?
            (.renameTo (io/file (str ppath sep "node_modules"))
                       (io/file (str ppath sep "node_modules_bak"))))
          (util/info (str "Fetching node_modules from " ppath
                          " with `yarn install --production`\n"))
          (binding [*sh-dir* ppath]
            (if windows?
              (do
                (dosh "cmd" "/c" "yarn" "install" "--production")
                (dosh "cmd" "/c" "move" "node_modules" target-path))
              (do
                (dosh "yarn" "install" "--production")
                (dosh "mv" "node_modules" target-path))))
          (when node-modules-exists?
            (.renameTo (io/file (str ppath sep "node_modules_bak"))
                       (io/file (str ppath sep "node_modules")))))))))

(defn pkg-options
  "Returns json string that gets passed to the pkg bundle"
  [ppath main source-paths asset-paths with-repl]
  {:mainNsName (or main "")
   :classpath (or source-paths [])
   :repl (true? with-repl)
   :scripts []
   :dependencies []
   :unrecognized false
   :quiet false
   :dumb-terminal false
   :version false
   :leagal false
   :verbose false
   :static-fns false
   :elide-asserts false
   :args []})

(defn expand-home [s]
  (if (.startsWith s "~")
    (str/replace-first s "~" (System/getProperty "user.home"))
    s))

(deftask pkg-orchestrate-bundles
  [p ppath        PROJECTPATH str  "String with absolute path to project root-dir."
   s source-paths SOURCEPATHS edn  "Vector of paths and relative/absolute jar paths."
   a asset-paths  ASSETPATHS  edn  "Vector of resource paths to bundle."]
  (with-pass-thru _
    (let [sep (if windows? "\\" "/")
          target (io/file "target")]
      (spit "target/classpaths.edn"
            (-> (fn [init-v path]
                  (let [path (expand-home path)
                        is-absolute? (.isAbsolute (io/file path))
                        source-file (if is-absolute?
                                      (io/file path)
                                      (io/file (str ppath sep path)))
                        destination-file (if is-absolute?
                                           (io/file (str "target" sep (.getName source-file)))
                                           (io/file (str "target" sep path)))]
                    (cond (not (.exists source-file))
                          (do (util/warn (str "Source or Asset path "
                                              (.toString source-file)
                                              " does not exists.\n"))
                              init-v)
                          (.exists destination-file)
                          (do (util/fail (str "Folder or filename "
                                              (.toString destination-file)
                                              " already exists in bundle.\n"))
                              (System/exit -1))
                          (re-find #"\.jar$" (.toString source-file))
                          (do (io/copy source-file
                                       (io/file (str "target" sep (.getName source-file))))
                              (conj init-v (str "target" sep (.getName source-file))))
                          :else (let [is-directory? (.isDirectory source-file)]
                                  (if is-directory?
                                    (fs/copy-dir source-file target)
                                    (io/copy source-file destination-file))
                                  (conj init-v (.toString destination-file)
                                        ;;(str/replace #"^target[\\/]" "")
                                        )))))
                (reduce [] (into (or source-paths []) (or asset-paths []))))))))

(deftask pkg-bundle
  [o opts OPTS edn "Lumo options as edn map"
   d dev  bool   "Development build?"]
  (with-pass-thru _
    (when (.exists (io/file "target/bundle.min.js"))
      (io/delete-file "target/bundle.min.js"))
    (when (.exists (io/file "target/bundle.js"))
      (io/delete-file "target/bundle.js"))
    (when (.exists (io/file "src/js/pkg.js"))
      (io/delete-file "src/js/pkg.js"))
    (apply dosh
           (cond->> ["node" "scripts/bundle.js"
                     (if dev "--pkg-dev" "--pkg")
                     (->> "target/classpaths.edn"
                          slurp
                          read-string
                          (assoc opts :classpath)
                          json/write-str)]
             windows? (into ["cmd" "/c"])))))

(deftask pkg-dev
  [p ppath        PROJECTPATH str  "String with absolute path to project root-dir."
   m main         MAIN        str  "String with the name of the main namespace to load."
   s source-paths SOURCEPATHS edn  "Vector of relative source paths and relative/absolute jar paths."
   a asset-paths  ASSETPATHS  edn  "Vector of resource paths to bundle."
   r with-repl                bool "If passed, lumo repl promt will be started."]
  (let [opts (pkg-options ppath main source-paths asset-paths with-repl)]
    (comp
     ;; (speak)
     (install-node-modules)
     (compile-cljs)
     (sift-cljs-resources)
     (cache-edn->transit)
     (write-core-analysis-caches)
     (target)
     (pkg-install-node-modules :ppath ppath)
     (pkg-orchestrate-bundles :ppath ppath
                              :source-paths source-paths
                              :asset-paths asset-paths)
     (pkg-bundle :opts opts :dev true))))

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
      (do (dosh "rm" "-rf" "resources_bak")
          (dosh "cp" "-R" "target" "resources_bak")))))

(deftask restore-resources
  []
  (with-pass-thru _
    (if windows?
      (dosh "cmd" "/c" "move" "resources_bak" "target")
      (do (dosh "rm" "-rf" "target")
          (dosh "mv" "resources_bak" "target")))))

(deftask aot-macros []
  (with-pass-thru _
    (if windows?
      (dosh "cmd" "/c" ".\\scripts\\aot-bundle-macros.bat")
      (dosh "./scripts/aot-bundle-macros.sh"))))

(deftask pkg-aot
  [p proj PROJECTPATH str "Path to the project to be bundled"
   o opts OPTS        str "Lumo options as JSON map"]
  (with-pass-thru _
    (let [sep (if windows? "\\" "/")
          aot-cljs-path (str proj sep "aot.cljs")
          aot-cljs-exists? (.exists (io/file aot-cljs-path))
          aot-target-dir-path (.getAbsolutePath (io/file "target/aot"))
          target-dir-path (.getAbsolutePath (io/file "target"))
          build-dir-path (.getAbsolutePath (io/file "build"))
          opts (str/replace opts #"'" "\"")
          opts-edn (json/read-str opts)
          aot-classpath (apply str target-dir-path ":"
                               (interpose ":" (get opts-edn "classpath")))]
      (if-not aot-cljs-exists?
        (util/warn (str "No aot.clj was found in " proj
                        " aot compilations are skipped"))
        (binding [*sh-dir* proj]
          (if windows?
            (do (dosh "mkdir" "target\\aot")
                (dosh "cmd" "/c" "type" aot-cljs-path
                      "| build\\lumo.exe" "--quiet" "-c"
                      aot-classpath"-sfdk"
                      aot-target-dir-path))
            (do (dosh "mkdir" "-p" aot-target-dir-path)
                (dosh "bash" "-c" (str "cat " aot-cljs-path " | "
                                       build-dir-path "/lumo"
                                       " --quiet -c "
                                       aot-classpath
                                       " -sfdk "
                                       aot-target-dir-path)))))))))

(deftask pkg-nexe
  []
  (with-pass-thru _
    (apply dosh
           (cond->> ["node" "scripts/package.js" "--pkg"
                     (slurp "target/classpaths.json")]
             windows? (into ["cmd" "/c"])))))

(deftask pkg
  [p ppath        PROJECTPATH str  "String with absolute path to project root-dir."
   m main         MAIN        str  "String with the name of the main namespace to load."
   s source-paths SOURCEPATHS edn  "Vector of (relative) source paths."
   a asset-paths  ASSETPATHS  edn  "Vector of (relative) resource paths to bundle."
   r with-repl                bool "If passed, lumo repl promt will be started."]
  (let [opts (pkg-options ppath main source-paths asset-paths with-repl)])
  #_(comp
     (install-node-modules)
     (compile-cljs)
     (sift-cljs-resources)
     (cache-edn->transit)
     (write-core-analysis-caches)
     (target)
     (bundle-js)
     (prepare-snapshot)
     (backup-resources)
     (package-executable)
     (aot-macros)
     ;; Same as release-ci up to this point
     (backup-resources)
     (package-executable)
     (restore-resources)
     (pkg-install-node-modules :proj proj)
     (pkg-bundle-classpaths :proj proj :opts opts)
     (pkg-bundle :proj proj :dev false)
     (pkg-aot :proj proj :opts opts)
     (backup-resources)
     ;; The third and final exe compilation
     (pkg-nexe)
     ))

(deftask release-ci []
  (comp
   (install-node-modules)
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
