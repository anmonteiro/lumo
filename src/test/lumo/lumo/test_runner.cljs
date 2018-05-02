(ns lumo.test-runner
  (:require [clojure.test :as t :refer [run-tests]]
            lumo.lumo-build-api-tests
            lumo.js-deps-tests
            lumo.repl-tests
            lumo.closure-tests
            lumo.build-api-tests
            lumo.util-tests))

(defn run-all-tests []
  (run-tests
   'lumo.repl-tests
   'lumo.js-deps-tests
   'lumo.util-tests
   'lumo.closure-tests
   'lumo.build-api-tests
   'lumo.lumo-build-api-tests))
