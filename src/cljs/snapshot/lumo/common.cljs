(ns lumo.common
  (:require [cognitect.transit :as transit]
            [lazy-map.core :refer [lazy-map]]
            [cljs.js :as cljs]))

;; =============================================================================
;; Analysis cache

(def ^:private ^:const JSON_EXT ".json")

(defn transit-json->cljs
  [json]
  (let [rdr (transit/reader :json)]
    (transit/read rdr json)))

(defn cljs->transit-json
  [x]
  (let [wtr (transit/writer :json)]
    (transit/write wtr x)))

(defn- load-core-analysis-cache
  [state eager? ns-sym file-prefix]
  (let [keys [:rename-macros :renames :use-macros :excludes :name :imports
              :requires :uses :defs :require-macros :cljs.analyzer/constants :doc]]
    (letfn [(load-key [key]
              (let [resource (js/$$LUMO_GLOBALS.load (str file-prefix (munge key) JSON_EXT))]
                (transit-json->cljs resource)))]
      (cljs/load-analysis-cache! state ns-sym
        (if eager?
          (zipmap keys (map load-key keys))
          (lazy-map
            {:rename-macros           (load-key :rename-macros)
             :renames                 (load-key :renames)
             :use-macros              (load-key :use-macros)
             :excludes                (load-key :excludes)
             :name                    (load-key :name)
             :imports                 (load-key :imports)
             :requires                (load-key :requires)
             :uses                    (load-key :uses)
             :defs                    (load-key :defs)
             :require-macros          (load-key :require-macros)
             :cljs.analyzer/constants (load-key :cljs.analyzer/constants)
             :doc                     (load-key :doc)}))))))

(defn- load-core-analysis-caches [state eager?]
  (load-core-analysis-cache state eager? 'cljs.core "cljs/core.cljs.cache.aot.")
  (load-core-analysis-cache state eager? 'cljs.core$macros "cljs/core$macros.cljc.cache."))

;; Copied from bundled/lumo/util.cljs
(defn file-seq
  "If the given file is not a directory, returns a list containing the file,
   otherwise returns a list of files within the directory, included all nested ones."
  [file]
  (tree-seq
    (fn [f] (.isDirectory (js/$$LUMO_GLOBALS.fs.statSync f)))
    (fn [d] (map #(js/$$LUMO_GLOBALS.path.join d %) (js/$$LUMO_GLOBALS.fs.readdirSync d)))
    file))
