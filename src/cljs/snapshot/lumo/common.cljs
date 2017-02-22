(ns lumo.common
  (:require [cognitect.transit :as transit]
            [lazy-map.core :refer [lazy-map]]
            [cljs.js :as cljs]))

;; =============================================================================
;; Analysis cache

(def ^:private ^:const JSON_EXT ".json")

(defn- transit-json->cljs
  [json]
  (let [rdr (transit/reader :json)]
    (transit/read rdr json)))

(defn- cljs->transit-json
  [x]
  (let [wtr (transit/writer :json)]
    (transit/write wtr x)))

(defn- load-core-analysis-cache
  [state eager? ns-sym file-prefix]
  (let [keys [:rename-macros :renames :use-macros :excludes :name :imports
              :requires :uses :defs :require-macros :cljs.analyzer/constants :doc]]
    (letfn [(load-key [key]
              (let [resource (js/$$LUMO_GLOBALS.load (str file-prefix (munge key) JSON_EXT))]
                (transit-json->cljs resource)))
            (lazy-load-key [key]
              (load-key key))]
      (cljs/load-analysis-cache! state ns-sym
        (if eager?
          (zipmap keys (map load-key keys))
          (lazy-map
            {:rename-macros           (lazy-load-key :rename-macros)
             :renames                 (lazy-load-key :renames)
             :use-macros              (lazy-load-key :use-macros)
             :excludes                (lazy-load-key :excludes)
             :name                    (lazy-load-key :name)
             :imports                 (lazy-load-key :imports)
             :requires                (lazy-load-key :requires)
             :uses                    (lazy-load-key :uses)
             :defs                    (lazy-load-key :defs)
             :require-macros          (lazy-load-key :require-macros)
             :cljs.analyzer/constants (lazy-load-key :cljs.analyzer/constants)
             :doc                     (lazy-load-key :doc)}))))))

(defn- load-core-analysis-caches [state eager?]
  (load-core-analysis-cache state eager? 'cljs.core "cljs/core.cljs.cache.aot.")
  (load-core-analysis-cache state eager? 'cljs.core$macros "cljs/core$macros.cljc.cache."))
