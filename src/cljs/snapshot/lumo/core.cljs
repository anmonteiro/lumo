(ns lumo.core)

(defonce
  ^{:dynamic true
    :doc "A sequence of the supplied command line arguments, or nil if
  none were supplied"}
  *command-line-args* nil)

(def *lumo-version*
  "A string containing the version of the Lumo executable."
  js/$$LUMO_GLOBALS.lumoVersion)
