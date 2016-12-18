(ns lumo.path.windows
  (:require [cljs.spec :as s]
            [lumo.interop :as i]))

(def win32 (.-win32 (js/require "path")))

(defn basename
  "returns the basename of the path
   args: path
   return: string"
  [path]
  (.basename win32 path))

(defn dirname [path]
  (.dirname win32 path))

(defn extension [path]
  (.extname win32 path))

(defn format [{:keys [dir root base name ext]}]
  (.format win32 #js {:dir dir :root root :base base :name name :ext ext}))

(defn absolute? [path]
  (.isAbsolute win32 path))

(defn join [& ps]
  (i/js-apply (.-join win32) nil ps))

(defn normalize [path]
  (.normalize win32 path))

(defn parse [path]
  (i/obj->map (.parse win32 path) true))

(defn relative [from to]
  (.relative win32 from to))

(defn resolve [& ps]
  (i/js-apply (.-resolve win32) nil ps))
