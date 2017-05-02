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
<svg width="476px" height="80px" viewBox="0 0 476 80" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 42 (36781) - http://www.bohemiancoding.com/sketch -->
    <title>Rectangle</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="opencollective-logo" transform="translate(9.000000, 10.000000)">
            <g id="OC-logo" transform="translate(0.000000, 10.000000)">
                <path d="M34.6194245,8.17880011 C36.7508489,11.2495266 38,14.9788859 38,19 C38,23.0211141 36.7508489,26.7504734 34.6194245,29.8211999 L29.6976779,24.8994533 C30.6641742,23.1506053 31.2142857,21.1395454 31.2142857,19 C31.2142857,16.8604546 30.6641742,14.8493947 29.6976779,13.1005467 L34.6194245,8.17880011 Z M29.8211999,3.38057552 L24.8994533,8.30232215 C23.1506053,7.33582578 21.1395454,6.78571429 19,6.78571429 C12.2542363,6.78571429 6.78571429,12.2542363 6.78571429,19 C6.78571429,25.7457637 12.2542363,31.2142857 19,31.2142857 C21.1395454,31.2142857 23.1506053,30.6641742 24.8994533,29.6976779 L29.8211999,34.6194245 C26.7504734,36.7508489 23.0211141,38 19,38 C8.50658975,38 0,29.4934102 0,19 C0,8.50658975 8.50658975,0 19,0 C23.0211141,0 26.7504734,1.24915112 29.8211999,3.38057552 Z" id="Combined-Shape-Copy-2" fill="#7FADF2"></path>
                <path d="M34.6194245,8.17880011 C36.7508489,11.2495266 38,14.9788859 38,19 C38,23.0211141 36.7508489,26.7504734 34.6194245,29.8211999 L29.6976779,24.8994533 C30.6641742,23.1506053 31.2142857,21.1395454 31.2142857,19 C31.2142857,16.8604546 30.6641742,14.8493947 29.6976779,13.1005467 L34.6194245,8.17880011 Z" id="closing-o" fill="#B8D3F4"></path>
            </g>
            <g id="open-collective" transform="translate(62.000000, 0.000000)" fill="#515F71">
                <path d="M48.7,13.6 C45,13.6 41.5,15 38.9,17.2 L38.9,14.9 C38.9,14.3 38.4,13.9 37.9,13.9 L34.5,13.9 C33.9,13.9 33.5,14.4 33.5,14.9 L33.5,58.6 C33.5,59.1 33.9,59.6 34.5,59.6 L38,59.6 C38.5,59.6 39,59.2 39,58.6 L39,40.3 C41.6,42.5 45.1,43.9 48.8,43.9 C57.2,43.9 64,37.1 64,28.7 C63.8,20.3 57,13.6 48.7,13.6 L48.7,13.6 Z M48.7,38.4 C43.3,38.4 39,34 39,28.7 C39,23.3 43.4,19 48.7,19 C54.1,19 58.4,23.4 58.4,28.7 C58.4,34.1 54,38.4 48.7,38.4 L48.7,38.4 Z" id="Shape"></path>
                <path d="M114.6,13.6 C110.9,13.6 107.5,14.9 104.9,17.1 L104.9,15.8 C104.9,14.7 104,13.8 102.9,13.8 L101.4,13.8 C100.3,13.8 99.4,14.7 99.4,15.8 L99.4,42.1 C99.4,42.9 100.1,43.6 100.9,43.6 L103.4,43.6 C104.2,43.6 104.9,42.9 104.9,42.1 L104.9,29.6 C104.9,24.2 109.3,19 114.6,19 C118.1,19 124.3,20.9 124.3,29.6 L124.3,42.1 C124.3,42.9 125,43.6 125.8,43.6 L128.3,43.6 C129.1,43.6 129.8,42.9 129.8,42.1 L129.8,29.5 C129.8,16.3 119.4,13.6 114.6,13.6 L114.6,13.6 Z" id="Shape"></path>
                <path d="M96.2,25.5 L96.2,25.5 C94.7,18.4 88.2,13.2 80.6,13.6 C73,14 66.8,20 66.3,27.6 C65.7,36.5 72.7,43.9 81.4,43.9 C87.3,43.9 92.4,40.6 94.9,35.7 C95.3,35 94.8,34.1 94,33.9 L91,33.3 C90.5,33.2 90,33.4 89.7,33.9 C88,36.6 84.9,38.5 81.5,38.5 C78.5,38.5 75.8,37.1 74,35 L91.2,27.8 L96.2,25.5 L96.2,25.5 Z M71.8,29.9 C71.8,29.5 71.7,29.1 71.7,28.7 C71.7,23.3 76.1,19 81.4,19 C84.4,19 87.2,20.4 88.9,22.6 L71.8,29.9 L71.8,29.9 Z" id="Shape"></path>
                <path d="M15.3,13.4 C6.9,13.4 0.1,20.2 0.1,28.6 C0.1,37 6.9,43.8 15.3,43.8 C23.7,43.8 30.5,37 30.5,28.6 C30.5,20.2 23.7,13.4 15.3,13.4 L15.3,13.4 Z M15.3,38.3 C9.9,38.3 5.6,33.9 5.6,28.6 C5.6,23.2 10,18.9 15.3,18.9 C20.7,18.9 25,23.3 25,28.6 C25.1,33.9 20.7,38.3 15.3,38.3 L15.3,38.3 Z" id="Shape"></path>
                <path d="M196.7,13.3 C188.3,13.3 181.5,20.1 181.5,28.5 C181.5,36.9 188.3,43.7 196.7,43.7 C205.1,43.7 211.9,36.9 211.9,28.5 C211.9,20.1 205.1,13.3 196.7,13.3 L196.7,13.3 Z M196.7,38.2 C191.3,38.2 187,33.8 187,28.5 C187,23.1 191.4,18.8 196.7,18.8 C202.1,18.8 206.4,23.2 206.4,28.5 C206.4,33.8 202.1,38.2 196.7,38.2 L196.7,38.2 Z" id="Shape"></path>
                <path d="M328.6,4.3 L325.5,4.3 C324.8,4.3 324.3,4.8 324.3,5.5 L324.3,8.6 C324.3,9.3 324.8,9.8 325.5,9.8 L328.6,9.8 C329.3,9.8 329.8,9.3 329.8,8.6 L329.8,5.5 C329.8,4.8 329.2,4.3 328.6,4.3 L328.6,4.3 Z" id="Shape"></path>
                <path d="M392.5,33.7 L388.9,33 C388.5,32.9 388.1,33.1 387.9,33.5 C386.2,36.3 383.1,38.2 379.6,38.2 C376.6,38.2 373.9,36.8 372.1,34.7 L389.3,27.5 L394.5,25.3 L394.5,25.3 C393,18.2 386.5,13 378.9,13.4 C371.3,13.8 365.1,19.9 364.6,27.5 C364,36.4 371,43.8 379.7,43.8 C385.7,43.8 390.9,40.3 393.3,35.3 C393.5,34.5 393.1,33.8 392.5,33.7 L392.5,33.7 Z M369.8,28.4 C369.8,23 374.2,18.7 379.5,18.7 C382.5,18.7 385.3,20.1 387,22.3 L369.8,29.6 L369.8,28.4 L369.8,28.4 Z" id="Shape"></path>
                <path d="M270,25.2 L270,25.2 C268.5,18.1 262,12.9 254.4,13.3 C246.8,13.7 240.6,19.8 240.1,27.4 C239.5,36.3 246.5,43.7 255.2,43.7 C261.2,43.7 266.4,40.2 268.9,35.1 C269.2,34.5 268.8,33.8 268.2,33.7 L264.6,33 C264.2,32.9 263.8,33.1 263.6,33.5 C261.9,36.3 258.8,38.2 255.3,38.2 C252.3,38.2 249.6,36.8 247.8,34.7 L265,27.5 L270,25.2 L270,25.2 Z M245.5,29.6 C245.5,29.2 245.4,28.8 245.4,28.4 C245.4,23 249.8,18.7 255.1,18.7 C258.1,18.7 260.9,20.1 262.6,22.3 L245.5,29.6 L245.5,29.6 Z" id="Shape"></path>
                <path d="M221.2,0.7 L217.6,0.7 C217.1,0.7 216.7,1.1 216.7,1.6 L216.7,42.3 C216.7,42.8 217.1,43.3 217.7,43.3 L221.2,43.3 C221.7,43.3 222.2,42.9 222.2,42.3 L222.2,1.6 C222.2,1.1 221.7,0.7 221.2,0.7 L221.2,0.7 Z" id="Shape"></path>
                <path d="M233.5,0.7 L229.9,0.7 C229.4,0.7 229,1.1 229,1.6 L229,42.3 C229,42.8 229.4,43.3 230,43.3 L233.5,43.3 C234,43.3 234.5,42.9 234.5,42.3 L234.5,1.6 C234.4,1.1 234,0.7 233.5,0.7 L233.5,0.7 Z" id="Shape"></path>
                <path d="M328.6,13.4 L325.5,13.4 C324.8,13.4 324.3,13.9 324.3,14.6 L324.3,42.2 C324.3,42.9 324.8,43.4 325.5,43.4 L328.6,43.4 C329.3,43.4 329.8,42.9 329.8,42.2 L329.8,14.5 C329.8,13.9 329.2,13.4 328.6,13.4 L328.6,13.4 Z" id="Shape"></path>
                <path d="M318.4,13.4 L314.5,13.4 C314.1,13.4 313.7,13 313.7,12.6 L313.7,1.5 C313.7,1.1 313.3,0.7 312.9,0.7 L309,0.7 C308.6,0.7 308.2,1.1 308.2,1.5 L308.2,12.6 C308.2,13 307.8,13.4 307.4,13.4 L303.5,13.4 C303.1,13.4 302.7,13.8 302.7,14.2 L302.7,18 C302.7,18.4 303.1,18.8 303.5,18.8 L307.4,18.8 C307.8,18.8 308.2,19.2 308.2,19.6 L308.2,42.3 C308.2,42.9 308.7,43.3 309.2,43.3 L312.6,43.3 C313.2,43.3 313.6,42.8 313.6,42.3 L313.6,19.6 C313.6,19.2 314,18.8 314.4,18.8 L318.3,18.8 C318.7,18.8 319.1,18.4 319.1,18 L319.1,14.1 C319.2,13.7 318.9,13.4 318.4,13.4 L318.4,13.4 Z" id="Shape"></path>
                <path d="M296.8,35.5 C296.4,35.1 295.7,35.1 295.3,35.5 C293.5,37.2 291.2,38.2 288.5,38.2 C282.8,38.2 278.2,33.2 278.8,27.4 C279.3,22.9 283,19.3 287.5,18.8 C290.3,18.5 293,19.5 294.9,21.2 C295.5,21.7 296.4,21.7 297,21.1 L298.7,19.4 C299.3,18.8 299.3,17.8 298.7,17.2 C295.8,14.5 291.8,13 287.5,13.3 C279.8,13.8 273.6,20.2 273.3,28 C273,36.6 279.9,43.6 288.5,43.6 C292.6,43.6 296.4,42 299.1,39.3 C299.5,38.9 299.5,38.2 299.1,37.8 L296.8,35.5 L296.8,35.5 Z" id="Shape"></path>
                <path d="M177.1,35.5 C176.7,35.1 176,35.1 175.6,35.5 C173.8,37.2 171.5,38.2 168.8,38.2 C163.1,38.2 158.5,33.2 159.1,27.4 C159.6,22.9 163.3,19.3 167.8,18.8 C170.6,18.5 173.3,19.5 175.2,21.2 C175.8,21.7 176.7,21.7 177.3,21.1 L179,19.4 C179.6,18.8 179.6,17.8 179,17.2 C176.1,14.5 172.1,13 167.8,13.3 C160.1,13.8 153.9,20.2 153.6,28 C153.3,36.6 160.2,43.6 168.8,43.6 C172.9,43.6 176.7,42 179.4,39.3 C179.8,38.9 179.8,38.2 179.4,37.8 L177.1,35.5 L177.1,35.5 Z" id="Shape"></path>
                <path d="M362,13.7 L357.1,13.7 C357,13.7 356.9,13.8 356.9,13.9 L348.9,37.4 C348.8,37.6 348.5,37.6 348.5,37.4 L340.5,13.9 C340.5,13.8 340.4,13.7 340.3,13.7 L335.4,13.7 C335.2,13.7 335.1,13.9 335.2,14 L345.1,43.1 C345.1,43.2 345.2,43.3 345.3,43.3 L352.1,43.3 C352.2,43.3 352.3,43.2 352.3,43.1 L362.2,14 C362.3,13.9 362.2,13.7 362,13.7 L362,13.7 Z" id="Shape"></path>
            </g>
        </g>
    </g>
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
