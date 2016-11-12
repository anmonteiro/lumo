(ns lumo.repl-tests
  (:require [cljs.test :refer [deftest is]]
            [lumo.repl :as lumo]))

(set! js/parinfer (js/require "parinfer"))

(deftest test-is-readable?
  (is (false? (lumo/is-readable? "(")))
  (is (= (lumo/is-readable? "(+ 1 2)") ""))
  (is (= (lumo/is-readable? "(+ 1 2) :foo") " :foo"))
  (is (= (lumo/is-readable? "") ""))
  (is (= (lumo/is-readable? ")") "")))

(deftest indent-space-count-test
  (is (= (lumo/indent-space-count "(let [") 6))
  (is (= (lumo/indent-space-count "(do") 1))
  (is (= (lumo/indent-space-count "(let [a 1") 6)))
