(ns lumo.build.api
  (:require [lumo.closure :as closure]
            [lumo.util :as util]
            [cljs.analyzer :as ana]
            [cljs.env :as env]
            [lumo.io :as io]))

(defn target-file-for-cljs-ns
  "Given an output directory and a clojurescript namespace return the
  compilation target file for that namespace.
  For example:
  (target-file-from-cljs-ns \"resources/out\" 'example.core) ->
  <File: \"resources/out/example/core.js\">"
  ([ns-sym] (closure/target-file-for-cljs-ns ns-sym nil))
  ([ns-sym output-dir] (closure/target-file-for-cljs-ns ns-sym output-dir)))

(defn cljs-dependents-for-macro-namespaces
  "Takes a list of Clojure (.clj) namespaces that define macros and
  returns a list ClojureScript (.cljs) namespaces that depend on those macro
  namespaces.

  For example where example.macros is defined in the clojure file
  \"example/macros.clj\" and both 'example.core and 'example.util are
  ClojureScript namespaces that require and use the macros from
  'example.macros :
  (cljs-dependents-for-macro-namespaces 'example.macros) ->
  ('example.core 'example.util)"
  ([namespaces]
   (closure/cljs-dependents-for-macro-namespaces
     (if-not (nil? env/*compiler*)
       env/*compiler*
       (env/default-compiler-env))
     namespaces))
  ([state namespaces]
   (closure/cljs-dependents-for-macro-namespaces state namespaces)))

(defn build
  "Given a source which can be compiled, produce runnable JavaScript."
  ([source opts]
   (build source opts nil (fn [& args] args)))
  ([source opts compiler-env-or-cb]
   (if (goog/isFunction compiler-env-or-cb)
     (build source opts nil compiler-env-or-cb)
     (build source opts compiler-env-or-cb (fn [& args] args))))
  ([source opts compiler-env cb]
   (doseq [[unknown-opt suggested-opt] (util/unknown-opts (set (keys opts)) closure/known-opts)]
     (when suggested-opt
       (println (str "WARNING: Unknown compiler option '" unknown-opt "'. Did you mean '" suggested-opt "'?"))))
   (binding [ana/*cljs-warning-handlers* (:warning-handlers opts ana/*cljs-warning-handlers*)]
     (closure/build source opts
                    (if (some? compiler-env)
                      compiler-env
                      (env/default-compiler-env
                       (closure/add-externs-sources opts))) cb))))

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
