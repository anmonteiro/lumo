(ns lumo.classpath
  (:require [clojure.string :as string]))

(def fs (js/require "fs"))

(defn jar-file?
  "Returns true if file is a normal file with a .jar or .JAR extension."
  [f]
  (and (try
         (.. fs (statSync f) (isFile))
         (catch :default _ false))
       (or (.endsWith f ".jar")
           (.endsWith f ".JAR"))))

(defn filenames-in-jar
  "Returns a list of all filenames in a jarfile."
  [jar-file]
  (let [zip (.load (js/$$LUMO_GLOBALS.JSZip.) (fs.readFileSync jar-file))]
    (seq (js/Object.keys zip.files))))

(defn- directory? [x]
  (try
    (.. fs (statSync x) (isDirectory))
    (catch :default _ false)))

(defn classpath
  "Returns a sequence of the elements on the classpath."
  []
  (seq (js/$$LUMO_GLOBALS.readSourcePaths)))

(defn classpath-directories
  "Returns a sequence of the directories on the classpath."
  []
  (filter directory? (classpath)))

(defn classpath-jarfiles
  "Returns a sequence of the JAR files on the classpath."
  []
  (filter jar-file? (classpath)))

(defn add-source!
  "Add a directory or JAR file to the Lumo classpath."
  [path]
  (js/$$LUMO_GLOBALS.addSourcePaths #js [path]))

(defn remove-source!
  "Remove a directory or JAR file to the Lumo classpath."
  [path]
  (js/$$LUMO_GLOBALS.removeSourcePath path))
