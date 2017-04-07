(ns lumo.repl
  (:refer-clojure :exclude [load-file*])
  (:require-macros [cljs.env.macros :as env]
                   [cljs.analyzer.macros :refer [no-warn]]
                   [lumo.repl])
  (:require [cljs.analyzer :as ana]
            [cljs.env :as env]
            [cljs.js :as cljs]
            [cljs.reader :as reader]
            [cljs.repl]
            [cljs.tagged-literals :as tags]
            [cljs.tools.reader :as r]
            [cljs.tools.reader.reader-types :as rt]
            [clojure.string :as string]
            [cognitect.transit :as transit]
            [goog.object :as gobj]
            [lumo.js-deps :as deps]
            [lumo.common :as common]
            [lumo.pprint.data :as pprint]
            [lumo.repl-resources :refer [special-doc-map repl-special-doc-map]])
  (:import [goog.string StringBuffer]))

;; =============================================================================
;; Globals

(def ^:dynamic *loading-foreign* false)
(def ^:dynamic *executing-path* nil)

(defonce ^:private st (cljs/empty-state))

(defonce ^:private current-ns (volatile! 'cljs.user))

(defonce ^:private app-opts (volatile! nil))

(def ^:private ^:const could-not-eval-regex #"Could not eval")
(def ^:private ^:const MACROS_SUFFIX "$macros")
(def ^:private ^:const JS_EXT ".js")

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

(defn closure-index* []
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

(def closure-index (memoize closure-index*))

(defonce goog-loaded
  (volatile! '#{goog.object
                goog.string
                goog.string.StringBuffer
                goog.array
                goog.crypt.base64
                goog.math.Long}))

(defn goog-dep-source [name]
  (let [index (closure-index)]
    (when-let [{:keys [path]} (get index name)]
      (let [sorted-deps (remove @goog-loaded (deps/topo-sort index name))]
        (vswap! goog-loaded into sorted-deps)
        (reduce str
          (map (fn [dep-name]
                 (let [{:keys [path]} (get index dep-name)]
                   (js/$$LUMO_GLOBALS.load (str path ".js")))) sorted-deps))))))

(defn load-goog
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
    ('#{cljs.analyzer
        cljs.compiler
        cljs.env
        cljs.js
        cljs.reader
        cljs.repl
        cljs.source-map
        cljs.source-map.base64
        cljs.source-map.base64-vlq
        cljs.spec
        cljs.spec.impl.gen
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
        lumo.common} name)))

(defn- skip-load?
  [name macros?]
  ((if macros?
     '#{cljs.core
        cljs.js
        cljs.repl
        lazy-map.core
        clojure.core.rrb-vector.macros}
     '#{goog.object
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
        com.cognitect.transit.impl.writer})
   name))

(defn- load-bundled [path source cb]
  (when-let [cache-json (js/$$LUMO_GLOBALS.load (str path ".cache.json"))]
    (cb {:source source
         :lang :js
         :cache (common/transit-json->cljs cache-json)})
    :loaded))

;; TODO: we could be smarter and only load the libs that we haven't already loaded
(defn- load-foreign-lib
  [name cb]
  (let [files (deps/files-to-load name)
        sources (map js/$$LUMO_GLOBALS.readSource files)]
    (binding [*loading-foreign* true]
      (cb {:lang :js
           :source (string/join "\n" sources)})
      :loaded)))

