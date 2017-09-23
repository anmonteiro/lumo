(ns test-check.core
  (:require [cljs.spec.alpha :as s :include-macros true]))

(s/fdef ranged-rand
  :args (s/and (s/cat :start int? :end int?)
               #(< (:start %) (:end %)))
  :ret int?
  :fn (s/and #(>= (:ret %) (-> % :args :start))
             #(< (:ret %) (-> % :args :end))))

(defn ranged-rand  ;; BROKEN!
  "Returns random int in range start <= rand < end"
  [start end]
  42)
