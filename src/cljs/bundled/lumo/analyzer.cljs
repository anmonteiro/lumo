(ns lumo.analyzer
  (:require-macros [cljs.env.macros :refer [ensure]]
                   [cljs.analyzer.macros
                    :refer [no-warn wrapping-errors
                            disallowing-recur allowing-redef disallowing-ns*]])
  (:require [lumo.util :as util :refer [line-seq]]
            [lumo.io :as io :refer [slurp]]
            [cljs.env :as env]
            [cljs.analyzer :as ana]
            [cljs.tools.reader :as reader]
            [cljs.js :as cljs]
            [cljs.tools.reader.reader-types :as readers]
            [cljs.tagged-literals :as tags]
            [clojure.string :as string]))

(defn gen-user-ns [src]
  (let [full-name (str src)
        name (.substring full-name
               (inc (.lastIndexOf full-name "/"))
               (.lastIndexOf full-name "."))]
    (symbol
      (apply str
        "cljs.user." name
        (take 7 (util/content-sha full-name))))))

(defn- resolve-symbol
  [sym]
  (if (string/starts-with? (str sym) ".")
    sym
    (cljs/elide-macros-suffix (ana/resolve-symbol sym))))

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
                         (let [ns-name (:name ast)
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
           (when-not (get-in @env/*compiler* [::namespaces (:ns ns-info) :defs])
             (if (or skip-cache (not cache) (requires-analysis? res output-dir))
               (binding [ana/*cljs-ns* 'cljs.user
                         ana/*cljs-file* path
                         reader/*alias-map* (or reader/*alias-map* {})]
                 (when (or ana/*verbose* (:verbose opts))
                   (util/debug-prn "Analyzing" (str res)))
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
