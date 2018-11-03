(ns lumo.js-deps-tests
  (:require [cljs.test :as t :refer [deftest is testing are]]
            [lumo.js-deps :as deps]))

(deftest topo-sort-test
  ;;   react.dom.server
  ;;           /  \
  ;;         /     \
  ;;        \    react.dom
  ;;         \    /
  ;;         react
  (let [index '{react            {:provides ["react"]}
                react.dom        {:provides ["react.dom"]
                                  :requires ["react"]}
                react.dom.server {:provides ["react.dom.server"]
                                  :requires ["react" "react.dom"]}}]
    (is (= (->> (deps/topo-sort index 'react.dom.server))
           '[react react.dom react.dom.server]))
    (is (= (->> (deps/topo-sort index 'react.dom))
           '[react react.dom]))
    (is (= (->> (deps/topo-sort index 'react))
           '[react]))))

(deftest add-js-libs-test
  (let [js-libs [{:provides ["react"]}
                 {:provides ["react.dom"]
                  :requires ["react"]}
                 {:provides ["react.dom.server"]
                  :requires ["react" "react.dom"]}]]
    (is (= (deps/add-js-libs {} js-libs)
          '{react            {:provides ["react"]}
            react.dom        {:provides ["react.dom"]
                              :requires ["react"]}
            react.dom.server {:provides ["react.dom.server"]
                              :requires ["react" "react.dom"]}}))))

(deftest js-libs-to-load-test
  (with-redefs [deps/js-lib-index
                (volatile! '{react            {:provides ["react"]
                                               :file "react file"}
                             react.dom        {:provides ["react.dom"]
                                               :requires ["react"]
                                               :file "react.dom file"}
                             react.dom.server {:provides ["react.dom.server"]
                                               :requires ["react" "react.dom"]
                                               :file "react.dom.server file"}})]
    (is (= (map :file (deps/js-libs-to-load 'react.dom))
           ["react file" "react.dom file"]))
    (is (= (map :file (deps/js-libs-to-load 'react.dom.server))
           ["react file" "react.dom file" "react.dom.server file"]))
    (is (= (map :file (deps/js-libs-to-load 'react))
           ["react file"]))))
