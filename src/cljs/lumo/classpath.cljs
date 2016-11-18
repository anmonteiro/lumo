(ns lumo.classpath
  (:require [cljs.nodejs :as nodejs]))

(def fs (nodejs/require "fs"))

(defn ^:export filenames
  [cp]
  (map #(. fs readdirSync %) cp))
