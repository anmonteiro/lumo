(ns lumo.repl-resources)

(def special-doc-map
  '{. {:forms [(.instanceMethod instance args*)
               (.-instanceField instance)]
       :doc "The instance member form works for methods and fields.
  They all expand into calls to the dot operator at macroexpansion time."}
    ns {:forms [(name docstring? attr-map? references*)]
        :doc "You must currently use the ns form only with the following caveats

    * You must use the :only form of :use
    * :require supports :as, :refer, and :rename
      - all options can be skipped
      - in this case a symbol can be used as a libspec directly
        - that is, (:require lib.foo) and (:require [lib.foo]) are both
          supported and mean the same thing
      - :rename specifies a map from referred var names to different
        symbols (and can be used to prevent clashes)
      - prefix lists are not supported
    * The only options for :refer-clojure are :exclude and :rename
    * :import is available for importing Google Closure classes
      - ClojureScript types and records should be brought in with :use
        or :require :refer, not :import ed
    * Macros must be defined in a different compilation stage than the one
      from where they are consumed. One way to achieve this is to define
      them in one namespace and use them from another. They are referenced
      via the :require-macros / :use-macros options to ns
      - :require-macros and :use-macros support the same forms that
        :require and :use do

  Implicit macro loading: If a namespace is required or used, and that
  namespace itself requires or uses macros from its own namespace, then
  the macros will be implicitly required or used using the same
  specifications. Furthermore, in this case, macro vars may be included
  in a :refer or :only spec. This oftentimes leads to simplified library
  usage, such that the consuming namespace need not be concerned about
  explicitly distinguishing between whether certain vars are functions
  or macros. For example:

  (ns testme.core (:require [cljs.test :as test :refer [test-var deftest]]))

  will result in test/is resolving properly, along with the test-var
  function and the deftest macro being available unqualified.

  Inline macro specification: As a convenience, :require can be given
  either :include-macros true or :refer-macros [syms...]. Both desugar
  into forms which explicitly load the matching Clojure file containing
  macros. (This works independently of whether the namespace being
  required internally requires or uses its own macros.) For example:

  (ns testme.core
  (:require [foo.core :as foo :refer [foo-fn] :include-macros true]
            [woz.core :as woz :refer [woz-fn] :refer-macros [app jx]]))

  is sugar for

  (ns testme.core
  (:require [foo.core :as foo :refer [foo-fn]]
            [woz.core :as woz :refer [woz-fn]])
  (:require-macros [foo.core :as foo]
                   [woz.core :as woz :refer [app jx]]))

  Auto-aliasing clojure namespaces: If a non-existing clojure.* namespace
  is required or used and a matching cljs.* namespace exists, the cljs.*
  namespace will be loaded and an alias will be automatically established
  from the clojure.* namespace to the cljs.* namespace. For example:

  (ns testme.core (:require [clojure.test]))

  will be automatically converted to

  (ns testme.core (:require [cljs.test :as clojure.test]))"}
    def {:forms [(def symbol doc-string? init?)]
         :doc "Creates and interns a global var with the name
  of symbol in the current namespace (*ns*) or locates such a var if
  it already exists.  If init is supplied, it is evaluated, and the
  root binding of the var is set to the resulting value.  If init is
  not supplied, the root binding of the var is unaffected."}
    do {:forms [(do exprs*)]
        :doc "Evaluates the expressions in order and returns the value of
  the last. If no expressions are supplied, returns nil."}
    if {:forms [(if test then else?)]
        :doc "Evaluates test. If not the singular values nil or false,
  evaluates and yields then, otherwise, evaluates and yields else. If
  else is not supplied it defaults to nil."}
    new {:forms [(Constructor. args*) (new Constructor args*)]
         :url "java_interop#new"
         :doc "The args, if any, are evaluated from left to right, and
  passed to the JavaScript constructor. The constructed object is
  returned."}
    quote {:forms [(quote form)]
           :doc "Yields the unevaluated form."}
    recur {:forms [(recur exprs*)]
           :doc "Evaluates the exprs in order, then, in parallel, rebinds
  the bindings of the recursion point to the values of the exprs.
  Execution then jumps back to the recursion point, a loop or fn method."}
    set! {:forms[(set! var-symbol expr)
                 (set! (.- instance-expr instanceFieldName-symbol) expr)]
          :url "vars#set"
          :doc "Used to set vars and JavaScript object fields"}
    throw {:forms [(throw expr)]
           :doc "The expr is evaluated and thrown."}
    try {:forms [(try expr* catch-clause* finally-clause?)]
         :doc "catch-clause => (catch classname name expr*)
  finally-clause => (finally expr*)
  Catches and handles JavaScript exceptions."}
    var {:forms [(var symbol)]
         :doc "The symbol must resolve to a var, and the Var object
itself (not its value) is returned. The reader macro #'x expands to (var x)."}})

#_(defn- special-doc [name-symbol]
  (assoc (or (special-doc-map name-symbol) (meta (resolve name-symbol)))
    :name name-symbol
    :special-form true))

(def repl-special-doc-map
  '{in-ns {:arglists ([name])
           :doc "Sets *cljs-ns* to the namespace named by the symbol, creating it if needed."}
    require {:arglists ([& args])
             :doc "  Loads libs, skipping any that are already loaded. Each argument is
  either a libspec that identifies a lib or a flag that modifies how all the identified
  libs are loaded. Use :require in the ns macro in preference to calling this
  directly.

  Libs

  A 'lib' is a named set of resources in classpath whose contents define a
  library of ClojureScript code. Lib names are symbols and each lib is associated
  with a ClojureScript namespace. A lib's name also locates its root directory
  within classpath using Java's package name to classpath-relative path mapping.
  All resources in a lib should be contained in the directory structure under its
  root directory. All definitions a lib makes should be in its associated namespace.

  'require loads a lib by loading its root resource. The root resource path
  is derived from the lib name in the following manner:
  Consider a lib named by the symbol 'x.y.z; it has the root directory
  <classpath>/x/y/, and its root resource is <classpath>/x/y/z.clj. The root
  resource should contain code to create the lib's namespace (usually by using
  the ns macro) and load any additional lib resources.

  Libspecs

  A libspec is a lib name or a vector containing a lib name followed by
  options expressed as sequential keywords and arguments.

  Recognized options:
  :as takes a symbol as its argument and makes that symbol an alias to the
    lib's namespace in the current namespace.
  :refer takes a list of symbols to refer from the namespace..
  :refer-macros takes a list of macro symbols to refer from the namespace.
  :include-macros true causes macros from the namespace to be required.

  Flags

  A flag is a keyword.
  Recognized flags: :reload, :reload-all, :verbose
  :reload forces loading of all the identified libs even if they are
    already loaded
  :reload-all implies :reload and also forces loading of all libs that the
    identified libs directly or indirectly load via require or use
  :verbose triggers printing information about each load, alias, and refer

  Example:

  The following would load the library clojure.string :as string.

  (require '[clojure/string :as string])"}
    require-macros {:arglists ([& args])
                    :doc "Similar to the require REPL special function but
    only for macros."}
    use {:arglists ([& args])
         :doc "Like require, but referring vars specified by the mandatory
  :only option.

  Example:

  The following would load the library clojure.set while referring
  the intersection var.

  (use '[clojure.set :only [intersection]])"}
    use-macros {:arglists ([& args])
                :doc "Similar to the use REPL special function but
    only for macros."}
    refer-clojure {:arglists ([& args])
                   :doc "Refers to all the public vars of `cljs.core`, subject to
  filters.
  Filters can include at most one each of:

  :exclude list-of-symbols
  :rename map-of-fromsymbol-tosymbol

  Filters can be used to select a subset, via exclusion, or to provide a mapping
  to a symbol different from the var's name, in order to prevent clashes."}
    import {:arglists ([& import-symbols-or-lists])
            :doc "import-list => (closure-namespace constructor-name-symbols*)

  For each name in constructor-name-symbols, adds a mapping from name to the
  constructor named by closure-namespace to the current namespace. Use :import in the ns
  macro in preference to calling this directly."}
    load-file {:arglists ([name])
               :doc "Sequentially read and evaluate the set of forms contained in the file."}})

#_(defn- repl-special-doc [name-symbol]
  (assoc (repl-special-doc-map name-symbol)
    :name name-symbol
    :repl-special-function true))