;; TODO: can be optimized e.g. to just analyze CLJ source
;; if JS present but no analysis cache
(defn- load-external
  [path file-path macros? cb]
  ;; first check if the source is cached
  (let [cache-dir (:cache-path @app-opts)
        cache-prefix (str cache-dir "/" (munge path) (when macros? MACROS_SUFFIX))]
    (if-let [cached-source (and cache-dir
                             (js/$$LUMO_GLOBALS.readCache (str cache-prefix JS_EXT)))]
      (let [cache-json (js/$$LUMO_GLOBALS.readCache (str cache-prefix ".cache.json"))]
        (cb {:lang :js
             :source cached-source
             :filename (str cache-prefix JS_EXT)
             :cache (common/transit-json->cljs cache-json)})
        :loaded)
      (let [filename file-path]
        (when-let [source (js/$$LUMO_GLOBALS.readSource filename)]
          (let [ret {:lang   (filename->lang filename)
                     :file   filename
                     :source source}]
            (if (or (string/ends-with? filename ".cljs")
                    (string/ends-with? filename ".cljc"))
              (if-let [javascript-source (js/$$LUMO_GLOBALS.readSource (replace-extension filename JS_EXT))]
                (if-let [cache-edn (js/$$LUMO_GLOBALS.readSource (str filename ".cache.edn"))]
                  (cb {:lang   :js
                       :source javascript-source
                       :cache  (parse-edn cache-edn)})
                  ;; one last attempt to read analysis cache
                  (if-let [cache-json (js/$$LUMO_GLOBALS.readSource (str filename ".cache.json"))]
                    (cb {:lang   :js
                         :source javascript-source
                         :cache  (common/transit-json->cljs cache-json)})
                    (cb ret)))
                (cb ret))
              (cb ret)))
          :loaded)))))

(defn- load-and-cb!
  [name path file-path macros? cb]
  (let [bundled-src-prefix (cond-> path
                             macros? (str MACROS_SUFFIX))
        bundled-source (js/$$LUMO_GLOBALS.load (str bundled-src-prefix JS_EXT))]
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
      (wrap-error (js/$$LUMO_GLOBALS.writeCache (str filename-prefix ".cache.json") cache-json)))))

(defn- caching-node-eval
  "Evaluates JavaScript in node, writing source and analysis cache to disk
   when desired."
  [{:keys [name source cache path filename]}]
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
;; Parinfer indentation

(defn- calc-parinfer-opts [text pos]
  (let [x (.lastIndexOf text "\n")]
    #js {:cursorX    (- pos (inc x))
         :cursorLine (dec (count (.split text "\n")))}))

(defn ^:export indent-space-count
  "Based on a partially entered form, returns the number of spaces with which
   to indent the next line. Returns 0 on failure to calculate."
  [text]
  (let [parinfer js/$$LUMO_GLOBALS.parinfer
        pos (count text)
        balanced (parinfer.indentMode text (calc-parinfer-opts text pos))]
    (if (.-success balanced)
      (let [new-text (str (subs (.-text balanced) 0 pos) "\n"
                       (subs (.-text balanced) pos))
            indented (parinfer.parenMode new-text
                       (calc-parinfer-opts new-text (inc pos)))]
        (if (.-success indented)
          (.-cursorX indented)
          0))
      0)))

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
                  (= (aget source (dec match-idx)) "#")
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

(defn ^:export get-highlight-coordinates
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
  (boolean (re-find could-not-eval-regex msg)))

(defn- handle-error [error]
  (let [message (ex-message error)
        cause (ex-cause error)]
    (binding [*print-fn* *print-err-fn*]
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
        (println error)))
    (when-not (:repl? @app-opts)
      (js/$$LUMO_GLOBALS.setExitValue 1))))

;; --------------------
;; REPL specials

(defn- drop-macros-suffix
  [ns-name]
  (if (string/ends-with? ns-name "$macros")
    (apply str (drop-last 7 ns-name))
    ns-name))

(defn- add-macros-suffix
  [sym]
  (symbol (str (name sym) "$macros")))

(defn- all-ns
  "Returns a sequence of all namespaces."
  []
  (keys (::ana/namespaces @st)))

