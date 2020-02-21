Installation
============

NPM
---

`NPM <https://www.npmjs.com/>`_ is the Node Package Manager,
the standard way to install packages for Node.js.
Lumo is packaged for NPM as `lumo-cljs <https://www.npmjs.com/package/lumo-cljs>`_.

::

  $ npm install -g lumo-cljs


If you get a `permission failure <https://github.com/anmonteiro/lumo/issues/206>`_, try this::

  $ npm install -g lumo-cljs --unsafe-perm

.. tip::

  The installed binary will be named ``lumo`` rather than ``lumo-cljs``.

Homebrew (macOS)
----------------

`Homebrew <http://brew.sh>`_ is a widely used package manager for macOS.

::

  $ brew install lumo

The above installs the latest stable version of Lumo.
If you want to install a binary built from master, try::

  $ brew install --HEAD lumo

Your own your own with a master install: there's no guarantee that
master is stable, or even working!

Docker
------

Lumo can also be run inside a `Docker <https://www.docker.com/>`_ container, using the
`lumo <https://store.docker.com/community/images/anmonteiro/lumo>`_ image::

  $ docker pull anmonteiro/lumo:latest
  $ docker run -it anmonteiro/lumo

Manual
------

1. Download the `latest release <https://github.com/anmonteiro/lumo/releases/latest>`_.
2. Move it to somewhere in your ``$PATH``.
