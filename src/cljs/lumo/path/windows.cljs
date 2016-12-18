(ns lumo.path.windows
  (:require [cljs.spec :as s]
            [lumo.interop :as i]))

(def win32 (.-win32 (js/require "path")))

(defn basename
  "Returns the basename (file without directory) of the path
   args: path
   return: string"
  [path]
  (.basename win32 path))

(defn dirname
  "Returns the dirname of the path
   args: [path]
   return: string"
  [path]
  (.dirname win32 path))

(defn extension
  "Returns the extension of the file path (dot included)
   args: [path]
   return: string"
  [path]
  (.extname win32 path))

(defn format
  "Turns a map of the form returned by `parse` into a string
   args [map]
   returns: string"
  [{:keys [dir root base name ext]}]
  (.format win32 #js {:dir dir :root root :base base :name name :ext ext}))

(defn absolute?
  "true if path is absolute
   args: [path]
   returns: bool"
  [path]
  (.isAbsolute win32 path))

(defn join
  "Joins path segments together
   args: [& segments]
   returns: string"
  [& ps]
  (i/js-apply (.-join win32) nil ps))

(defn normalize
  "Resolves . and .. segments of path
   args: [path]
   returns: string"
  [path]
  (.normalize win32 path))

(defn parse
  "Returns a map describing the file path
   args: [path]
   returns: map with keys (all string values):
     :root :dir :base :ext :name"
  [path]
  (i/obj->map (.parse win32 path) true))

(defn relative
  "The relative path from `from` to `to`
   args: [from to]
   returns: string"
  [from to]
  (.relative win32 from to))

(defn resolve
  "Joins the given path segments and absolutifies
   args [& segments]
   returns: string"
  [& ps]
  (i/js-apply (.-resolve win32) nil ps))
