---
id: getting-started
title: Getting Started
layout: docs
category: Introduction
permalink: docs/getting-started.html
next: running
---

Lumo is a fast, cross-platform, standalone ClojureScript environment that runs on
Node.js and the V8 JavaScript engine.

Lumo is a single executable that launches instantly, providing an out of the box,
fully-featured environment that is great for tinkering with Clojure(Script). It runs
on Linux, macOS and Windows. It is also useful for scripting in ClojureScript, providing
a suitable, familiar alternative to Shell scripts.

Read the [announcement blog post](https://anmonteiro.com/2016/11/the-fastest-clojure-repl-in-the-world/)
and our [pledge](https://anmonteiro.com/2017/05/on-lumos-growth-and-sustainability/)!

<img style="max-width:75%;margin: 0 auto;display:block" src="/img/content/lumotiming.png">

Lumo also provides a ClojureScript build API, making it possible to
[compile ClojureScript projects](https://anmonteiro.com/2017/02/compiling-clojurescript-projects-without-the-jvm/),
entirely without the JVM, thanks to the [experimental JavaScript version](https://github.com/google/closure-compiler-js)
of the [Google Closure Compiler](https://github.com/google/closure-compiler).

## Installing Lumo

Lumo is available on NPM, Homebrew (macOS only) and for manual download.

### [NPM](https://www.npmjs.com/package/lumo-cljs)

```bash
$ npm install -g lumo-cljs
```

> The above will install a binary named `lumo`.

### [Homebrew](http://brew.sh/) (macOS)

```bash
$ brew install lumo
```

#### Installing from current master

If you just can't wait for that new shiny feature to be released, you can tell
Homebrew to install a version of Lumo that tracks the current master branch. Run
the following commands:

```bash
$ brew remove lumo
$ brew install --HEAD lumo
```

### [Docker](https://store.docker.com/community/images/anmonteiro/lumo)

An official [docker image](https://store.docker.com/community/images/anmonteiro/lumo)
is available for Lumo. Executing the following commands at the terminal will land
you in a Lumo REPL:

```bash
$ docker pull anmonteiro/lumo:latest
$ docker run -it anmonteiro/lumo
```

### Manually

1. Download the [latest release](https://github.com/anmonteiro/lumo/releases/latest).
2. Move it to somewhere in your `$PATH`.

Example for Ubuntu:

```bash
$ wget https://github.com/anmonteiro/lumo/releases/download/1.5.0/lumo_linux64.zip
$ unzip lumo_linux64.zip
$ sudo mv lumo /usr/bin
```

## Running Lumo

Lumo can be launched by typing `lumo` at the terminal.

Type `lumo -h` or `lumo --help` to display help text on the command line arguments
to Lumo.

The next section describes Lumo's command line options in detail.
