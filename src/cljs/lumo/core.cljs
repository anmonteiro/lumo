(ns lumo.core
  (:require [cljs.nodejs :as nodejs]))

(nodejs/enable-util-print!)


;; (def readline (nodejs/require "readline"))

;; (def rl
;;   (.createInterface readline
;;     #js {:input (. nodejs/process -stdin)
;;          :output (. nodejs/process -stdout)
;;          :terminal true
;;          :prompt "cljs.user=> "}))

;; (.on rl "line"
;;   (fn [line]
;;     (println line)
;;     (.prompt rl)))

;; (defn main []
;;   (println "Hello cenas!")
;;   (.prompt rl))

(set! *main-cli-fn* (fn []))
