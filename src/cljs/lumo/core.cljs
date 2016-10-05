(ns lumo.core
  (:require [cljs.nodejs :as nodejs]
            [lumo.repl :as repl]))

(defn init-runtime!
  []
  ;; create the 'cljs.user namespace
  (set! (.-user js/cljs) #js {})
  ;; setup printing
  (nodejs/enable-util-print!)
  (repl/init!))

(set! *main-cli-fn* init-runtime!)
