(ns lumo.path
  (:require [cljs.spec :as s]
            [lumo.interop :as i]))

(def js-path (js/require "path"))

(def delimiter (.-delimiter js-path))
(def sep (.-sep js-path))

(defn basename
  "returns the basename (file without directory) of the path
   args: path
   return: string"
  [path]
  (.basename js-path path))

(defn dirname
  "returns the dirname of the path
   args: path
   return: string"
  [path]
  (.dirname js-path path))

(defn extension
  "returns the extension of the file path
   args: path
   return: string"
  [path]
  (.extname js-path path))

(defn format
  ""
  [{:keys [dir root base name ext]}]
  (.format js-path #js {:dir dir :root root :base base :name name :ext ext}))

(defn absolute?
  ""
  [path]
  (.isAbsolute js-path path))

(defn join
  ""
  [& ps]
  (i/js-apply (.-join js-path) nil ps))

(defn normalize
  ""
  [path]
  (.normalize js-path path))

(defn parse
  ""
  [path]
  (i/obj->map (.parse js-path path) true))

(defn relative
  ""
  [from to]
  (.relative js-path from to))

(defn resolve
  ""
  [& ps]
  (i/js-apply (.-resolve js-path) nil ps))


  

