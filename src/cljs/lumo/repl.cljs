(ns lumo.repl
  (:refer-clojure :exclude [load-file*])
  (:require [cljs.analyzer :as ana]
            [cljs.env :as env]
            [cljs.js :as cljs]
            [cljs.reader :as reader]
            [cljs.tools.reader :as r]
            [cljs.tools.reader.reader-types :as rt]
            [clojure.string :as string]
            [cognitect.transit :as transit]
            [lumo.js-deps :as deps]
            [lumo.repl-resources :refer [repl-special-doc-map]]))

;; =============================================================================
;; Globals

(defonce ^:private st (cljs/empty-state))

(defonce ^:private current-ns (volatile! 'cljs.user))

(defonce ^:private app-opts (volatile! nil))

(def ^:private ^:const could-not-eval-regex #"Could not eval")
(def ^:private ^:const MACROS_SUFFIX "$macros")
(def ^:private ^:const JS_EXT ".js")
(def ^:private ^:const JSON_EXT ".json")

;; =============================================================================
;; Analysis cache

(defn- transit-json->cljs
  [json]
  (let [rdr (transit/reader :json)]
    (transit/read rdr json)))

(defn- cljs->transit-json
  [x]
  (let [wtr (transit/writer :json)]
    (transit/write wtr x)))

(defn- load-core-analysis-cache
  [ns-sym file-prefix]
  (let [keys        [:use-macros :excludes :name :imports :requires
                     :uses :defs :require-macros ::ana/constants :doc]
        cache (transit-json->cljs (js/LUMO_LOAD (str file-prefix JSON_EXT)))]
    (cljs/load-analysis-cache! st ns-sym cache)))

(defn- load-core-analysis-caches []
  (load-core-analysis-cache 'cljs.core "cljs/core.cljs.cache.aot")
  (load-core-analysis-cache 'cljs.core$macros "cljs/core$macros.cljc.cache"))

;; =============================================================================
;; Dependency loading

(defn- filename->lang
  "Converts a filename to a lang keyword by inspecting the file
  extension."
  [filename]
  (if (string/ends-with? filename JS_EXT)
    :js
    :clj))

(defn- replace-extension
  "Replaces the extension on a file."
  [filename new-extension]
  (string/replace filename #".clj[sc]?$" new-extension))

(defn- parse-edn
  "Parses edn source to Clojure data."
  [edn-source]
  (reader/read-string edn-source))

(defn- filenames-to-try
  "Produces a sequence of filenames to try reading, in the
  order they should be tried."
  [macros path]
  (let [extensions (if macros
                     [".clj" ".cljc"]
                     [".cljs" ".cljc" ".js"])]
    (for [extension extensions]
      (str path extension))))

(defn- load-goog
  "Loads a Google Closure implementation source file. `goog` namespaces are
   actually already included in the bundle because we compile with simple
   optimizations."
  [name cb]
  (cb {:source ""
       :lang   :js}))

(defn- skip-load-js?
  "Indicates namespaces for which JS code is already loaded, but for which
   we might need to load the corresponding analysis cache."
  [name macros]
  (and (not macros)
    ('#{cljs.analyzer
        cljs.analyzer.api
        cljs.compiler
        cljs.env
        cljs.js
        cljs.nodejs
        cljs.pprint
        cljs.reader
        cljs.source-map
        cljs.source-map.base64
        cljs.source-map.base64-vlq
        cljs.spec
        cljs.spec.impl.gen
        cljs.tagged-literals
        cljs.test
        cljs.tools.reader
        cljs.tools.reader.reader-types
        cljs.tools.reader.impl.commons
        cljs.tools.reader.impl.utils
        clojure.core.reducers
        clojure.data
        clojure.string
        clojure.set
        clojure.zip
        clojure.walk
        cognitect.transit
        lumo.repl
        lumo.repl-resources
        lumo.js-deps} name)))

(defn- skip-load?
  [name macros?]
  ((if macros?
     '#{cljs.core
        cljs.js
        cljs.pprint
        cljs.env.macros
        cljs.analyzer.macros
        cljs.compiler.macros
        cljs.tools.reader.reader-types}
     '#{cljs.core
        com.cognitect.transit
        com.cognitect.transit.delimiters
        com.cognitect.transit.handlers
        com.cognitect.transit.util
        com.cognitect.transit.caching
        com.cognitect.transit.types
        com.cognitect.transit.eq
        com.cognitect.transit.impl.decoder
        com.cognitect.transit.impl.reader
        com.cognitect.transit.impl.writer})
   name))

(defn- load-bundled [path source cb]
  (when-let [cache-json (js/LUMO_LOAD (str path ".cache.json"))]
    (cb {:source source
         :lang :js
         :cache (transit-json->cljs cache-json)})
    :loaded))

;; TODO: we could be smarter and only load the libs that we haven't already loaded
(defn- load-foreign-lib
  [name cb]
  (let [files (deps/files-to-load name)
        sources (map js/LUMO_READ_SOURCE files)]
    (cb {:lang :js
         :source (string/join "\n" sources)})
    :loaded))

;; TODO: can be optimized e.g. to just analyze CLJ source
;; if JS present but no analysis cache
(defn- load-external
  [path file-path macros? cb]
  ;; first check if the source is cached
  (let [cache-dir (:cache-path @app-opts)
        cache-prefix (str cache-dir "/" (munge path) (when macros? MACROS_SUFFIX))]
    (if-let [cached-source (and cache-dir
                                (js/LUMO_READ_CACHE (str cache-prefix JS_EXT)))]
      (let [cache-json (js/LUMO_READ_CACHE (str cache-prefix ".cache.json"))]
        (cb {:lang :js
             :source cached-source
             :filename (str cache-prefix JS_EXT)
             :cache (transit-json->cljs cache-json)})
        :loaded)
      (let [filename file-path]
        (when-let [source (js/LUMO_READ_SOURCE filename)]
          (let [ret {:lang   (filename->lang filename)
                     :file   filename
                     :source source}]
            (if (or (string/ends-with? filename ".cljs")
                    (string/ends-with? filename ".cljc"))
              (if-let [javascript-source (js/LUMO_READ_SOURCE (replace-extension filename JS_EXT))]
                (if-let [cache-edn (js/LUMO_READ_SOURCE (str filename ".cache.edn"))]
                  (cb {:lang   :js
                       :source javascript-source
                       :cache  (parse-edn cache-edn)})
                  ;; one last attempt to read analysis cache
                  (if-let [cache-json (js/LUMO_READ_SOURCE (str filename ".cache.json"))]
                    (cb {:lang   :js
                         :source javascript-source
                         :cache  (transit-json->cljs cache-json)})
                    (cb ret)))
                (cb ret))
              (cb ret)))
          :loaded)))))

(defn- load-and-cb!
  [name path file-path macros? cb]
  (let [bundled-src-prefix (cond-> path
                             macros? (str MACROS_SUFFIX))
        bundled-source (js/LUMO_LOAD (str bundled-src-prefix JS_EXT))]
    (cond
      (skip-load-js? name macros?)
      (load-bundled file-path "" cb)

      bundled-source
      ;; bundled source are AOTed macros which don't have the `.clj[sc]*` extension
      (load-bundled bundled-src-prefix bundled-source cb)

      (deps/foreign-lib? name)
      (load-foreign-lib name cb)

      :else
      (load-external path file-path macros? cb))))

(defn- load-other [{:keys [name path macros file]} cb]
  (loop [paths (filenames-to-try macros path)]
    (if-let [file-path (first paths)]
      (when-not (load-and-cb! name path file-path macros cb)
        (recur (next paths)))
      (cb nil))))

(defn- load-file* [filename cb]
  (when-not (load-and-cb! nil filename filename false cb)
    (cb nil)))

(defn- load [{:keys [name macros path file] :as m} cb]
  (cond
    file
    (load-file* file cb)

    (skip-load? name macros)
    (cb {:source ""
         :lang :js})

    (re-matches #"^goog/.*" path)
    (load-goog name cb)

    :else (load-other m cb)))

(defn- macros-cache? [cache]
  (.endsWith (str (:name cache)) MACROS_SUFFIX))

(defn- handle-caching-error
  [error]
  (throw (ex-info (str "Failed writing cache to " (.-path error))
           {:js-error error})))

(defn- write-cache
  [name path source cache prefix-path]
  (letfn [(wrap-error [err]
            (when err
              (handle-caching-error err)))]
    (let [macros? (macros-cache? cache)
          filename-prefix (str prefix-path "/" (munge path) (when macros? MACROS_SUFFIX))
          cache-json (cljs->transit-json cache)]
      (wrap-error (js/LUMO_WRITE_CACHE (str filename-prefix JS_EXT) source))
      (wrap-error (js/LUMO_WRITE_CACHE (str filename-prefix ".cache.json") cache-json)))))

(defn- caching-node-eval
  "Evaluates JavaScript in node, writing source and analysis cache to disk
   when desired."
  [{:keys [name source cache path] :as m}]
  (when-let [cache-path (and source cache path (:cache-path @app-opts))]
    (write-cache name path source cache cache-path))
  (js/eval source))

;; =============================================================================
;; REPL plumbing

(defn make-eval-opts []
  {:ns            @current-ns
   :verbose       (:verbose @app-opts)
   :static-fns    false})

(defn- ^:boolean could-not-eval? [msg]
  (boolean (re-find could-not-eval-regex msg)))

(defn- handle-repl-error [error]
  (let [message (ex-message error)
        cause (ex-cause error)]
    (cond
      (could-not-eval? message)
      (let [message (ex-message cause)
            {:keys [column]} (ex-data cause)
            column-indicator-str (str (apply str
                                        (repeat (+ (count (name @current-ns)) 3 column) " "))
                                   "⬆")]
        (println column-indicator-str)
        (println message))
      (= message "ERROR")
      (println (str cause))

      :else
      (println error))))

(defn- compiler-state-backup []
  {:st     @st
   :loaded @cljs/*loaded*})

(defn- restore-compiler-state! [backup]
  (reset! st (:st backup))
  (reset! cljs/*loaded* (:loaded backup)))

(defn- wrap-self
  "Takes a self-ish fn and returns it wrapped with exception handling.
  Compiler state is restored if self-ish fn fails."
  [f]
  (fn g
    ([a]
     (let [backup (compiler-state-backup)]
       (try
         (f a)
         (catch :default e
           (restore-compiler-state! backup)
           (throw e)))))))

(defn- wrap-special-fns
  [wfn fns]
  "Wrap wfn around all (fn) values in fns hashmap."
  (into {} (for [[k v] fns] [k (wfn v)])))

(declare execute execute-source)

(defn- execute-path [filename opts]
  (load {:file filename}
    (fn [{:keys [lang source cache]}]
      (if source
        (execute-source source (assoc opts :type "text"))
        (handle-repl-error (ex-info (str "Could not load file " filename) {}))))))

(def ^:private repl-special-fns
  (let [load-file-fn
        (fn self
          ([[_ file :as form] opts]
           (execute-path file (assoc opts :expression? false))))
        in-ns-fn
        (fn self
          ([[_ maybe-quoted :as form] opts]
           (cljs/eval st maybe-quoted opts
             (fn [{:keys [error value]}]
               (if error
                 (handle-repl-error error)
                 (let [ns-name value]
                   (if-not (symbol? ns-name)
                     (binding [*print-fn* *print-err-fn*]
                       (println "Argument to in-ns must be a symbol."))
                     (if (ana/get-namespace ns-name)
                       (vreset! current-ns ns-name)
                       ;; TODO: REPL requires
                       (let [ns-form `(~'ns ~ns-name)]
                         (cljs/eval st ns-form opts
                           (fn [{:keys [error value]}]
                             (if error
                               (handle-repl-error error)
                               (vreset! current-ns ns-name)))))))))))))]
    (wrap-special-fns wrap-self
      {'in-ns in-ns-fn
       'clojure.core/in-ns in-ns-fn
       'load-file load-file-fn
       'clojure.core/load-file load-file-fn
       ;; 'load-namespace
       ;; (fn self
       ;;   ([repl-env env form]
       ;;    (self env repl-env form nil))
       ;;   ([repl-env env [_ ns :as form] opts]
       ;;    (load-namespace repl-env ns opts)))
       })))

(defn- current-alias-map []
  (let [cur-ns @current-ns]
    (into {} (remove (fn [[k v]] (= k v)))
      (merge (get-in @st [::ana/namespaces cur-ns :requires])
        (get-in @st [::ana/namespaces cur-ns :require-macros])))))

(defn- repl-special? [form]
  (and (seq? form) (contains? repl-special-fns (first form))))

(defn- repl-read-string
  [source]
  (let [reader (rt/string-push-back-reader source)]
    (r/read {:read-cond :allow :features #{:cljs}} reader)))

(defn- execute-text
  [source {:keys [expression?] :as opts}]
  (binding [cljs/*eval-fn*   caching-node-eval
            cljs/*load-fn*   load
            ana/*cljs-ns*    @current-ns
            *ns*             (create-ns @current-ns)
            env/*compiler*   st
            r/resolve-symbol ana/resolve-symbol
            r/*alias-map*    (current-alias-map)]
    (let [form (repl-read-string source)]
      (if (repl-special? form)
        ((get repl-special-fns (first form)) form opts)
        (cljs/eval-str
          st
          source
          (if expression? source "source")
          (merge (make-eval-opts)
            (when expression?
              {:context :expr
               :def-emits-var true}))
          (fn [{:keys [ns value error] :as ret}]
            (if-not error
              (do
                (when expression?
                  (println (pr-str value)))
                (vreset! current-ns ns))
              (handle-repl-error error)))))))
  nil)

(defn- execute-source
  [source-or-path {:keys [type] :as opts}]
  (if-not (= type "text")
    (execute-path source-or-path opts)
    (execute-text source-or-path opts)))

;; TODO: need to separate execution paths of coming from the REPL vs. not
;; wrt. to special fns visibility (which must not be seen when executing a source file)
(defn ^:export execute
  [type source-or-path expression? setNS]
  (when setNS
    (vreset! current-ns (symbol setNS)))
  (execute-source source-or-path {:type type
                                  :expression? expression?}))

(defn ^:export get-current-ns []
  @current-ns)

(defn ^:export set-ns [ns-str]
  (vreset! current-ns (symbol ns-str)))


(defn ^:export init [verbose cache-path]
  (vreset! app-opts {:verbose verbose
                     :cache-path cache-path})
  (load-core-analysis-caches)
  (deps/index-upstream-foreign-libs))
