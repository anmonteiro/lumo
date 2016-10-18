(ns lumo.js-deps-tests
  (:require [cljs.test :refer [deftest is testing are]]
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

(deftest index-foreign-libs-test
  (let [flibs [{:provides ["react"]}
               {:provides ["react.dom"]
                :requires ["react"]}
               {:provides ["react.dom.server"]
                :requires ["react" "react.dom"]}]]
    (is (= (deps/index-foreign-libs {} flibs)
          '{react            {:provides ["react"]}
            react.dom        {:provides ["react.dom"]
                              :requires ["react"]}
            react.dom.server {:provides ["react.dom.server"]
                              :requires ["react" "react.dom"]}}))))

(deftest test-files-to-load
  (with-redefs [deps/foreign-libs-index
                (volatile! '{react            {:provides ["react"]
                                               :file "react file"}
                             react.dom        {:provides ["react.dom"]
                                               :requires ["react"]
                                               :file "react.dom file"}
                             react.dom.server {:provides ["react.dom.server"]
                                               :requires ["react" "react.dom"]
                                               :file "react.dom.server file"}})]
    (is (= (deps/files-to-load 'react.dom)
           ["react file" "react.dom file"]))
    (is (= (deps/files-to-load 'react.dom.server)
           ["react file" "react.dom file" "react.dom.server file"]))
    (is (= (deps/files-to-load 'react)
           ["react file"]))))
