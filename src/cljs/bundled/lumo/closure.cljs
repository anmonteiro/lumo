(ns lumo.closure
  (:refer-clojure :exclude [compile])
  (:require-macros [cljs.env.macros :as env])
  (:require [lumo.util :as util :refer [distinct-by file-seq]]
            [goog.object :as gobj]
            [cljs.core :as cljsm]
            [cljs.compiler :as comp]
            [cljs.analyzer :as ana]
            [cljs.js :as cljs]
            [cljs.source-map :as sm]
            [cljs.env :as env]
            [lumo.analyzer :as lana]
            [lumo.compiler :as lcomp]
            [lumo.cljs-deps :as deps]
            [lumo.json :as json]
            [lumo.io :as io :refer [slurp spit]]
            [lumo.repl :as repl]
            [clojure.set :as set]
            [clojure.string :as string]
            [cljs.tools.reader :as reader]
            [cljs.tools.reader.reader-types :as readers]
            [goog.math :as math]
            child_process
            fs
            path)
  (:import [goog.string format StringBuffer]))

(defmethod cljs.compiler/emit-constant Keyword [x]
  (if-let [value (and (-> @env/*compiler* :options :emit-constants)
                      (-> @env/*compiler* ::ana/constant-table x))]
    (comp/emits "cljs.core." value)
    (comp/emits-keyword x)))

(defmethod cljs.compiler/emit-constant Symbol [x]
  (if-let [value (and (-> @env/*compiler* :options :emit-constants)
                      (-> @env/*compiler* ::ana/constant-table x))]
    (comp/emits "cljs.core." value)
    (comp/emits-symbol x)))

(set! cljs.analyzer/register-constant!
  (fn register-constant!
    ([val] (register-constant! nil val))
    ([env val]
     (when-not (.endsWith (str (-> env :ns :name)) "$macros")
       (swap! env/*compiler*
         (fn [cenv]
           (cond->
               (-> cenv
                 (update-in [::ana/constant-table]
                   (fn [table]
                     (if (get table val)
                       table
                       (assoc table val (ana/gen-constant-id val))))))
             env (update-in [::ana/namespaces (-> env :ns :name) ::ana/constants]
                   (fn [{:keys [seen order] :or {seen #{} order []} :as constants}]
                     (cond-> constants
                       (not (contains? seen val))
                       (assoc
                         :seen (conj seen val)
                         :order (conj order val))))))))))))

(def name-chars (map char (concat (range 48 57) (range 65 90) (range 97 122))))

(defn random-char []
  (nth name-chars (math/randomInt (count name-chars))))

(defn random-string [length]
  (apply str (take length (repeatedly random-char))))

;; Closure API
;; ===========

(defmulti js-source-file (fn [_ source] (type source)))

(defmethod js-source-file js/String [name source]
  #js {:path name
       :src source})

#_(def check-level
  {:error CheckLevel/ERROR
   :warning CheckLevel/WARNING
   :off CheckLevel/OFF})

#_(def warning-types
  {:access-controls DiagnosticGroups/ACCESS_CONTROLS
   :ambiguous-function-decl DiagnosticGroups/AMBIGUOUS_FUNCTION_DECL
   :analyzer-checks DiagnosticGroups/ANALYZER_CHECKS
   :check-eventful-object-disposal DiagnosticGroups/CHECK_EVENTFUL_OBJECT_DISPOSAL
   :check-regexp DiagnosticGroups/CHECK_REGEXP
   :check-types DiagnosticGroups/CHECK_TYPES
   :check-useless-code DiagnosticGroups/CHECK_USELESS_CODE
   :check-variables DiagnosticGroups/CHECK_VARIABLES
   :closure-dep-method-usage-checks DiagnosticGroups/CLOSURE_DEP_METHOD_USAGE_CHECKS
   :common-js-module-load DiagnosticGroups/COMMON_JS_MODULE_LOAD
   :conformance-violations DiagnosticGroups/CONFORMANCE_VIOLATIONS
   :const DiagnosticGroups/CONST
   :constant-property DiagnosticGroups/CONSTANT_PROPERTY
   :debugger-statement-present DiagnosticGroups/DEBUGGER_STATEMENT_PRESENT
   :deprecated DiagnosticGroups/DEPRECATED
   :deprecated-annotations DiagnosticGroups/DEPRECATED_ANNOTATIONS
   :duplicate-message DiagnosticGroups/DUPLICATE_MESSAGE
   :duplicate-vars DiagnosticGroups/DUPLICATE_VARS
   :es3 DiagnosticGroups/ES3
   :es5-strict DiagnosticGroups/ES5_STRICT
   :externs-validation DiagnosticGroups/EXTERNS_VALIDATION
   :extra-require DiagnosticGroups/EXTRA_REQUIRE
   :fileoverview-jsdoc DiagnosticGroups/FILEOVERVIEW_JSDOC
   :function-params DiagnosticGroups/FUNCTION_PARAMS
   :global-this DiagnosticGroups/GLOBAL_THIS
   :inferred-const-checks DiagnosticGroups/INFERRED_CONST_CHECKS
   :internet-explorer-checks DiagnosticGroups/INTERNET_EXPLORER_CHECKS
   :invalid-casts DiagnosticGroups/INVALID_CASTS
   :j2cl-checks DiagnosticGroups/J2CL_CHECKS
   :late-provide DiagnosticGroups/LATE_PROVIDE
   :lint-checks DiagnosticGroups/LINT_CHECKS
   :message-descriptions DiagnosticGroups/MESSAGE_DESCRIPTIONS
   :misplaced-type-annotation DiagnosticGroups/MISPLACED_TYPE_ANNOTATION
   :missing-getcssname DiagnosticGroups/MISSING_GETCSSNAME
   :missing-override DiagnosticGroups/MISSING_OVERRIDE
   :missing-polyfill DiagnosticGroups/MISSING_POLYFILL
   :missing-properties DiagnosticGroups/MISSING_PROPERTIES
   :missing-provide DiagnosticGroups/MISSING_PROVIDE
   :missing-require DiagnosticGroups/MISSING_REQUIRE
   :missing-return DiagnosticGroups/MISSING_RETURN
   :non-standard-jsdoc DiagnosticGroups/NON_STANDARD_JSDOC
   :report-unknown-types DiagnosticGroups/REPORT_UNKNOWN_TYPES
   :strict-missing-require DiagnosticGroups/STRICT_MISSING_REQUIRE
   :strict-module-dep-check DiagnosticGroups/STRICT_MODULE_DEP_CHECK
   :strict-requires DiagnosticGroups/STRICT_REQUIRES
   :suspicious-code DiagnosticGroups/SUSPICIOUS_CODE
   :tweaks DiagnosticGroups/TWEAKS
   :type-invalidation DiagnosticGroups/TYPE_INVALIDATION
   :undefined-names DiagnosticGroups/UNDEFINED_NAMES
   :undefined-variables DiagnosticGroups/UNDEFINED_VARIABLES
   :underscore DiagnosticGroups/UNDERSCORE
   :unknown-defines DiagnosticGroups/UNKNOWN_DEFINES
   :unused-local-variable DiagnosticGroups/UNUSED_LOCAL_VARIABLE
   :unused-private-property DiagnosticGroups/UNUSED_PRIVATE_PROPERTY
   :use-of-goog-base DiagnosticGroups/USE_OF_GOOG_BASE
   :violated-module-dep DiagnosticGroups/VIOLATED_MODULE_DEP
   :visiblity DiagnosticGroups/VISIBILITY})

(def known-opts
  "Set of all known compiler options."
  #{:anon-fn-naming-policy :asset-path :cache-analysis :closure-defines :closure-extra-annotations
    :closure-warnings :compiler-stats :dump-core :elide-asserts :externs :foreign-libs
    :hashbang :language-in :language-out :libs :main :modules :source-map-path :source-map-asset-path
    :optimizations :optimize-constants :output-dir :output-to :output-wrapper :parallel-build :preamble
    :pretty-print :print-input-delimiter :pseudo-names :recompile-dependents :source-map
    :source-map-inline :source-map-timestamp :static-fns :target :verbose :warnings
    :emit-constants :ups-externs :ups-foreign-libs :ups-libs :warning-handlers :preloads
    :browser-repl :cache-analysis-format :infer-externs})

#_(def string->charset
  {"iso-8859-1" StandardCharsets/ISO_8859_1
   "us-ascii"   StandardCharsets/US_ASCII
   "utf-16"     StandardCharsets/UTF_16
   "utf-16be"   StandardCharsets/UTF_16BE
   "utf-16le"   StandardCharsets/UTF_16LE
   "utf-8"      StandardCharsets/UTF_8})

#_(defn to-charset [charset]
  (cond
    (instance? Charset charset) charset
    (and (string? charset)
         (contains? string->charset (string/lower-case charset)))
    (get string->charset (string/lower-case charset))
    :else
    (throw
      (ex-info
        (str "Invalid :closure-output-charset " charset " given, only "
             (string/join ", " (keys string->charset)) " supported ")
        {}))))

(defn lang-key->lang-mode [key]
  (case key
    :no-transpile                     "NO_TRANSPILE"
    (:ecmascript6 :es6)               "ECMASCRIPT6"
    (:ecmascript6-strict :es6-strict) "ECMASCRIPT6_STRICT"
    (:ecmascript6-typed :es6-typed)   "ECMASCRIPT6_TYPED"
    (:ecmascript5 :es5)               "ECMASCRIPT5"
    (:ecmascript5-strict :es5-strict) "ECMASCRIPT5_STRICT"
    (:ecmascript3 :es3)               "ECMASCRIPT3"))

(def cljs-option->closure-option
  {:language-in "languageIn"
   :language-out "languageOut"
   ;; TODO: also set `assumeFunctionWrapper`
   :outputWrapper "outputWrapper"
   :processCommonJsModules "processCommonJsModules"
   :externs "externs"
   :source-map "createSourceMap"
   :closure-defines "defines"
   :optimizations "compilationLevel"
   :moduleResolutionMode "moduleResolutionMode"})

(defn set-options
  "TODO: Add any other options that we would like to support."
  [{:keys [language-in language-out] :as opts}]
  (-> (cond-> opts
        (some? language-in)
        (assoc :language-in
          (lang-key->lang-mode language-in))

        (some? language-out)
        (assoc :language-out
          (lang-key->lang-mode language-out)))
    (assoc :moduleResolutionMode "NODE")))

(defn make-options
  "Create a CompilerOptions object and set options from opts map."
  [opts]
  (let [level (case (:optimizations opts)
                :advanced "ADVANCED"
                :whitespace "WHITESPACE_ONLY"
                :simple "SIMPLE")
        compiler-options #js {:compilationLevel level}]
    #_(doseq [[key val] (:closure-defines opts)]
      (let [key (name key)]
        (cond
          (string? val) (.setDefineToStringLiteral compiler-options key val)
          (number? val) (.setDefineToDoubleLiteral compiler-options key val)
          (or (true? val)
            (false? val)) (.setDefineToBooleanLiteral compiler-options key val)
          :else (println "value for" key "must be string, int, float, or bool"))))
    #_(when (:source-map opts)
      (if (:modules opts)
        ;; name is not actually used by Closur in :modules case,
        ;; but we need to provide _something_ for Closure to not
        ;; complain
        (set! (.sourceMapOutputPath compiler-options)
              (str (io/file (util/output-directory opts)
                            "cljs_modules.map")))
        (set! (.sourceMapOutputPath compiler-options)
              (:source-map opts)))
      (set! (.sourceMapDetailLevel compiler-options)
            SourceMap$DetailLevel/ALL)
      (set! (.sourceMapFormat compiler-options)
            SourceMap$Format/V3))
    ;; TODO: what to do about unsupported options
    (reduce (fn [m [k v]]
              (when-let [closure-opt (cljs-option->closure-option k)]
                (goog.object/set m closure-opt v))
              m)
      compiler-options
      (-> opts
        set-options
        (dissoc :optimizations)))))

(defn load-externs
  "Externs are JavaScript files which contain empty definitions of
  functions which will be provided by the environment. Any function in
  an extern file will not be renamed during optimization.
  Options may contain an :externs key with a list of file paths to
  load. The :use-only-custom-externs flag may be used to indicate that
  the default externs should be excluded."
  [{:keys [externs use-only-custom-externs target ups-externs infer-externs] :as opts}]
  (let [validate (fn validate [p us]
                   (if (empty? us)
                     (throw (ex-info
                              (str "Extern " p " does not exist") {}))
                     us))
        filter-cp-js (fn [paths]
                       (for [p paths
                             u (deps/find-js-classpath p)]
                         u))
        filter-js (fn [paths]
                    (for [p paths
                          u (deps/find-js-resources p)]
                      u))
        add-target (fn [ext]
                     (cons (io/resource "cljs/externs.js")
                       (if (= :nodejs target)
                         (cons (io/resource "cljs/nodejs_externs.js")
                           (or ext []))
                         ext)))
        load-js (fn [ext]
                  (map #(js-source-file (util/path %) (slurp %)) ext))]
    (let [js-sources  (-> externs filter-js add-target load-js)
          ups-sources (-> ups-externs filter-cp-js load-js)
          all-sources (vec (concat js-sources ups-sources))]
      ;; TODO: enable this, figure out how to get default externs
      all-sources
      #_(cond->
            (if use-only-custom-externs
              all-sources
              (into all-sources (CommandLineRunner/getDefaultExterns)))
            infer-externs
            (conj (js-source-file nil
                    (io/file (util/output-directory opts) "inferred_externs.js")))))))

(defn make-closure-compiler []
  (js/$$LUMO_GLOBALS.getGoogleClosureCompiler))

(defn report-failure [result]
  (let [errors (.-errors result)
        warnings (.-warnings result)]
    (doseq [next (seq errors)]
      (println "ERROR:" next))
    (doseq [next (seq warnings)]
      (println "WARNING:" next))))


;; Protocols for IJavaScript and Compilable
;; ========================================

(defprotocol ISourceMap
  (-source-url [this] "Return the CLJS source url")
  (-source-map [this] "Return the CLJS compiler generated JS source mapping"))

(extend-protocol deps/IJavaScript

  string
  (-foreign? [this] false)
  (-closure-lib? [this] false)
  (-url
    ([this] nil)
    ([this _] nil))
  (-relative-path
    ([this] nil)
    ([this _] nil))
  (-provides [this]
    (let [{:keys [provides]} (deps/parse-js-ns (string/split-lines this))]
      (cond-> provides
        (empty? provides)
        (conj (util/content-sha this 7)))))
  (-requires [this] (:requires (deps/parse-js-ns (string/split-lines this))))
  (-source
    ([this] this)
    ([this _] this))

  cljs.core/PersistentHashMap
  (-foreign? [this] (:foreign this))
  (-closure-lib? [this] (:closure-lib this))
  (-url
    ([this] (deps/-url this nil))
    ([this opts]
     (let [[url file] (if-let [url-min (and (#{:advanced :simple} (:optimizations opts))
                                            (:url-min this))]
                        [url-min (:file-min this)]
                        [(:url this) (:file this)])]
       (or url file))))
  (-relative-path
    ([this] (deps/-relative-path this nil))
    ([this opts]
     (let [file (if-let [file-min (and (#{:advanced :simple} (:optimizations opts))
                                       (:file-min this))]
                  file-min
                  (:file this))]
       (when (and file (not (path/isAbsolute file)))
         file))))
  (-provides [this] (map name (:provides this)))
  (-requires [this] (map name (:requires this)))
  (-source
    ([this] (deps/-source this nil))
    ([this opts]
      (if-let [s (:source this)]
        s
        (let [reader (deps/-url this opts)]
          (slurp reader)))))

  cljs.core/PersistentArrayMap
  (-foreign? [this] (:foreign this))
  (-closure-lib? [this] (:closure-lib this))
  (-url
    ([this] (deps/-url this nil))
    ([this opts]
     (let [[url file] (if-let [url-min (and (#{:advanced :simple} (:optimizations opts))
                                            (:url-min this))]
                        [url-min (:file-min this)]
                        [(:url this) (:file this)])]
       (or url file))))
  (-relative-path
    ([this] (deps/-relative-path this nil))
    ([this opts]
     (let [file (if-let [file-min (and (#{:advanced :simple} (:optimizations opts))
                                       (:file-min this))]
                  file-min
                  (:file this))]
       (when (and file (not (path/isAbsolute file)))
         file))))
  (-provides [this] (map name (:provides this)))
  (-requires [this] (map name (:requires this)))
  (-source
    ([this] (deps/-source this nil))
    ([this opts]
      (if-let [s (:source this)]
        s
        (let [reader (deps/-url this opts)]
          (slurp reader))))))

(defrecord JavaScriptFile [foreign url source-url provides requires lines source-map]
  deps/IJavaScript
  (-foreign? [this] foreign)
  (-closure-lib? [this] (:closure-lib this))
  (-url [this] url)
  (-url [this opts] url)
  (-relative-path [this] nil)
  (-relative-path [this opts] nil)
  (-provides [this] provides)
  (-requires [this] requires)
  (-source [this] (deps/-source this nil))
  (-source [this opts] (slurp url))
  ISourceMap
  (-source-url [this] source-url)
  (-source-map [this] source-map))

(defn javascript-file
  ([foreign url provides requires]
     (javascript-file foreign url nil provides requires nil nil))
  ([foreign url source-url provides requires lines source-map]
    (assert (first provides) (str source-url " does not provide a namespace"))
    (JavaScriptFile. foreign url source-url (map name provides) (map name requires) lines source-map)))

(defn map->javascript-file [m]
  (merge
    (javascript-file
      (:foreign m)
      (when-let [f (or (:file m) (:url m))]
        f)
      (when-let [sf (:source-file m)]
        sf)
      (:provides m)
      (:requires m)
      (:lines m)
      (:source-map m))
    (when-let [source-file (:source-file m)]
      {:source-file source-file})
    (when-let [out-file (:out-file m)]
      {:out-file out-file})
    (when (:closure-lib m)
      {:closure-lib true})
    (when-let [ns (:ns m)]
      {:ns ns})
    (when (:macros-ns m)
      {:macros-ns true})))

(defn read-js
  "Read a JavaScript file returning a map of file information."
  [f]
  (let [source (slurp f)
        m (deps/parse-js-ns (string/split-lines source))]
    (map->javascript-file (assoc m :file f))))


;; Compile
;; =======

(defprotocol Inputs
  (-paths [this] "Returns the file paths to the source inputs"))

(extend-protocol Inputs
  string
  (-paths [this] [this]))

(defprotocol Compilable
  (-compile [this opts cb] "Returns one or more IJavaScripts.")
  (-find-sources [this opts] "Returns one or more IJavascripts, without compiling them."))

(defn compile-form-seq
  "Compile a sequence of forms to a JavaScript source string."
  ([forms cb]
    (compile-form-seq forms
      (when env/*compiler*
        (:options @env/*compiler*)) cb))
  ([forms opts cb]
   (lcomp/with-core-cljs opts
     (fn []
       (cb (with-out-str
             (binding [ana/*cljs-ns* 'cljs.user]
               (doseq [form forms]
                 (comp/emit (ana/analyze (ana/empty-env) form))))))))))

(defn compiled-file
  "Given a map with at least a :file key, return a map with
   {:file .. :provides .. :requires ..}.
   Compiled files are cached so they will only be read once."
  [m]
  (let [path (:file m)
        js (if (:provides m)
             (map->javascript-file m)
             (if-let [js (get-in @env/*compiler* [::compiled-cljs path])]
               js
               (read-js (:file m))))]
    (swap! env/*compiler* update-in [::compiled-cljs] assoc path js)
    js))

(defn compile
  "Given a Compilable, compile it and return an IJavaScript."
  [compilable opts cb]
  (-compile compilable opts cb))

(defn compile-file
  "Compile a single cljs file. If no output-file is specified, returns
  a string of compiled JavaScript. With an output-file option, the
  compiled JavaScript will written to this location and the function
  returns a JavaScriptFile. In either case the return value satisfies
  IJavaScript."
  [file {:keys [output-file] :as opts} cb]
  (if output-file
    (let [out-file (path/join (util/output-directory opts) output-file)]
      (lcomp/compile-file file out-file opts
        (fn [res]
          (if (:error res)
            (cb res)
            (cb (compiled-file res))))))
    (let [path file]
      (binding [ana/*cljs-file* path]
        (let [rdr file]
          (compile-form-seq (lana/forms-seq* rdr path) cb))))))

(defn compile-dir
  "Recursively compile all cljs files under the given source
  directory. Return a list of JavaScriptFiles."
  [src-dir opts cb]
  (let [out-dir (util/output-directory opts)]
    (map compiled-file
         (lcomp/compile-root src-dir out-dir opts))))

(defn path-from-jarfile
  "Given the URL of a file within a jar, return the path of the file
  from the root of the jar."
  [url]
  (.-src url))

(defn jar-file-to-disk
  "Copy a file contained within a jar to disk. Return the created file."
  ([url out-dir]
    (jar-file-to-disk url out-dir
      (when env/*compiler*
        (:options @env/*compiler*))))
  ([url out-dir opts]
   (let [out-file (path/join out-dir (path-from-jarfile url))
         content  (let [reader url]
                    (slurp reader))]
     (when (and url (or ana/*verbose* (:verbose opts)))
       (util/debug-prn "Copying" (util/path url) "to" (str out-file)))
     (util/mkdirs out-file)
     (spit out-file content)
     (util/set-last-modified out-file (util/last-modified url))
     out-file)))

;; TODO: it would be nice if we could consolidate requires-compilation?
;; logic - David
(defn compile-from-jar
  "Compile a file from a jar if necessary. Returns IJavaScript."
  [jar-file {:keys [output-file] :as opts} cb]
  (let [out-file (when output-file
                   (path/join (util/output-directory opts) output-file))]
    (if (or (nil? out-file)
            (not (fs/existsSync out-file))
            (not= (util/compiled-by-version out-file)
                  (util/clojurescript-version))
            (util/changed? jar-file out-file))
      ;; actually compile from JAR
      (let [file-on-disk (jar-file-to-disk jar-file (util/output-directory opts) opts)]
        (-compile file-on-disk opts cb))
      ;; have to call compile-file as it includes more IJavaScript
      ;; information than ana/parse-ns

      ;; TODO: FIXME: the path won't really have .jar at the end, just
      (compile-file
        (path/join (util/output-directory opts)
          (last (string/split jar-file #"\.jar!/")))
        opts
        cb))))

(defn find-jar-sources
  [this opts]
  [(lcomp/find-source (jar-file-to-disk this (util/output-directory opts)))])

(extend-protocol Compilable

  string
  (-compile [this opts cb]
    (if (util/directory? this)
      (compile-dir this opts cb)
      (compile-file this opts cb)))
  (-find-sources [this _]
    (if (util/directory? this)
      (lcomp/find-root-sources this)
      [(lcomp/find-source this)]))

  object
  (-compile [this opts cb]
    (cond
      (util/resource? this)
      (-compile (.-src this) opts cb)

      (or (util/jar-resource? this)
          (util/bundled-resource? this))
      (compile-from-jar this opts cb)))
  (-find-sources [this opts]
    (cond
      (util/resource? this) (-find-sources (.-src this) opts)
      (util/jar-resource? this) (find-jar-sources this opts)
      :else (js/console.log "trying to find bundled sources but lol")))

  List
  (-compile [this opts cb]
    (compile-form-seq [this] cb))
  (-find-sources [this opts]
    [(lana/parse-ns [this] opts)])

  ;; String
  ;; (-compile [this opts] (-compile (io/file this) opts))
  ;; (-find-sources [this opts] (-find-sources (io/file this) opts))

  PersistentVector
  (-compile [this opts cb] (compile-form-seq this cb))
  (-find-sources [this opts]
    [(lana/parse-ns this opts)])
  )

(defn js-dependencies
  "Given a sequence of Closure namespace strings, return the list of
  all dependencies. The returned list includes all Google and
  third-party library dependencies.
  Third-party libraries are configured using the :libs option where
  the value is a list of directories containing third-party
  libraries."
  [opts requires]
  (loop [requires requires
         visited (set requires)
         deps #{}]
    (if (seq requires)
      (let [node (or (get (@env/*compiler* :js-dependency-index) (first requires))
                     (deps/find-classpath-lib (first requires)))
            new-req (remove #(contains? visited %) (:requires node))]
        (recur (into (rest requires) new-req)
               (into visited new-req)
               (conj deps node)))
      (remove nil? deps))))

(defn- add-core-macros-if-cljs-js
  "If a compiled entity is the cljs.js namespace, explicitly
  add the cljs.core macros namespace dependency to it."
  [compiled]
  (cond-> compiled
    ;; TODO: IJavaScript :provides :requires should really
    ;; always be Vector<MungedString> - David
    (= ["cljs.js"] (into [] (map str) (deps/-provides compiled)))
    (update-in [:requires] concat ["cljs.core$macros"])))

(defn get-compiled-cljs
  "Return an IJavaScript for this file. Compiled output will be
   written to the working directory."
  [opts {:keys [relative-path uri]} cb]
  (let [js-file  (lcomp/rename-to-js relative-path)]
    (-compile uri (merge opts {:output-file js-file})
      (fn [compiled]
        (cb (add-core-macros-if-cljs-js compiled))))))

(defn cljs-source-for-namespace
  "Given a namespace return the corresponding source with either a .cljs or
  .cljc extension."
  [ns]
  (if (= "cljs.core$macros" (str ns))
    (let [relpath "cljs/core.cljc"]
      {:relative-path relpath :uri (io/resource relpath) :ext :cljc})
    (let [path    (-> (munge ns) str (string/replace \. \/))
          relpath (str path ".cljs")]
      (if-let [res (io/resource relpath)]
        {:relative-path relpath :uri res :ext :cljs}
        (let [relpath (str path ".cljc")]
          (if-let [res (io/resource relpath)]
            {:relative-path relpath :uri res :ext :cljc}))))))

(defn source-for-namespace
  "Given a namespace and compilation environment return the relative path and
  uri of the corresponding source regardless of the source language extension:
  .cljs, .cljc, .js"
  [ns compiler-env]
  (let [ns-str  (str (comp/munge ns {}))
        path    (string/replace ns-str \. \/)
        relpath (str path ".cljs")]
    (if-let [cljs-res (io/resource relpath)]
      {:relative-path relpath :uri cljs-res :ext :cljs}
      (let [relpath (str path ".cljc")]
        (if-let [cljc-res (io/resource relpath)]
          {:relative-path relpath :uri cljc-res :ext :cljc}
          (let [relpath (str path ".js")]
            (if-let [js-res (io/resource relpath)]
              {:relative-path relpath :uri js-res :ext :js}
              (let [ijs (get-in @compiler-env [:js-dependency-index (str ns)])
                   relpath (or (:file ijs) (:url ijs))]
               (if-let [js-res (and relpath
                                 ;; try to parse URL, otherwise just return local
                                 ;; resource
                                 (io/resource relpath))]
                 {:relative-path relpath :uri js-res :ext :js}
                 (throw
                   (ex-info (str "Namespace " ns " does not exist") {})))))))))))

(defn cljs-dependencies
  "Given a list of all required namespaces, return a list of
  IJavaScripts which are the cljs dependencies. The returned list will
  not only include the explicitly required files but any transitive
  dependencies as well. JavaScript files will be compiled to the
  working directory if they do not already exist.

  Only load dependencies from the classpath."
  [opts requires cb]
  (letfn [(cljs-deps [lib-names]
            (->> lib-names
              (remove #(or ((@env/*compiler* :js-dependency-index) %)
                           (deps/find-classpath-lib %)))
              (map cljs-source-for-namespace)
              (remove (comp nil? :uri))))]
    (loop [required-files (cljs-deps requires)
           visited        (set required-files)
           js-deps        #{}]
      (if (seq required-files)
        (let [next-file (first required-files)
              js        (get-compiled-cljs opts next-file cb)
              new-req   (remove #(contains? visited %) (cljs-deps (deps/-requires js)))]
          (recur (into (rest required-files) new-req)
                 (into visited new-req)
                 (conj js-deps js)))
        (disj js-deps nil)))))

;; TODO: dedupe sources (set logic doesn't work because :source-file is a JS object)
(defn find-cljs-dependencies
  "Given set of cljs namespace symbols, find IJavaScript objects for the namespaces."
  [requires]
  (letfn [(cljs-deps [namespaces]
            (->> namespaces
              (remove #(or ((@env/*compiler* :js-dependency-index) %)
                         (deps/find-classpath-lib %)))
              (map cljs-source-for-namespace)
              (remove (comp nil? :uri))))]
    (loop [required-files (cljs-deps requires)
           visited (set required-files)
           cljs-namespaces #{}]
      (if (seq required-files)
        (let [next-file (first required-files)
              ns-info (lana/parse-ns (:uri next-file))
              new-req (remove #(contains? visited %)
                        (cljs-deps (cond-> (deps/-requires ns-info)
                                     (= 'cljs.js (:ns ns-info))
                                     (conj "cljs.core$macros"))))]
          (recur (into (rest required-files) new-req)
                 (into visited new-req)
                 (conj cljs-namespaces ns-info)))
        (disj cljs-namespaces nil)))))

(defn- constants-filename
  "Returns the filename of the constants table."
  [opts]
  (str (path/join (util/output-directory opts)
         (string/replace (str ana/constants-ns-sym) "." path/sep))
    ".js"))

(defn- constants-javascript-file
  "Returns the constants table as a JavaScriptFile."
  [opts]
  (let [url (constants-filename opts)]
    (javascript-file nil url url [(str ana/constants-ns-sym)] ["cljs.core"] nil nil)))

#_(defn add-dependencies
  "Given one or more IJavaScript objects in dependency order, produce
  a new sequence of IJavaScript objects which includes the input list
  plus all dependencies in dependency order."
  [opts & inputs]
  (let [inputs        (set inputs)
        requires      (set (mapcat deps/-requires inputs))
        required-cljs (clojure.set/difference (cljs-dependencies opts requires) inputs)
        required-js   (js-dependencies opts
                        (into (set (mapcat deps/-requires required-cljs)) requires))
        provided      (set (mapcat deps/-provides (clojure.set/union inputs required-cljs required-js)))
        unprovided    (clojure.set/difference requires provided)]
    (when (seq unprovided)
      (ana/warning :unprovided @env/*compiler* {:unprovided (sort unprovided)}))
    (cons
      (javascript-file nil (io/resource "goog/base.js") ["goog"] nil)
      (deps/dependency-order
        (concat
          (map
            (fn [{:keys [foreign url file provides requires] :as js-map}]
              (let [url (or url (io/resource file))]
                (merge
                  (javascript-file foreign url provides requires)
                  js-map)))
            required-js)
          (when (-> @env/*compiler* :options :emit-constants)
            [(constants-javascript-file opts)])
          required-cljs
          inputs)))))

(defn- module-entries
  "Return the module entries of `compile-opts` as a set."
  [compile-opts]
  (->> compile-opts :modules vals
       (map :entries)
       (remove nil?)
       (apply concat)
       (set)))

(defn add-dependency-sources
  "Given list of IJavaScript objects, produce a new sequence of IJavaScript objects
  of all dependencies of inputs."
  ([inputs]
   (add-dependency-sources inputs
     (when env/*compiler*
       (:options @env/*compiler*))))
  ([inputs compile-opts]
   (let [inputs         (set inputs)
         requires       (set (mapcat deps/-requires inputs))
         module-entries (module-entries compile-opts)]
     (into inputs (find-cljs-dependencies (set/union requires module-entries))))))

(defn check-unprovided
  [inputs]
  (let [requires   (set (mapcat deps/-requires inputs))
        provided   (set (mapcat deps/-provides inputs))
        unprovided (clojure.set/difference requires provided)]
    (when (seq unprovided)
      (ana/warning :unprovided @env/*compiler* {:unprovided (sort unprovided)}))
    inputs))

#_(defn compile-task [^LinkedBlockingDeque deque input-set compiled opts failed]
  (loop [ns-info (.pollFirst deque)]
    (when (and ns-info (not @failed))
      (let [{:keys [requires]} ns-info
            input-set' @input-set
            {:keys [compiler-stats verbose]} opts]
        (if (every? #(not (contains? input-set' %)) requires)
          (do
            (try
              (util/measure (and compiler-stats verbose)
                (str "Compile " (:ns ns-info))
                (swap! compiled conj
                  (-compile (or (:source-file ns-info)
                                (:source-forms ns-info))
                                    ; - ns-info -> ns -> cljs file relpath -> js relpath
                    (merge opts
                      {:output-file (lcomp/rename-to-js
                                      (util/ns->relpath (:ns ns-info)))}))))
              (catch Throwable e
                (reset! failed e)))
            (when-not @failed
              (when-let [ns (:ns ns-info)]
                (swap! input-set disj ns))
              (recur (.pollFirst deque))))
          (do
            (Thread/sleep 10)
            (recur ns-info)))))))

#_(defn parallel-compile-sources [inputs compiler-stats opts]
  (let [deque     (LinkedBlockingDeque. inputs)
        input-set (atom (into #{} (comp (remove nil?) (map :ns)) inputs))
        cnt       (+ 2 (.. Runtime getRuntime availableProcessors))
        latch     (CountDownLatch. cnt)
        es        (Executors/newFixedThreadPool cnt)
        compiled  (atom [])
        failed    (atom false)]
    (dotimes [_ cnt]
      (.execute es
        (bound-fn []
          (compile-task deque input-set compiled opts failed)
          (.countDown latch))))
    (util/measure compiler-stats "Compile sources" (.await latch))
    (.shutdown es)
    (when @failed
      (throw @failed))
    @compiled))

(defn- map-async
  ([proc coll cb]
   (map-async proc coll [] cb))
  ([proc coll accum cb]
   (if (seq coll)
     (proc (first coll)
       (fn [res]
         (if (:error res)
           (cb res)
           (map-async proc (rest coll) (conj accum res) cb))))
     (cb accum))))

(defn mapcat-async
  ([proc coll cb]
   (mapcat-async proc coll [] cb))
  ([proc coll accum cb]
   (if (seq coll)
     (proc (first coll)
       (fn [res]
         (if (:error res)
           (cb res)
           (mapcat-async proc (rest coll) (conj accum res) cb))))
     (cb (mapcat identity accum)))))

(defn compile-sources
  "Takes dependency ordered list of IJavaScript compatible maps from parse-ns
  and compiles them."
  ([inputs opts cb]
   (compile-sources inputs (:compiler-stats opts) opts cb))
  ([inputs compiler-stats opts cb]
   (if (:parallel-build opts)
     nil ;(parallel-compile-sources inputs compiler-stats opts)
     (util/measure compiler-stats
       "Compile sources"
       (binding [comp/*inputs* (zipmap (map :ns inputs) inputs)]
         (map-async
           (fn [ns-info cb]
             ;; TODO: compile-file calls parse-ns unnecessarily to get ns-info
             ;; TODO: we could mark dependent namespaces for recompile here
             (util/measure (and compiler-stats (:verbose opts))
               (str "Compile " (:ns ns-info))
               (-compile (or (:source-file ns-info)
                             (:source-forms ns-info))
                 ;; - ns-info -> ns -> cljs file relpath -> js relpath
                 (merge opts {:output-file (lcomp/rename-to-js (util/ns->relpath (:ns ns-info)))})
                 cb)))
           inputs cb))))))

(defn add-goog-base
  [inputs]
  (cons (javascript-file nil (io/resource "goog/base.js") ["goog"] nil)
        inputs))

(defn add-js-sources
  "Given list of IJavaScript objects, add foreign-deps, constants-table
   IJavaScript objects to the list."
  [inputs opts]
  (let [requires    (set (mapcat deps/-requires inputs))
        required-js (js-dependencies opts requires)]
    (concat
      (map
        (fn [{:keys [foreign url file provides requires] :as js-map}]
          (let [url (or url (io/resource file))]
            (merge
              (javascript-file foreign url provides requires)
              js-map)))
        required-js)
      (when (-> @env/*compiler* :options :emit-constants)
        [(constants-javascript-file opts)])
      inputs)))

(defn add-preloads
  "Add :preloads to a given set of inputs (IJavaScript). Returns a new
  list of inputs where the preloaded namespaces and their deps come immediately after
  cljs.core or the constants table depending on the optimization setting. Any
  files needing copying or compilation will be compiled and/or copied to the
  appropiate location."
  [inputs opts cb]
  (if-not (:preloads opts)
    (cb inputs)
    (let [pred     (fn [x]
                     (if (:emit-constants opts)
                       (not= [(str ana/constants-ns-sym)] (:provides x))
                       (not= ["cljs.core"] (:provides x))))
          pre      (take-while pred inputs)
          post     (drop-while pred inputs)
          preloads (remove nil?
                     (map
                       (fn [preload]
                         (try
                           (lcomp/find-source preload)
                           (catch js/Error _
                             (util/debug-prn "WARNING: preload namespace" preload "does not exist"))))
                       (:preloads opts)))]
      (-> (add-dependency-sources preloads opts)
        deps/dependency-order
        (compile-sources opts
          (fn [sources]
            (cb (distinct-by :provides
                  (concat pre [(first post)]
                    (-> sources
                      (add-js-sources opts)
                      deps/dependency-order)
                    (next post))))))))))

(defn preamble-from-paths [paths]
  (when-let [missing (seq (remove io/resource paths))]
    (ana/warning :preamble-missing @env/*compiler* {:missing (sort missing)}))
  (let [resources (remove nil? (map io/resource paths))]
    (str (string/join "\n" (map slurp resources)) "\n")))

(defn make-preamble [{:keys [target preamble hashbang]}]
  (str (when (and (= :nodejs target) (not (false? hashbang)))
         (str "#!" (or hashbang "/usr/bin/env node") "\n"))
       (when preamble (preamble-from-paths preamble))))

;; Optimize
;; ========

(defmulti javascript-name type)

;; TODO: this can probably be improved to account for the :url path
(defmethod javascript-name js/String [s]
  (if-let [name (first (deps/-provides s))] name "cljs/user.js"))

(defmethod javascript-name JavaScriptFile [js]
  (when-let [url (deps/-url js)]
    (javascript-name url)))

(defn build-provides
  "Given a vector of provides, builds required goog.provide statements"
  [provides]
  (apply str (map #(str "goog.provide('" % "');\n") provides)))

(defmethod js-source-file JavaScriptFile [_ js]
  (if-let [url (deps/-url js)]
    (js-source-file (javascript-name url) (slurp url))
    (when-let [source (:source js)]
      (js-source-file (javascript-name source) source))))

(defn ensure-cljs-base-module
  "Ensure that compiler :modules map has :cljs-base module with defined
  :output-to. If :output-to not provided will default to :output-dir location
  and the name of the file will be \"cljs_base.js.\""
  ([modules]
   (ensure-cljs-base-module modules
     (when env/*compiler*
       (:options @env/*compiler*))))
  ([modules opts]
   (update-in modules [:cljs-base :output-to]
     (fnil identity
       (path/join
         (util/output-directory opts)
         "cljs_base.js")))))

(defn add-cljs-base-module
  ([modules]
   (add-cljs-base-module modules
     (when env/*compiler*
       (:options @env/*compiler*))))
  ([modules opts]
   (reduce
     (fn [modules module-name]
       (if-not (= module-name :cljs-base)
         (update-in modules [module-name :depends-on]
           (fnil identity #{:cljs-base}))
         modules))
     (update-in modules [:cljs-base :output-to]
       (fnil identity
         (path/join
           (util/output-directory opts)
           "cljs_base.js")))
     (keys modules))))

#_(defn sort-modules [modules-with-base]
  (letfn [(get-deps [module]
            (reduce
              (fn [ret [name {:keys [depends-on] :as module-desc}]]
                (cond-> ret
                  (contains? depends-on module) (conj name)))
              [] modules-with-base))]
    (vec (map (fn [module-name]
                [module-name (module-name modules-with-base)])
           (into [:cljs-base] (util/topo-sort :cljs-base get-deps))))))

#_(defn build-modules
  "Given a list of IJavaScript sources in dependency order and compiler options
   return a dependency sorted list of module name / description tuples. The
   module descriptions will be augmented with a :closure-module entry holding
   the Closure JSModule. Each module description will also be augmented with
   a :foreign-deps vector containing foreign IJavaScript sources in dependency
   order."
  [sources opts]
  (let [find-entry (fn [sources entry]
                     (some
                       (fn [source]
                         (let [matcher
                               (into #{}
                                 [(name entry) (name (comp/munge entry))])]
                           (when (some matcher (:provides source))
                             source)))
                       sources))
        used (atom {})
        [sources' modules]
        (reduce
          (fn [[sources ret] [name {:keys [entries output-to depends-on] :as module-desc}]]
            (assert (or (= name :cljs-base) (not (empty? entries)))
              (str "Module " name " does not define any :entries"))
            (when (:verbose opts)
              (util/debug-prn "Building module" name))
            (let [js-module (JSModule. (clojure.core/name name))
                  [sources' module-sources]
                  ;; compute inputs for a closure module
                  ;; as well as sources difference
                  (reduce
                    (fn [[sources ret] entry-sym]
                      (if-let [entry (find-entry sources entry-sym)]
                        (do
                          (swap! used assoc entry-sym name)
                          [(remove #{entry} sources) (conj ret entry)])
                        (if (contains? @used entry-sym)
                          (throw
                            (ex-info
                              (str "Already used namespace " entry-sym " "
                                   "in module " (get @used entry-sym)) {}))
                          (throw
                            (ex-info
                             (str "Could not find namespace " entry-sym) {})))))
                    [sources []] entries)
                  foreign-deps (atom [])]
              ;; add inputs to module
              (doseq [ijs module-sources]
                (when (:verbose opts)
                  (util/debug-prn "  adding entry" (:provides ijs)))
                (if-not (deps/-foreign? ijs)
                  (.add js-module
                    ^SourceFile (js-source-file (javascript-name ijs) ijs))
                  (swap! foreign-deps conj ijs)))
              ;; add module dependencies, will always work
              ;; since modules are already in dependency order
              (doseq [dep depends-on]
                (if-let [parent-module (get-in (into {} ret) [dep :closure-module])]
                  (do
                    (when (:verbose opts)
                      (util/debug-prn "  module" name "depends on" dep))
                    (.addDependency js-module ^JSModule parent-module))
                  (throw (ex-info
                           (str "Parent module " dep " does not exist") {}))))
              [sources'
               (conj ret
                 [name (assoc module-desc
                         :closure-module js-module
                         :foreign-deps @foreign-deps)])]))
          [sources []] (sort-modules (add-cljs-base-module (:modules opts) opts)))
        cljs-base-closure-module (get-in (into {} modules) [:cljs-base :closure-module])
        foreign-deps (atom [])]
    (when (:verbose opts)
      (util/debug-prn "Adding remaining namespaces to" :cljs-base))
    ;; add anything left to :cljs-base module
    (doseq [source sources']
      (when (:verbose opts)
        (util/debug-prn "  adding entry" (:provides source)))
      (if-not (deps/-foreign? source)
        (.add ^JSModule cljs-base-closure-module
          (js-source-file (javascript-name source) source))
        (swap! foreign-deps conj source)))
    (assoc-in modules [0 1 :foreign-deps] @foreign-deps)))

(defn emit-optimized-source-map
  "Given a JSON parsed Google Closure JavaScript to JavaScript source map,
   the entire list of original IJavaScript sources output a merged JavaScript
   to ClojureScript source map file with the given file name. opts should
   supply :preamble-line-count and :foreign-deps-line-count if they are
   relevant."
  [sm-json sources name opts]
  (let [closure-source-map (sm/decode-reverse sm-json)]
    (loop [sources (seq sources)
           relpaths {}
           merged (sorted-map-by
                    (sm/source-compare
                      (remove nil?
                        (map (fn [source]
                               (if-let [^URL source-url (:source-url source)]
                                 (.getPath source-url)
                                 (if-let [^URL url (:url source)]
                                   (.getPath url))))
                          sources))))]
      (if sources
        (let [source (first sources)]
          (recur
            (next sources)
            (let [{:keys [provides source-url]} source]
              (if (and provides source-url)
                (assoc relpaths
                  (.getPath ^URL source-url)
                  (util/ns->relpath (first provides) (util/ext source-url)))
                relpaths))
            (if-let [url (:url source)]
              (let [path (.getPath ^URL url)]
                (if-let [compiled (get-in @env/*compiler* [::comp/compiled-cljs path])]
                  (if-let [source-url (:source-url source)]
                    (assoc merged
                      (.getPath ^URL source-url)
                      (sm/merge-source-maps
                        (:source-map compiled)
                        (get closure-source-map path)))
                    merged)
                  (assoc merged path (get closure-source-map path))))
              merged)))
        (spit
          name
          (sm/encode merged
            {:preamble-line-count (+ (:preamble-line-count opts 0)
                                     (:foreign-deps-line-count opts 0))
             :lines (+ (:lineCount sm-json)
                       (:preamble-line-count opts 0)
                       (:foreign-deps-line-count opts 0)
                       2)
             :file name
             :output-dir (util/output-directory opts)
             :source-map (:source-map opts)
             :source-map-path (:source-map-path opts)
             :source-map-timestamp (:source-map-timestamp opts)
             :source-map-pretty-print (:source-map-pretty-print opts)
             :relpaths relpaths}))))))

#_(defn optimize-modules
  "Use the Closure Compiler to optimize one or more Closure JSModules. Returns
   a dependency sorted list of module name and description tuples."
  [opts & sources]
  ;; the following pre-condition can't be enabled
  ;; lein-cljsbuild adds :output-to?
  #_{:pre [(and (contains? opts :modules)
                (not (contains? opts :output-to)))]}
  (assert (= (count (:modules opts))
             (count (into #{}
                      (map (comp :output-to second)
                        (:modules opts)))))
    "Each :output-to of :modules must be unique")
  (let [closure-compiler (make-closure-compiler)
        ^List externs (load-externs opts)
        compiler-options (make-options opts)
        _ (.initOptions closure-compiler compiler-options)
        sources (if (= :whitespace (:optimizations opts))
                  (cons "var CLOSURE_NO_DEPS = true;" sources)
                  sources)
        modules (build-modules sources opts)
        ^List inputs (map (comp :closure-module second) modules)
        _ (doseq [^JSModule input inputs]
            (.sortInputsByDeps input closure-compiler))
        ^Result result (.compileModules closure-compiler externs inputs compiler-options)
        ^SourceMap source-map (when (:source-map opts)
                                (.getSourceMap closure-compiler))]
    (assert (or (nil? (:source-map opts)) source-map)
      "Could not create source maps for modules")
    (if (.success result)
      (vec
        (for [[name {:keys [output-to closure-module] :as module}] modules]
          [name
           (merge
             (assoc module
               :source
               (do
                 (when source-map (.reset source-map))
                 (.toSource closure-compiler ^JSModule closure-module)))
             (when source-map
               (let [sw (StringBuffer.)
                     source-map-name (str output-to ".map.closure")]
                 ;; TODO: figure out what this is doing
                 ;(.appendTo source-map sw source-map-name)
                 {:source-map-json (.toString sw)
                  :source-map-name source-map-name})))]))
      (report-failure result))))

(defn optimize-success? [result]
  (empty? (.-errors result)))

(defn optimize
  "Use the Closure Compiler to optimize one or more JavaScript files."
  [opts & sources]
  (when (or ana/*verbose* (:verbose opts))
    (util/debug-prn "Applying optimizations" (:optimizations opts) "to" (count sources) "sources"))
  (let [closure-compiler (make-closure-compiler)
        externs (load-externs opts)
        compiler-options (make-options opts)
        sources (if (= :whitespace (:optimizations opts))
                  (cons "var CLOSURE_NO_DEPS = true;" sources)
                  sources)
        inputs (doall
                 (map
                   (fn [source]
                     (let [source (cond-> source
                                    (and (not (record? source)) (map? source))
                                    map->javascript-file)]
                       (js-source-file (javascript-name source) source)))
                   sources))
        _ (gobj/extend compiler-options #js {:jsCode (into-array inputs)
                                             :externs (into-array externs)
                                             :defines (clj->js (.-defines compiler-options))})
        result (util/measure (:compiler-stats opts)
                 "Optimizing with Google Closure Compiler"
                 (closure-compiler compiler-options))]
    (if (optimize-success? result)
      ;; compiler.getSourceMap().reset()
      (let [source (.-compiledCode result)]
        (when-let [name (:source-map opts)]
          (let [name' (str name ".closure")
                ;; sw (StringWriter.)
                ;; sm-json-str (do
                ;;               (.appendTo (.getSourceMap closure-compiler) sw name')
                ;;               (.toString sw))
                ]
            #_(when (true? (:closure-source-map opts))
              (spit (io/file name') sm-json-str))
            #_(emit-optimized-source-map
              (json/read-str sm-json-str :key-fn keyword)
              sources name
              (assoc opts
                :preamble-line-count
                (+ (- (count (.split #"\r?\n" (make-preamble opts) -1)) 1)
                   (if (:output-wrapper opts) 1 0))))))
        source)
      (report-failure result))))

;; Output
;; ======
;;
;; The result of a build is always a single string of JavaScript. The
;; build process may produce files on disk but a single string is
;; always output. What this string contains depends on whether the
;; input has been optimized or not. If the :output-to option is set
;; then this string will be written to the specified file. If not, it
;; will be returned.
;;
;; The :output-dir option can be used to set the working directory
;; where any files will be written to disk. By default this directory
;; is 'out'.
;;
;; If inputs are optimized then the output string will be the complete
;; application with all dependencies included.
;;
;; For unoptimized output, the string will be a Closure deps file
;; describing where the JavaScript files are on disk and their
;; dependencies. All JavaScript files will be located in the working
;; directory, including any dependencies from the Closure library.
;;
;; Unoptimized mode is faster because the Closure Compiler is not
;; run. It also makes debugging much simpler because each file is
;; loaded in its own script tag.
;;
;; When working with uncompiled files, you will need to add additional
;; script tags to the hosting HTML file: one which pulls in Closure
;; library's base.js and one which calls goog.require to load your
;; code. See samples/hello/hello-dev.html for an example.

(defn ^String path-relative-to
  "Generate a string which is the path to the input IJavaScript relative
  to the specified base file."
  [^File base input]
  (let [base-path  (util/path-seq (path/resolve base))
        input-path (util/path-seq (path/resolve (util/path (deps/-url input))))
        count-base (count base-path)
        common     (count (take-while true? (map #(= %1 %2) base-path input-path)))
        prefix     (repeat (- count-base common 1) "..")]
    (if (= count-base common)
      (last input-path) ;; same file
      (util/to-path (concat prefix (drop common input-path)) "/"))))

(defn add-dep-string
  "Return a goog.addDependency string for an input."
  [opts input]
  (letfn [(ns-list [coll] (when (seq coll) (apply str (interpose ", " (map #(str "'" (comp/munge %) "'") coll)))))]
    (str "goog.addDependency(\""
         (path-relative-to
           (path/join (util/output-directory opts) "goog" "base.js") input)
         "\", ["
         (ns-list (deps/-provides input))
         "], ["
         ;; under Node.js runtime require is possible
         (when-not (= :nodejs (:target opts))
           (ns-list (deps/-requires input)))
         "]);\n")))

(defn deps-file
  "Return a deps file string for a sequence of inputs."
  [opts sources]
  (apply str (map #(add-dep-string opts %) sources)))

(defn output-one-file [{:keys [output-to] :as opts} js]
  (cond
    (nil? output-to) js

    (string? output-to)
    (let [f output-to]
      (util/mkdirs f)
      (spit f js))

    :else (println js)))

(defn output-deps-file [opts sources]
  (output-one-file opts (deps-file opts sources)))

(declare foreign-deps-str add-header add-source-map-link)

(defn preloads
  ([syms]
    (preloads syms nil))
  ([syms mode]
   (letfn [(preload-str [sym]
             (str (when (= :browser mode) "document.write('<script>")
                  "goog.require(\"" (comp/munge sym) "\");"
                  (if (= :browser mode) "</script>');\n" "\n")))]
     (map preload-str syms))))

(defn output-main-file [opts]
  (let [asset-path (or (:asset-path opts)
                       (util/output-directory opts))
        closure-defines (json/write-str (:closure-defines opts))]
    (case (:target opts)
      :nodejs
      (output-one-file opts
        (add-header opts
          (str "var path = require(\"path\");\n"
               "try {\n"
               "    require(\"source-map-support\").install();\n"
               "} catch(err) {\n"
               "}\n"
               "require(path.join(path.resolve(\".\"),\"" asset-path "\",\"goog\",\"bootstrap\",\"nodejs.js\"));\n"
               "require(path.join(path.resolve(\".\"),\"" asset-path "\",\"cljs_deps.js\"));\n"
               "goog.global.CLOSURE_UNCOMPILED_DEFINES = " closure-defines ";\n"
               (apply str (preloads (:preloads opts)))
               "goog.require(\"" (comp/munge (:main opts)) "\");\n"
               "goog.require(\"cljs.nodejscli\");\n")))
      (output-one-file opts
        (str "var CLOSURE_UNCOMPILED_DEFINES = " closure-defines ";\n"
             "if(typeof goog == \"undefined\") document.write('<script src=\"" asset-path "/goog/base.js\"></script>');\n"
             "document.write('<script src=\"" asset-path "/cljs_deps.js\"></script>');\n"
             "document.write('<script>if (typeof goog == \"undefined\") console.warn(\"ClojureScript could not load :main, did you forget to specify :asset-path?\");</script>');\n"
             (apply str (preloads (:preloads opts) :browser))
             "document.write('<script>goog.require(\"" (comp/munge (:main opts))"\");</script>');\n")))))

#_(defn output-modules
  "Given compiler options, original IJavaScript sources and a sequence of
   module name and module description tuples output module sources to disk.
   Modules description must define :output-to and supply :source entry with
   the JavaScript source to write to disk."
  [opts js-sources modules]
  (doseq [[name {:keys [output-to source foreign-deps] :as module-desc}] modules]
    (assert (not (nil? output-to))
      (str "Module " name " does not define :output-to"))
    (assert (not (nil? source))
      (str "Module " name " did not supply :source"))
    (let [fdeps-str (when-not (empty? foreign-deps)
                      (foreign-deps-str opts foreign-deps))
          sm-name (when (:source-map opts)
                    (str output-to ".map"))
          out-file (io/file output-to)]
      (util/mkdirs out-file)
      (spit out-file
        (as-> source source
          (if (= name :cljs-base)
            (add-header opts source)
            source)
          (if fdeps-str
            (str fdeps-str "\n" source)
            source)
          (if sm-name
            (add-source-map-link
              (assoc opts
                :output-to output-to
                :source-map sm-name)
              source)
            source)))
      (when (:source-map opts)
        (let [sm-json-str (:source-map-json module-desc)
              sm-json     (json/read-str sm-json-str :key-fn keyword)]
          (when (true? (:closure-source-map opts))
            (spit (io/file (:source-map-name module-desc)) sm-json-str))
          (emit-optimized-source-map sm-json js-sources sm-name
            (merge opts
              {:source-map sm-name
               :preamble-line-count
               (if (= name :cljs-base)
                 (+ (- (count (.split #"\r?\n" (make-preamble opts) -1)) 1)
                    (if (:output-wrapper opts) 1 0))
                 0)
               :foreign-deps-line-count
               (if fdeps-str
                 (- (count (.split #"\r?\n" fdeps-str -1)) 1)
                 0)})))))))

(defn lib-rel-path [{:keys [lib-path url provides] :as ijs}]
  (if (nil? lib-path)
    (util/ns->relpath (first provides) "js")
    (if (.endsWith lib-path ".js")
      (util/get-name url)
      (let [path (util/path url)
            lib-path (util/normalize-path lib-path)]
        (subs path (+ (inc (.lastIndexOf path lib-path)) (.-length lib-path)))))))

(defn rel-output-path
  "Given an IJavaScript which is either in memory, in a jar file,
  or is a foreign lib, return the path relative to the output
  directory."
  ([js]
   (rel-output-path js
     (when env/*compiler*
       (:options @env/*compiler*))))
  ([js opts]
   (let [url (deps/-url js opts)]
     (cond
       url
       (cond
         (deps/-closure-lib? js) (lib-rel-path js)
         (deps/-foreign? js) (or (deps/-relative-path js opts)
                                 (util/relative-name url))
         :else (path-from-jarfile url))

       (string? js)
       (str (util/content-sha js 7) ".js")

       :else (str (random-string 5) ".js")))))

(defn get-source-files [js-modules opts]
  (map (fn [lib]
         (let [file (if-let [file-min (and (#{:advanced :simple} (:optimizations opts))
                                           (:file-min lib))]
                      file-min
                      (:file lib))]
           (js-source-file file (deps/-source lib))))
    js-modules))

(defn make-convert-js-module-options [opts]
  (-> opts
    (select-keys
      [:closure-warnings :closure-extra-annotations :pretty-print
       :language-in :language-out :closure-module-roots])
    (assoc :optimizations :whitespace)
    ;; TODO non-standard jsdoc
))

(defn get-closure-sources
  "Gets map of source file name -> Node, for files in Closure Compiler js root."
  [result js-modules opts]
  (let [index (into {}
                (map (fn [{:keys [file file-min] :as ijs}]
                       (let [processed-file (if-let [min (and (#{:advanced :simple} (:optimizations opts))
                                                           file-min)]
                                              min
                                              file)]
                         [(util/path->module-identifier processed-file) processed-file])))
                js-modules)
        source-nodes (-> result
                       .-compiledCode
                       (.split #"(?=goog\.provide\(\")"))]
    (into {}
      (map (fn [code]
             (let [provided (-> [code]
                              deps/parse-js-ns
                              :provides
                              first
                              (string/replace "-" "_"))]
                [(get index provided) code]))
        source-nodes))))

(defn add-converted-source
  [result-nodes opts {:keys [file-min file] :as ijs}]
  (let [processed-file (if-let [min (and (#{:advanced :simple} (:optimizations opts))
                                      file-min)]
                         min
                         file)]
    (assoc ijs :source (get result-nodes processed-file))))

(defn convert-js-modules
  "Takes a list JavaScript modules as an IJavaScript and rewrites them into a Google
  Closure-compatible form. Returns list IJavaScript with the converted module
  code set as source."
  [js-modules opts]
  (let [source-files (get-source-files js-modules opts)
        options (-> (make-convert-js-module-options opts)
                  (assoc
                    :processCommonJsModules true

                    (cljs-option->closure-option :language-in)
                    (lang-key->lang-mode :ecmascript6)

                    (cljs-option->closure-option :language-out)
                    (lang-key->lang-mode (:language-out opts :ecmascript3)))
                  make-options)
        ;; _ (when (= (:target opts) :nodejs)
        ;;     (.setPackageJsonEntryNames options ^List '("module", "main")))
        closure-compiler (make-closure-compiler)
        _ (gobj/extend options #js {:jsCode (into-array source-files)
                                    :externs #js []})
        result (closure-compiler options)]
    (report-failure result)
    (map (partial add-converted-source (get-closure-sources result js-modules opts) opts)
      js-modules)))

(defmulti js-transforms
  "Takes an IJavaScript with the source code set as source, transforms the
  source code and returns an IJavascript with the new code set as source."
  (fn [ijs opts]
    (:preprocess ijs)))

(defmethod js-transforms :default [ijs opts]
  (ana/warning :unsupported-preprocess-value @env/*compiler* ijs)
  ijs)

(defn write-javascript
  "Write or copy a JavaScript file to output directory. Only write if the file
   does not already exist. Return IJavaScript for the file on disk at the new
   location."
  [opts js]
  (let [out-dir    (util/output-directory opts)
        out-name   (rel-output-path js opts)
        out-file   (path/join out-dir out-name)
        res        (or (:url js) (:source-file js))
        js-module? (and res out-dir
                     (.startsWith (util/path res) (util/path out-dir))) ;; We already Closure processed it and wrote it out
        ijs        (merge
                     {:requires (deps/-requires js)
                      :provides (deps/-provides js)
                      :group (:group js)}
                     (when (not js-module?)
                       {:url (path/resolve out-file)
                        :out-file (.toString out-file)}))]
    (when (and (not js-module?)
            (or (not (fs/existsSync out-file))
              (and res (util/changed? out-file res))))
      (when (and res (or ana/*verbose* (:verbose opts)))
        (util/debug-prn "Copying" (util/path res) "to" (str out-file)))
      (util/mkdirs out-file)
      (spit out-file (deps/-source js))
      (when res
        (util/set-last-modified out-file (util/last-modified res))))
    (if (map? js)
      (merge js ijs)
      ijs)))

(defn write-js?
  "Returns true if IJavaScript instance needs to be written/copied to output
  directory. True when in memory, in a JAR, or if foreign library."
  [js]
  (let [url (deps/-url js)]
    (or (not url)
        (= (.-type url) "jar")
        (= (.-type url) "bundled")
        (deps/-closure-lib? js)
        (deps/-foreign? js))))

(defn source-on-disk
  "Ensure that the given IJavaScript exists on disk in the output directory.
   Return updated IJavaScript with the new location if necessary."
  [opts js]
  (if (write-js? js)
    (write-javascript opts js)
    ;; always copy original ClojureScript sources to the output directory
    ;; when source maps enabled
    (let [out-file (when-let [ns (and (:source-map opts)
                                      (:source-url js)
                                      (first (:provides js)))]
                     (path/join (util/output-directory opts)
                       (util/ns->relpath ns (util/ext (:source-url js)))))
          source-url (:source-url js)]
      (when (and out-file source-url
                 (or (not (fs/existsSync out-file))
                     (util/changed? source-url out-file)))
        (when (or ana/*verbose* (:verbose opts))
          (util/debug-prn "Copying" (str source-url) "to" (str out-file)))
        (spit out-file (slurp source-url))
        (util/set-last-modified out-file (util/last-modified source-url)))
      js)))

(defn output-unoptimized
  "Ensure that all JavaScript source files are on disk (not in jars),
   write the goog deps file including only the libraries that are being
   used and write the deps file for the current project.
   The deps file for the current project will include third-party
   libraries."
  [opts & sources]
  (let [disk-sources (remove #(= (:group %) :goog)
                       (map #(source-on-disk opts %) sources))
        goog-deps    (path/join (util/output-directory opts)
                       "goog" "deps.js")
        main         (:main opts)]
    (util/mkdirs goog-deps)
    (spit goog-deps (slurp (io/resource "goog/deps.js")))
    (if main
      (do
        (output-deps-file
          (assoc opts :output-to
            (path/join (util/output-directory opts) "cljs_deps.js"))
          disk-sources)
        (output-main-file opts))
      (output-deps-file opts disk-sources))))

(defn get-upstream-deps*
  "returns a merged map containing all upstream dependencies defined
  by libraries on the classpath."
  []
  (let [upstream-deps (map reader/read-string
                        (js/$$LUMO_GLOBALS.loadUpstreamJsLibs))]
    (apply merge-with concat upstream-deps)))

(def get-upstream-deps (memoize get-upstream-deps*))

(defn add-header [opts js]
  (str (make-preamble opts) js))

(defn foreign-deps-str [opts sources]
  (letfn [(to-js-str [ijs]
            (if-let [url (or (and (#{:advanced :simple} (:optimizations opts))
                                  (:url-min ijs))
                             (:url ijs))]
              (slurp url)
              (throw (ex-info
                       (str "Foreign lib " ijs " does not exist") {}))))]
    (str (string/join "\n" (map to-js-str sources)) "\n")))

(defn add-wrapper [{:keys [output-wrapper] :as opts} js]
  (if output-wrapper
   (str ";(function(){\n" js "\n})();\n")
   js))

(defn add-source-map-link [{:keys [source-map output-to] :as opts} js]
  (if source-map
      (if (= output-to :print)
        (str js "\n//# sourceMappingURL=" source-map)
        (str js "\n//# sourceMappingURL=" (path-relative-to output-to {:url source-map})))
    js))

(defn absolute-path? [path]
  (path/isAbsolute path))

(defn absolute-parent [path]
  (path/resolve path ".."))

(defn in-same-dir? [path-1 path-2]
  "Checks that path-1 and path-2 are siblings in the same logical directory."
  (= (absolute-parent path-1)
     (absolute-parent path-2)))

(defn same-or-subdirectory-of? [dir path]
  "Checks that path names a file or directory that is the dir or a subdirectory there of."
  (let [dir-path  (path/resolve dir)
        path-path (path/resolve path)]
    (.startsWith path-path dir-path)))

(defn check-output-to [{:keys [output-to] :as opts}]
  (when (contains? opts :output-to)
    (assert (or (string? output-to)
                (= :print output-to))
            (format ":output-to %s must specify a file or be :print"
                    (pr-str output-to))))
  true)

(defn check-output-dir [{:keys [output-dir] :as opts}]
  (when (contains? opts :output-dir)
    (assert (string? output-dir)
            (format ":output-dir %s must specify a directory"
                    (pr-str output-dir))))
  true)

(defn check-source-map [{:keys [output-to source-map output-dir optimizations] :as opts}]
  "When :source-map is specified in opts, "
  (when (and (contains? opts :source-map)
             (:source-map opts)
             (not (= optimizations :none)))
    (assert (and (or (contains? opts :output-to)
                     (contains? opts :modules))
                 (contains? opts :output-dir))
      (str ":source-map cannot be specified without also specifying :output-dir "
           "and either :output-to or :modules if optimization setting applied"))
    (assert (or (nil? (:output-to opts)) (:modules opts) (string? source-map))
      (format (str ":source-map %s must specify a file in the same directory "
                   "as :output-to %s if optimization setting applied")
        (pr-str source-map)
        (pr-str output-to)))
    (assert (or (nil? (:output-to opts)) (:modules opts) (in-same-dir? source-map output-to))
      (format (str ":source-map %s must specify a file in the same directory as "
                   ":output-to %s if optimization setting applied")
        (pr-str source-map)
        (pr-str output-to)))
    (assert (or (nil? (:output-to opts)) (:modules opts) (same-or-subdirectory-of? (absolute-parent output-to) output-dir))
      (format (str ":output-dir %s must specify a directory in :output-to's "
                   "parent %s if optimization setting applied")
        (pr-str output-dir)
        (pr-str (absolute-parent output-to)))))
  (when (and (contains? opts :source-map)
             (= optimizations :none))
    (assert (boolean? source-map)
            (format ":source-map must be true or false when compiling with :optimizations :none but it is: %s"
                    (pr-str source-map))))
  true)

(defn check-source-map-path [{:keys [source-map-path] :as opts}]
  (when (contains? opts :source-map-path)
    (assert (string? source-map-path)
            (format ":source-map-path %s must be a directory"
                    source-map-path))
    (when-not (= (:optimizations opts) :none)
      (assert (and (contains? opts :output-to)
                   (contains? opts :source-map))
        (str ":source-map-path cannot be specified without also specifying "
             ":output-to and :source-map if optimization setting applied"))))
  true)

(defn check-output-wrapper [{:keys [output-wrapper optimizations]}]
  (assert (not (and output-wrapper (= :whitespace optimizations)))
          ":output-wrapper cannot be combined with :optimizations :whitespace"))

(defn check-node-target [{:keys [target optimizations] :as opts}]
  (assert (not (and (= target :nodejs) (= optimizations :whitespace)))
    (format ":nodejs target not compatible with :whitespace optimizations")))

(defn check-preloads [{:keys [preloads optimizations] :as opts}]
  (when (and (some? preloads) (not= optimizations :none))
    (do ;binding [*out* *err*]
      (println "WARNING: :preloads should only be specified with :none optimizations"))))

(defn check-cache-analysis-format [{:keys [cache-analysis cache-analysis-format] :as opts}]
  (assert (not (and cache-analysis
                    ((complement #{:edn :transit}) cache-analysis-format)
                    (not (nil? cache-analysis-format))))
    (format ":cache-analysis format must be :edn or :transit but it is: %s"
      (pr-str cache-analysis-format))))

(defn check-npm-deps [{:keys [npm-deps]}]
  (let [{ups-npm-deps :npm-deps} (get-upstream-deps)
        conflicts (filter (fn [[dep v]]
                            (and (coll? v) (not (contains? npm-deps dep))))
                    ups-npm-deps)]
    (binding [*print-fn* *print-err-fn*]
      (doseq [[dep versions] conflicts]
        (println (str "WARNING: NPM dependency " (name dep)
                   " conflicts between versions "
                   (util/conjunction-str versions)
                   ". Specify a version in :npm-deps or the latest will be installed."))))))

(defn foreign-source? [js]
  (and (satisfies? deps/IJavaScript js)
    (deps/-foreign? js)))

(defn expand-libs
  "EXPERIMENTAL. Given a set of libs expand any entries which only name
   directories into a sequence of lib entries for all JS files recursively
   found in that directory. All other options will be shared with the original
   entry. The computed :provides assumes the specified directory is on the
   classpath."
  [libs]
  (letfn [(prep-path [p root]
            (subs (string/replace (subs p 0 (- (count p) 3)) root "") 1))
          (path->provides [p]
            (let [p' (string/replace p path/sep ".")]
              (cond-> [p']
                (string/includes? p' "_")
                (conj (string/replace p' "_" "-")))))
          (expand-lib* [{:keys [file] :as lib}]
            (if-not file
              [lib] ;; foreign-lib override case - David
              (let [root (path/resolve file)
                    dir file]
                (if (util/directory? dir)
                  (into []
                    (comp
                      (filter #(.endsWith % ".js"))
                      ;hidden?(filter #(not (.startsWith % ".")))
                      (map
                        (fn [f]
                          (let [p f
                                ap (path/resolve f)]
                            (merge lib
                              {:file p :provides (path->provides (prep-path ap root))})))))
                    (file-seq dir))
                  [lib]))))]
    (into [] (mapcat expand-lib* libs))))

(defn compute-upstream-npm-deps
  ([]
   (compute-upstream-npm-deps
     (when env/*compiler*
       (:options @env/*compiler*))))
  ([{:keys [npm-deps]}]
   (let [{ups-npm-deps :npm-deps} (get-upstream-deps)]
     (reduce
       (fn [m [dep v]]
         (cond-> m
           (not (contains? npm-deps dep))
           (assoc dep (if (coll? v)
                        (last (sort v))
                        v))))
       {} ups-npm-deps))))

(defn maybe-install-node-deps!
  [{:keys [npm-deps verbose] :as opts}]
  (let [npm-deps (merge npm-deps (compute-upstream-npm-deps opts))]
    (if-not (empty? npm-deps)
      (let [pkg-json "package.json"]
        (when (or ana/*verbose* verbose)
          (util/debug-prn "Installing Node.js dependencies"))
        (when-not (fs/existsSync pkg-json)
          (spit pkg-json "{}"))
        (let [proc (try
                     (->> (into (cond->> ["npm" "install" "@cljs-oss/module-deps"]
                                  util/windows? (into ["cmd" "/c"]))
                            (map (fn [[dep version]] (str (name dep) "@" version)))
                            npm-deps)
                       (string/join " ")
                       child_process/execSync)
                     (catch js/Error _))]
          (when-not (nil? proc)
            (util/debug-prn (.toString proc "utf8")))
          opts))
      opts)))

(defn node-module-deps
  "EXPERIMENTAL: return the foreign libs entries as computed by running
   the module-deps package on the supplied JavaScript entry point. Assumes
   that the `@cljs-oss/module-deps` NPM package is either locally or globally
   installed."
  ([entry]
   (node-module-deps entry
     (when env/*compiler*
       (:options @env/*compiler*))))
  ([{:keys [file]} {:keys [target] :as opts}]
   (let [code (-> (slurp (io/resource "cljs/module_deps.js"))
                (string/replace "JS_FILE" (string/replace file "\\" "\\\\"))
                (string/replace "CLJS_TARGET" (str "" (when target (name target)))))
         proc (child_process/spawnSync "node" #js ["--eval" code])]
     (if (zero? (.-status proc))
       (into []
         (map (fn [{:strs [file provides]}] file
                (merge
                  {:file file
                   :module-type :es6}
                  (when provides
                    {:provides provides}))))
         (next (json/read-str (.toString (.-stdout proc) "utf8"))))
       (do
         (util/debug-prn (.toString (.-stderr proc) "utf8"))
         [])))))

(defn node-inputs
  "EXPERIMENTAL: return the foreign libs entries as computed by running
   the module-deps package on the supplied JavaScript entry points. Assumes
   that the `@cljs-oss/module-deps` NPM package is either locally or globally
   installed."
  ([entries]
   (node-inputs entries
     (when env/*compiler*
       (:options @env/*compiler*))))
  ([entries opts]
   (into [] (distinct (mapcat #(node-module-deps % opts) entries)))))

(defn index-node-modules
  ([modules]
   (index-node-modules
     modules
     (when env/*compiler*
       (:options @env/*compiler*))))
  ([modules opts]
   (let [node-modules "node_modules"]
     (if (and (not (empty? modules)) (fs/existsSync node-modules) (util/directory? node-modules))
       (let [modules (into #{} (map name) modules)
             deps-file (path/join (util/output-directory opts) "cljs$node_modules.js")]
         (util/mkdirs deps-file)
         (spit deps-file
           (string/join "\n" (map #(str "require('" % "');\n") modules)))
         (node-inputs [{:file (path/resolve deps-file)}] opts))
       []))))

(defn ensure-module-opts [opts]
  (update opts :modules
    #(ensure-cljs-base-module % opts)))

(defn shim-process?
  [{:keys [target process-shim] :as opts}]
  (if (= :nodejs target)
    (true? process-shim)
    (not (false? process-shim))))

(defn add-implicit-options
  [{:keys [optimizations output-dir]
    :or {optimizations :none
         output-dir "out"}
    :as opts}]
  (let [opts (cond-> opts
               (shim-process? opts)
               (-> (update-in [:preloads] (fnil conj []) 'process.env)
                 (cond->
                   (not= :none optimizations)
                   (update-in [:closure-defines 'process.env/NODE_ENV] (fnil str "production"))))

               (or (:closure-defines opts) (shim-process? opts))
               (update :closure-defines
                 (fn [defines]
                   (into {}
                     (map (fn [[k v]]
                            [(if (symbol? k) (str (comp/munge k)) k) v])
                       defines))))
               (:browser-repl opts)
               (update-in [:preloads] (fnil conj []) 'clojure.browser.repl.preload))
        {:keys [libs foreign-libs externs]} (get-upstream-deps)
        emit-constants (or (and (= optimizations :advanced)
                                (not (false? (:optimize-constants opts))))
                           (:optimize-constants opts))]
    (cond->
      (-> opts
        (assoc
          :optimizations optimizations
          :output-dir output-dir
          :ups-libs libs
          :ups-foreign-libs (expand-libs foreign-libs)
          :ups-externs externs
          :emit-constants emit-constants
          :cache-analysis-format (:cache-analysis-format opts :transit))
        (update-in [:preamble] #(into (or % []) ["cljs/imul.js"])))

      (:target opts)
      (assoc-in [:closure-defines (str (comp/munge 'cljs.core/*target*))]
        (name (:target opts)))

      (= optimizations :none)
      (assoc
        :cache-analysis (:cache-analysis opts true)
        :source-map (:source-map opts true))

      (= optimizations :advanced)
      (cond->
        (not (false? (:static-fns opts))) (assoc :static-fns true)
        (not (false? (:optimize-constants opts))) (assoc :optimize-constants true))

      (nil? (find (:closure-warnings opts) :check-types))
      (assoc-in [:closure-warnings :check-types] :off)

      (nil? (find (:closure-warnings opts) :check-variables))
      (assoc-in [:closure-warnings :check-variables] :off)

      (nil? (:closure-module-roots opts))
      (assoc :closure-module-roots [])

      (contains? opts :modules)
      (ensure-module-opts))))

(defn preprocess-js
  "Given js-module map, apply preprocessing defined by :preprocess value in the map."
  [{:keys [preprocess] :as js-module} opts]
  (cond
    (keyword? preprocess)
    (js-transforms js-module opts)

    (symbol? preprocess)
    (let [ns (namespace preprocess)
          _ (when (nil? ns)
              (throw
                (ex-info (str "Preprocess symbol " preprocess " is not fully qualified")
                  {:file (:file js-module)
                   :preprocess preprocess})))
          preprocess-ns (symbol ns)]
      ;; (when (not (find-ns preprocess-ns))
      ;;   (try
      ;;     (locking ana/load-mutex
      ;;       (require preprocess-ns))
      ;;     (catch Throwable t
      ;;       (throw (ex-info (str "Cannot require namespace referred by :preprocess value " preprocess)
      ;;                       {:file (:file js-module)
      ;;                        :preprocess preprocess}
      ;;                       t)))))

      ;; (try
      ;;   ((find-var preprocess) js-module opts)
      ;;   (catch Throwable t
      ;;     (throw (ex-info (str "Error running preprocessing function " preprocess)
      ;;                     {:file (:file js-module)
      ;;                      :preprocess preprocess}
      ;;                     t))))
      )

    :else
    (do
      (ana/warning :unsupported-preprocess-value @env/*compiler* js-module)
      js-module)))

(defn- to-absolute-path [file-str]
  (path/resolve file-str))

(defn process-js-modules
  "Given the current compiler options, converts JavaScript modules to Google
  Closure modules and writes them to disk. Adds mapping from original module
  namespace to new module namespace to compiler env. Returns modified compiler
  options where new modules are passed with :libs option."
  [opts]
  (let [ ;; Modules from both :foreign-libs (compiler options) and :ups-foreign-libs (deps.cljs)
        ;; are processed together, so that files from both sources can depend on each other.
        ;; e.g. commonjs module in :foreign-libs can depend on commonjs module from :ups-foreign-libs.
        js-modules (filter :module-type (concat (:foreign-libs opts) (:ups-foreign-libs opts)))]
    (if (seq js-modules)
      (util/measure (:compiler-stats opts)
        "Process JS modules"
        (let [_ (when-let [unsupported (first (filter (complement #{:es6 :commonjs :amd})
                                                (map :module-type js-modules)))]
                  (ana/warning :unsupported-js-module-type @env/*compiler* unsupported))
              ;; Load all modules - add :source so preprocessing and conversion can access it
              js-modules (into []
                           (comp
                             (map (fn [lib]
                                    (let [js (deps/load-foreign-library lib)]
                                      (assoc js :source (deps/-source js opts)))))
                             (map (fn [js]
                                    (if (:preprocess js)
                                      (preprocess-js js opts)
                                      js)))
                             (map (fn [js]
                                    (cond-> (update-in js [:file] to-absolute-path)
                                      (some? (:file-min js))
                                      (update-in [:file-min] to-absolute-path)))))
                           js-modules)
              js-modules (convert-js-modules js-modules opts)]
          ;; Write modules to disk, update compiler state and build new options
          (reduce (fn [new-opts {:keys [file module-type] :as ijs}]
                    (let [ijs (write-javascript opts ijs)
                          module-name (-> (deps/load-library (:out-file ijs)) first :provides first)]
                      (doseq [provide (:provides ijs)]
                        (swap! env/*compiler*
                          #(update-in % [:js-module-index] assoc provide {:name module-name
                                                                          :module-type module-type})))
                      (-> new-opts
                        (update-in [:libs] (comp vec conj) (:out-file ijs))
                        ;; js-module might be defined in either, so update both
                        (update-in [:foreign-libs]
                          (fn [libs]
                            (into []
                              (remove #(= (to-absolute-path (:file %)) file))
                              libs)))
                        (update-in [:ups-foreign-libs]
                          (fn [libs]
                            (into []
                              (remove #(= (to-absolute-path (:file %)) (to-absolute-path file)))
                              libs))))))
            opts js-modules)))
      opts)))

(defn add-externs-sources [opts]
  (cond-> opts
    (:infer-externs opts)
    (assoc :externs-sources (load-externs (dissoc opts :infer-externs)))))

(defn handle-js-modules
  "Given all Cljs sources (build inputs and dependencies in classpath)

  - index all the node node modules
  - process the JS modules (preprocess + convert to Closure JS)
  - save js-dependency-index for compilation"
  [{:keys [npm-deps target] :as opts} js-sources compiler-env]
  (let [requires (set (mapcat deps/-requires js-sources))
        ;; Select Node files that are required by Cljs code,
        ;; and create list of all their dependencies
        node-required (into []
                        (filter ana/node-module-dep?)
                        requires)
        expanded-libs (expand-libs (:foreign-libs opts))
        opts (-> opts
                 (update :foreign-libs
                   (fn [libs]
                     (into (if (= target :nodejs)
                             []
                             (index-node-modules node-required))
                       (into expanded-libs
                         (node-inputs (filter (fn [{:keys [module-type]}]
                                                (and (some? module-type)
                                                  (not= module-type :amd)))
                                        expanded-libs))))))
                 process-js-modules)]
    (swap! compiler-env (fn [cenv]
                          (-> cenv
                            ;; we need to also track the whole top level - this is to support
                            ;; cljs.analyze/analyze-deps, particularly in REPL contexts - David
                            (merge {:js-dependency-index (deps/js-dependency-index opts)})
                            ;; (update-in [:node-module-index] (fnil into #{})
                            ;;   (if (= target :nodejs)
                            ;;     (map str node-required)
                            ;;     (map str (keys top-level))))
                            )))
    opts))

(defn identity-async [a b cb]
  (cb nil))

(defn build
  "Given a source which can be compiled, produce runnable JavaScript."
  ([source opts]
   (build source opts
      (if-not (nil? env/*compiler*)
        env/*compiler*
        (env/default-compiler-env
          ;; need to dissoc :foreign-libs since we won't know what overriding
          ;; foreign libspecs are referring to until after add-implicit-options
          ;; - David
          (add-externs-sources (dissoc opts :foreign-libs))))))
  ([source opts compiler-env]
   (build source opts compiler-env (fn [& args] args)))
  ([source opts compiler-env cb]
   (env/with-compiler-env compiler-env
     ;; we want to warn about NPM dep conflicts before installing the modules
     (when (:install-deps opts)
       (check-npm-deps opts)
       (maybe-install-node-deps! opts))
     (let [runtime-loaded @cljs/*loaded*
           compiler-stats (:compiler-stats opts)
           checked-arrays (or (:checked-arrays opts)
                            ana/*checked-arrays*)
           static-fns? (or (and (= (:optimizations opts) :advanced)
                             (not (false? (:static-fns opts))))
                         (:static-fns opts)
                         ana/*cljs-static-fns*)
           sources (-find-sources source opts)
           all-opts (add-implicit-options opts)]
       (reset! cljs/*loaded* #{})
       (check-output-to opts)
       (check-output-dir opts)
       (check-source-map opts)
       (check-source-map-path opts)
       (check-output-wrapper opts)
       (check-node-target opts)
       (check-preloads all-opts)
       (check-cache-analysis-format opts)
       (swap! compiler-env
         #(-> %
            (update-in [:options] merge all-opts)
            (assoc :target (:target opts))
            ;; Save the current js-dependency index once we have computed all-opts
            ;; or the analyzer won't be able to find upstream dependencies - Antonio
            (assoc :js-dependency-index (deps/js-dependency-index all-opts))
            ;; Save list of sources for cljs.analyzer/locate-src - Juho Teperi
            (assoc :sources sources)))
       (binding [comp/*recompiled* (when-not (false? (:recompile-dependents opts))
                                     (atom #{}))
                 ana/*checked-arrays* checked-arrays
                 ana/*cljs-static-fns* static-fns?
                 ana/*fn-invoke-direct* (or (and static-fns?
                                              (:fn-invoke-direct opts))
                                          ana/*fn-invoke-direct*)
                 *assert* (not= (:elide-asserts opts) true)
                 ana/*load-tests* (not= (:load-tests opts) false)
                 ana/*cljs-warnings*
                 (let [warnings (opts :warnings true)]
                   (merge
                     ana/*cljs-warnings*
                     (if (or (true? warnings)
                           (false? warnings))
                       (zipmap
                         [:unprovided :undeclared-var
                          :undeclared-ns :undeclared-ns-form]
                         (repeat warnings))
                       warnings)))
                 ana/*verbose* (:verbose opts)]
         (let [one-file? (and (:main all-opts)
                           (#{:advanced :simple :whitespace} (:optimizations all-opts)))
               source (if one-file?
                        (let [main (:main all-opts)
                              uri  (:uri (cljs-source-for-namespace main))]
                          (assert uri (str "No file for namespace " main " exists"))
                          uri)
                        source)
               compile-opts (if one-file?
                              (assoc all-opts :output-file (:output-to all-opts))
                              all-opts)
               _ (repl/load-data-readers! compiler-env)
               ;; reset :js-module-index so that ana/parse-ns called by -find-sources
               ;; can find the missing JS modules
               js-sources (env/with-compiler-env (dissoc @compiler-env :js-module-index)
                            (-> (-find-sources source all-opts)
                                (add-dependency-sources compile-opts)))
               all-opts (handle-js-modules all-opts js-sources compiler-env)]
           (-> js-sources
             deps/dependency-order
             (compile-sources compiler-stats compile-opts
               (fn [sources]
                 (if-let [error (:error sources)]
                   (do
                     (util/debug-prn "\nFailed!"
                       (str (.-message error)
                         (when-let [c (.-cause error)]
                           (str ": " (.-stack c)))))
                     (reset! cljs/*loaded* runtime-loaded)
                     (cb sources))
                   (let [node? (= :nodejs (:target all-opts))
                         js-sources (-> (map add-core-macros-if-cljs-js sources)
                                      (add-js-sources all-opts)
                                      (as-> sources
                                          ((if node? -compile identity-async)
                                           (io/resource "cljs/nodejs.cljs") all-opts
                                           (fn [res]
                                             (let [js-sources (cond-> sources
                                                                node? (concat [res]))]
                                               (-> js-sources
                                                 deps/dependency-order
                                                 (add-preloads all-opts
                                                   (fn [sources]
                                                     (-> sources
                                                       add-goog-base
                                                       (as-> sources
                                                           ((if node? -compile identity-async)
                                                            (io/resource "cljs/nodejscli.cljs") all-opts
                                                            (fn [res]
                                                              (let [js-sources (cond-> sources
                                                                                 node?
                                                                                 (concat [res]))
                                                                    js-sources (-> js-sources
                                                                                 (->> (map #(source-on-disk all-opts %)) doall)
                                                                                 #_(compile-loader all-opts))
                                                                    _ (when (:emit-constants all-opts)
                                                                        (lcomp/emit-constants-table-to-file
                                                                          (::ana/constant-table @env/*compiler*)
                                                                          (constants-filename all-opts)))
                                                                    ;; TODO: enable this
                                                                    ;; _ (when (:infer-externs all-opts)
                                                                    ;;     (comp/emit-inferred-externs-to-file
                                                                    ;;       (reduce util/map-merge {}
                                                                    ;;         (map (comp :externs second)
                                                                    ;;           (get @compiler-env ::ana/namespaces)))
                                                                    ;;       (str (util/output-directory all-opts) "/inferred_externs.js")))
                                                                    optim (:optimizations all-opts)
                                                                    ret (if (and optim (not= optim :none))
                                                                          (do
                                                                            (when-let [fname (:source-map all-opts)]
                                                                              (assert (or (nil? (:output-to all-opts)) (:modules opts) (string? fname))
                                                                                (str ":source-map must name a file when using :whitespace, "
                                                                                  ":simple, or :advanced optimizations with :output-to"))
                                                                              (doall (map #(source-on-disk all-opts %) js-sources)))
                                                                            (if (:modules all-opts)
                                                                              (do nil
                                                                                  #_(->>
                                                                                      (apply optimize-modules all-opts js-sources)
                                                                                      (output-modules all-opts js-sources)))
                                                                              (let [fdeps-str (foreign-deps-str all-opts
                                                                                                (filter foreign-source? js-sources))
                                                                                    all-opts  (assoc all-opts
                                                                                                :foreign-deps-line-count
                                                                                                (- (count (.split fdeps-str #"\r?\n")) 1))]
                                                                                (->>
                                                                                  (util/measure compiler-stats
                                                                                    (str "Optimizing " (count js-sources) " sources")
                                                                                    (apply optimize all-opts
                                                                                      (remove foreign-source? js-sources)))
                                                                                  (add-wrapper all-opts)
                                                                                  (add-source-map-link all-opts)
                                                                                  (str fdeps-str)
                                                                                  (add-header all-opts)
                                                                                  (output-one-file all-opts)))))
                                                                          (apply output-unoptimized all-opts js-sources))]
                                                                ;; emit Node.js bootstrap script for :none & :whitespace optimizations
                                                                (when (and (= (:target opts) :nodejs)
                                                                        (not= (:optimizations opts) :whitespace))
                                                                  (let [outfile (path/join (util/output-directory opts)
                                                                                  "goog" "bootstrap" "nodejs.js")]
                                                                    (util/mkdirs outfile)
                                                                    (spit outfile (slurp (io/resource "cljs/bootstrap_node.js")))))
                                                                (reset! cljs/*loaded* runtime-loaded)
                                                                ret)))))))))))))])))))))))))

(defn target-file-for-cljs-ns
  [ns-sym output-dir]
  (util/to-target-file
    (util/output-directory {:output-dir output-dir})
    {:ns ns-sym}))

#_(defn mark-cljs-ns-for-recompile!
  [ns-sym output-dir]
  (let [s (target-file-for-cljs-ns ns-sym output-dir)]
    (when (.exists s)
      (.setLastModified s 5000))))

(defn cljs-dependents-for-macro-namespaces
  [state namespaces]
  (map :name
    (let [namespaces-set (set namespaces)]
      (filter (fn [x] (not-empty
                        (set/intersection namespaces-set (-> x :require-macros vals set))))
        (vals (:cljs.analyzer/namespaces @state))))))

#_(defn watch
  "Given a source directory, produce runnable JavaScript. Watch the source
   directory for changes rebuilding when necessary. Takes the same arguments as
   cljs.closure/build in addition to some watch-specific options:
    - :watch-fn, a function of no arguments to run after a successful build.
    - :watch-error-fn, a function receiving the exception of a failed build."
  ([source opts]
    (watch source opts
      (if-not (nil? env/*compiler*)
        env/*compiler*
        (env/default-compiler-env opts))))
  ([source opts compiler-env]
    (watch source opts compiler-env nil))
  ([source opts compiler-env quit]
    (let [opts  (cond-> opts
                  (= (:verbose opts :not-found) :not-found)
                  (assoc :verbose true))
          paths (map #(Paths/get (.toURI %)) (-paths source))
          path  (first paths)
          fs    (.getFileSystem path)
          srvc  (.newWatchService fs)]
      (letfn [(buildf []
                (try
                  (let [start (System/nanoTime)]
                    (build source opts compiler-env)
                    (println "... done. Elapsed"
                      (/ (unchecked-subtract (System/nanoTime) start) 1e9) "seconds")
                    (flush))
                  (when-let [f (:watch-fn opts)]
                    (f))
                  (catch Throwable e
                    (if-let [f (:watch-error-fn opts)]
                      (f e)
                      (binding [*out* *err*]
                        (println (Throwables/getStackTraceAsString e)))))))
              (watch-all [^Path root]
                (Files/walkFileTree root
                  (reify
                    FileVisitor
                    (preVisitDirectory [_ dir _]
                      (let [^Path dir dir]
                        (. dir
                          (register srvc
                            (into-array [StandardWatchEventKinds/ENTRY_CREATE
                                         StandardWatchEventKinds/ENTRY_DELETE
                                         StandardWatchEventKinds/ENTRY_MODIFY])
                            (into-array [SensitivityWatchEventModifier/HIGH]))))
                      FileVisitResult/CONTINUE)
                    (postVisitDirectory [_ dir exc]
                      FileVisitResult/CONTINUE)
                    (visitFile [_ file attrs]
                      FileVisitResult/CONTINUE)
                    (visitFileFailed [_ file exc]
                      FileVisitResult/CONTINUE))))]
        (println "Building ...")
        (flush)
        (buildf)
        (println "Watching paths:" (apply str (interpose ", " paths)))
        (doseq [path paths]
          (watch-all path))
        (loop [key nil]
          (when (and (or (nil? quit) (not @quit))
                     (or (nil? key) (. ^WatchKey key reset)))
            (let [key (. srvc (poll 300 TimeUnit/MILLISECONDS))
                  poll-events-seq (when key (seq (.pollEvents key)))]
              (when (and key
                         (some
                           (fn [^WatchEvent e]
                             (let [fstr (.. e context toString)]
                               (and (or (. fstr (endsWith "cljc"))
                                        (. fstr (endsWith "cljs"))
                                        (. fstr (endsWith "clj"))
                                        (. fstr (endsWith "js")))
                                    (not (. fstr (startsWith ".#"))))))
                           poll-events-seq))
                (when-let [clj-files (seq (keep (fn [^WatchEvent e]
                                                  (let [ctx (.context e)
                                                        fstr (.toString ctx)]
                                                    (when (and (or (. fstr (endsWith "cljc"))
                                                                   (. fstr (endsWith "clj")))
                                                               (not (. fstr (startsWith ".#"))))
                                                      ctx)))
                                            poll-events-seq))]
                  (let [^Path dir (.watchable key)
                        file-seq (map #(.toFile (.resolve dir %)) clj-files)
                        nses (map (comp :ns lana/parse-ns) file-seq)]
                    (doseq [ns nses]
                      (require ns :reload))
                    (doseq [ns (cljs-dependents-for-macro-namespaces compiler-env nses)]
                      (mark-cljs-ns-for-recompile! ns (:output-dir opts)))))
                (println "Change detected, recompiling ...")
                (flush)
                (buildf))
              (recur key))))))))

;; =============================================================================
;; Utilities

;; for backwards compatibility
#_(defn output-directory [opts]
  (util/output-directory opts))

#_(defn parse-js-ns [f]
  (deps/parse-js-ns (line-seq (io/reader f))))

#_(defn ^File src-file->target-file
  ([src]
   (src-file->target-file src
     (when env/*compiler*
       (:options @env/*compiler*))))
  ([src opts]
    (util/to-target-file
      (when (:output-dir opts)
        (util/output-directory opts))
      (lana/parse-ns src))))

#_(defn ^String src-file->goog-require
  ([src] (src-file->goog-require src {:wrap true}))
  ([src {:keys [wrap all-provides macros-ns] :as options}]
    (let [goog-ns
          (case (util/ext src)
            ("cljs" "cljc") (let [ns-str (str (comp/munge (:ns (lana/parse-ns src))))]
                              (cond-> ns-str
                                (and macros-ns (not (.endsWith ns-str "$macros")))
                                (str "$macros")))
            "js" (cond-> (:provides (parse-js-ns src))
                   (not all-provides) first)
            (throw
              (IllegalArgumentException.
                (str "Can't create goog.require expression for " src))))]
      (if (and (not all-provides) wrap)
        (if (:reload options)
          (str "goog.require(\"" goog-ns "\", true);")
          (str "goog.require(\"" goog-ns "\");"))
        (if (vector? goog-ns)
          goog-ns
          (str goog-ns))))))

#_(defn aot-cache-core []
  (let [base-path (io/file "src" "main" "cljs" "cljs")
        src       (io/file base-path "core.cljs")
        dest      (io/file base-path "core.aot.js")
        cache     (io/file base-path "core.cljs.cache.aot.edn")
        tcache    (io/file base-path "core.cljs.cache.aot.json")]
    (util/mkdirs dest)
    (env/with-compiler-env (env/default-compiler-env {:infer-externs true})
      (comp/compile-file src dest
        {:source-map true
         :source-map-url "core.js.map"
         :output-dir (str "src" File/separator "main" File/separator "cljs")})
      (ana/write-analysis-cache 'cljs.core cache src)
      (ana/write-analysis-cache 'cljs.core tcache src))))
