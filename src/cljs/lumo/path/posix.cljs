(ns lumo.path.posix
  (:require [cljs.spec :as s]
            [lumo.interop :as i]))

(def posix (.-posix (js/require "path")))

(defn basename
  "returns the basename of the path
   args: path
   return: string"
  [path]
  (.basename posix path))

(defn dirname [path]
  (.dirname posix path))

(defn extension [path]
  (.extname posix path))

(defn format [{:keys [dir root base name ext]}]
  (.format posix #js {:dir dir :root root :base base :name name :ext ext}))

(defn absolute? [path]
  (.isAbsolute posix path))

(defn join [& ps]
  (i/js-apply (.-join posix) nil ps))

(defn normalize [path]
  (.normalize posix path))

(defn parse [path]
  (i/obj->map (.parse posix path) true))

(defn relative [from to]
  (.relative posix from to))

(defn resolve [& ps]
  (i/js-apply (.-resolve posix) nil ps))


