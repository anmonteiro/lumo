(ns lumo.classpath
  (:require [clojure.string :as string]))

;; TODO: add this to the AOT list

(defn- directory?
  [path]
  (.isDirectory (js/$$LUMO_GLOBALS.fs.statSync path)))

(defn- file?
  [path]
  (and (. (js/LUMO_STAT path) isFile)
    (or (string/ends-with? path ".cljs")
        (string/ends-with? path ".cljc")
        (string/ends-with? path ".clj"))))

(defn jarfile?
  "Returns true if file is a normal file with a .jar or .JAR extension."
  [path]
  (or (.endsWith path ".jar")
      (.endsWith path ".JAR")))

(defn- filenames
  [path]
  (if (or (identical? "" path) (jarfile? path))
    path
    (let [root (js/$$LUMO_GLOBALS.fs.readdirSync path)
          root-files (filter #(file? (str path "/" %)) root)
          sub-dirs (map #(str path "/" %) (filter #(directory? (str path "/" %)) root))
          sub-files (mapcat filenames sub-dirs)]
      (mapcat identity [root-files sub-files]))))

(defn classpath
  "Returns a JS array of strings listing all folders on the classpath."
  []
  (js/$$LUMO_GLOBALS.readSourcePaths))

(defn classpath-files
  "Returns a list of all usable files on the classpath."
  []
  (mapcat filenames (classpath)))

(defn filenames-in-jar
  "Returns a list of all filenames in a jarfile."
  [jar-file]
  (let [zip (.load (js/$$LUMO_GLOBALS.JSZip.) (js/$$LUMO_GLOBALS.fs.readFileSync jar-file))]
    (filter #(re-find #".*\.clj.*" %) (js/Object.keys zip.files))))

(defn classpath-jarfiles
  "Returns a list of all JAR files on the classpath"
  []
  (filter jarfile? (classpath)))

(defn add-source!
  "Add a directory or JAR file to the Lumo classpath."
  [path]
  (js/$$LUMO_GLOBALS.addSourcePaths #js [path]))

(defn remove-source!
  "Remove a directory or JAR file to the Lumo classpath."
  [path]
  (js/$$LUMO_GLOBALS.removeSourcePath path))
