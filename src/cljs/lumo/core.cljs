(ns lumo.core
  (:require [cljs.nodejs :as nodejs]))

(defn init-runtime!
  []
  ;; create the 'cljs.user namespace
  (set! (.-user js/cljs) #js {})
  ;; setup printing
  (nodejs/enable-util-print!))

(set! *main-cli-fn* init-runtime!)
