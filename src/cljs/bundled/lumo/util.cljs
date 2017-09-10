(ns lumo.util
  (:require-macros lumo.util)
  (:require [clojure.string :as string]
            [clojure.set :as set]
            [cljs.js :as cljs]
            [cljs.compiler :as comp]
            [cljs.reader :as edn]
            [goog.string :as gstring]
            [lumo.io :as io]
            crypto
            fs
            path
            os))

(defn clojurescript-version
  "Returns clojurescript version as a printable string."
  []
  cljs.core/*clojurescript-version*)

(defn compiled-by-version [f]
  #_(with-open [reader (io/reader f)]
    (let [match (->> reader line-seq first
                     (re-matches #".*ClojureScript (\d+\.\d+\.\d+).*$"))]
      (or (and match (second match)) "0.0.0000"))))

(def windows?
  (identical? (os/platform) "win32"))

(defn distinct-by
  ([f coll]
   (let [step (fn step [xs seen]
                (lazy-seq
                  ((fn [[x :as xs] seen]
                     (when-let [s (seq xs)]
                       (let [v (f x)]
                         (if (contains? seen v)
                           (recur (rest s) seen)
                           (cons x (step (rest s) (conj seen v)))))))
                    xs seen)))]
     (step coll #{}))))

(defn output-directory
  ([opts] (output-directory opts "out"))
  ([opts default]
   {:pre [(or (nil? opts) (map? opts))]}
   (or (:output-dir opts) default)))

(defn debug-prn
  [& args]
  (binding [*print-fn* *print-err-fn*]
    (apply println args)))

(defn directory? [path]
  (try
    (.isDirectory (fs/lstatSync path))
    (catch :default _
      false)))

(defn file? [path]
  (try
    (.isFile (fs/lstatSync path))
    (catch :default _
      false)))

(defn mkdirs [p]
  (let [target-dir (-> p path/resolve (path/resolve ".."))]
    (reduce (fn [acc d]
              (let [new-path (path/join acc d)]
                (cond-> new-path
                  (not (fs/existsSync new-path))
                  fs/mkdirSync)
                new-path))
      "/" (rest (string/split target-dir #"[/\\]")))))

(defn bundled-resource? [x]
  (and (goog/isObject x) (= (.-type x) "bundled")))

(defn jar-resource? [x]
  (and (goog/isObject x) (= (.-type x) "jar")))

(defn resource? [x]
  (and (goog/isObject x) (= (.-type x) "file")))

(defn last-modified [path]
  (-> (cond
        (bundled-resource? path) (js/Date.)
        (jar-resource? path) (.-date path)
        (resource? path) (.-mtime (fs/statSync (.-src path)))
        :else (.-mtime (fs/statSync path)))
      (.getTime)
      (/ 1000)))

(defn changed? [a b]
  (not (== (last-modified a) (last-modified b))))

(defn munge-path [ss]
  (comp/munge (str ss)))

(defn ns->relpath
  "Given a namespace as a symbol return the relative path. May optionally
  provide the file extension, defaults to :cljs."
  ([ns] (ns->relpath ns :cljs))
  ([ns ext]
   (str (string/replace (munge-path ns) \. \/) "." (name ext))))

(defn ns->source
  "Given a namespace as a symbol return the corresponding resource if it exists."
  [ns]
  (or (io/resource (ns->relpath ns :cljs))
      (io/resource (ns->relpath ns :cljc))))

;; on Windows, URLs end up having forward slashes like
;; /C:/Users/... - Antonio
(defn normalize-path [ x]
  (-> (cond-> x
        windows? (string/replace #"^[\\/]" ""))
    (string/replace "\\" path/sep)
    (string/replace "/" path/sep)))

(defn path [x]
  (cond
    (string? x) (path/resolve x)

    (resource? x) (str "file:" (.-src x))

    (or (bundled-resource? x)
        (jar-resource? x))
    (str "jar:file:" (.-jarPath x) "!/" (.-src x))))

(defn ext
  "Given a file, url or string return the file extension."
  [x]
  (let [file (cond
               (string? x) x

               (or (resource? x)
                   (bundled-resource? x)
                   (jar-resource? x))
               (.-src x))]
    (last (string/split file #"\."))))

(defn path-seq
  [file-str]
  (->> path/sep
       gstring/regExpEscape
       re-pattern
       (string/split file-str)))

(defn to-path
  ([parts]
     (to-path parts path/sep))
  ([parts sep]
    (apply str (interpose sep parts))))

(defn get-name
  "Given a file or url return the last component of the path."
  [x]
  (last (string/split (path x) #"/")))

(defn relative-name
  "Given a file return a path relative to the working directory. Given a
   URL return the JAR relative path of the resource."
  [x]
  (letfn [(strip-user-dir [s]
            (let [user-dir (path/join (js/process.cwd) path/sep)
                  s (normalize-path s)]
              (string/replace s user-dir "")))]
    (if (string? x)
      (strip-user-dir (path/resolve x))
      (throw (js/Error. "What to do with JARs in lumo.util/relative-name?"))
      #_(let [f (URLDecoder/decode (.getFile x))]
        (if (string/includes? f ".jar!/")
          (last (string/split f #"\.jar!/"))
          (strip-user-dir f))))))

(defn content-sha
  ([s]
   (content-sha s nil))
  ([s n]
   (let [digest (crypto/createHash "sha1")
         _ (.update digest s)
         sha (.toUpperCase (.digest digest "hex"))]
     (if-not (nil? n)
       (apply str (take n sha))
       sha))))

(defn line-seq [path]
  (string/split (io/slurp path) #"\n"))

(defn build-options [f]
  (let [reader f]
    (let [match (->> reader line-seq first
                  (re-matches #".*ClojureScript \d+\.\d+\.\d+ (.*)$"))]
      (and match (edn/read-string (second match))))))

(defn map-merge [a b]
  (if (and (map? a) (map? b))
    (loop [ks (seq (keys a)) ret a b' b]
      (if ks
        (let [k (first ks)]
          (if (contains? b' k)
            (recur
              (next ks)
              (assoc ret k (map-merge (get ret k) (get b' k)))
              (dissoc b' k))
            (recur (next ks) ret b')))
        (merge ret b')))
    a))

(defn file-seq [dir]
  (tree-seq
    (fn [f] (.isDirectory (fs/statSync f) ()))
    (fn [d] (map #(path/join d %) (fs/readdirSync d)))
    dir))

(defn to-target-file
  ([target-dir ns-info]
   (to-target-file target-dir ns-info "js"))
  ([target-dir {:keys [ns source-file] :as ns-info} ext]
   (let [src-ext (if source-file
                   (lumo.util/ext source-file)
                   "cljs")
         ns      (if (or (= src-ext "clj")
                       (and (= ns 'cljs.core) (= src-ext "cljc")))
                   (symbol (str ns "$macros"))
                   ns)
         relpath (string/split (munge-path (str ns)) #"\.")
         parents (cond-> (butlast relpath)
                   target-dir (conj target-dir))]
     (cond->> (str (last relpath) (str "." ext))
       (seq parents)
       (path/join (to-path parents))))))

(defn get-absolute-path [file-or-resource]
  (cond
    (string? file-or-resource) (path/resolve file-or-resource)

    (resource? file-or-resource)
    (.-src file-or-resource)

    (or (jar-resource? file-or-resource)
        (bundled-resource? file-or-resource))
    file-or-resource

    :else (do
            (js/console.log file-or-resource (.-constructor file-or-resource) (object? file-or-resource)
              (= (.-type file-or-resource) "jar"))
            (throw (ex-info "should never happen!" {:x file-or-resource})))))

(defn set-last-modified [file time]
  (fs/utimesSync file time time))

(defn levenshtein-distance
  "The the minimum number of single-element edits needed to
  transform s in to t."
  [s t]
  (let [f (fn [f s t]
            (cond
              (empty? s) (count t)
              (empty? t) (count s)
              :else (let [cost (if (= (first s) (first t))
                                 0
                                 1)]
                      (min (inc (f f (rest s) t))
                        (inc (f f s (rest t)))
                        (+ cost (f f (rest s) (rest t)))))))
        g (memoize f)]
    (g g s t)))

(defn suggestion
  "Provides a best suggestion for an unknown, taken from knowns,
  minimizing the Levenshtein distance, returning nil if threshold
  cannot be satisfied."
  [threshold unknown knowns]
  (let [distance     (partial levenshtein-distance unknown)
        closest      (apply min-key distance knowns)
        closest-dist (distance closest)]
    (when (<= closest-dist threshold)
      closest)))

(defn unknown-opts
  "Takes a set of passed opt keys and known opt keys and for each
  unknown opt key returns a vector of the key and its (potentially
  nil) suggestion."
  [passed knowns]
  {:pre [(set? passed) (set? knowns)]}
  (for [unknown (set/difference passed knowns)]
    [unknown (some-> (suggestion 3 (str unknown) (map str knowns))
               (subs 1)
               keyword)]))

(defn conjunction-str [xs]
  (let [xs (vec xs)]
    (case (count xs)
      1 (first xs)
      2 (str (first xs) " and " (second xs))
      (str (string/join ", " (pop xs)) " and " (peek xs)))))

(defn module-file-seq
  ([] (module-file-seq "node_modules"))
  ([dir]
   (let [fseq (tree-seq
                (fn [f]
                  (and (.isDirectory (fs/statSync f))
                    (not (boolean
                           (re-find #"node_modules[\\\/].*[\\\/]node_modules" f)))))
                (fn [d] (map #(path/join d %) (fs/readdirSync d)))
                dir)]
     (filter (fn [path]
               (or (string/ends-with? path ".json")
                 (string/ends-with? path ".js")))
       fseq))))

(defn path->module-identifier
  ([relpath]
   (path->module-identifier relpath true))
  ([relpath code?]
   (letfn [(strip-js-extension [path]
             (if (string/ends-with? path ".js")
               (subs path 0 (.lastIndexOf path "."))
               path))]
     (let [dirname (as-> (path/resolve relpath) $
                     (strip-js-extension $)
                     (string/replace $ "/" "$")
                     (string/replace $ "@" "$")
                     (string/replace $ "+" "$")
                     (string/replace $ "." "_")
                     (string/replace $ " " "_")
                     (string/replace $ "-" "_")
                     ;; Windows
                     (string/replace $ "\\" "$")
                     (if code?
                       (string/replace $ ":" "_")
                       (string/replace $ ":" "-")))]
       (str "module" (when-not (.startsWith dirname "$") "$") dirname)))))
