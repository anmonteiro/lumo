(set-env!
 :source-paths    #{"src/cljs"}
 :resource-paths  #{"src/js"}
 :dependencies '[[org.clojure/clojurescript   "1.9.229"        :scope "provided"]
                 [com.cognitect/transit-clj   "0.8.288"        :scope "test"]
                 [com.cemerick/piggieback     "0.2.1"          :scope "test"]
                 [adzerk/boot-cljs            "1.7.228-1"      :scope "test"]
                 [adzerk/boot-cljs-repl       "0.3.3"          :scope "test"]
                 [adzerk/boot-reload          "0.4.12"         :scope "test"]
                 [org.clojure/tools.nrepl     "0.2.12"         :scope "test"]
                 [weasel                      "0.7.0"          :scope "test"]])

(require
 '[adzerk.boot-cljs      :refer [cljs]]
 '[adzerk.boot-cljs-repl :refer [cljs-repl-env start-repl]]
 '[adzerk.boot-reload    :refer [reload]]
 '[clojure.java.io :as io])

(deftask add-node-modules []
  (with-pre-wrap fileset
    (let [nm (io/file "node_modules")]
      (when-not (and (.exists nm) (.isDirectory nm))
        (dosh "npm" "install" "react"))
      (-> fileset
        (add-resource (io/file ".") :include #{#"^node_modules/"})
        commit!))))

(deftask webpack []
  (with-pass-thru _
    (dosh "npm" "run" "build")))

(deftask dev []
  (comp
    (add-node-modules)
    (watch)
    (speak)
    (cljs :source-map true
          :compiler-options {:hashbang false
                             :target :nodejs
                             :optimizations :simple
                             :main 'lumo.core
                             :compiler-stats true
                             :parallel-build true})
    (target)
    (webpack)))
