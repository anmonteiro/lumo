(ns lumo.json)

(defn read-str [s & {:keys [key-fn]}]
  (let [r (js->clj (js/JSON.parse s))]
    (cond->> r
      (some? key-fn)
      (into {} (map (fn [[k v]] [(key-fn k) v]))))))

(defn write-str [m]
  (js/JSON.stringify (clj->js m)))
