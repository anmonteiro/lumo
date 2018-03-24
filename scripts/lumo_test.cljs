(require '[cljs.test]
         '[lumo.test-runner]
         '[lumo.test-util]
         '[lumo.core :as lumo]
         ;; needs to be here for testing get-completions
         '[goog :as g])

(defmethod cljs.test/report [:cljs.test/default :end-run-tests] [m]
  (when-not (cljs.test/successful? m)
    (lumo/exit 1)))

(defmethod cljs.test/report [:cljs.test/default :error] [m]
  (cljs.test/inc-report-counter! :error)
  (println "\nERROR in" (cljs.test/testing-vars-str m))
  (when (seq (:testing-contexts (cljs.test/get-current-env)))
    (println (cljs.test/testing-contexts-str)))
  (when-let [message (:message m)] (println message))
  (let [actual (:actual m)
        ex-data (ex-data actual)]
    (if (:cljs.spec.alpha/failure ex-data)
      (do (println "expected:" (pr-str (:expected m)))
          (print "  actual:\n")
          (println (.-message actual)))
      (cljs.test/print-comparison m))
    (when lumo.test-util/*print-stack-traces*
      (println (.-stack actual)))))

(defmethod cljs.test/report [:cljs.test/default :fail] [m]
  (cljs.test/inc-report-counter! :error)
  (println "\nERROR in" (cljs.test/testing-vars-str m))
  (when (seq (:testing-contexts (cljs.test/get-current-env)))
    (println (cljs.test/testing-contexts-str)))
  (when-let [message (:message m)] (println message))
  (let [actual (:actual m)
        ex-data (ex-data actual)]
    (if (:cljs.spec.alpha/failure ex-data)
      (do (println "expected:" (pr-str (:expected m)))
          (print "  actual:\n")
          (println (.-message actual)))
      (cljs.test/print-comparison m))
    (when lumo.test-util/*print-stack-traces*
      (println (.-stack actual)))))

(lumo.test-runner/run-all-tests)
