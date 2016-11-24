(ns lumo.classpath
  (:require [clojure.string :as string]))

(defn directory?
  [path]
  (. (js/LUMO_STAT path) isDirectory))

(defn file?
  [path]
  (and (. (js/LUMO_STAT path) isFile) (or (string/ends-with? path ".cljs")
                                          (string/ends-with? path ".cljc"))))

(defn jarfile?
  [path]
  (string/ends-with? path ".jar"))

(defn filenames
  [path]
  (if (or (= "" path) (jarfile? path))
    path
    (let [root (js->clj (js/LUMO_READDIR path))
          root-files (filter #(file? (str path "/" %)) root)
          sub-dirs (map #(str path "/" %) (filter #(directory? (str path "/" %)) root))
          sub-files (map filenames sub-dirs)]
      (flatten [root-files sub-files]))))

(defn ^:export classpath
  []
  (js/LUMO_READ_SOURCES))

(defn ^:export classpath-files
  []
  (flatten (map filenames (classpath))))

(defn ^:export classpath-jarfiles
  []
  (filter jarfile? (classpath)))

(defn ^:export add-source!
  [path]
  (js/LUMO_ADD_SOURCES #js [path]))

(defn ^:export remove-source!
  [path]
  (js/LUMO_REMOVE_SOURCE path))
