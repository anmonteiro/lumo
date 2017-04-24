(ns lumo.repl)

(defmacro dir
  "Prints a sorted directory of public vars in a namespace"
  [nsname]
  `(lumo.repl/dir* '~nsname))

(defmacro doc
  "Prints documentation for a var or special form given its name"
  [name]
  `(lumo.repl/doc* '~name))

(defmacro source
  "Prints the source code for the given symbol, if it can find it.
  This requires that the symbol resolve to a Var defined in a
  namespace for which the source is available.

  Example: (source filter)"
  [n]
  `(lumo.repl/source* '~n))
