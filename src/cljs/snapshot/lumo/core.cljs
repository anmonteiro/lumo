(ns lumo.core
  (:refer-clojure :exclude [eval])
  (:require [lumo.repl :as repl]))

(goog-define
  ^{:doc "A string containing the version of the Lumo executable."}
  *lumo-version* "")

(defn eval
  "Evaluates the form data structure (not text!) and returns the result."
  [form]
  (cljs.core/eval form))

(defn exit
  "Causes Lumo to exit with the supplied exit code. If no exit code is
   provided, exits with 0."
  ([] (exit nil))
  ([code]
   (js/process.exit code)))
