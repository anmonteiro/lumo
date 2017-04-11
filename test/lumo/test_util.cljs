(ns lumo.test-util
  (:require [cljs.nodejs :as node]
            [cljs.js :as cljs]
            [lumo.common :as common])
  (:require-macros [cljs.env.macros :as env]))

(defn with-lumo-globals [f]
  (set! (. js/global -$$LUMO_GLOBALS)
    #js {:parinfer (node/require "parinfer")
         :getJSCompletions (fn [_ _ cb] (cb #js ["js/console"]))})
  (f)
  (set! (. js/global -$$LUMO_GLOBALS) nil))

(def fs (js/require "fs"))

(defn read-file-sync [file-path & [encoding-or-opts]]
  (try
    (.readFileSync fs file-path encoding-or-opts)
    (catch :default e nil)))

;; For the cache source folder, the test id needs to become:
;;   lumo_test/test_suite => test_suite.out/
(def cljs-core-cache-path "test_suite.out/cljs/core.cljs.cache.json")
(def cljs-core-macros-cache-path "test_suite.out/cljs/core$macros.cljc.cache.json")

(defn with-cache [f]
  (let [st (cljs/empty-state)]
    (cljs/load-analysis-cache! st 'cljs.core
                               (-> cljs-core-cache-path
                                   read-file-sync
                                   common/transit-json->cljs))
    (cljs/load-analysis-cache! st 'cljs.core$macros
                               (-> cljs-core-macros-cache-path
                                   read-file-sync
                                   common/transit-json->cljs))
    (env/with-compiler-env st
      (f))))
