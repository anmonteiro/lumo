(ns lumo.repl
  (:require [cljs.analyzer :as ana]
            [cljs.env :as env]
            [cljs.js :as cljs]
            [cljs.nodejs :as nodejs]
            [cljs.reader :as reader]
            [cljs.tools.reader :as r]
            [clojure.string :as string]
            [cognitect.transit :as transit]))


(defonce ^:private st (cljs/empty-state))

(defonce ^:private current-ns (volatile! 'cljs.user))


;; =============================================================================
;; Analysis cache

(defn- transit-json->cljs
  [json]
  (let [rdr (transit/reader :json)]
    (transit/read rdr json)))

(defn- cljs->transit-json
  [x]
  (let [wtr (transit/writer :json)]
    (transit/write wtr x)))

(defn- load-core-analysis-cache
  [ns-sym file-prefix]
  (let [keys        [:use-macros :excludes :name :imports :requires
                     :uses :defs :require-macros ::ana/constants :doc]
        cache (transit-json->cljs (js/LUMO_LOAD (str file-prefix "json")))]
    (cljs/load-analysis-cache! st ns-sym cache)))

(defn- load-core-analysis-caches
  []
  (load-core-analysis-cache 'cljs.core "cljs/core.cljs.cache.aot.")
  (load-core-analysis-cache 'cljs.core$macros "cljs/core$macros.cljc.cache."))

(defn ^:export read-eval-print-str
  [source-str]
  (binding [cljs/*eval-fn* cljs/js-eval]
      (cljs/eval-str
        st
        source-str
        source-str
        {:ns            @current-ns
         :verbose       true
         :static-fns    false
        ; :source-map    true
         :context       :expr
         :def-emits-var true}
        (fn [{:keys [ns value error] :as ret}]
          (if-not error
            (do
              (println value)
              (vreset! current-ns ns)))
          (when error
            (println "ERROR:" error)))))
  nil)

(defn ^:export get-current-ns []
  @current-ns)

#_(defn- eval
  ([form]
   (eval form (.-name *ns*)))
  ([form ns]
   (let [result (atom nil)]
     (cljs/eval st form
       {:ns            ns
        :context       :expr
        :def-emits-var true}
       (fn [{:keys [value error]}]
         (if error
           (handle-error error true)
           (reset! result value))))
     @result)))
(defn init! []
  (load-core-analysis-caches))