(defn- all-macros-ns []
  (->> (all-ns)
    (filter #(string/ends-with? (str %) "$macros"))))

(defn- get-namespace
  "Gets the AST for a given namespace."
  [ns]
  {:pre [(symbol? ns)]}
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
                  (some #(get-macro-var env sym %) (all-macros-ns)))]
      (when var
        (-> (cond-> var
              (not (:ns var))
              (assoc :ns (symbol (namespace (:name var))))
              (= (namespace (:name var)) (str (:ns var)))
              (update :name #(symbol (name %))))
          (update :ns (comp symbol drop-macros-suffix str)))))))

(defn- get-aenv []
  (assoc (ana/empty-env)
    :ns (get-namespace @current-ns)
    :context :expr))

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
  (let [src (if (= "/" (first path))
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
                (handle-error error)
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
                              (handle-error error)
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

(defn- dir* [nsname]
  (run! prn
    (into
      (apply sorted-set (public-syms nsname))
      (public-syms (add-macros-suffix nsname)))))

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
      (cljs.repl/print-doc (special-doc-map name))

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

;; --------------------
;; Code evaluation

(defn make-eval-opts []
  (let [{:keys [verbose static-fns]} @app-opts]
    {:ns            @current-ns
     :verbose       verbose
     :static-fns    static-fns}))

(defn- current-alias-map []
  (let [cur-ns @current-ns]
    (into {} (remove (fn [[k v]] (= k v)))
      (merge (get-in @st [::ana/namespaces cur-ns :requires])
        (get-in @st [::ana/namespaces cur-ns :require-macros])))))

(defn- reader-eof? [msg]
  (or
    (= "EOF while reading" msg)
    (= "EOF while reading string" msg)))

(defn print-value [value]
  (pprint/pprint value))

(defn- read-chars
  [reader]
  (let [sb (StringBuffer.)]
    (loop [c (rt/read-char reader)]
      (if-not (nil? c)
        (do
          (.append sb c)
          (recur (rt/read-char reader)))
        (str sb)))))

(defn- repl-read-string
  "Returns a vector of the first read form, and any balance text."
  [source]
  (let [reader (rt/string-push-back-reader source)
        cur-ns @current-ns]
    (binding [ana/*cljs-ns* cur-ns
              *ns* (create-ns cur-ns)
              env/*compiler* st
              r/*data-readers* tags/*cljs-data-readers*
              r/resolve-symbol ana/resolve-symbol
              r/*alias-map* (current-alias-map)]
      [(r/read {:read-cond :allow :features #{:cljs}} reader) (read-chars reader)])))

(defn- ns-for-source [source]
  (let [[ns-form] (repl-read-string source)
        {:keys [op name]} (no-warn (ana/analyze (ana/empty-env) ns-form))]
    (when (or (keyword-identical? op :ns)
              (keyword-identical? op :ns*))
      name)))

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
                      (handle-error error)
                      (cljs/process-libs-deps {:*compiler* st} cache nil
                        (fn [{:keys [error]}]
                          (if-not (nil? error)
                            (handle-error error)
                            (caching-node-eval {:source source
                                                :filename filename})))))))))
        (handle-error (ex-info (str "Could not load file " file) {}))))))

(defn- execute-text
  [source {:keys [expression? print-nil-result? filename] :as opts}]
  (try
    (binding [cljs/*eval-fn*   caching-node-eval
              cljs/*load-fn*   load
              ana/*cljs-ns*    @current-ns
              *ns*             (create-ns @current-ns)
              env/*compiler*   st
              r/resolve-symbol ana/resolve-symbol
              r/*data-readers* tags/*cljs-data-readers*
              r/*alias-map*    (current-alias-map)]
      (let [form (and expression? (first (repl-read-string source)))
            eval-opts (merge (make-eval-opts)
                        (when expression?
                          {:context :expr
                           :def-emits-var true}))]
        (if (repl-special? form)
          ((get repl-special-fns (first form)) form eval-opts)
          (cljs/eval-str
            st
            source
            (cond
              expression? source
              filename (or (ns-for-source source) 'cljs.user)
              :else "source")
            eval-opts
            (fn [{:keys [ns value error] :as ret}]
              (if-not error
                (when expression?
                  (when (or print-nil-result?
                            (not (nil? value)))
                    (print-value value))
                  (vreset! current-ns ns))
                (handle-error error)))))))
    (catch :default e
      (handle-error e)))
  nil)

(defn- execute-source
  [source-or-path {:keys [type] :as opts}]
  (if-not (= type "text")
    (execute-path source-or-path opts)
    (execute-text source-or-path opts)))

(defn ^:export execute
  [type source-or-path expression? print-nil-result? setNS]
  (when setNS
    (vreset! current-ns (symbol setNS)))
  (execute-source source-or-path {:type type
                                  :expression? expression?
                                  :print-nil-result? print-nil-result?}))

(defn ^:export is-readable?
  [form]
  (try
    (second (repl-read-string form))
    (catch :default e
      (let [msg (.-message e)]
        (cond
          (= "EOF" msg) ""
          (reader-eof? msg) false
          :else (do
                  ;(handle-error e)
                  ""))))))

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
            (handle-error error)
            (cljs/eval-str st
              (str "(var -main)")
              nil
              (merge opts {:ns (symbol main-ns)})
              (fn [{:keys [ns value error] :as ret}]
                (try
                  (apply value main-args)
                  (catch :default e
                    (handle-error e)))))))))
    nil))

(defn ^:export get-current-ns []
  (str @current-ns))

(defn ^:export set-ns [ns-str]
  (vreset! current-ns (symbol ns-str)))

(defn- setup-assert! [elide-asserts]
  (set! *assert* (not elide-asserts)))

(defn ^:export init [repl? verbose cache-path static-fns elide-asserts]
  (vreset! app-opts {:repl? repl?
                     :verbose verbose
                     :cache-path cache-path
                     :static-fns static-fns
                     :elide-asserts elide-asserts})
  (setup-assert! elide-asserts)
  (set! *print-namespace-maps* repl?)
  (common/load-core-analysis-caches st repl?)
  (deps/index-upstream-foreign-libs))

;; --------------------
;; Introspection

(defn ^:export get-arglists
  "Return the argument lists for the given symbol as string."
  [s]
  (when-let [var (some->> s repl-read-string first (resolve-var @env/*compiler*))]
    (if-not (:macro var)
      (:arglists var)
      (-> var :meta :arglists second))))

;; --------------------
;; Autocompletion

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
    (into (completion-candidates-for-ns cur-ns true)
      (comp (mapcat keys) (map str))
      ((juxt :renames :rename-macros :uses :use-macros) (get-namespace cur-ns)))))

(defn- is-completion?
  [match-suffix candidate]
  (re-find (js/RegExp. (str "^" match-suffix)) candidate))

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

(def ^:private namespace-completion-additons
  (into #{} (map str)
    '[clojure.test
      clojure.spec
      clojure.pprint
      cljs.analyzer
      cljs.analyzer.api
      cljs.compiler
      cljs.env
      cljs.js
      cljs.nodejs
      cljs.pprint
      cljs.reader
      cljs.spec
      cljs.spec.impl.gen
      cljs.tagged-literals
      cljs.test
      cljs.tools.reader
      cljs.tools.reader.reader-types
      clojure.core.reducers
      clojure.data
      clojure.string
      clojure.set
      clojure.zip
      clojure.walk
      cognitect.transit
      lazy-map.core
      com.cognitect.transit
      com.cognitect.transit]))

(defn- namespace-completions []
  (transduce (comp
               (map str)
               (map drop-macros-suffix)
               (remove namespace-completion-exclusions))
    conj
    namespace-completion-additons
    (all-ns)))

(defn- expand-ns-alias
  "Expand a namespace alias symbol to a known namespace, consulting
   current namespace aliases if necessary."
  [alias]
  (or (get-in st [:cljs.analyzer/namespaces alias :name])
      (alias (current-alias-map))
      alias))

(defn- completion-candidates
  [top-level? ns-alias]
  (if ns-alias
    (let [full-ns (expand-ns-alias (symbol ns-alias))]
      (into #{} (mapcat identity)
        [(completion-candidates-for-ns full-ns false)
         (completion-candidates-for-ns (add-macros-suffix full-ns) false)]))
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
  [line]
  (let [top-level? (boolean (re-find #"^\s*\(\s*[^()\s]*$" line))
        ns-alias (second (re-find #"\(*(\b[a-zA-Z-.]+)/[a-zA-Z-]+$" line))]
    (let [line-match-suffix (re-find #":?[a-zA-Z-.]*$" line)
          line-prefix (subs line 0 (- (count line) (count line-match-suffix)))]
      (let [completions (reduce (fn [ret item]
                                  (doto ret
                                    (.push (str line-prefix item))))
                          #js []
                          (filter #(is-completion? line-match-suffix %)
                            (completion-candidates top-level? ns-alias)))]
        (doto completions
          .sort)))))
