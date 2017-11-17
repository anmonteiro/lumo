Running Lumo
============

Simply enter ``lumo`` at the command prompt to start up a Lumo REPL::

  $ lumo
  Lumo 1.8.0-beta
  ClojureScript 1.9.927
  Node.js v8.5.0
   Docs: (doc function-name-here)
         (find-doc "part-of-name-here")
   Source: (source function-name-here)
   Exit: Control+D or :cljs/quit or exit

  cljs.user=>

If you are familiar with the standard Clojure REPL, this is much the same.
You enter ClojureScript expressions, and they are evaulated, and the results printed.

Lumo is more than just a REPL, the ``-h`` option lists all the
available options::

  $ lumo -h
  Lumo 1.8.0-beta
  Usage:  lumo [init-opt*] [main-opt] [arg*]

    With no options or args, runs an interactive Read-Eval-Print Loop

    init options:
      -i, --init path              Load a file or resource
      -e, --eval string            Evaluate expressions in string; print
                                   non-nil values
      -c cp, --classpath cp        Use colon-delimited cp (semi-colon-delimited on
                                   Windows) for source directories and JARs
      -D dep, --dependencies dep   Use comma-separated list of dependencies to
                                   look for in the local Maven repository.
                                   Dependencies should be specified in the form
                                   `SYM:VERSION` (e.g.: foo/bar:1.2.3).
      -L path, --local-repo path   Path to the local Maven repository where Lumo
                                   will look for dependencies. Defaults to
                                   `~/.m2/repository`.
      -K, --auto-cache             Create and use .lumo_cache dir for cache
      -k, --cache path             If dir exists at path, use it for cache
      -q, --quiet                  Quiet mode; doesn't print the banner
      -v, --verbose                Emit verbose diagnostic output
      -d, --dumb-terminal          Disable line editing / VT100 terminal
                                   control
      -s, --static-fns             Generate static dispatch function calls
      -f, --fn-invoke-direct       Do not not generate `.call(null...)` calls
                                   for unknown functions, but instead direct
                                   invokes via `f(a0,a1...)`.
      -A x, --checked-arrays x     Enables checked arrays where x is either warn
                                   or error.
      -n opts, --socket-repl x     Enable a socket REPL where x is port, IP:port
                                   or JSON of the following form, where port is
                                   required:
                                   {"host":   "localhost",
                                    "port":   12345,
                                    "accept": "some.namespaced.clojure/fn",
                                    "args":   ["args", {"for": "the accept fn"}]}

    main options:
      -m ns-name, --main=ns-name   Call the -main function from a namespace
                                   with args
      -r, --repl                   Run a repl
      path                         Run a script from a file or resource
      -                            Run a script from standard input
      -h, -?, --help               Print this help message and exit
      -l, --legal                  Show legal info (licenses and copyrights)

    The init options may be repeated and mixed freely, but must appear before
    any main option.

    Paths may be absolute or relative in the filesystem.

Using ClojureScript Libraries
-----------------------------

Lumo can make use of ClojureScript libraries, making the code in such
libraries available to your programs.

However, Lumo is not part of the Java ecosystem, the way Clojure is.
Lumo does not run Java code, that means it can't directly access Maven
artifacts on the internet, such as downloading ClojureScript JARs from
`Clojars <https://clojars.org>`_. [#maven]_

Using Downloaded Libraries
~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``-c`` (``--classpath``) option is used to specify where to search for
source code as either directories, or packaged inside JAR files.

For example, if you have previously downloaded the
`clojure/tools.cli <https://github.com/clojure/tools.cli>`_ package,
you can store it in a local project folder and tell Lumo about it::

  $ lumo -c src:lib/tools.cli-0.3.5.jar -m roll-dice --json 3d6
  {"3d6": 17}

This adds the :file:`src` directory (presumably containing :file:`roll_dice.cljs`) and
the tools.cli library to the classpath before running the ``roll-dice/-main`` function.
Our pretend tool rolls virtual dice and writes a JSON representation of the results
to standard out before exiting.

Keep in mind that any transitive dependencies are your responsibility: download
those to :file:`lib` as well, and add them to the command line.

Don't be afraid to add these libraries to version control: ClojureScript libraries
tend to be quite small.

Using Maven Repository Artifacts
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Lumo can also use artifacts in your local Maven repository.

::

  $ lumo -c src -D clojure/tools.cli:0.3.5 -m roll-dice --text 1d20
  1d20: 5

This is not particularily more concise, and comes with the following caveats:

* The library must *already* be present in your local repository. Lumo
  will not download it.
* You must list any transitive dependencies, explicitly.

Using NPM Libraries
-------------------

`No documentation, yet.`


.. [#maven] Understanding Maven artifacts, repositories, and third-party
   transitive dependencies is surprisingly complex. The only way to
   ensure accurate behavior is to use the underlying Java libraries.
   Lumo doesn't use Java and can't run those libraries.
