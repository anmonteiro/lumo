(ns lumo.repl)

(defmacro dir
  "Prints a sorted directory of public vars in a namespace"
  [nsname]
  `(lumo.repl/dir* '~nsname))

(defmacro doc
  "Prints documentation for a var or special form given its name"
  [name]
  `(lumo.repl/doc* '~name))
