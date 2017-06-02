(ns hello.world)

(defn hello [socket & args]
  (.end socket (str "\nHello friend.\nYou gave me the following args: " args "\n\n")))
