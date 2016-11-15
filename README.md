# Lumo

Standalone ClojureScript REPL on Node.js.

Read the [announcement blog post](https://anmonteiro.com/2016/11/the-fastest-clojure-repl-in-the-world/).

## Build status

| Platform  | Status   |
| --------- | ---------|
| macOS     | [![CircleCI](https://circleci.com/gh/anmonteiro/lumo.svg?style=svg&circle-token=0fb81464fa32b1f2a08972b90ef33e3151fbe0dc)](https://circleci.com/gh/anmonteiro/lumo) |
| Linux     | [![Build Status](https://travis-ci.com/anmonteiro/lumo.svg?token=SPqKLFKeVPtPxyKcArsV&branch=master)](https://travis-ci.com/anmonteiro/lumo) |
| Windows   | [![Build status](https://ci.appveyor.com/api/projects/status/oicv0857k05akins?svg=true)](https://ci.appveyor.com/project/anmonteiro/lumo) |

## Contents

- [Installation](#installation)
- [Using Lumo](#using-lumo)
- [Building](#building)
- [Copyright & License](#copyright--license)

## Installation

### Using [NPM](https://www.npmjs.com/package/lumo-cljs)

`npm install -g lumo-cljs`

_Note: the installed binary will be named `lumo` rather than `lumo-cljs`_

### Manual

1. Download the [latest release](https://github.com/anmonteiro/lumo/releases/latest).
2. Move it to somewhere in your `$PATH`.

## Using Lumo

Enter `lumo` at the command line to launch it.

Check out `lumo -h` for usage instructions and supported command line options.

## Building

To build Lumo from source:

1. Make sure you have installed [Boot](http://boot-clj.com/) and [Yarn](https://yarnpkg.com/).
2. At the root of the repository, run: `boot release`.
3. The resulting binary can be found in `build/lumo` (or `build\lumo.exe` if you're
on Windows).

## Copyright & License

Copyright © 2016 António Nuno Monteiro

Distributed under the Eclipse Public License (see [LICENSE](./LICENSE)).
