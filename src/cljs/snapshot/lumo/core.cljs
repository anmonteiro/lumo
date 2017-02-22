(ns lumo.core)

(defonce
  ^{:dynamic true
    :doc "A sequence of the supplied command line arguments, or nil if
  none were supplied"}
  *command-line-args* nil)

(set! *main-cli-fn* (fn []))
