(ns ^{:doc "For importing a new test make sure that:
 - you get rid of all the io/file, in lumo you can pass the string path directly
 - you transform .getAbsolutePath to path/resolve
 - you transform .delete to fs/unlinkSync"}
    lumo.lumo-build-api-tests
  (:require-macros [cljs.env.macros :as env]
                   [cljs.analyzer.macros :as ana])
  (:require [clojure.test :as t :refer [deftest is testing async use-fixtures]]
            [cljs.env :as env]
            [cljs.analyzer :as ana]
            [lumo.test-util :as test]
            [lumo.build.api :as build]
            fs
            path))

(deftest lumo-273-test
  (let [out (path/join (test/tmp-dir) "lumo-273-test-out")
        root "src/test/cljs_build"]
    (testing ":optimizations :none"
      (test/delete-out-files out)
      (is (build/build
           (build/inputs (path/join root "test_check"))
           {:main 'test-check.core
            :optimizations :none
            :output-dir out}
           (env/default-compiler-env)) "It should successfully compile with :optimizations :none")
      (test/delete-out-files out))))

(deftest lumo-308-test
  (let [out (path/join (test/tmp-dir) "lumo-308-test-out")
        root "src/test/cljs_build"
        warning-handlers [(fn [warning-type env extra]
                            (when-let [w (warning-type ana/*cljs-warnings*)]
                              (let [err (ana/error-message warning-type extra)]
                                (println "WARNING:" (ana/message env err))
                                (is (not= warning-type :undeclared-var) "when compiling twice, it should not emit a WARNING for cljs.spec.test.alpha/instrument the second time"))))]]
    (testing "correctly cljs.js/ns-side-effects on read analysis cache"
      (test/delete-out-files out)
      (build/build
       (build/inputs (path/join root "instrument"))
       {:main 'instrument.core
        :optimizations :none
        :warning-handlers warning-handlers
        :output-dir out}
       (env/default-compiler-env))
      (build/build
        (build/inputs (path/join root "instrument"))
        {:main 'instrument.core
         :optimizations :none
         :warning-handlers warning-handlers
         :output-dir out}
        (env/default-compiler-env))
      (test/delete-out-files out)
      (set! ana/*cljs-warning-handlers* ana/default-warning-handler))))
