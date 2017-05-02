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

<svg>
  <symbol viewBox="0 0 17 17" id="svg-isotype">
    <g fill-rule="evenodd">
      <path d="M13.44 8.84c0 1.026-.314 2.008-.85 2.856l2.143 2.143a8.26 8.26 0 0 0 1.652-4.956c0-1.875-.625-3.572-1.696-4.955l-2.1 2.097a5.09 5.09 0 0 1 .85 2.812z"></path><path d="M13.44 8.84c0 1.026-.314 2.008-.85 2.856l2.143 2.143a8.26 8.26 0 0 0 1.652-4.956c0-1.875-.625-3.572-1.696-4.955l-2.1 2.097a5.09 5.09 0 0 1 .85 2.812z" fill-opacity=".46" fill="#FFF"></path><path d="M2.902 8.84A5.278 5.278 0 0 1 8.17 3.57c1.072 0 2.054.314 2.858.85l2.098-2.1A8.263 8.263 0 0 0 8.17.67C3.66.67 0 4.33 0 8.84c0 4.508 3.66 8.17 8.17 8.17a8.017 8.017 0 0 0 4.956-1.698l-2.143-2.142c-.76.625-1.74.937-2.813.937A5.278 5.278 0 0 1 2.902 8.84z">
      </path>
    </g>
  </symbol>
  <symbol viewBox="0 0 171 25" id="svg-logotype">
    <g transform="translate(-.055)" fill-rule="evenodd">
      <path d="M164.402 16.786a4.252 4.252 0 0 1-3.214-1.43c-.045-.088-.045-.177.044-.222l7.5-3.17 2.19-.937c.088-.045.088-.09.088-.134-.714-3.08-3.527-5.357-6.83-5.223-3.484.134-6.386 2.946-6.52 6.428a6.773 6.773 0 0 0 6.787 7.098c2.813 0 5.223-1.74 6.25-4.196.045-.09 0-.18-.09-.18l-2.187-.4c-.044 0-.134 0-.134.09-.803 1.338-2.232 2.276-3.884 2.276zm0-8.66a4.22 4.22 0 0 1 3.215 1.472c.044.09.044.18-.045.223 0 0-7.233 3.082-7.322 3.126-.09.045-.18-.044-.18-.09V12.5c-.043-2.455 1.92-4.375 4.332-4.375zM157.348 5.893h-2.143c-.045 0-.09.045-.134.09l-3.482 10.222c-.09.224-.357.224-.446 0L147.66 5.982c0-.045-.045-.09-.134-.09h-2.143c-.09 0-.134.09-.134.18l4.42 12.857c0 .043.043.088.133.088h3.036c.043 0 .088-.045.133-.09l4.42-12.857c.09-.088.044-.177-.045-.177zM143.24 5.893h-2.188c-.09 0-.134.045-.134.134v12.857c0 .09.045.134.134.134h2.188c.09 0 .133-.045.133-.134V6.027c0-.045-.044-.134-.133-.134zM143.24 1.696h-2.188c-.09 0-.134.045-.134.134v2.188c0 .09.045.134.134.134h2.188c.09 0 .133-.045.133-.134V1.83c0-.09-.044-.134-.133-.134zM138.73 5.893h-2.455a.096.096 0 0 1-.09-.09V.224c0-.09-.044-.134-.134-.134h-2.186c-.09 0-.134.044-.134.133v5.58c0 .045-.045.09-.09.09h-2.41c-.09 0-.134.045-.134.134v2.187c0 .09.044.134.133.134h2.41c.045 0 .09.045.09.09v10.446c0 .09.044.134.134.134h2.187c.09 0 .135-.045.135-.134V8.437c0-.044.045-.09.09-.09h2.455c.09 0 .134-.043.134-.133V6.027c0-.045-.09-.134-.134-.134zM124.4 16.786c-2.68 0-4.78-2.41-4.288-5.18.268-1.517 1.786-3.08 3.304-3.392 1.652-.357 3.215.223 4.197 1.34a.136.136 0 0 0 .18 0l1.56-1.563a.136.136 0 0 0 0-.178c-1.293-1.428-3.213-2.276-5.312-2.187-3.436.18-6.294 2.99-6.472 6.43a6.773 6.773 0 0 0 6.786 7.097c1.964 0 3.75-.848 5-2.188.045-.044.045-.09 0-.134l-1.562-1.562a.136.136 0 0 0-.18 0c-.758.982-1.92 1.518-3.213 1.518zM109.8 16.786a4.252 4.252 0 0 1-3.216-1.43c-.044-.088-.044-.177.045-.222l7.5-3.17 2.187-.937c.09-.045.09-.09.09-.134-.715-3.08-3.527-5.357-6.83-5.223-3.484.134-6.386 2.946-6.52 6.428a6.773 6.773 0 0 0 6.787 7.098c2.812 0 5.223-1.74 6.25-4.196.045-.09 0-.18-.09-.18l-2.187-.4c-.044 0-.134 0-.134.09-.803 1.338-2.277 2.276-3.884 2.276zm0-8.66a4.22 4.22 0 0 1 3.214 1.472c.044.09.044.18-.045.223 0 0-7.234 3.082-7.323 3.126-.09.045-.18-.044-.18-.09V12.5c-.043-2.455 1.92-4.375 4.332-4.375zM101.182.09h-2.188c-.09 0-.134.044-.134.133v18.66c0 .09.045.135.134.135h2.188c.09 0 .134-.045.134-.134V.224c0-.09-.09-.135-.134-.135zM96.405.09h-2.188c-.09 0-.134.044-.134.133v18.66c0 .09.045.135.134.135h2.188c.09 0 .134-.045.134-.134V.224c-.046-.09-.09-.135-.135-.135zM85.69 8.125c2.41 0 4.33 1.964 4.33 4.33s-1.964 4.33-4.33 4.33c-2.367 0-4.33-1.964-4.33-4.33s1.92-4.33 4.33-4.33zm0-2.455a6.783 6.783 0 0 0-6.787 6.785 6.783 6.783 0 0 0 6.787 6.786 6.783 6.783 0 0 0 6.786-6.785A6.783 6.783 0 0 0 85.69 5.67zM73.233 16.786c-2.68 0-4.777-2.41-4.286-5.18.268-1.517 1.786-3.08 3.304-3.392 1.653-.357 3.215.223 4.198 1.34a.136.136 0 0 0 .178 0L78.19 7.99a.136.136 0 0 0 0-.178c-1.296-1.428-3.216-2.276-5.314-2.187-3.438.18-6.295 2.99-6.474 6.43a6.773 6.773 0 0 0 6.786 7.097c1.965 0 3.75-.848 5-2.188.046-.044.046-.09 0-.134l-1.562-1.562a.136.136 0 0 0-.178 0c-.76.982-1.92 1.518-3.215 1.518zM51.044 5.67c-1.43 0-3.08.893-3.84 1.964-.045.09-.223.045-.223-.045V6.026c0-.045-.044-.134-.133-.134H44.66c-.046 0-.135.045-.135.134V18.93c0 .043.045.133.134.133h2.187c.044 0 .134-.045.134-.134V12.5c0-2.455 1.653-4.196 4.02-4.196 3.124 0 4.062 2.053 4.062 4.464v6.16c0 .045.044.134.134.134h2.187c.045 0 .134-.044.134-.133v-6.162c.045-3.75-1.74-7.098-6.473-7.098zM36.623 16.786a4.252 4.252 0 0 1-3.215-1.43c-.045-.088-.045-.177.045-.222l7.5-3.17 2.188-.937c.09-.045.09-.09.09-.134-.714-3.08-3.527-5.357-6.83-5.223-3.483.134-6.385 2.946-6.52 6.428a6.773 6.773 0 0 0 6.787 7.098c2.813 0 5.224-1.74 6.25-4.196.046-.09 0-.18-.088-.18l-2.19-.4c-.044 0-.133 0-.133.09-.804 1.338-2.232 2.276-3.884 2.276zm0-8.66a4.22 4.22 0 0 1 3.214 1.472c.045.09.045.18-.044.223 0 0-7.233 3.082-7.323 3.126-.09.045-.178-.044-.178-.09V12.5c0-2.455 1.964-4.375 4.33-4.375zM21.8 5.536c-1.697.044-3.036.714-3.974 1.83-.09.09-.223.045-.223-.09v-1.25c0-.088-.045-.133-.134-.133h-2.19c-.088 0-.133.045-.133.134v18.705c0 .09.045.134.134.134h2.144c.09 0 .134-.045.134-.134v-7.366c0-.134.134-.178.224-.09.937 1.117 2.32 1.83 4.107 1.83 4.15 0 7.455-3.75 6.652-8.035-.536-3.258-3.483-5.58-6.742-5.534zm.848 11.07c-2.947.492-5.49-2.052-5-5 .312-1.785 1.74-3.258 3.527-3.526 2.947-.49 5.49 2.054 5 5-.268 1.786-1.74 3.215-3.527 3.527zM7.11 5.67a6.783 6.783 0 0 0-6.785 6.785A6.783 6.783 0 0 0 7.11 19.24a6.783 6.783 0 0 0 6.787-6.785A6.783 6.783 0 0 0 7.11 5.67zm0 2.455c2.412 0 4.332 1.964 4.332 4.33s-1.965 4.33-4.33 4.33c-2.367 0-4.332-1.964-4.332-4.33s1.965-4.33 4.33-4.33z">
      </path>
    </g>
  </symbol>
</svg>

If you enjoy Lumo, consider backing or sponsoring the project on
<a href="https://opencollective.com/lumo">
  <svg width="14" height="14" style="display:inline-block;vertical-align:middle">
    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-isotype" fill="#7FADF2"></use>
  </svg>
  <svg width="138" height="20" style="display:inline-block;vertical-align:middle">
    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-logotype" fill="#919699">
    </use>
  </svg>
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
