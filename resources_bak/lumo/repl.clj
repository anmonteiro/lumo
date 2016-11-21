(ns lumo.repl)

(defmacro doc
  "Prints documentation for a var or special form given its name"
  [name]
  `(lumo.repl/doc* '~name))
