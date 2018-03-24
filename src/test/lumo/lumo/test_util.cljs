(ns lumo.test-util
  (:require [cljs.nodejs :as node]
            [cljs.js :as cljs]
            [lumo.common :as common]
            [lumo.repl]
            fs
            os
            path)
  (:require-macros [cljs.env.macros :as env]))

(def ^:dynamic *print-stack-traces* true)

(def lumo-env? (exists? js/$$LUMO_GLOBALS))

(defn with-lumo-globals [f]
  (set! (. js/global -$$LUMO_GLOBALS)
    #js {:getJSCompletions (fn [_ _ cb] (cb #js ["js/console"]))
         :loadUpstreamDataReaders (constantly {})})
  (f)
  (set! (. js/global -$$LUMO_GLOBALS) nil))

(defn read-file-sync [file-path & [encoding-or-opts]]
  (try
    (fs/readFileSync file-path encoding-or-opts)
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
    (reset! lumo.repl/st @st)
    (env/with-compiler-env st
      (f))))

(defn tmp-dir []
  (os/tmpdir))

(defn delete-out-files
  [dir]
  (let [files (try
                (fs/readdirSync dir)
                (catch :default _))]
    (doseq [file files]
      (let [filename (path/join dir file)
            stat (fs/lstatSync filename)]
        (if (.isDirectory stat)
          (delete-out-files filename)
          (fs/unlinkSync filename))))
    (try
      (fs/rmdirSync dir)
      (catch :default _))))

(defn delete-node-modules []
  (delete-out-files "node_modules"))

(defn platform-path [path]
  (.replace path (js/RegExp. "/" "g") (.charAt path/sep 0)))
