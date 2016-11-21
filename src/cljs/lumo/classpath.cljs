(ns lumo.classpath
  (:require [cljs.nodejs :as nodejs]
            [clojure.string :as string]))

(def fs (nodejs/require "fs"))

(defn directory?
  [path]
  (. (. fs statSync path) isDirectory))

(defn file?
  [path]
  (and (. (. fs statSync path) isFile) (or (string/ends-with? path ".cljs")
                                           (string/ends-with? path ".cljc"))))

(defn jarfile?
  [path]
  (string/ends-with? path ".jar"))

(defn filenames
  [path]
  (let [root (js->clj (. fs readdirSync path))
        root-files (filter #(file? (str path "/" %)) root)
        sub-dirs (map #(str path "/" %) (filter #(directory? (str path "/" %)) root))
        sub-files (map filenames sub-dirs)
        ]
    (flatten [root-files sub-files])))

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
