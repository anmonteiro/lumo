#!build/lumo --classpath=lib/test.check-0.10.0-alpha2.jar:test
(require '[cljs.test]
         '[lumo.test-runner]
         '[lumo.core :as lumo])

(defmethod cljs.test/report [:cljs.test/default :end-run-tests] [m]
  (when-not (cljs.test/successful? m)
    (lumo/exit 1)))

(lumo.test-runner/run-all-tests)
