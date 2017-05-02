# Lumo
[![Backers on Open Collective](https://opencollective.com/lumo/backers/badge.svg)](#backers)
[![Sponsors on Open Collective](https://opencollective.com/lumo/sponsors/badge.svg)](#sponsors)

Lumo is a standalone ClojureScript environment that runs on Node.js and the V8
JavaScript engine. It starts up instantaneously and has out-of-the-box access to
the entire Node.js ecosystem. It also provides a ClojureScript build API, making
it possible to
[compile ClojureScript projects entirely without the JVM](https://anmonteiro.com/2017/02/compiling-clojurescript-projects-without-the-jvm/),
thanks to the [experimental JavaScript version](https://github.com/google/closure-compiler-js)
of the [Google Closure Compiler](https://github.com/google/closure-compiler).

Read the [announcement blog post](https://anmonteiro.com/2016/11/the-fastest-clojure-repl-in-the-world/)
and our [pledge](https://anmonteiro.com/2017/05/on-lumos-growth-and-sustainability/)!

If you enjoy Lumo, consider backing or sponsoring the project on
<a href="https://opencollective.com/lumo">
  <img style="display: inline-block;width:10rem;vertical-align:middle" alt="Open Collective" src="https://cloud.githubusercontent.com/assets/661909/25602229/08b622c4-2ea7-11e7-9572-2cfa70289f8d.png">
</a>

## Build status

| Platform  | Status   |
| --------- | ---------|
| macOS     | [![CircleCI](https://circleci.com/gh/anmonteiro/lumo.svg?style=svg&circle-token=0fb81464fa32b1f2a08972b90ef33e3151fbe0dc)](https://circleci.com/gh/anmonteiro/lumo) |
| Linux     | [![Build Status](https://travis-ci.org/anmonteiro/lumo.svg?branch=master)](https://travis-ci.org/anmonteiro/lumo) |
| Windows   | [![Build status](https://ci.appveyor.com/api/projects/status/oicv0857k05akins?svg=true)](https://ci.appveyor.com/project/anmonteiro/lumo) |

## Contents

- [Installation](#installation)
- [Using Lumo](#using-lumo)
- [Building](#building)
- [Backers](#backers)
- [Sponsors](#sponsors)
- [Copyright & License](#copyright--license)

## Installation

### Via [NPM](https://www.npmjs.com/package/lumo-cljs)

```shell
$ npm install -g lumo-cljs
```

_Note: the installed binary will be named `lumo` rather than `lumo-cljs`_

### Via [Homebrew](http://brew.sh/) (macOS)

```shell
$ brew install lumo
```

**Note:** If you want to install a binary built from master, run `brew install --HEAD lumo`
(at your own responsibility).

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

## Backers

Support us with a monthly donation and help us continue our activities. [[Become a backer](https://opencollective.com/lumo#backer)]

<a href="https://opencollective.com/lumo/backer/0/website" target="_blank"><img src="https://opencollective.com/lumo/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/lumo/backer/1/website" target="_blank"><img src="https://opencollective.com/lumo/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/lumo/backer/2/website" target="_blank"><img src="https://opencollective.com/lumo/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/lumo/backer/3/website" target="_blank"><img src="https://opencollective.com/lumo/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/lumo/backer/4/website" target="_blank"><img src="https://opencollective.com/lumo/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/lumo/backer/5/website" target="_blank"><img src="https://opencollective.com/lumo/backer/5/avatar.svg"></a>
<a href="https://opencollective.com/lumo/backer/6/website" target="_blank"><img src="https://opencollective.com/lumo/backer/6/avatar.svg"></a>
<a href="https://opencollective.com/lumo/backer/7/website" target="_blank"><img src="https://opencollective.com/lumo/backer/7/avatar.svg"></a>
<a href="https://opencollective.com/lumo/backer/8/website" target="_blank"><img src="https://opencollective.com/lumo/backer/8/avatar.svg"></a>
<a href="https://opencollective.com/lumo/backer/9/website" target="_blank"><img src="https://opencollective.com/lumo/backer/9/avatar.svg"></a>
<a href="https://opencollective.com/lumo/backer/10/website" target="_blank"><img src="https://opencollective.com/lumo/backer/10/avatar.svg"></a>
<a href="https://opencollective.com/lumo/backer/11/website" target="_blank"><img src="https://opencollective.com/lumo/backer/11/avatar.svg"></a>
<a href="https://opencollective.com/lumo/backer/12/website" target="_blank"><img src="https://opencollective.com/lumo/backer/12/avatar.svg"></a>
<a href="https://opencollective.com/lumo/backer/13/website" target="_blank"><img src="https://opencollective.com/lumo/backer/13/avatar.svg"></a>
<a href="https://opencollective.com/lumo/backer/14/website" target="_blank"><img src="https://opencollective.com/lumo/backer/14/avatar.svg"></a>
<a href="https://opencollective.com/lumo/backer/15/website" target="_blank"><img src="https://opencollective.com/lumo/backer/15/avatar.svg"></a>
<a href="https://opencollective.com/lumo/backer/16/website" target="_blank"><img src="https://opencollective.com/lumo/backer/16/avatar.svg"></a>
<a href="https://opencollective.com/lumo/backer/17/website" target="_blank"><img src="https://opencollective.com/lumo/backer/17/avatar.svg"></a>
<a href="https://opencollective.com/lumo/backer/18/website" target="_blank"><img src="https://opencollective.com/lumo/backer/18/avatar.svg"></a>
<a href="https://opencollective.com/lumo/backer/19/website" target="_blank"><img src="https://opencollective.com/lumo/backer/19/avatar.svg"></a>
<a href="https://opencollective.com/lumo/backer/20/website" target="_blank"><img src="https://opencollective.com/lumo/backer/20/avatar.svg"></a>
<a href="https://opencollective.com/lumo/backer/21/website" target="_blank"><img src="https://opencollective.com/lumo/backer/21/avatar.svg"></a>
<a href="https://opencollective.com/lumo/backer/22/website" target="_blank"><img src="https://opencollective.com/lumo/backer/22/avatar.svg"></a>
<a href="https://opencollective.com/lumo/backer/23/website" target="_blank"><img src="https://opencollective.com/lumo/backer/23/avatar.svg"></a>
<a href="https://opencollective.com/lumo/backer/24/website" target="_blank"><img src="https://opencollective.com/lumo/backer/24/avatar.svg"></a>
<a href="https://opencollective.com/lumo/backer/25/website" target="_blank"><img src="https://opencollective.com/lumo/backer/25/avatar.svg"></a>
<a href="https://opencollective.com/lumo/backer/26/website" target="_blank"><img src="https://opencollective.com/lumo/backer/26/avatar.svg"></a>
<a href="https://opencollective.com/lumo/backer/27/website" target="_blank"><img src="https://opencollective.com/lumo/backer/27/avatar.svg"></a>
<a href="https://opencollective.com/lumo/backer/28/website" target="_blank"><img src="https://opencollective.com/lumo/backer/28/avatar.svg"></a>
<a href="https://opencollective.com/lumo/backer/29/website" target="_blank"><img src="https://opencollective.com/lumo/backer/29/avatar.svg"></a>


## Sponsors

Become a sponsor and get your logo on our README on Github with a link to your site. [[Become a sponsor](https://opencollective.com/lumo#sponsor)]

<a href="https://opencollective.com/lumo/sponsor/0/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/lumo/sponsor/1/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/lumo/sponsor/2/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/lumo/sponsor/3/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/lumo/sponsor/4/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/lumo/sponsor/5/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/lumo/sponsor/6/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/lumo/sponsor/7/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/lumo/sponsor/8/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/lumo/sponsor/9/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/9/avatar.svg"></a>
<a href="https://opencollective.com/lumo/sponsor/10/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/10/avatar.svg"></a>
<a href="https://opencollective.com/lumo/sponsor/11/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/11/avatar.svg"></a>
<a href="https://opencollective.com/lumo/sponsor/12/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/12/avatar.svg"></a>
<a href="https://opencollective.com/lumo/sponsor/13/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/13/avatar.svg"></a>
<a href="https://opencollective.com/lumo/sponsor/14/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/14/avatar.svg"></a>
<a href="https://opencollective.com/lumo/sponsor/15/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/15/avatar.svg"></a>
<a href="https://opencollective.com/lumo/sponsor/16/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/16/avatar.svg"></a>
<a href="https://opencollective.com/lumo/sponsor/17/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/17/avatar.svg"></a>
<a href="https://opencollective.com/lumo/sponsor/18/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/18/avatar.svg"></a>
<a href="https://opencollective.com/lumo/sponsor/19/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/19/avatar.svg"></a>
<a href="https://opencollective.com/lumo/sponsor/20/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/20/avatar.svg"></a>
<a href="https://opencollective.com/lumo/sponsor/21/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/21/avatar.svg"></a>
<a href="https://opencollective.com/lumo/sponsor/22/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/22/avatar.svg"></a>
<a href="https://opencollective.com/lumo/sponsor/23/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/23/avatar.svg"></a>
<a href="https://opencollective.com/lumo/sponsor/24/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/24/avatar.svg"></a>
<a href="https://opencollective.com/lumo/sponsor/25/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/25/avatar.svg"></a>
<a href="https://opencollective.com/lumo/sponsor/26/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/26/avatar.svg"></a>
<a href="https://opencollective.com/lumo/sponsor/27/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/27/avatar.svg"></a>
<a href="https://opencollective.com/lumo/sponsor/28/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/28/avatar.svg"></a>
<a href="https://opencollective.com/lumo/sponsor/29/website" target="_blank"><img src="https://opencollective.com/lumo/sponsor/29/avatar.svg"></a>


## Copyright & License

Copyright © 2016-2017 António Nuno Monteiro

Distributed under the Eclipse Public License (see [LICENSE](./LICENSE)).
