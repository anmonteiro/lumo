(ns lumo.repl
  (:refer-clojure :exclude [load-file*])
  (:require-macros [cljs.env.macros :as env]
                   [cljs.analyzer.macros :refer [no-warn]]
                   [lumo.repl :refer [with-err-str]])
  (:require [cljs.analyzer :as ana]
            [cljs.compiler :as comp]
            [cljs.env :as env]
            [cljs.js :as cljs]
            [cljs.reader :as reader]
            [cljs.repl]
            [cljs.stacktrace :as st]
            [cljs.tagged-literals :as tags]
            [cljs.tools.reader :as r]
            [cljs.tools.reader.reader-types :as rt]
            [clojure.string :as string]
            [cljs.spec.alpha :as spec]
            [cognitect.transit :as transit]
            [goog.object :as gobj]
            [lumo.js-deps :as deps]
            [lumo.common :as common]
            [lumo.pprint.data :as pprint]
            [lumo.repl-resources :refer [special-doc-map repl-special-doc-map]])
  (:import [goog.string StringBuffer]))

;; =============================================================================
;; Globals

(def ^{:dynamic true
       :doc "*pprint-results* controls whether Lumo REPL results are
  pretty printed. If it is bound to logical false, results
  are printed in a plain fashion. Otherwise, results are
  pretty printed."}
  *pprint-results* true)

(def ^:private ^:dynamic *loading-foreign* false)
(def ^:private ^:dynamic *executing-path* nil)

(defonce ^:private st (cljs/empty-state))

(defonce ^:private current-ns (volatile! 'cljs.user))

(defonce ^:private app-opts (volatile! nil))

(def ^:private ^:const could-not-eval-regex #"Could not eval")
(def ^:private ^:const MACROS_SUFFIX "$macros")
(def ^:private ^:const JS_EXT ".js")
(def ^:private ^:const CACHE_SUFFIX ".cache.json")

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

(defn- closure-index* []
  (let [paths-to-deps
        (map (fn [[_ path provides requires]]
               [path
                (map second
                  (re-seq #"'(.*?)'" provides))
                (map second
                  (re-seq #"'(.*?)'" requires))])
          (re-seq #"\ngoog\.addDependency\('(.*)', \[(.*?)\], \[(.*?)\].*"
            (js/$$LUMO_GLOBALS.load "goog/deps.js")))]
    (into {}
      (for [[path provides requires] paths-to-deps
            provide provides]
        [(symbol provide) {:path (str "goog/" (second (re-find #"(.*)\.js$" path)))
                           :requires requires}]))))

(def ^:private closure-index (memoize closure-index*))

(defonce goog-loaded
  (volatile! '#{goog.object
                goog.string
                goog.string.StringBuffer
                goog.array
                goog.crypt.base64
                goog.math.Long}))

(defn- goog-dep-source [name]
  (let [index (closure-index)]
    (when-let [{:keys [path]} (get index name)]
      (let [sorted-deps (remove @goog-loaded (deps/topo-sort index name))]
        (vswap! goog-loaded into sorted-deps)
        (reduce str
          (map (fn [dep-name]
                 (let [{:keys [path]} (get index dep-name)]
                   (js/$$LUMO_GLOBALS.load (str path JS_EXT)))) sorted-deps))))))

(defn- load-goog
  "Loads a Google Closure implementation source file. `goog` namespaces are
   actually already included in the bundle because we compile with simple
   optimizations."
  [name cb]
  (if-let [source (goog-dep-source name)]
    (cb {:source source
         :lang   :js})
    (cb nil)))

(defn- skip-load-js?
  "Indicates namespaces for which JS code is already loaded, but for which
   we might need to load the corresponding analysis cache."
  [name macros]
  (and (not macros)
       (contains?
        '#{cljs.analyzer
           cljs.compiler
           cljs.env
           cljs.js
           cljs.reader
           cljs.repl
           cljs.source-map
           cljs.source-map.base64
           cljs.source-map.base64-vlq
           cljs.spec.alpha
           cljs.spec.gen.alpha
           cljs.tagged-literals
           cljs.tools.reader
           cljs.tools.reader.reader-types
           cljs.tools.reader.impl.commons
           cljs.tools.reader.impl.utils
           clojure.core.rrb-vector
           clojure.core.rrb-vector.interop
           clojure.core.rrb-vector.nodes
           clojure.core.rrb-vector.protocols
           clojure.core.rrb-vector.rrbt
           clojure.core.rrb-vector.transients
           clojure.core.rrb-vector.trees
           clojure.string
           clojure.set
           clojure.walk
           cognitect.transit
           fipp.visit
           fipp.engine
           fipp.deque
           lazy-map.core
           lumo.core
           lumo.pprint.data
           lumo.repl
           lumo.repl-resources
           lumo.js-deps
           lumo.common}
        name)))

(defn- skip-load?
  [name macros?]
  (if macros?
    (contains?
     '#{cljs.core
        cljs.js
        cljs.repl
        lazy-map.core
        clojure.core.rrb-vector.macros}
     name)
    (or
     (contains?
      '#{goog
         goog.object
         goog.string
         goog.string.StringBuffer
         goog.array
         goog.crypt.base64
         goog.math.Long
         cljs.core
         com.cognitect.transit
         com.cognitect.transit.delimiters
         com.cognitect.transit.handlers
         com.cognitect.transit.util
         com.cognitect.transit.caching
         com.cognitect.transit.types
         com.cognitect.transit.eq
         com.cognitect.transit.impl.decoder
         com.cognitect.transit.impl.reader
         com.cognitect.transit.impl.writer}
      name)
     (ana/node-module-dep? name))))

(declare inject-lumo-eval)

(defn- run-sync!
  "Like cljs.js/run-async!, but with the expectation that cb will be called
  synchronously within proc. When callbacks are done synchronously, run-async!
  ends up growing the stack as coll is processed, while this implementation
  employs recur."
  [proc coll break? cb]
  (loop [coll coll]
    (if (seq coll)
      (let [cb-val (volatile! nil)]
        (proc (first coll) #(vreset! cb-val %))
        (if (break? @cb-val)
          (cb @cb-val)
          (recur (rest coll))))
      (doto nil cb))))

;; Monkey-patch cljs.js/run-async! to instead be our more stack-efficient run-sync!
(set! cljs/run-async! run-sync!)

(defn- load-bundled [name path file-path source cb]
  (when-let [cache-json (or (js/$$LUMO_GLOBALS.load (str file-path ".cache.json"))
                            (js/$$LUMO_GLOBALS.load (str path ".cache.json")))]
    (cb {:source source
         :lang :js
         :cache (common/transit-json->cljs cache-json)})
    (when (symbol-identical? name 'cljs.spec.test.alpha$macros)
      (inject-lumo-eval 'cljs.spec.test.alpha$macros))
    :loaded))

;; TODO: we could be smarter and only load the libs that we haven't already loaded
(defn- load-js-lib
  [name cb]
  (let [sources (mapcat (fn [{:keys [file requires]}]
                          (concat (->> requires
                                       (filter #(.startsWith % "goog."))
                                       (map (comp goog-dep-source symbol)))
                                  [(.-source (js/$$LUMO_GLOBALS.readSource file))]))
                        (deps/js-libs-to-load name))]
    (binding [*loading-foreign* true]
      (cb {:lang :js
           :source (string/join "\n" sources)})
      :loaded)))

;; TODO: build options (e.g.: static-fns) also affect cache
(defn- cached-callback-data
  [cache-dir cache-prefix source-data]
  (when-not (nil? cache-dir)
    (let [cache-filename (str cache-prefix JS_EXT)
          cached-data (js/$$LUMO_GLOBALS.readCache cache-filename)]
      (when (and cached-data
              (> (.-modified cached-data) (.-modified source-data)))
        (when-let [cache-json (js/$$LUMO_GLOBALS.readCache (str cache-prefix CACHE_SUFFIX))]
          {:lang :js
           :source (.-source cached-data)
           :filename cache-filename
           :cache (common/transit-json->cljs (.-source cache-json))})))))

;; TODO: can be optimized e.g. to just analyze CLJ sources if JS present
;; but no analysis cache
(defn- load-external
  [path filename macros? cb]
  (when-let [source-data (or (js/$$LUMO_GLOBALS.readSource filename)
                             (js/$$LUMO_GLOBALS.readFile filename))]
    (let [cache-dir (:cache-path @app-opts)
          cache-prefix (str cache-dir "/" (munge path) (when macros? MACROS_SUFFIX))]
      (if-let [cached-callback-data (cached-callback-data cache-dir cache-prefix source-data)]
        (cb cached-callback-data)
        (let [ret {:lang (filename->lang filename)
                   :file filename
                   :source (.-source source-data)}]
          (if (or (string/ends-with? filename ".cljs")
                  (string/ends-with? filename ".cljc"))
            (if-let [javascript-source (js/$$LUMO_GLOBALS.readSource (replace-extension filename JS_EXT))]
              (if-let [cache-edn (js/$$LUMO_GLOBALS.readSource (str filename ".cache.edn"))]
                (cb {:lang   :js
                     :file filename
                     :source (.-source javascript-source)
                     :cache  (parse-edn cache-edn)})
                ;; one last attempt to read analysis cache
                (if-let [cache-json (js/$$LUMO_GLOBALS.readSource (str filename CACHE_SUFFIX))]
                  (cb {:lang   :js
                       :file filename
                       :source (.-source javascript-source)
                       :cache  (common/transit-json->cljs cache-json)})
                  (cb ret)))
              (cb ret))
            (cb ret))))
      :loaded)))

(defn- load-and-cb!
  [name path file-path macros? cb]
  (let [name (if macros?
               (symbol (str name MACROS_SUFFIX))
               name)
        bundled-src-prefix (cond-> path
                             macros? (str MACROS_SUFFIX))
        bundled-source (js/$$LUMO_GLOBALS.load (str bundled-src-prefix JS_EXT))]
    (cond
      (skip-load-js? name macros?)
      (load-bundled name bundled-src-prefix file-path "" cb)

      (some? bundled-source)
      ;; bundled source are AOTed macros which don't have the `.clj[sc]*` extension
      (load-bundled name bundled-src-prefix file-path bundled-source cb)

      (deps/js-lib? name)
      (load-js-lib name cb)

      :else
      (load-external path file-path macros? cb))))

(defn- load-other [{:keys [name path macros file]} cb]
  (loop [paths (filenames-to-try macros path)]
    (if-let [file-path (first paths)]
      (when-not (load-and-cb! name path file-path macros cb)
        (recur (next paths)))
      (cb nil))))

(defn- load-file* [filename cb]
  (let [path (string/replace filename #"\.[^/.]+$" "")]
    (when-not (load-and-cb! nil path filename false cb)
      (cb nil))))

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
          cache-json (common/cljs->transit-json cache)]
      (wrap-error (js/$$LUMO_GLOBALS.writeCache (str filename-prefix JS_EXT) source))
      (wrap-error (js/$$LUMO_GLOBALS.writeCache (str filename-prefix CACHE_SUFFIX) cache-json)))))

(defn- caching-node-eval
  "Evaluates JavaScript in node, writing source and analysis cache to disk
   when desired."
  [{:keys [name source cache path]}]
  (when-let [cache-path (and source cache path (:cache-path @app-opts))]
    (write-cache name path source cache cache-path))
  (let [foreign? *loading-foreign*
        exec-path *executing-path*]
    (set! *loading-foreign* false)
    (set! *executing-path* nil)
    (js/$$LUMO_GLOBALS.eval source foreign? exec-path)))

;; =============================================================================
;; REPL plumbing

;; --------------------
;; Brace highlighting

(declare repl-read-string)

(defn- is-completely-readable?
  [source]
  (try
    (let [[_ chars] (repl-read-string source)]
      (string/blank? chars))
    (catch :default _
      false)))

(def ^:private matches
  {")" "("
   "}" "{"
   "]" "["})

(defn- form-start
  [source pos]
  (let [source (subs source 0 (inc pos))
        match (get matches (aget source pos))]
    (loop [searchable-source source]
      (let [match-idx (.lastIndexOf searchable-source match)
            idx (cond-> match-idx
                  (identical? (aget source (dec match-idx)) "#")
                  dec)
            candidate-form (subs source idx (inc pos))]
        (when-not (neg? idx)
          (if (is-completely-readable? candidate-form)
            match-idx
            (recur (subs source 0 match-idx))))))))

(defn- calc-highlight-coords
  [lines start-idx pos]
  (if start-idx
    (let [line-count (.-length lines)]
      (if (== line-count 1)
        #js [start-idx 0]
        (loop [start-idx start-idx
               line-ndx line-count
               lines lines]
          (let [line-char-count (count (first lines))]
            (if (< start-idx line-char-count)
              #js [start-idx (dec line-ndx)]
              (do
                (.shift lines)
                (recur (- start-idx (inc line-char-count)) (dec line-ndx) lines)))))))
    [-1 -1]))

(defn- ^:export get-highlight-coordinates
  "Returns the highlight coordinates [cursorX dy] for the matching brace of the
   one at pos. cursorX is the horizontal position of the cursor starting from
   the beginning of the line. dy is the number of lines above the current
   cursor where the matching brace is located."
  [lines pos]
  (let [source (string/join "\n" lines)
        pos (+ pos (inc (.lastIndexOf source "\n")))
        start-idx (form-start source pos)]
    (calc-highlight-coords lines start-idx pos)))

;; --------------------
;; Error handling

(defn- ^:boolean could-not-eval? [msg]
  (and (not (nil? msg)) (boolean (re-find could-not-eval-regex msg))))

(defn- form-indicator-str
  [column current-ns]
  (str
    (apply str
      (repeat (+ (count (name current-ns)) 2 column) " "))
    "⬆"))

(defn- print-error-column-indicator
  [error]
  (when-let [cause (and (could-not-eval? (ex-message error)) (ex-cause error))]
    (let [{:keys [column]} (ex-data cause)
          column-indicator-str (form-indicator-str column @current-ns)]
      (println column-indicator-str))))

(defn- extract-cljs-js-error [error]
  (let [message (ex-message error)]
    (cond-> error
      (and (instance? ExceptionInfo error)
        (= :cljs/analysis-error (:tag (ex-data error)))
        (or (identical? "ERROR" message)
            (could-not-eval? message))
        (ex-cause error))
      ex-cause)))

(defn- ^:boolean reader-error?
  [e]
  (keyword-identical? :reader-exception (:type (ex-data e))))

(defn- location-info
  [error]
  (let [data (ex-data error)]
    (when (and (:line data)
               (:file data))
      (str " at line " (:line data) " " (:file data)#_(file-path (:file data))))))

(declare all-ns ns-syms)

(defn- print-error
  ([error stacktrace?]
   (print-error error stacktrace? nil))
  ([error stacktrace? printed-message]
   (binding [*print-fn* *print-err-fn*]
     (print-error-column-indicator error)
     (let [error (extract-cljs-js-error error)
           message (ex-message error)]
       (when (or (not ((fnil string/starts-with? "") printed-message message))
                 stacktrace?)
         (println (str message (when (reader-error? error)
                                 (location-info error)))))
       #_(when-let [data (and print-ex-data? (ex-data error))]
         (print-value data {::as-code? false}))
       (when stacktrace?
         (let [canonical-stacktrace (st/parse-stacktrace
                                      {}
                                      (.-stack error)
                                      {:ua-product :nodejs}
                                      {:output-dir "file://(/goog/..)?"})]
           (println
             (st/mapped-stacktrace-str
               canonical-stacktrace
               {}
               nil))))
       (when-let [cause (.-cause error)]
         (recur cause stacktrace? message))))))

(defn- handle-error [error stacktrace?]
  (print-error error stacktrace?)
  (if-not (:repl? @app-opts)
    (set! (. js/process -exitCode) 1)
    (set! *e (extract-cljs-js-error error))))

;; --------------------
;; REPL specials

(defn- drop-macros-suffix
  [ns-name]
  (if (string/ends-with? ns-name MACROS_SUFFIX)
    (apply str (drop-last 7 ns-name))
    ns-name))

(defn- maybe-eliminate-macros-suffix
  [x]
  (if (symbol? x)
    (symbol (drop-macros-suffix (namespace x)) (name x))
    x))

(defn- add-macros-suffix
  [sym]
  (symbol (str (name sym) MACROS_SUFFIX)))

(defn- all-ns
  "Returns a sequence of all namespaces."
  []
  (keys (::ana/namespaces @st)))

(defn- get-namespace
  "Gets the AST for a given namespace."
  [ns]
  (get-in @st [::ana/namespaces ns]))

(defn- resolve-var
  "Given an analysis environment resolve a var. Analogous to
   clojure.core/resolve"
  [env sym]
  {:pre [(map? env) (symbol? sym)]}
  (try
    (ana/resolve-var env sym
      (ana/confirm-var-exists-throw))
    (catch :default _
      (ana/resolve-macro-var env sym))))

(defn- get-macro-var
  [env sym macros-ns]
  {:pre [(symbol? macros-ns)]}
  (when-let [macro-var (env/with-compiler-env st
                         (resolve-var env (symbol macros-ns (name sym))))]
    (assoc macro-var :ns macros-ns)))

(defn- get-var
  [env sym]
  (binding [ana/*cljs-warning-handlers* nil]
    (let [var (or (env/with-compiler-env st (resolve-var env sym))
                  (some #(get-macro-var env sym %)
                    (vals (get-in @st [::ana/namespaces @current-ns :use-macros]))))]
      (when var
        (-> (cond-> var
              (not (:ns var))
              (assoc :ns (symbol (namespace (:name var))))
              (identical? (namespace (:name var)) (str (:ns var)))
              (update :name #(symbol (name %))))
          (update :ns (comp symbol drop-macros-suffix str)))))))

(defn- get-aenv []
  (assoc (ana/empty-env)
    :ns (get-namespace @current-ns)
    :context :expr))

(defn- current-alias-map []
  (let [cur-ns @current-ns]
    (into {}
      (merge (get-in @st [::ana/namespaces cur-ns :requires])
             (get-in @st [::ana/namespaces cur-ns :require-macros])))))
(defn- ns-syms
  [nsname pred]
  (into []
    (comp (filter pred) (map key))
    (:defs (get-namespace nsname))))

(defn- public-syms
  "Returns a sequence of the public symbols in a namespace."
  [nsname]
  (ns-syms nsname
    (fn [[_ attrs]]
      (and (not (:private attrs))
           (not (:anonymous attrs))))))

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
    ([a b]
     (let [backup (compiler-state-backup)]
       (try
         (f a b)
         (catch :default e
           (restore-compiler-state! backup)
           (throw e)))))))

(defn- root-resource
  "Returns the root directory path for a lib"
  [lib]
  (str \/
    (.. (name lib)
      (split \-) (join \_)
      (split \.) (join \/))))

(defn- root-directory
  "Returns the root resource path for a lib"
  [lib]
  (let [d (root-resource lib)]
    (subs d 0 (.lastIndexOf d "/"))))

(defn- load-path->cp-path
  [path]
  (let [src (if (identical? "/" (first path))
              path
              (str (root-directory @current-ns) \/ path))
        src (.substring src 1)]
    (or (and (js/$$LUMO_GLOBALS.resource (str src ".cljs")) (str src ".cljs"))
        (str src ".cljc"))))

(defn- wrap-special-fns
  [wfn fns]
  "Wrap wfn around all (fn) values in fns hashmap."
  (into {} (for [[k v] fns] [k (wfn v)])))

(declare execute-path)

(def ^:private repl-special-fns
  (let [load-file-fn
        (fn self
          [[_ file :as form] opts]
          (execute-path file opts))
        in-ns-fn
        (fn self
          [[_ maybe-quoted :as form] opts]
          (cljs/eval st maybe-quoted opts
            (fn [{:keys [error value]}]
              (if error
                (handle-error error true)
                (let [ns-name value]
                  (if-not (symbol? ns-name)
                    (binding [*print-fn* *print-err-fn*]
                      (println "Argument to in-ns must be a symbol."))
                    (if (ana/get-namespace ns-name)
                      (vreset! current-ns ns-name)
                      (let [ns-form `(~'ns ~ns-name)]
                        (cljs/eval st ns-form opts
                          (fn [{:keys [error]}]
                            (if error
                              (handle-error error true)
                              (vreset! current-ns ns-name))))))))))))]
    (wrap-special-fns wrap-self
      {'in-ns in-ns-fn
       'clojure.core/in-ns in-ns-fn
       'load-file load-file-fn
       'clojure.core/load-file load-file-fn
       'load
       (fn self
         [[_ & paths :as form] opts]
         (let [cp-paths (map load-path->cp-path paths)]
           (run! #(execute-path % opts) cp-paths)))})))

(defn- repl-special? [form]
  (and (seq? form) (contains? repl-special-fns (first form))))

(defn- expand-ns-alias
  "Expand a namespace alias symbol to a known namespace, consulting
   current namespace aliases if necessary."
  [alias]
  (let [alias (if (symbol-identical? alias 'clojure.core)
                'cljs.core
                alias)]
    (or (get-in st [::ana/namespaces alias :name])
        (get (current-alias-map) alias)
        alias)))

(defn- dir* [nsname]
  (let [ns (expand-ns-alias nsname)]
    (run! prn
      (into
        (apply sorted-set (public-syms ns))
        (public-syms (add-macros-suffix ns))))))

(defn- special-doc [name-symbol]
  (assoc (special-doc-map name-symbol)
    :name name-symbol
    :special-form true))

(defn- repl-special-doc [name-symbol]
  (assoc (repl-special-doc-map name-symbol)
    :name name-symbol
    :repl-special-function true))

(defn- undo-reader-conditional-spacing
  "Undoes the effect that wrapping a reader conditional around
   a defn has on a docstring."
  [s]
  ;; We look for five spaces (or six, in case that the docstring
  ;; is not aligned under the first quote) after the first newline
  ;; (or two, in case the doctring has an unpadded blank line
  ;; after the first), and then replace all five (or six) spaces
  ;; after newlines with two.
  (when-not (nil? s)
    (if (re-find #"[^\n]*\n\n?\s{5,6}\S.*" s)
      (string/replace-all s #"\n      ?" "\n  ")
      s)))

;; TODO: proper spec support (due to $macros), need to write own print-doc fn
(defn- doc* [name]
  (if-let [special-name ('{& fn catch try finally try} name)]
    (doc* special-name)
    (cond
      (special-doc-map name)
      (cljs.repl/print-doc (merge (special-doc-map name)
                             {:special-form true
                              :name name}))

      (repl-special-doc-map name)
      (cljs.repl/print-doc (repl-special-doc name))

      (get-namespace name)
      (cljs.repl/print-doc (select-keys (get-namespace name) [:name :doc]))

      (get-var (get-aenv) name)
      (cljs.repl/print-doc
        (let [aenv (get-aenv)
              var (get-var aenv name)
              m (-> (select-keys var
                      [:ns :name :doc :forms :arglists :macro :url])
                  (update-in [:doc] undo-reader-conditional-spacing)
                  (merge
                    {:forms (-> var :meta :forms second)
                     :arglists (-> var :meta :arglists second)}))]
          (cond-> (update-in m [:name] clojure.core/name)
            (:protocol-symbol var)
            (assoc :protocol true
              :methods
              (->> (get-in var [:protocol-info :methods])
                (map (fn [[fname sigs]]
                       [fname {:doc (:doc
                                     (get-var aenv
                                       (symbol (str (:ns var)) (str fname))))
                               :arglists (seq sigs)}]))
                (into {})))))))))

(defn- get-file-source
  [filepath]
  (if (symbol? filepath)
    (let [without-extension (string/replace
                              (string/replace (name filepath) #"\." "/")
                              #"-" "_")]
      (or
        (js/$$LUMO_GLOBALS.load (str without-extension ".clj"))
        (js/$$LUMO_GLOBALS.load (str without-extension ".cljc"))
        (js/$$LUMO_GLOBALS.load (str without-extension ".cljs"))))
    (or
      (js/$$LUMO_GLOBALS.load filepath)
      (some-> (js/$$LUMO_GLOBALS.readSource filepath) .-source)
      (js/$$LUMO_GLOBALS.load (string/replace filepath #"^/.*/main.out/" "")))))

(defn- fetch-source
  [var]
  (or (::repl-entered-source var)
      (when-let [filepath (or (:file var) (:file (:meta var)))]
        (when-let [file-source (get-file-source filepath)]
          (let [rdr (rt/source-logging-push-back-reader file-source)]
            (dotimes [_ (dec (:line var))] (rt/read-line rdr))
            (-> (r/read {:read-cond :allow :features #{:cljs}} rdr)
              meta :source))))))

(defn- source* [sym]
  (println (or (fetch-source (get-var (get-aenv) sym))
               "Source not found")))

(defn- namespace-doc [nspace]
  (select-keys (get-in @st [::ana/namespaces nspace]) [:name :doc]))

(defn find-doc
  "Prints documentation for any var whose documentation or name
   contains a match for re-string-or-pattern"
  [re-string-or-pattern]
  (let [re (re-pattern re-string-or-pattern)
        ms (concat (mapcat #(sort-by :name
                              (map (fn [[k v]]
                                     (assoc (:meta v) :name (symbol % k)))
                                (get-in @st [::ana/namespaces % :defs])))
                     (all-ns))
             (map namespace-doc (all-ns))
             (map special-doc (keys special-doc-map)))]
    (doseq [m ms
            :when (and (:doc m)
                    (or (re-find re (:doc m))
                        (re-find re (str (:name m)))))]
      (doc* (:name m)))))

(defn apropos
  "Given a regular expression or stringable thing, return a seq of all
  public definitions in all currently-loaded namespaces that match the
  str-or-pattern."
  [str-or-pattern]
  (let [matches? (if (instance? js/RegExp str-or-pattern)
                   #(re-find str-or-pattern (str %))
                   #(.includes (str %) (str str-or-pattern)))]
    (sort
      (into []
        (comp
          (mapcat (fn [ns]
                    (let [ns-name (drop-macros-suffix (str ns))]
                      (map #(symbol ns-name (str %))
                        (filter matches? (public-syms ns))))))
          ;; we need to call distinct here because in ClojureScript there
          ;; can exist macros & functions with the same name
          (distinct))
        (all-ns)))))

;; Taken from planck eval implementation
;; The following atoms and fns set up a scheme to
;; emit function values into JavaScript as numeric
;; references that are looked up.

(defonce ^:private fn-index (volatile! 0))
(defonce ^:private fn-refs (volatile! {}))

(defn- clear-fns!
  "Clears saved functions."
  []
  (vreset! fn-refs {}))

(defn- put-fn
  "Saves a function, returning a numeric representation."
  [f]
  (let [n (vswap! fn-index inc)]
    (vswap! fn-refs assoc n f)
    n))

(defn- get-fn
  "Gets a function, given its numeric representation."
  [n]
  (get @fn-refs n))

(defn- emit-fn [f]
  (print "lumo.repl.get_fn(" (put-fn f) ")"))

(defmethod comp/emit-constant js/Function
  [f]
  (emit-fn f))

(defmethod comp/emit-constant cljs.core/Var
  [f]
  (emit-fn f))

(defn eval
  ([form]
   (eval form (.-name *ns*)))
  ([form ns]
   (eval form ns env/*compiler*))
  ([form ns compiler]
   (let [result (volatile! nil)]
     (cljs/eval compiler form
       {:ns ns
        :context :expr
        :def-emits-var true}
       (fn [{:keys [value error]}]
         (if error
           (handle-error error true)
           (vreset! result value))))
     @result)))

(defn- intern
  ([ns name]
   (intern ns name nil))
  ([ns name val]
   (when-let [the-ns (find-ns (cond-> ns (instance? Namespace ns) ns-name))]
     (eval `(def ~name ~val) (ns-name the-ns)))))

(defn- inject-lumo-eval
  [target-ns]
  (intern target-ns 'eval eval))

;; --------------------
;; Code evaluation

(defn- make-eval-opts []
  (merge
    {:ns @current-ns
     :target :nodejs}
    (select-keys @app-opts [:verbose :static-fns :fn-invoke-direct :checked-arrays])))

(defn- current-alias?
  [ns]
  (contains? (set (vals (current-alias-map))) ns))

(defn- reader-eof? [e]
  (let [{:keys [ex-kind]} (ex-data e)]
    (keyword-identical? ex-kind :eof)))

(defn- read-chars
  [reader]
  (let [sb (StringBuffer.)]
    (loop [c (rt/read-char reader)]
      (if-not (nil? c)
        (do
          (.append sb c)
          (recur (rt/read-char reader)))
        (str sb)))))

(defn- get-data-readers*
  "Returns the merged data reader mappings."
  []
  (reduce (fn [data-readers url+source]
            (let [url      (.-url url+source)
                  source   (.-source url+source)
                  mappings (r/read-string source)]
              (when-not (map? mappings)
                (throw (ex-info (str "Not a valid data-reader map")
                                {:url url})))
              (reduce-kv (fn [data-readers tag fn-sym]
                           (when-not (symbol? tag)
                             (throw (ex-info (str "Invalid form in data-reader file")
                                             {:url  url
                                              :form tag})))
                           (when (and (get data-readers tag)
                                      (not= (get mappings tag) fn-sym))
                                (throw (ex-info "Conflicting data-reader mapping"
                                         {:url      url
                                          :conflict tag
                                          :mappings data-readers})))
                           (assoc data-readers tag fn-sym))
                         data-readers
                         mappings)))
          {}
          (js/$$LUMO_GLOBALS.loadUpstreamDataReaders)))

(def ^:private get-data-readers (memoize get-data-readers*))

(defn- load-data-readers!* [compiler]
  (let [data-readers (get-data-readers)
        nses (map (comp symbol namespace) (vals data-readers))]
    (doseq [ns nses]
      (try
        (eval `(require '~ns))
        (catch js/Error _)))
    (swap! compiler update-in [::ana/data-readers]
      merge (into {} (map (fn [[k v]]
                            [k (eval v)]))
              data-readers))
    (::ana/data-readers @compiler)))

(def load-data-readers! (memoize load-data-readers!*))

(defn- repl-read-string
  "Returns a vector of the first read form, and any balance text."
  [source]
  (let [reader (rt/string-push-back-reader source)
        cur-ns @current-ns]
    (binding [ana/*cljs-ns* cur-ns
              *ns* (create-ns cur-ns)
              env/*compiler* st
              r/*data-readers* (merge tags/*cljs-data-readers* (load-data-readers! env/*compiler*))
              r/resolve-symbol ana/resolve-symbol
              r/*alias-map* (current-alias-map)]
      [(r/read {:read-cond :allow :features #{:cljs}} reader) (read-chars reader)])))

(defn- ns-for-source [source]
  (let [[ns-form] (repl-read-string source)
        {:keys [op name]} (no-warn (ana/analyze (ana/empty-env) ns-form))]
    (when (or (keyword-identical? op :ns)
              (keyword-identical? op :ns*))
      name)))

(defn- print-value [value]
  (if *pprint-results*
    (pprint/pprint value)
    (prn value)))

(defn- capture-session-state
  "Captures all of the commonly set global vars as a session state map."
  []
  {:*print-meta* *print-meta*
   :*print-length* *print-length*
   :*print-level* *print-level*
   :*print-namespace-maps* *print-namespace-maps*
   :*unchecked-if* *unchecked-if*
   :*assert* *assert*
   :*1 *1
   :*2 *2
   :*3 *3
   :*e *e
   :ns @current-ns})

(defn- set-session-state!
  "Sets the session state given a sesssion state map."
  [session-state]
  (set! *print-meta* (:*print-meta* session-state))
  (set! *print-length* (:*print-length* session-state))
  (set! *print-level* (:*print-level* session-state))
  (set! *print-namespace-maps* (:*print-namespace-maps* session-state))
  (set! *unchecked-if* (:*unchecked-if* session-state))
  (set! *assert* (:*assert* session-state))
  (set! *1 (:*1 session-state))
  (set! *2 (:*2 session-state))
  (set! *3 (:*3 session-state))
  (set! *e (:*e session-state))
  (vreset! current-ns (:ns session-state)))

(def ^{:private true
       :doc "The default state used to initialize a new REPL session."}
  default-session-state
  (volatile! (capture-session-state)))

(defonce ^{:private true
           :doc "The state for each session, keyed by session ID."}
  session-states
  (volatile! {}))

(defn- ^:export clear-state-for-session
  "Clears the session state for a completed session."
  [session-id]
  (vswap! session-states dissoc session-id))

(defn- set-session-state-for-session-id!
  "Sets the session state for a given session."
  [session-id]
  (set-session-state! (get @session-states session-id @default-session-state)))

(defn- capture-session-state-for-session-id
  "Captures the session state for a given session."
  [session-id]
  (vswap! session-states assoc session-id (capture-session-state)))

(defn- ns-form?
  [form]
  (and (seq? form) (symbol-identical? 'ns (first form))))

(defn- process-1-2-3
  [form value]
  (when-not
    (or (contains? '#{*1 *2 *3 *e} form)
        (ns-form? form))
    (set! *3 *2)
    (set! *2 *1)
    (set! *1 value)))

(defn- call-form?
  [form allowed-operators]
  (contains? allowed-operators (and (list? form)
                                    (first form))))

(defn- def-form?
  "Determines if the expression is a def expression which returns a Var."
  [form]
  (call-form? form '#{def defn defn- defonce defmulti defmacro}))

(defn- warning-handler [warning-type env extra]
  (let [warning-string (with-err-str
                         (ana/default-warning-handler warning-type env
                           (update extra :js-op maybe-eliminate-macros-suffix)))]
    (binding [*print-fn* *print-err-fn*]
      (when-not (empty? warning-string)
        (when-let [column (:column env)]
          (do ;when (show-indicator?)
            (println (form-indicator-str column @current-ns))))
        (print warning-string)))))

(declare execute-source)

(defn- execute-path [file opts]
  (load {:file file}
    (fn [{:keys [lang source cache filename]}]
      (if source
        (binding [cljs/*eval-fn*   caching-node-eval
                  cljs/*load-fn*   load
                  *executing-path* file]
          (condp keyword-identical? lang
            :clj (execute-source source (merge opts
                                          {:type "text"
                                           :filename file
                                           :expression? false}))
            :js (cljs/process-macros-deps {:*compiler* st} cache nil
                  (fn [{:keys [error]}]
                    (if-not (nil? error)
                      (handle-error error false)
                      (cljs/process-libs-deps {:*compiler* st} cache nil
                        (fn [{:keys [error]}]
                          (if-not (nil? error)
                            (handle-error error false)
                            (caching-node-eval {:source source
                                                :filename filename})))))))))
        ;; TODO: why does Planck set this to false?
        (handle-error (ex-info (str "Could not load file " file) {}) true)))))

(defn- execute-text
  [source {:keys [expression? print-nil-result? filename session-id] :as opts}]
  (try
    (set-session-state-for-session-id! session-id)
    (binding [ana/*cljs-warning-handlers* (if expression?
                                              [warning-handler]
                                              [ana/default-warning-handler])
              cljs/*eval-fn*   caching-node-eval
              cljs/*load-fn*   load
              ana/*cljs-ns*    @current-ns
              *ns*             (create-ns @current-ns)
              env/*compiler*   st
              r/resolve-symbol ana/resolve-symbol
              tags/*cljs-data-readers* (merge tags/*cljs-data-readers* (load-data-readers! env/*compiler*))
              r/*alias-map*    (current-alias-map)]
      (let [form (and expression? (first (repl-read-string source)))
            eval-opts (merge (make-eval-opts)
                        (when expression?
                          {:context :expr
                           :def-emits-var true}))]
        (if (repl-special? form)
          ((get repl-special-fns (first form)) form (merge opts eval-opts))
          (cljs/eval-str
            st
            source
            (cond
              expression? source
              filename (or (ns-for-source source) filename)
              :else "source")
            eval-opts
            (fn [{:keys [ns value error] :as ret}]
              (if-not error
                (when expression?
                  (when (or (true? print-nil-result?)
                            (not (nil? value)))
                    (js/$$LUMO_GLOBALS.doPrint print-value value))
                  (process-1-2-3 form value)
                  (when (def-form? form)
                    (let [{:keys [ns name]} (meta value)]
                      (swap! st assoc-in [::ana/namespaces ns :defs name ::repl-entered-source] source)))
                  (vreset! current-ns ns))
                (handle-error error true)))))))
    (catch :default e
      ;; `;;` and `#_`
      (when-not (identical? (.-message e) "Unexpected EOF.")
        (handle-error e true)))
    (finally (capture-session-state-for-session-id session-id)))
  nil)

(defn- execute-source
  [source-or-path {:keys [type] :as opts}]
  (if-not (identical? type "text")
    (execute-path source-or-path opts)
    (execute-text source-or-path opts)))

(defn- ^:export execute
  [type source-or-path expression? print-nil-result? setNS session-id]
  (clear-fns!)
  (when setNS
    (vreset! current-ns (symbol setNS)))
  (execute-source source-or-path {:type type
                                  :expression? expression?
                                  :print-nil-result? print-nil-result?
                                  :session-id session-id}))

(defn- ^:export is-readable?
  [form]
  (try
    (second (repl-read-string form))
    (catch :default e
      (when-not (reader-eof? e)
        ""))))

(defn- ^:export run-main
  [main-ns & args]
  (let [main-args (js->clj args)
        opts (make-eval-opts)]
    (binding [cljs/*load-fn* load
              cljs/*eval-fn* caching-node-eval]
      (cljs/eval st
        `(~'require (quote ~(symbol main-ns)))
        opts
        (fn [{:keys [ns value error] :as ret}]
          (if error
            (handle-error error true)
            (cljs/eval-str st
              (str "(var -main)")
              nil
              (merge opts {:ns (symbol main-ns)})
              (fn [{:keys [ns value error] :as ret}]
                (try
                  (apply value main-args)
                  (catch :default e
                    (handle-error e true)))))))))
    nil))

(defn- ^:export run-main-cli-fn
  []
  (when (fn? *main-cli-fn*)
    (apply *main-cli-fn* *command-line-args*)))

(defn- ^:export get-current-ns [session-id]
  (let [{:keys [ns]} (get @session-states session-id @default-session-state)]
    (str ns)))

(defn- ^:export set-ns [ns-str]
  (vreset! current-ns (symbol ns-str)))

(defn- setup-assert! [elide-asserts]
  (set! *assert* (not elide-asserts))
  (vswap! default-session-state assoc :*assert* *assert*))

(defn- setup-print-namespace-maps! [print-namespace-maps]
  (set! *print-namespace-maps* print-namespace-maps)
  (vswap! default-session-state assoc :*print-namespace-maps* *print-namespace-maps*))

(defn- ^:export init
  [repl? verbose cache-path static-fns fn-invoke-direct elide-asserts checked-arrays]
  (vreset! app-opts {:repl? repl?
                     :verbose verbose
                     :cache-path cache-path
                     :static-fns static-fns
                     :fn-invoke-direct fn-invoke-direct
                     :elide-asserts elide-asserts
                     :checked-arrays (keyword checked-arrays)})
  (setup-assert! elide-asserts)
  (setup-print-namespace-maps! repl?)
  (common/load-core-analysis-caches st repl?)
  (deps/index-js-libs)
  (let [index @deps/js-lib-index]
    (swap! st assoc :js-dependency-index (into index
                                           (map (fn [[k v]] [(str k) v]))
                                           index))))

;; --------------------
;; Introspection

(defn ^:export get-arglists
  "Return the argument lists for the given symbol as string."
  [s]
  (when-let [var (some->> s
                   repl-read-string
                   first
                   (resolve-var (assoc @env/*compiler* :ns (ana/get-namespace ana/*cljs-ns*))))]
    (let [arglists (if-not (:macro var)
                     (:arglists var)
                     (-> var :meta :arglists second))]
      (if (symbol-identical? 'quote (first arglists))
        (second arglists)
        arglists))))

;; --------------------
;; Autocompletion

(defn- completion-candidates-for-spec
  [ns]
  (eduction
   (filter keyword?)
   (filter #(= (str ns) (namespace %)))
   (map name)
   (keys (spec/registry))))

(defn- completion-candidates-for-ns
  [ns-sym allow-private?]
  (map (comp str key)
    (into []
      (comp
        (filter (if allow-private?
                  identity
                  #(not (:private (val %)))))
        (remove #(:anonymous (val %))))
      (apply merge
        ((juxt :defs :macros)
          (get-namespace ns-sym))))))

(defn- completion-candidates-for-current-ns []
  (let [cur-ns @current-ns]
    (concat (completion-candidates-for-spec cur-ns)
            (into (completion-candidates-for-ns cur-ns true)
                  (comp (mapcat keys) (map str))
                  ((juxt :renames :rename-macros :uses :use-macros) (get-namespace cur-ns))))))

(defn- completion-candidates-for-closure-js
  [ns]
  (if (or (current-alias? ns)
          (symbol-identical? 'goog ns))
    (into [] (some-> js/global
               (gobj/getValueByKeys (.split (str ns) "."))
               js/Object.keys))
    []))

(defn- completion-candidates-for-node-modules
  [ns]
  (let [module (str ns)]
    (if (and (ana/node-module-dep? module)
             (current-alias? ns))
      ;; require is cheap because it's cached (was required in the current namespace)
      (into [] (js/Object.keys (js/require module)))
      [])))

(defn- completion-candidates-for-js-sources
  "Return JS completions iff the namespace is not in the compiler state."
  [ns]
  (when-not (get-namespace ns)
    (into (completion-candidates-for-closure-js ns)
          (completion-candidates-for-node-modules ns))))

(defn- is-completion?
  [match-suffix candidate]
  (let [escaped-suffix (string/replace match-suffix #"[-\/\\^$*+?.()|\[\]{}]" "\\$&")]
    (re-find (js/RegExp. (str "^" escaped-suffix) "i") candidate)))

(def ^:private keyword-completions
  (into #{} (map str)
    [:require :require-macros :import
     :refer :refer-macros :include-macros
     :refer-clojure :exclude
     :keys :strs :syms
     :as :or
     :pre :post
     :let :when :while
     :clj :cljs
     :default
     :else
     :gen-class
     :keywordize-keys
     :req :req-un :opt :opt-un
     :args :ret :fn]))

(def ^:private namespace-completion-exclusions
  (into #{} (map str)
    '[lumo.core
      lumo.bundle
      lumo.js-deps
      lumo.repl
      lumo.repl-resources
      lumo.classpath
      cognitect.transit
      lazy-map.core
      cljs.source-map
      cljs.source-map.base64
      cljs.source-map.base64-vlq
      cljs.tools.reader.impl.commons
      cljs.tools.reader.impl.utils
      cljs.stacktrace
      com.cognitect.transit.delimiters
      com.cognitect.transit.handlers
      com.cognitect.transit.util
      com.cognitect.transit.caching
      com.cognitect.transit.types
      com.cognitect.transit.eq
      com.cognitect.transit.impl.decoder
      com.cognitect.transit.impl.reader
      com.cognitect.transit.impl.writer]))

(def ^:private namespace-completion-additions
  (into #{} (map str)
    '[clojure.test
      clojure.spec.alpha
      clojure.spec.gen.alpha
      clojure.pprint
      cljs.analyzer
      cljs.analyzer.api
      cljs.compiler
      cljs.env
      cljs.js
      cljs.nodejs
      cljs.pprint
      cljs.reader
      cljs.spec.alpha
      cljs.spec.gen.alpha
      cljs.spec.test.alpha
      cljs.tagged-literals
      cljs.test
      cljs.tools.reader
      cljs.tools.reader.reader-types
      clojure.core
      clojure.core.reducers
      clojure.data
      clojure.string
      clojure.set
      clojure.zip
      clojure.walk
      cognitect.transit
      lazy-map.core
      com.cognitect.transit
      com.cognitect.transit
      lumo.io
      lumo.core
      lumo.classpath
      lumo.build.api]))

(defn- namespace-completions []
  (transduce (comp
               (map str)
               (map drop-macros-suffix)
               (remove namespace-completion-exclusions))
    conj
    (into namespace-completion-additions
      (comp cat (map str))
      [(keys @deps/js-lib-index)
       (keys (closure-index))])
    (all-ns)))

(defn- completion-candidates
  [top-level? ns-alias]
  (if ns-alias
    (let [full-ns (expand-ns-alias (symbol ns-alias))]
      (into #{} (mapcat identity)
        [(completion-candidates-for-spec full-ns)
         (completion-candidates-for-ns full-ns false)
         (completion-candidates-for-ns (add-macros-suffix full-ns) false)
         (completion-candidates-for-js-sources full-ns)]))
    (into #{} (mapcat identity)
      [keyword-completions
       (namespace-completions)
       (map #(str % "/") (keys (current-alias-map)))
       (completion-candidates-for-ns 'cljs.core false)
       (completion-candidates-for-ns 'cljs.core$macros false)
       (completion-candidates-for-current-ns)
       (when top-level?
         (concat
           (map str (keys special-doc-map))
           (map str (keys repl-special-doc-map))))])))

(defn ^:export get-completions
  [line cb]
  (if-some [js-matches (re-find #"js/(\S*)$" line)]
    (js/$$LUMO_GLOBALS.getJSCompletions line (second js-matches) cb)
    (let [top-level? (boolean (re-find #"^\s*\(\s*[^()\s]*$" line))
          ns-alias (second (re-find #"\(*(\b[a-zA-Z-.<>*=&?]+)/[a-zA-Z-]*$" line))
          line-match-suffix (first (re-find #":?([a-zA-Z-.<>*=&?]*|^\(/)$" line))
          line-prefix (subs line 0 (- (count line) (count line-match-suffix)))
          completions (if (empty? line-match-suffix)
                        #js []
                       (reduce (fn [ret item]
                                  (doto ret
                                    (.push (str line-prefix item))))
                                #js []
                                (filter #(is-completion? line-match-suffix %)
                                        (completion-candidates top-level? ns-alias))))]
      (cb (doto completions
            .sort)))))

;; --------------------
;; Socket Repl

(defn ns-symbol [function]
  (symbol (namespace (symbol function))))

(defn fn-string [function]
  (-> function symbol name))

(defn ^:export run-accept-fn [accept-fn socket args]
  (let [ns-sym (ns-symbol accept-fn)
        fn-str (fn-string accept-fn)
        opts (make-eval-opts)
        fn-args (js->clj args)]
    (binding [cljs/*load-fn* load
              cljs/*eval-fn* caching-node-eval]
      (cljs/eval st
        `(~'require (quote ~ns-sym))
        opts
        (fn [{:keys [ns value error] :as ret}]
          (if error
            (handle-error error true)
            (cljs/eval-str st
              (str "(var " fn-str ")")
              nil
              (merge opts {:ns (symbol ns-sym)})
              (fn [{:keys [ns value error] :as ret}]
                (try
                  ;; TODO: do we wanna splice args?
                  (value socket fn-args)
                  (catch :default e
                    (handle-error e true)))))))))))
