(ns lumo.interop
  (:refer-clojure :exclude [to-array]))

(defn from-array [to a]
  (when (array? a)
    (into to (seq a))))

(defn to-array [v]
  (apply array v))

(defn js-apply
  "Applies a javascript function to a 'this' context and arguments
   args: [f this args]
   returns: result of calling f with args"
  [f this args]
  (.apply f this (to-array args)))

(defn obj->map
  "Turns a javascript object into a map shallowly
   args: [object & [keywordify? val-transform]]
     keywordify?: boolean, keywordify if tru
     val-transform: optional transform fn applied to vals
   returns: map"
  [o & [keywordify? val-transform]]
  (let [ks (seq (.keys js/Object o))]
    (into {} (map (fn [k] [(if keywordify? (keyword k) k)
                           (cond-> (aget o k) val-transform val-transform)])) ks)))
