(ns lumo.analyzer
  (:require-macros [cljs.env.macros :refer [ensure]]
                   [cljs.analyzer.macros
                    :refer [no-warn wrapping-errors
                            disallowing-recur allowing-redef disallowing-ns*]])
  (:require [lumo.util :as util :refer [line-seq]]
            [lumo.io :as io :refer [slurp]]
            [lumo.cljs-deps :as deps]
            [cljs.env :as env]
            [cljs.analyzer :as ana]
            [cljs.tools.reader :as reader]
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

(declare analyze-file)

(defn analyze-deps
  "Given a lib, a namespace, deps, its dependencies, env, an analysis environment
   and opts, compiler options - analyze all of the dependencies. Required to
   correctly analyze usage of other namespaces."
  ([lib deps env]
   (analyze-deps lib deps env
     (when env/*compiler*
       (:options @env/*compiler*))))
  ([lib deps env opts]
   (let [compiler @env/*compiler*]
     (binding [ana/*cljs-dep-set* (vary-meta (conj (set ana/*cljs-dep-set*) lib) update-in [:dep-path] conj lib)]
       (assert (every? #(not (contains? ana/*cljs-dep-set* %)) deps)
         (str "Circular dependency detected, "
           (apply str
             (interpose " -> "
               (conj (-> ana/*cljs-dep-set* meta :dep-path)
                 (some ana/*cljs-dep-set* deps))))))
       (doseq [dep deps]
         ;; we don't have the problem in the following commit because our macro
         ;; namespaces have different names
         ;; https://github.com/clojure/clojurescript/commit/0d0f5095
         (when-not (or (not-empty (get-in compiler [::ana/namespaces dep]))
                     (contains? (:js-dependency-index compiler) (name dep))
                     (ana/node-module-dep? dep)
                     (ana/js-module-exists? (name dep))
                     (deps/find-classpath-lib dep))
           (if-some [src (locate-src dep)]
             (analyze-file src opts)
             (throw
               (ana/error env
                 (ana/error-message :undeclared-ns {:ns-sym dep :js-provide (name dep)}))))))))))

(defn ns-side-effects
  [env {:keys [op] :as ast} opts]
  (if (#{:ns :ns*} op)
    (let [{:keys [name deps uses require-macros use-macros reload reloads]} ast]
      (when (and ana/*analyze-deps*
              (seq deps))
        (analyze-deps name deps env (dissoc opts :macros-ns)))
      (if ana/*load-macros*
        (-> ast
          (ana/check-use-macros-inferring-missing env)
          (ana/check-rename-macros-inferring-missing env))
        (do
          (ana/check-uses
            (when (and ana/*analyze-deps* (seq uses))
              (ana/missing-uses uses env))
            env)
          ast)))
    ast))

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

(defn requires-analysis?
  "Given a src, a resource, and output-dir, a compilation output directory
   return true or false depending on whether src needs to be (re-)analyzed.
   Can optionally pass cache, the analysis cache file."
  ([src] (requires-analysis? src "out"))
  ([src output-dir]
   (requires-analysis? src nil output-dir)
   #_(let [cache (cache-file src output-dir)]
     (requires-analysis? src cache output-dir)))
  ([src cache output-dir]
   true
   #_(cond
     (util/url? cache)
     (let [path (.getPath ^URL cache)]
       (if (or (.endsWith path "cljs/core.cljs.cache.aot.edn")
             (.endsWith path "cljs/core.cljs.cache.aot.json"))
         false
         (throw (Exception. (str "Invalid anlaysis cache, must be file not URL " cache)))))

     (and (util/file? cache)
       (not (.exists ^File cache)))
     true

     :else
     (let [out-src (util/to-target-file output-dir (parse-ns src))]
       (if (not (.exists out-src))
         true
         (util/changed? src cache))))))

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
   (binding [ana/*file-defs*     (atom #{})
             ;*unchecked-if*  false
             ana/*cljs-warnings* ana/*cljs-warnings*]
     (let [output-dir (util/output-directory opts)
           res        (cond
                        ;(string? f) f
                        (or (util/jar-resource? f)
                            (util/resource? f)
                            (util/bundled-resource? f))
                        f

                        ;(re-find #"^file://" f) (URL. f)
                        :else (io/resource f))]
       (assert res (str "Can't find " f " in classpath"))
       (ensure
         (let [ns-info (parse-ns res)
               path    (.-src res)
               cache   nil #_(when (:cache-analysis opts)
                         (cache-file res ns-info output-dir))]
           (when-not (get-in @env/*compiler* [::ana/namespaces (:ns ns-info) :defs])
             (if (or skip-cache (not cache) (requires-analysis? res output-dir))
               (binding [ana/*cljs-ns* 'cljs.user
                         ana/*cljs-file* path
                         ana/*passes* [ana/infer-type ana/check-invoke-arg-types ns-side-effects]
                         reader/*alias-map* (or reader/*alias-map* {})]
                 (when (or ana/*verbose* (:verbose opts))
                   (util/debug-prn "Analyzing" (cond-> res (not (string? res)) .-src)))
                 (let [env (assoc (ana/empty-env) :build-options opts)
                       ns  (let [rdr res]
                             (loop [ns nil forms (seq (forms-seq* rdr (util/path res)))]
                               (if forms
                                 (let [form (first forms)
                                       env (assoc env :ns (ana/get-namespace ana/*cljs-ns*))
                                       ast (ana/analyze env form nil opts)]
                                   (cond
                                     (= (:op ast) :ns)
                                     (recur (:name ast) (next forms))

                                     (and (nil? ns) (= (:op ast) :ns*))
                                     (recur (gen-user-ns res) (next forms))

                                     :else
                                     (recur ns (next forms))))
                                 ns)))]
                   #_(when (and cache (true? (:cache-analysis opts)))
                     (write-analysis-cache ns cache res))))
               (try
                 ;; we want want to keep dependency analysis information
                 ;; don't revert the environment - David
                 #_(let [{:keys [ns]} (parse-ns res
                                      (merge opts
                                        {:restore false
                                         :analyze-deps true
                                         :load-macros true}))
                       ext          (util/ext cache)
                       cached-ns    (case ext
                                      "edn"  (edn/read-string (slurp cache))
                                      "json" (let [{:keys [reader read]} @transit]
                                               (with-open [is (io/input-stream cache)]
                                                 (read (reader is :json transit-read-opts)))))]
                   (when (or *verbose* (:verbose opts))
                     (util/debug-prn "Reading analysis cache for" (str res)))
                   (swap! env/*compiler*
                     (fn [cenv]
                       (let []
                         (doseq [x (get-in cached-ns [::constants :order])]
                           (register-constant! x))
                         (-> cenv
                           (assoc-in [::namespaces ns] cached-ns))))))
                 (catch :default e
                   (analyze-file f true opts)))))))))))
