(ns instrument.core
  "The entry point of this program"
  (:require [cljs.spec.test.alpha :as stest]))

(stest/instrument)

(defn -main
  [& args]
  (println "Hello world!")
  (process.exit 0))

(set! *main-cli-fn* `-main)
