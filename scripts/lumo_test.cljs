(require '[cljs.test]
         '[lumo.test-runner]
         '[lumo.core :as lumo]
         ;; needs to be here for testing get-completions
         '[goog :as g])

(def ^:dynamic *print-stack-traces* true)

(defmethod cljs.test/report [:cljs.test/default :end-run-tests] [m]
  (when-not (cljs.test/successful? m)
    (lumo/exit 1)))

(defmethod cljs.test/report [:cljs.test/default :error] [m]
  (cljs.test/inc-report-counter! :error)
  (println "\nERROR in" (cljs.test/testing-vars-str m))
  (when (seq (:testing-contexts (cljs.test/get-current-env)))
    (println (cljs.test/testing-contexts-str)))
  (when-let [message (:message m)] (println message))
  (cljs.test/print-comparison m)
  (when *print-stack-traces*
    (println (.-stack (:actual m)))))

(lumo.test-runner/run-all-tests)
