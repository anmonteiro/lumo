(ns lumo.repl-tests
  (:require [cljs.test :refer [deftest is]]
            [lumo.repl :as lumo]))

(deftest test-is-readable?
  (is (false? (lumo/is-readable? "(")))
  (is (= (lumo/is-readable? "(+ 1 2)") ""))
  (is (= (lumo/is-readable? "(+ 1 2) :foo") " :foo"))
  (is (= (lumo/is-readable? "") ""))
  (is (= (lumo/is-readable? ")") "")))
