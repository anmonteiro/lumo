(ns foo.core
  (:require [react :refer [createElement]]
            ["react-dom/server" :refer [renderToStaticMarkup]]))

(println "hi" (renderToStaticMarkup (react/DOM.div nil "Hello World!")))
