(ns config.gen
  (:require
    [cljstache.core :refer [render]
    fs]))

(defn render-template
  [source-path output-path render-data]
  (let [source-text (fs/readFileSync source-path)
        rendered (render source-text render-data)]
    (fs/writeFileSync output-path rendered)))
