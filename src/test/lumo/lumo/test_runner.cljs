(ns lumo.test-runner
  (:require [clojure.test :refer [run-tests]]
            lumo.js-deps-tests
            lumo.repl-tests
            lumo.closure-tests
            lumo.build-api-tests
            lumo.util-tests))

(defn run-all-tests []
  (run-tests
   ;; 'lumo.repl-tests
   ;; 'lumo.js-deps-tests
   ;; 'lumo.closure-tests
   'lumo.build-api-tests
   #_'lumo.util-tests))
