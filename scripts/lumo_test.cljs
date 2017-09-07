(require '[cljs.test]
         '[lumo.test-runner]
         '[lumo.core :as lumo]
         ;; needs to be here for testing get-completions
         '[goog :as g])

(defmethod cljs.test/report [:cljs.test/default :end-run-tests] [m]
  (when-not (cljs.test/successful? m)
    (lumo/exit 1)))

(lumo.test-runner/run-all-tests)
