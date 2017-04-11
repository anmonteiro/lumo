(ns lumo.core)

(goog-define
  ^{:doc "A string containing the version of the Lumo executable."}
  *lumo-version* "")

(defonce
  ^{:dynamic true
    :doc "A sequence of the supplied command line arguments, or nil if
  none were supplied"}
  *command-line-args* nil)
