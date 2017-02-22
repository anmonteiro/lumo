(ns lumo.compiler
  (:require-macros [cljs.compiler.macros :refer [emit-wrap]]
                   [cljs.env.macros :refer [ensure]])
  (:require [cljs.env :as env]
            [cljs.js :as cljs]
            [lumo.analyzer :as lana]
            [lumo.util :as util :refer [file-seq]]
            [lumo.io :as io :refer [spit slurp]]
            [lumo.json :as json]
            [lumo.common :as common]
            [lumo.cljs-deps :as deps]
            [cljs.source-map :as sm]
            [cljs.compiler :as comp]
            [cljs.analyzer :as ana]
            [clojure.string :as string]
            [cljs.tools.reader :as reader])
  (:import [goog.string StringBuffer]))

(defn rename-to-js
  "Change the file extension from .cljs to .js. Takes a File or a
     String. Always returns a String."
  [file-str]
  (cond
    (.endsWith file-str ".cljs")
    (clojure.string/replace file-str #"\.cljs$" ".js")

    (.endsWith file-str ".cljc")
    (if (= "cljs/core.cljc" file-str)
      "cljs/core$macros.js"
      (clojure.string/replace file-str #"\.cljc$" ".js"))

    :else
    (throw (ex-info
             (str "Invalid source file extension " file-str) {}))))

(defn compiled-by-string
  ([]
   (compiled-by-string
     (when env/*compiler*
       (:options @env/*compiler*))))
  ([opts]
   (str "// Compiled by ClojureScript "
     (util/clojurescript-version)
     (when opts
       (str " " (pr-str (comp/build-affecting-options opts)))))))

(defn requires-compilation?
   "Return true if the src file requires compilation."
   ([src dest]
    (requires-compilation? src dest
      (when env/*compiler*
        (:options @env/*compiler*))))
   ([src dest opts]
    (let [{:keys [ns requires]} (lana/parse-ns src)]
      (ensure
        (or (not (js/$$LUMO_GLOBALS.fs.existsSync dest))
          (util/changed? src dest)
          (let [version' (util/compiled-by-version dest)
                version (util/clojurescript-version)]
            (and version (not= version version')))
          (and opts
            (not (and (io/resource "cljs/core.aot.js") (= 'cljs.core ns)))
            (not= (comp/build-affecting-options opts)
              (comp/build-affecting-options (util/build-options dest))))
          (and opts (:source-map opts)
            (if (= (:optimizations opts) :none)
              (not (js/$$LUMO_GLOBALS.fs.existsSync (str dest ".map")))
              (not (get-in @env/*compiler* [::comp/compiled-cljs (js/$$LUMO_GLOBALS.path.resolve dest)]))))
          (when-let [recompiled' (and comp/*recompiled* @comp/*recompiled*)]
            (some requires recompiled')))))))

(defn with-core-cljs
     "Ensure that core.cljs has been loaded."
     ([] (with-core-cljs
           (when env/*compiler*
             (:options @env/*compiler*))))
     ([opts] (with-core-cljs opts (fn [])))
     ([opts body]
      {:pre [(or (nil? opts) (map? opts))
             (fn? body)]}
      (when-not (get-in @env/*compiler* [::ana/namespaces 'cljs.core :defs])
        (common/load-core-analysis-caches env/*compiler* true)
        #_(lana/analyze-file "cljs/core.cljs" opts))
      (body)))

(defn cached-core [ns ext opts]
  ;; TODO: revert this
  (and ;(= :none (:optimizations opts))
    (not= "cljc" ext)
    (= 'cljs.core ns)
    (io/resource "cljs/core.aot.js")))

(defn macro-ns? [ns ext opts]
  (or (= "clj" ext)
    (= 'cljs.core$macros ns)
    (and (= ns 'cljs.core) (= "cljc" ext))
    (:macros-ns opts)))

(defn find-source [file]
  (lana/parse-ns file))

(defn cljs-files-in
  "Return a sequence of all .cljs and .cljc files in the given directory."
  [dir]
  (filter
    #(let [name %]
       (and (or (.endsWith name ".cljs")
                (.endsWith name ".cljc"))
         (not= \. (first name))
         (not (contains? comp/cljs-reserved-file-names name))))
    (file-seq dir)))

(defn find-root-sources
  [src-dir]
  (let [src-dir-file src-dir]
    (map find-source (cljs-files-in src-dir-file))))

(defn emit-cached-core [src dest cached opts]
  ;; no need to bother with analysis cache reading, handled by
  ;; with-core-cljs
  (when (or ana/*verbose* (:verbose opts))
    (util/debug-prn "Using cached cljs.core" (str src)))
  (spit dest (slurp cached))
  (util/set-last-modified dest (util/last-modified src))
  (when (true? (:source-map opts))
    (spit (str dest ".map")
      (json/write-str
        (assoc
          (json/read-str (slurp (io/resource "cljs/core.aot.js.map")))
          "file"
          (js/$$LUMO_GLOBALS.path.join (util/output-directory opts) "cljs" "core.js")))))
  (lana/parse-ns src dest nil))

(defn emit-source-map [src dest sm-data opts]
  (let [sm-file (js/$$LUMO_GLOBALS.path.join (str dest ".map"))]
    (if-let [smap (:source-map-asset-path opts)]
      (comp/emits "\n//# sourceMappingURL=" smap
        (string/replace (util/path sm-file)
          (str (util/path (:output-dir opts)))
          "")
        (if (true? (:source-map-timestamp opts))
          (str
            (if-not (string/index-of smap "?") "?" "&")
            "rel=" (system-time))
          ""))
      (comp/emits "\n//# sourceMappingURL="
        (or (:source-map-url opts) (js/$$LUMO_GLOBALS.path.basename sm-file))
        (if (true? (:source-map-timestamp opts))
          (str "?rel=" (system-time))
          "")))
    (spit sm-file
      (sm/encode {(js/$$LUMO_GLOBALS.path.resolve src) (:source-map sm-data)}
        {:lines (+ (:gen-line sm-data) 2)
         :file (js/$$LUMO_GLOBALS.path.resolve dest)
         :source-map-path (:source-map-path opts)
         :source-map-timestamp (:source-map-timestamp opts)
         :source-map-pretty-print (:source-map-pretty-print opts)
         :relpaths {(util/path src)
                    (util/ns->relpath (first (:provides opts)) (:ext opts))}}))))

#_(defn emit-source [src dest ext opts]
  (let [out dest
        sb (StringBuffer.)]
    (binding [ana/*cljs-ns*         'cljs.user
              ana/*cljs-file*       src
              reader/*alias-map*    (or reader/*alias-map* {})
              ana/*cljs-static-fns* (or ana/*cljs-static-fns* (:static-fns opts))
              comp/*source-map-data*     (when (:source-map opts)
                                           (atom
                                             {:source-map (sorted-map)
                                              :gen-col 0
                                              :gen-line 0}))]
      (.append sb (with-out-str (comp/emitln (compiled-by-string opts))))
      (let [rdr src
            env (ana/empty-env)]
        (loop [forms       (lana/forms-seq* rdr (util/path src))
               ns-name     nil
               deps        nil]
          (if (seq forms)
            (let [env (assoc env :ns (ana/get-namespace ana/*cljs-ns*))
                  {:keys [op] :as ast} (ana/analyze env (first forms) nil opts)]
              (cond
                (= op :ns)
                (let [ns-name (:name ast)
                      ns-name (if (and (= 'cljs.core ns-name)
                                    (= "cljc" ext))
                                'cljs.core$macros
                                ns-name)]
                  (.append sb (with-out-str (comp/emit ast)))
                  (recur (rest forms) ns-name (merge (:uses ast) (:requires ast))))

                (= :ns* (:op ast))
                (let [ns-emitted? (some? ns-name)
                      ns-name (lana/gen-user-ns src)]
                  (if-not ns-emitted?
                    (.append sb (with-out-str (comp/emit (assoc ast :name ns-name :op :ns))))
                    (.append sb (with-out-str (comp/emit ast))))
                  (recur (rest forms) ns-name (merge deps (:uses ast) (:requires ast))))

                :else
                (let [ns-emitted? (some? ns-name)
                      ns-name (if-not ns-emitted?
                                (lana/gen-user-ns src)
                                ns-name)]
                  (when-not ns-emitted?
                    (.append sb (with-out-str (comp/emit {:op :ns
                                                          :name ns-name}))))
                  (.append sb (with-out-str (comp/emit ast)))
                  (recur (rest forms) ns-name deps))))
            (let [sm-data (when comp/*source-map-data* @comp/*source-map-data*)
                  ret     (merge
                            {:ns         (or ns-name 'cljs.user)
                             :macros-ns  (:macros-ns opts)
                             :provides   [ns-name]
                             :requires   (if (= ns-name 'cljs.core)
                                           (set (vals deps))
                                           (cond-> (conj (set (vals deps)) 'cljs.core)
                                             (get-in @env/*compiler* [:options :emit-constants])
                                             (conj ana/constants-ns-sym)))
                             :file        dest
                             :source-file src}
                            (when sm-data
                              {:source-map (:source-map sm-data)}))]
              (when (and sm-data (= :none (:optimizations opts)))
                (emit-source-map src dest sm-data
                  (merge opts {:ext ext :provides [ns-name]})))
              (let [path (js/$$LUMO_GLOBALS.path.resolve dest)]
                (swap! env/*compiler* assoc-in [::comp/compiled-cljs path] ret))
              (let [{:keys [output-dir cache-analysis]} opts]
                #_(when (and (true? cache-analysis) output-dir)
                  (ana/write-analysis-cache ns-name
                    (ana/cache-file src (lana/parse-ns src) output-dir :write)
                    src))
                (spit out (str sb))
                ret))))))))

(defn emit-constants-table-to-file [table dest]
  (util/mkdirs dest)
  (spit dest (with-out-str (comp/emit-constants-table table))))

(defn emit-source [src dest ext opts cb]
  (let [source (slurp src)]
    (cljs/compile-str
      env/*compiler*
      source
      nil
      (assoc opts :verbose false)
      (fn [{:keys [value error] :as m}]
        (if error
          (throw error)
          (let [sm-data (when comp/*source-map-data* @comp/*source-map-data*)
                ret     (merge
                          (lana/parse-ns src)
                          {:file dest
                           ;; :requires (if (= ns-name 'cljs.core)
                           ;;             (set (vals deps))
                           ;;             (cond-> (conj (set (vals deps)) 'cljs.core)
                           ;;               (get-in @env/*compiler* [:options :emit-constants])
                           ;;               (conj ana/constants-ns-sym)))
                           }
                          #_{:ns         (or ns-name 'cljs.user)
                           :macros-ns  (:macros-ns opts)
                           :provides   [ns-name]
                           :requires   (if (= ns-name 'cljs.core)
                                         (set (vals deps))
                                         (cond-> (conj (set (vals deps)) 'cljs.core)
                                           (get-in @env/*compiler* [:options :emit-constants])
                                           (conj ana/constants-ns-sym)))
                           :file        dest
                           :source-file src}
                          (when sm-data
                            {:source-map (:source-map sm-data)}))]
            (when (and sm-data (= :none (:optimizations opts)))
              (emit-source-map src dest sm-data
                (merge opts {:ext ext :provides [ns-name]})))
            (let [path (js/$$LUMO_GLOBALS.path.resolve dest)]
              (swap! env/*compiler* assoc-in [::comp/compiled-cljs path] ret))
            (let [{:keys [output-dir cache-analysis]} opts]
              #_(when (and (true? cache-analysis) output-dir)
                  (ana/write-analysis-cache ns-name
                    (ana/cache-file src (lana/parse-ns src) output-dir :write)
                    src))
              (spit dest value)
              (cb ret))))))))

(defn compile-file*
     ([src dest cb]
      (compile-file* src dest
        (when env/*compiler*
          (:options @env/*compiler*)) cb))
     ([src dest opts cb]
      (ensure
        (with-core-cljs opts
          (fn []
            (when (or ana/*verbose* (:verbose opts))
              (util/debug-prn "Compiling" (str src)))
            (let [ext (util/ext src)
                  {:keys [ns] :as ns-info} (lana/parse-ns src)]
              (if-let [cached (cached-core ns ext opts)]
                (cb (emit-cached-core src dest cached opts))
                (let [opts (if (macro-ns? ns ext opts)
                             (assoc opts :macros-ns true)
                             opts)]
                  (emit-source src dest ext opts
                    (fn [ret]
                      (util/set-last-modified dest (util/last-modified src))
                      (cb ret)))))))))))

(defn compile-file
   "Compiles src to a file of the same name, but with a .js extension,
    in the src file's directory.
    With dest argument, write file to provided location. If the dest
    argument is a file outside the source tree, missing parent
    directories will be created. The src file will only be compiled if
    the dest file has an older modification time.
    Both src and dest may be either a String or a File.
    Returns a map containing {:ns .. :provides .. :requires .. :file ..}.
    If the file was not compiled returns only {:file ...}"
   ([src cb]
    (let [dest (rename-to-js src)]
      (compile-file src dest
        (when env/*compiler*
          (:options @env/*compiler*)) cb)))
   ([src dest cb]
    (compile-file src dest
      (when env/*compiler*
        (:options @env/*compiler*)) cb))
   ([src dest opts cb]
    {:post [map?]}
    (binding [ana/*file-defs*     (atom #{})
              ;*unchecked-if*  false
              ana/*cljs-warnings* ana/*cljs-warnings*]
      (let [nses      (get @env/*compiler* ::ana/namespaces)
            src-file  src
            dest-file dest
            opts      (merge {:optimizations :none} opts)]
        (if (js/$$LUMO_GLOBALS.fs.existsSync src-file)
          (try
            (let [{ns :ns :as ns-info} (lana/parse-ns src-file dest-file opts)
                  opts (if (and (not= (util/ext src) "clj") ;; skip cljs.core macro-ns
                             (= ns 'cljs.core)
                             (not (false? (:static-fns opts))))
                         (assoc opts :static-fns true)
                         opts)]
              (if (or (requires-compilation? src-file dest-file opts)
                      (:force opts))
                (do
                  (util/mkdirs dest-file)
                  (when (and (get-in nses [ns :defs])
                          (not= 'cljs.core ns)
                          (not= :interactive (:mode opts)))
                    (swap! env/*compiler* update-in [::ana/namespaces] dissoc ns))
                  (compile-file* src-file dest-file opts
                    (fn [ret]
                      (when comp/*recompiled*
                        (swap! comp/*recompiled* conj ns))
                      (cb ret))))
                (do
                  ;; populate compilation environment with analysis information
                  ;; when constants are optimized
                  (when (and (true? (:optimize-constants opts))
                          (nil? (get-in nses [ns :defs])))
                    (with-core-cljs opts (fn [] (lana/analyze-file src-file opts))))
                  ns-info)))
            (catch :default e
              (throw (ex-info (str "failed compiling file:" src) {:file src} e))))
          (throw (ex-info (str "The file " src " does not exist.") {:file src})))))))

(defn compile-root
  "Looks recursively in src-dir for .cljs files and compiles them to
      .js files. If target-dir is provided, output will go into this
      directory mirroring the source directory structure. Returns a list
      of maps containing information about each file which was compiled
      in dependency order."
  ([src-dir]
   (compile-root src-dir "out"))
  ([src-dir target-dir]
   (compile-root src-dir target-dir
     (when env/*compiler*
       (:options @env/*compiler*))))
  ([src-dir target-dir opts]
   (swap! env/*compiler* assoc :root src-dir)
   (let [src-dir-file src-dir
         inputs (deps/dependency-order
                  (map #(lana/parse-ns %)
                    (cljs-files-in src-dir-file)))]
     (binding [comp/*inputs* (zipmap (map :ns inputs) inputs)]
       (loop [inputs (seq inputs) compiled []]
         (if inputs
           (let [{:keys [source-file] :as ns-info} (first inputs)
                 output-file (util/to-target-file target-dir ns-info)
                 ijs (compile-file source-file output-file opts)]
             (recur
               (next inputs)
               (conj compiled
                 (assoc ijs :file-name output-file))))
           compiled))))))
