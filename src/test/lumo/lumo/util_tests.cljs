(ns lumo.util-tests
  (:require [clojure.test :as t :refer [deftest testing is]]
            [lumo.util :as util]
            path))

(deftest test-levenshtein-distance
  (testing "levenshtein-distance"
    (is (= 0 (util/levenshtein-distance "abc" "abc")))
    (is (= 1 (util/levenshtein-distance "abc" "abcd")))
    (is (= 1 (util/levenshtein-distance "abcd" "abc")))
    (is (= 3 (util/levenshtein-distance "kitten" "sitting")))))

(deftest test-suggestion
  (testing "suggestion"
    (is (= ":optimization" (util/suggestion 3 ":optimization" [":optimization" ":static-fns"])))))

(deftest test-unknown-opts
  (testing "unknown-opts"
    (is (= [[:bogus nil]
            [:optimisations :optimizations]]
          (sort (util/unknown-opts #{:optimisations :bogus} #{:optimizations :static-fns}))))))

(deftest test-relative-name
  (if util/windows?
    (let [initial js/process.cwd]
      (set! js/process.cwd (constantly "C:\\Users\\anmonteiro\\Downloads\\clojurescript-master"))
      (is (= (util/relative-name "C:\\Users\\anmonteiro\\Downloads\\clojurescript-master\\out\\index.js")
             "out\\index.js"))
      (is (= (util/relative-name "C:\\Users\\anmonteiro\\Downloads\\clojurescript-master\\node_modules\\lodash\\array.js")
             "node_modules\\lodash\\array.js"))
      (set! js/process.cwd initial))
    ;; Non-windows
    (let [initial js/process.cwd]
      (set! js/process.cwd (constantly "/Users/user/clojurescript"))
      (is (= (util/relative-name "/Users/user/clojurescript/out/index.js")
             "out/index.js"))
      (is (= (util/relative-name "/Users/user/clojurescript/out/index.js")
             "out/index.js"))
      (set! js/process.cwd initial))))

(deftest test-path
  (is (= (path/resolve "src/main/clojure/cljs/closure.clj")
         (util/path "src/main/clojure/cljs/closure.clj"))))
