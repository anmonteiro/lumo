(ns lumo.repl
  (:require [cljs.js :as cljs]))

(defonce ^:private st (cljs/empty-state))

(defonce ^:private current-ns (volatile! 'cljs.user))

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
