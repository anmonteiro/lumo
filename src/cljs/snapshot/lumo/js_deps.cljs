(ns lumo.js-deps
  (:require [cljs.tools.reader :as r]))

(defonce ^:private foreign-libs-index (volatile! {}))

(defn foreign-lib? [dep]
  (contains? @foreign-libs-index dep))

(defn- add-foreign-lib
  [index {:keys [provides] :as foreign-lib}]
  (reduce (fn [index lib]
            (assoc index (symbol lib) foreign-lib))
    index provides))

(defn- index-foreign-libs
  [index libs]
  (reduce (fn [index lib]
            (add-foreign-lib index lib))
    index libs))

(defn index-upstream-foreign-libs []
  (doseq [deps-cljs-str (js/$$LUMO_GLOBALS.loadUpstreamForeignLibs)]
    (let [{:keys [foreign-libs]} (r/read-string deps-cljs-str)]
      (vswap! foreign-libs-index index-foreign-libs foreign-libs))))

(defn topo-sort
  [index dep]
  (loop [ret '()
         s  #{dep}]
    (if (empty? s)
      (distinct ret)
      (let [dep (first s)
            requires (map symbol (:requires (get index dep)))]
        (recur (conj ret dep) (into (set (rest s)) requires))))))

(defn files-to-load [dep]
  (let [index @foreign-libs-index]
    (map (comp :file index) (topo-sort index dep))))
