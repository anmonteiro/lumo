Invoking Node Functions
=======================

It is unlikely that everything you want to can be done entirely in ClojureScript;
you will almost certainly need to do some work using Node.js libraries, so
that means some interop.

In ClojureScript, interop with JavaScript occurs using the ``js/`` prefix.

For example, to invoke the JavaScript
`process.exit <https://nodejs.org/dist/latest-v8.x/docs/api/process.html#process_process_exit_code>`_
function, simply add a ``js/`` prefix:

.. literalinclude:: _examples/process-exit1.cljs
   :language: clojure

You can also use the ``:require`` option to add an entire JavaScript module as if it
were a ClojureScript namespace.

.. literalinclude:: _examples/gen.cljs
  :language: clojure

This example requires the Node `fs (File System) <https://nodejs.org/dist/latest-v8.x/docs/api/fs.html>`_
module as ``fs``, then invokes functions exported by the module.
