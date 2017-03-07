(ns hello.world)

(defn hello [socket]
  (.end socket "\nHello friend.\n\n"))
