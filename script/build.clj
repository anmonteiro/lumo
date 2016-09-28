(require '[cljs.build.api :as b])

(cljs.build.api/build (b/inputs "src/cljs")
  {:hashbang false
   :target :nodejs
   :optimizations :simple
   :main 'lumo.core
   :output-dir "out"
   :compiler-stats true
   :verbose true
   :parallel-build true
   :output-to "out/main.js"})
