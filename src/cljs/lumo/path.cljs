(ns lumo.path
  (:require [cljs.spec :as s]
            [lumo.interop :as i]))

(def js-path (js/require "path"))

(def delimiter (.-delimiter js-path))
(def sep (.-sep js-path))

(defn basename
  "Returns the basename (file without directory) of the path
   args: path
   return: string"
  [path]
  (.basename js-path path))

(defn dirname
  "Returns the dirname of the path
   args: [path]
   return: string"
  [path]
  (.dirname js-path path))

(defn extension
  "Returns the extension of the file path (dot included)
   args: [path]
   return: string"
  [path]
  (.extname js-path path))

(defn format
  "Turns a map of the form returned by `parse` into a string
   args [map]
   returns: string"

  [{:keys [dir root base name ext]}]
  (.format js-path #js {:dir dir :root root :base base :name name :ext ext}))

(defn absolute?
  "true if path is absolute
   args: [path]
   returns: bool"
  [path]
  (.isAbsolute js-path path))

(defn join
  "Joins path segments together
   args: [& segments]
   returns: string"
  [& ps]
  (i/js-apply (.-join js-path) nil ps))

(defn normalize
  "Resolves . and .. segments of path
   args: [path]
   returns: string"
  [path]
  (.normalize js-path path))

(defn parse
  "Returns a map describing the file path
   args: [path]
   returns: map with keys (all string values):
     :root :dir :base :ext :name"
  [path]
  (i/obj->map (.parse js-path path) true))

(defn relative
  "The relative path from `from` to `to`
   args: [from to]
   returns: string"
  [from to]
  (.relative js-path from to))

(defn resolve
  "Joins the given path segments and absolutifies
   args [& segments]
   returns: string"
  [& ps]
  (i/js-apply (.-resolve js-path) nil ps))

