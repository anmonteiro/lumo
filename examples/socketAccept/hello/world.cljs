(ns hello.world)

;; lumo -c examples/socketAccept -n '{"port":12345, "accept":"hello.world/hello", "args":{"foo":2}}'
(defn hello [socket & args]
  (.end socket (str "\nHello friend.\nYou gave me the following args: " args "\n\n")))
