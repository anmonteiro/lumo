(ns lumo.core
  (:require [lumo.repl :as repl]))

(goog-define
  ^{:doc "A string containing the version of the Lumo executable."}
  *lumo-version* "")

(defonce
  ^{:dynamic true
    :doc "A sequence of the supplied command line arguments, or nil if
  none were supplied"}
  *command-line-args* nil)

(defn eval
  "Evaluates the form data structure (not text!) and returns the result."
  [form]
  (repl/eval form))
