(ns lumo.build.api
  (:require [lumo.closure :as closure]
            [lumo.util :as util]
            [cljs.analyzer :as ana]
            [cljs.env :as env]
            [lumo.io :as io]))

(defn build
  "Given a source which can be compiled, produce runnable JavaScript."
  ([source opts]
   (build source opts
     (env/default-compiler-env
       (closure/add-externs-sources opts))))
  ([source opts compiler-env]
   (doseq [[unknown-opt suggested-opt] (util/unknown-opts (set (keys opts)) closure/known-opts)]
     (when suggested-opt
       (println (str "WARNING: Unknown compiler option '" unknown-opt "'. Did you mean '" suggested-opt "'?"))))
   (binding [ana/*cljs-warning-handlers* (:warning-handlers opts ana/*cljs-warning-handlers*)]
     (closure/build source opts compiler-env))))

(defn inputs
  "Given a list of directories and files, return a compilable object that may
  be passed to build or watch."
  [& xs]
  (reify
    closure/Inputs
    (-paths [_]
      xs)
    closure/Compilable
    (-compile [_ opts cb]
      (letfn [(compile-input [x cb]
                (closure/-compile x opts
                  (fn [compiled]
                    (cb (if (sequential? compiled)
                          compiled
                          [compiled])))))]
        (closure/mapcat-async compile-input xs cb)))
    (-find-sources [_ opts]
      (mapcat #(closure/-find-sources % opts) xs))))
