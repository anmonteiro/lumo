(ns lumo.analyzer
  (:require-macros [cljs.env.macros :refer [ensure]]
                   [cljs.analyzer.macros
                    :refer [no-warn wrapping-errors
                            disallowing-recur allowing-redef disallowing-ns*]])
  (:require [lumo.common :as common]
            [lumo.util :as util :refer [line-seq]]
            [lumo.io :as io :refer [slurp spit]]
            [lumo.cljs-deps :as deps]
            [cljs.env :as env]
            [cljs.analyzer :as ana]
            [cljs.tools.reader :as reader]
            [cljs.reader :as edn]
            [cljs.js :as cljs]
            [cljs.tools.reader.reader-types :as readers]
            [cljs.tagged-literals :as tags]
            [clojure.string :as string]
            fs
            path))

(defn gen-user-ns [src]
  (let [full-name (str src)
        name (.substring full-name
               (inc (.lastIndexOf full-name "/"))
               (.lastIndexOf full-name "."))]
    (symbol
      (str "cljs.user." name (util/content-sha full-name 7)))))

(defn- resolve-symbol
  [sym]
  (if (string/starts-with? (str sym) ".")
    sym
    (cljs/elide-macros-suffix (ana/resolve-symbol sym))))

(defn locate-src
  "Given a namespace return the corresponding ClojureScript (.cljs or .cljc)
     resource on the classpath or file from the root of the build."
  [ns]
  (or (util/ns->source ns)
    ;; Find sources available in inputs given to cljs.closure/build - Juho Teperi
    (some (fn [source]
            (if (= ns (:ns source))
              (:source-file source)))
      (:sources @env/*compiler*))
    ;; Find sources in directory given to cljs.compiler/compile-root - Juho Teperi
    (let [rootp (when-let [root (:root @env/*compiler*)]
                  root)
          cljsf (path/join rootp (util/ns->relpath ns :cljs))
          cljcf (path/join rootp (util/ns->relpath ns :cljc))]
      (if (and (fs/existsSync cljsf) (util/file? cljsf))
        cljsf
        (if (and (fs/existsSync cljcf) (util/file? cljcf))
          cljcf)))))

(defn forms-seq*
  "Seq of Clojure/ClojureScript forms from rdr, a java.io.Reader. Optionally
     accepts a filename argument which will be used in any emitted errors."
  ([rdr] (forms-seq* rdr nil))
  ([rdr filename]
   (let [eof-sentinel (js-obj)
         opts (merge
                {:eof eof-sentinel}
                (if (and filename (= (util/ext filename) "cljc"))
                  {:read-cond :allow :features #{:cljs}}))
         pbr (readers/string-push-back-reader (slurp rdr))
         data-readers tags/*cljs-data-readers*
         forms-seq_
         (fn forms-seq_ []
           (lazy-seq
             (let [form (binding [ana/*cljs-ns* (create-ns ana/*cljs-ns*)
                                  reader/*data-readers* data-readers
                                  reader/*alias-map*
                                  (apply merge
                                    ((juxt :requires :require-macros)
                                     (ana/get-namespace ana/*cljs-ns*)))
                                  reader/resolve-symbol resolve-symbol]
                          (reader/read opts pbr))]
               (if (identical? form eof-sentinel)
                 nil
                 (cons form (forms-seq_))))))]
     (forms-seq_))))

(defn aliasable-clj-ns?
  "Predicate for testing if a symbol represents an aliasable Clojure namespace."
  [sym]
  (when-not (util/ns->source sym)
    (let [[seg1 :as segs] (string/split (clojure.core/name sym) #"\.")]
      (when (= "clojure" seg1)
        (let [sym' (ana/clj-ns->cljs-ns sym)]
          (util/ns->source sym'))))))

(defn compute-clj->cljs-smap
  [{:keys [uses requires]}]
  (into {}
    (comp
      (map (fn [dep]
             (when (aliasable-clj-ns? dep)
               [dep (ana/clj-ns->cljs-ns dep)])))
      (remove nil?))
    (concat (vals uses) (vals requires))))

(defn parse-ns
  "Helper for parsing only the essential namespace information from a
   ClojureScript source file and returning a cljs.closure/IJavaScript compatible
   map _not_ a namespace AST node.
   By default does not load macros or perform any analysis of dependencies. If
   opts parameter provided :analyze-deps and :load-macros keys their values will
   be used for *analyze-deps* and *load-macros* bindings respectively. This
   function does _not_ side-effect the ambient compilation environment unless
   requested via opts where :restore is false."
  ([src]
   (parse-ns src nil
     (when env/*compiler*
       (:options @env/*compiler*))))
  ([src opts] (parse-ns src nil opts))
  ([src dest opts]
   (ensure
     (let [src (if (symbol? src)
                 (util/ns->source src)
                 src)
           ijs
           (binding [env/*compiler* (if (false? (:restore opts))
                                      env/*compiler*
                                      (atom @env/*compiler*))
                     ana/*cljs-ns* 'cljs.user
                     ana/*cljs-file* src
                     ana/*macro-infer*
                     (or (when (contains? opts :macro-infer)
                           (:macro-infer opts))
                       false)
                     ana/*analyze-deps*
                     (or (when (contains? opts :analyze-deps)
                           (:analyze-deps opts))
                       false)
                     ana/*load-macros*
                     (or (when (contains? opts :load-macros)
                           (:load-macros opts))
                       false)]
             (let [rdr (when-not (sequential? src) src)]
               (try
                 (loop [forms (if rdr
                                (forms-seq* rdr (util/get-absolute-path src))
                                src)
                        ret (merge
                              {:file         dest
                               :source-file  (when rdr src)
                               :source-forms (when-not rdr src)
                               :macros-ns    (:macros-ns opts)
                               :requires     (cond-> #{'cljs.core}
                                               (get-in @env/*compiler* [:options :emit-constants])
                                               (conj ana/constants-ns-sym))}
                              (when (and dest (js/$$LUMO_GLOBALS.fs.existsSync dest))
                                {:lines (let [reader dest]
                                          (-> reader line-seq count))}))]
                   (if (seq forms)
                     (let [env (ana/empty-env)
                           ast (no-warn (ana/analyze env (first forms) nil opts))]
                       (cond
                         (= :ns (:op ast))
                         (let [ast (cljs/rewrite-ns-ast ast (compute-clj->cljs-smap ast))
                               ns-name (:name ast)
                               ns-name (if (and (= 'cljs.core ns-name)
                                             (= "cljc" (util/ext src)))
                                         'cljs.core$macros
                                         ns-name)
                               deps (merge (:uses ast) (:requires ast))]
                           (merge
                             {:ns           (or ns-name 'cljs.user)
                              :provides     [ns-name]
                              :requires     (if (= 'cljs.core ns-name)
                                              (set (vals deps))
                                              (cond-> (conj (set (vals deps)) 'cljs.core)
                                                (get-in @env/*compiler* [:options :emit-constants])
                                                (conj ana/constants-ns-sym)))
                              :file         dest
                              :source-file  (when rdr src)
                              :source-forms (when-not rdr src)
                              :ast          ast
                              :macros-ns    (or (:macros-ns opts)
                                              (= 'cljs.core$macros ns-name))}
                             (when (and dest (js/$$LUMO_GLOBALS.fs.existsSync dest))
                               {:lines (let [reader dest]
                                         (-> reader line-seq count))})))

                         (= :ns* (:op ast))
                         (let [deps (merge (:uses ast) (:requires ast))]
                           (recur (rest forms)
                             (cond-> (update-in ret [:requires] into (set (vals deps)))
                               ;; we need to defer generating the user namespace
                               ;; until we actually need or it will break when
                               ;; `src` is a sequence of forms - António Monteiro
                               (not (:ns ret))
                               (assoc :ns (gen-user-ns src) :provides [(gen-user-ns src)]))))

                         :else ret))
                     ret)))))]
       ijs))))

(defn- cache-analysis-ext
  ([] (cache-analysis-ext (get-in @env/*compiler* [:options :cache-analysis-format] :transit)))
  ([format]
   (if (= format :transit) "json" "edn")))

(defn cache-file
  "Given a ClojureScript source file returns the read/write path to the analysis
   cache file. Defaults to the read path which is usually also the write path."
  ([src] (cache-file src "out"))
  ([src output-dir] (cache-file src (parse-ns src) output-dir))
  ([src ns-info output-dir]
   (cache-file src (parse-ns src) output-dir :read))
  ([src ns-info output-dir mode]
   {:pre [(map? ns-info)]}
   (let [ext (cache-analysis-ext)]
     (if-let [core-cache
              (and (= mode :read)
                (= (:ns ns-info) 'cljs.core)
                (io/resource (str "cljs/core.cljs.cache.aot._COLON_defs." ext)))]
       core-cache
       (let [target-file (util/to-target-file output-dir ns-info
                           (util/ext (:source-file ns-info)))]
         (str target-file ".cache." ext))))))

(defn requires-analysis?
  "Given a src, a resource, and output-dir, a compilation output directory
   return true or false depending on whether src needs to be (re-)analyzed.
   Can optionally pass cache, the analysis cache file."
  ([src] (requires-analysis? src "out"))
  ([src output-dir]
   (let [cache (cache-file src output-dir)]
     (requires-analysis? src cache output-dir)))
  ([src cache output-dir]
   (cond
     (util/bundled-resource? cache)
     (let [path (.-src cache)]
       (if (.startsWith path "cljs/core.cljs.cache.aot")
         false
         (throw (js/Error. (str "Invalid analysis cache, must be file not URL " cache)))))

     (and (string? cache)
          (not (fs/existsSync cache)))
     true

     :else
     (let [out-src (util/to-target-file output-dir (parse-ns src))]
       (if (not (fs/existsSync out-src))
         true
         (util/changed? src cache))))))

(defn write-analysis-cache
  ([ns cache-file]
   (write-analysis-cache ns cache-file nil))
  ([ns cache-file src]
   (util/mkdirs cache-file)
   (ana/dump-specs ns)
   (let [ext (util/ext cache-file)
         analysis (dissoc (get-in @env/*compiler* [::ana/namespaces ns]) :macros)]
     (case ext
       "edn"  (spit cache-file
                (str ";; Analyzed by ClojureScript " (util/clojurescript-version) "\n"
                  (pr-str analysis)))
       "json"
       ;; TODO: transit write ops
       (spit cache-file (common/cljs->transit-json analysis))))
   (when src
     (util/set-last-modified cache-file (util/last-modified src)))))

(defn read-analysis-cache
  ([cache-file src]
   (read-analysis-cache cache-file src nil))
  ([cache-file src opts]
   ;; we want want to keep dependency analysis information
   ;; don't revert the environment - David
   (let [{:keys [ns]} (parse-ns src
                        (merge opts
                          {:restore false
                           :analyze-deps true
                           :load-macros true}))
         ext          (util/ext cache-file)
         cached-ns    (case ext
                        "edn"  (edn/read-string (slurp cache-file))
                        "json" (common/transit-json->cljs (slurp cache-file)))]
     (when (or ana/*verbose* (:verbose opts))
       (util/debug-prn "Reading analysis cache for" (cond-> src (not (string? src)) .-src)))
     (swap! env/*compiler*
       (fn [cenv]
         (ana/register-specs cached-ns)
         (doseq [x (get-in cached-ns [::ana/constants :order])]
           (ana/register-constant! x))
         (-> cenv
           (assoc-in [::ana/namespaces ns] cached-ns)))))))

(defn analyze-file
  "Given a java.io.File, java.net.URL or a string identifying a resource on the
   classpath attempt to analyze it.

   This function side-effects the ambient compilation environment
   `cljs.env/*compiler*` to aggregate analysis information. opts argument is
   compiler options, if :cache-analysis true will cache analysis to
   \":output-dir/some/ns/foo.cljs.cache.edn\". This function does not return a
   meaningful value."
  ([f]
   (analyze-file f
     (when env/*compiler*
       (:options @env/*compiler*))))
  ([f opts]
   (analyze-file f false opts))
  ([f skip-cache opts]
   (binding [ana/*file-defs*        (atom #{})
             ana/*cljs-warnings*    ana/*cljs-warnings*]
     (let [output-dir (util/output-directory opts)
           res        (cond
                        ;; (string? f) f
                        (or (util/jar-resource? f)
                          (util/resource? f)
                          (util/bundled-resource? f))
                        f
                        :else (io/resource f))]
       (assert res (str "Can't find " f " in classpath"))
       (ensure
         (let [{:keys [ns] :as  ns-info} (parse-ns res)
               path    (.-src res)
               cache   (when (:cache-analysis opts)
                         (cache-file res ns-info output-dir))]
           (when-not (get-in @env/*compiler* [::ana/namespaces (:ns ns-info) :defs])
             (if (or skip-cache (not cache) (requires-analysis? res output-dir))
               (binding [ana/*cljs-ns* 'cljs.user
                         ana/*cljs-file* path
                         reader/*alias-map* (or reader/*alias-map* {})]
                 (when (or ana/*verbose* (:verbose opts))
                   (util/debug-prn "Analyzing" (cond-> res (not (string? res)) .-src)))
                 (cljs/analyze-str
                   env/*compiler*
                   (slurp res)
                   ns
                   (merge opts
                     {:verbose false})
                   identity)
                 (when (and cache (true? (:cache-analysis opts)))
                   (write-analysis-cache ns cache res)))
               (try
                 (read-analysis-cache cache res opts)
                 (catch js/Error e
                   (analyze-file f true opts)))))))))))
