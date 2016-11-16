(ns lumo.repl-tests
  (:require [cljs.nodejs :as node]
            [cljs.test :refer [deftest is]]
            [lumo.repl :as lumo]))

(set! js/parinfer (node/require "parinfer"))

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

(deftest test-form-start
  (is (= (lumo/form-start "( )" 2) 0))
  (is (= (lumo/form-start "(let [a 1\nb 2])" 13) 5))
  (is (= (lumo/form-start "#{1 2 3}" 7) 1))
  (is (= (lumo/form-start "(+ 1 2" 5) nil))
  (is (= (lumo/form-start "(let [a 1\n      b 2\n      c 3]" 29) 5))
  (is (= (lumo/form-start "(())" 3) 0)))

(deftest test-get-highlight-coords
  (is (= (js->clj (lumo/get-highlight-coordinates #js ["(+ 1 2)"] 6)) [0 0]))
  (is (= (js->clj (lumo/get-highlight-coordinates #js ["(+ 1 2"] 5)) [-1 -1]))
  (is (= (js->clj (lumo/get-highlight-coordinates #js ["(+ 1 2" ")"] 0)) [0 1]))
  (is (= (js->clj (lumo/get-highlight-coordinates
                    #js ["(let [a 1" "      b 2" "      c 3]"] 9))
         [5 2]))
  (is (= (js->clj (lumo/get-highlight-coordinates #js ["(let [a 1)"] 9)) [-1 -1]))
  (is (= (js->clj (lumo/get-highlight-coordinates #js ["(let [a 1])"] 9)) [5 0]))
  (is (= (js->clj (lumo/get-highlight-coordinates
                    #js ["(let [a 1" "" "      b 2" "      c 3]"] 9))
         [5 3]))
  (is (= (js->clj (lumo/get-highlight-coordinates #js ["(())"] 3)) [0 0])))
