(ns hello.world)

(defn hello [socket & args]
  (println "Hello World Args: " args)
  (.end socket "\nHello friend.\n\n"))
