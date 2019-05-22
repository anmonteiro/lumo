# Changelog

## [master](https://github.com/anmonteiro/lumo/compare/1.10.1...HEAD) (unreleased)

### Changes

- Upgrade Node.js to version 12.3.0.

### Bug fixes

- Fix CTRL+C not clearing the input on newer Node.js versions
  ([#472](https://github.com/anmonteiro/lumo/issues/472)).
- Fix Lumo not allocating more than 1.5g of memory
  ([#472](https://github.com/anmonteiro/lumo/issues/218)).

## [1.10.1](https://github.com/anmonteiro/lumo/compare/1.10.0...1.10.1) (2019-04-10)

### Bug fixes

- Lumo 1.10.0 had a bug that made it impossible to start up. This is a recovery
release which fixes that bug.

## [1.10.0](https://github.com/anmonteiro/lumo/compare/1.9.0...1.10.0) (2019-04-09)

**Important Note**: This version is broken and was released by mistake. Do not
use.

### Changes

- Upgrade Node.js to version 11.13.0.
- Upgrade ClojureScript to version 1.10.520.

### Bug fixes

- Fix `fs/readdir{Sync}` not listing the correct files for `.` and `..`
  arguments ([#463](https://github.com/anmonteiro/lumo/issues/463))
- Fix `fs/readFile` not accepting file descriptor arguments
  ([#462](https://github.com/anmonteiro/lumo/issues/462))

## [1.9.0](https://github.com/anmonteiro/lumo/compare/1.9.0-alpha...1.9.0) (2018-11-08)

### New features

- Allow omitting version in -D – default to the latest locally available version ([#320](https://github.com/anmonteiro/lumo/issues/320)).

### Changes

- Upgrade ClojureScript to version 1.10.439.
- Upgrade Node.js to version 10.9.0.

### Bug fixes

- ctrl-c during REPL execution exits lumo ([#327](https://github.com/anmonteiro/lumo/issues/327)).
- SIGINT cannot be caught ([#191](https://github.com/anmonteiro/lumo/issues/191)).
- Correctly set `__dirname` and `__filename` when running script file ([#185](https://github.com/anmonteiro/lumo/issues/185)).
- Honor the "accept" parameter of the socket repl options ([#431](https://github.com/anmonteiro/lumo/issues/431))
- Autocompletion should be case sensitive ([#435](https://github.com/anmonteiro/lumo/issues/435))

## [1.9.0-alpha](https://github.com/anmonteiro/lumo/compare/1.8.0...1.9.0-alpha) (2018-05-10)

### Bug fixes

- `clojure.reflect` not bundled ([#369](https://github.com/anmonteiro/lumo/issues/369)).
- `-e` with unfinished form hangs ([#375](https://github.com/anmonteiro/lumo/issues/375)).
- Fix crash when trying to auto-complete a line ending with `'` ([#365](https://github.com/anmonteiro/lumo/issues/365)).

### Changes

- Upgrade Node.js to version 9.10.0.
- Bump ClojureScript to 1.10.238 ([#379](https://github.com/anmonteiro/lumo/pull/379)).
  Plus miscellaneous fixes, most notably:
  - Use cljs.core/eval in lumo.core.
  - Bundle `cljs.core.specs.alpha`.
  - Use `$HOME/.cljs/.lumo-cache` as global cache folder.
  - Throw in case of the unsupported `:parallel-build`.
  - Fix init of `cljs.core/*print-newline*`.

## [1.8.0](https://github.com/anmonteiro/lumo/compare/1.8.0-beta...1.8.0) (2018-02-15)

### New features

- Remove #_=> from pasted code ([#261](https://github.com/anmonteiro/lumo/issues/261)).
- Allow CLJS require from `node_modules` ([#130](https://github.com/anmonteiro/lumo/issues/130)).
- Make `dir` work on aliases.
- Add spec completions ([#279](https://github.com/anmonteiro/lumo/pull/279)).
- Handle scoped packages when loading Cljs from node dirs ([#300](https://github.com/anmonteiro/lumo/pull/300)).
- Added `lumo.build.api/watch` ([#321](https://github.com/anmonteiro/lumo/issues/321)).

### Bug fixes

- lumo.compiler/cljs-files-in can match dirs ([#270](https://github.com/anmonteiro/lumo/issues/270)).
- Fix bug in the build API caused by requiring `cljs.spec.test.alpha` ([#273](https://github.com/anmonteiro/lumo/issues/273)).
- Fix compilation crash with macros & `:optimize-constants true` ([#274](https://github.com/anmonteiro/lumo/issues/274)).
- Require fails if Lumo output is redirected ([#283](https://github.com/anmonteiro/lumo/issues/283)).
- Lumo script failure when redirecting stdout? ([#286](https://github.com/anmonteiro/lumo/issues/286)).
- Load required macro namespaces when reading analysis cache ([#308](https://github.com/anmonteiro/lumo/issues/308)).
- Don't look for the REPL history file in the user's home directory if one doesn't exist ([#309](https://github.com/anmonteiro/lumo/issues/309)).
- Use `tools.reader` with the unicode literal / cljs.core/bit-or warning ([#341](https://github.com/anmonteiro/lumo/issues/341)).
- Auto-completion fails with numbers in ns names ([#332](https://github.com/anmonteiro/lumo/issues/332))
- WARNING: cljs.core/bit-or, all arguments must be numbers ([#341](https://github.com/anmonteiro/lumo/issues/341)).
- Add common metadata keys to completion keywords ([#344](https://github.com/anmonteiro/lumo/issues/344)).

### Changes

- Upgrade Node.js to version 9.2.0.
- Upgrade ClojureScript to version 1.9.946.

## [1.8.0-beta](https://github.com/anmonteiro/lumo/compare/1.7.0...1.8.0-beta) (2017-09-16)

### New features

- Get arglists from the runtime environment ([#248](https://github.com/anmonteiro/lumo/issues/248)).
- Honor `*main-cli-fn*` ([#238](https://github.com/anmonteiro/lumo/issues/238)).
- Completions for JS namespaces ([#254](https://github.com/anmonteiro/lumo/issues/254)).
- Comprehensive enhancement to the Lumo build API ([#263](https://github.com/anmonteiro/lumo/pull/263)).
The Lumo build API has been enhanced significantly and now includes JS module
processing, preloads, and is mostly at feature parity with the JVM ClojureScript
build API.

### Changes

- Treat stdin as file (doesn't print results by default) ([#231](https://github.com/anmonteiro/lumo/issues/231)).

### Bug fixes

- Fix `cljs.core/*command-line-args*` not getting populated ([#237](https://github.com/anmonteiro/lumo/pull/237)).
- Crash when getting completions for a namespace that was required as string ([#246](https://github.com/anmonteiro/lumo/issues/246)).
- Fix `load-file` switching back to default namespace ([#236](https://github.com/anmonteiro/lumo/issues/236)).
- Can't require `goog` ([#227](https://github.com/anmonteiro/lumo/issues/227)).
- Build API: namespaces compiled more than once ([#245](https://github.com/anmonteiro/lumo/issues/245)).
- Error in build API when building with source maps on ([#132](https://github.com/anmonteiro/lumo/issues/132)).

## [1.7.0](https://github.com/anmonteiro/lumo/compare/1.6.0...1.7.0) (2017-08-16)

### New features

- Add support for tagged literals ([#75](https://github.com/anmonteiro/lumo/issues/75)).
- Add support for running custom accept functions in the Lumo socket server
([#105](https://github.com/anmonteiro/lumo/pull/105)).
The `--socket-repl` option can now be a JSON object with `accept` and `args` keys
(in addition to `port` and `host`) where `accept` is a namespace qualified string
for a function that will run when accepting a new connection.
- Add support for specifying Closure libraries in the `:libs` entry in `deps.cljs`
([#210](https://github.com/anmonteiro/lumo/issues/210)).
- Add `lumo.core/exit` function.
- Pretty print JavaScript objects & arrays.
- Add a new `-A / --checked-arrays` command line option that can be `warn` or `error`.
- Miscellaneous improvements to pretty printing at the REPL.

### Changes

- Use Paredit.js to calculate indentation for multiline forms ([#193](https://github.com/anmonteiro/lumo/issues/193)).
- Upgrade Google Closure Compiler to v20170806.
- Upgrade ClojureScript to version 1.9.908.
- Upgrade Node.js to version 8.4.0.
- **BREAKING**: Remove `lumo.core/*command-line-args*` in favor of the new `cljs.core/*command-line-args*`
introduced in ClojureScript 1.9.8XX.

### Bug fixes

- Isolate copy paste inference per readline session ([#197](https://github.com/anmonteiro/lumo/issues/197)).
- Socket REPL fails to isolate NS ([#158](https://github.com/anmonteiro/lumo/issues/158)).
- Fix NPM installation as root ([#206](https://github.com/anmonteiro/lumo/issues/206)).
- Deduplicate the results of `lumo.repl/apropos`.
- Fix issue that prevented `*print-namespace-maps*` to be `true` on REPL startup.

## [1.6.0](https://github.com/anmonteiro/lumo/compare/1.5.0...1.6.0) (2017-06-30)

### New features

- Add ability to execute a script from standard input ([#168](https://github.com/anmonteiro/lumo/pull/168)).
- Add support for `reverse-i-search` ([#169](https://github.com/anmonteiro/lumo/pull/169)).
- Expose `eval`. There is now a `lumo.core/eval` function ([#146](https://github.com/anmonteiro/lumo/pull/146), [#177](https://github.com/anmonteiro/lumo/pull/177)).
- Add support for passing Maven coordinates to add JARs to the classpath ([#156](https://github.com/anmonteiro/lumo/issues/156) and [#186](https://github.com/anmonteiro/lumo/pull/186)).
The relevant CLI option is `-D / --dependencies` that supports a comma-separated
list of Maven coordinates, and `-L / --local-repo` to override the local Maven
repository (defaults to `~/.m2/repository`).
- Bundle `cljs.spec.test.alpha` ([#179](https://github.com/anmonteiro/lumo/issues/179)).
Note that while this namespace is now bundled with Lumo, it has a hard dependency
on [`test.check`](https://github.com/clojure/test.check) (>= v0.10.0-alpha1).

### Changes

- Upgrade ClojureScript to version 1.9.671.
- Upgrade Node.js to version 8.1.3.
- Upgrade Google Closure Compiler to v20170521 ([#173](https://github.com/anmonteiro/lumo/pull/173)).
- Don't compile a fully static binary under Linux ([#163](https://github.com/anmonteiro/lumo/issues/163), [#176](https://github.com/anmonteiro/lumo/pull/176)). This fixes
a problem where requiring Node packages would crash (different stdlib versions).
It also means that Lumo no longer works under NixOS.

### Bug fixes

- Fix regression that prevented requiring binary modules ([#163](https://github.com/anmonteiro/lumo/issues/163)).
- Fix bug that prevented Lumo from continuing executing after being put in background ([#166](https://github.com/anmonteiro/lumo/issues/166)).
- Fix regression that prevented requiring foreign libraries ([#167](https://github.com/anmonteiro/lumo/issues/167)).
- Fix a race condition with the REPL history where Lumo could attempt to read a file's
size before it was created.
- Pretty print eductions ([#170](https://github.com/anmonteiro/lumo/issues/170)).
- Auto-complete after arrow & other special characters ([#157](https://github.com/anmonteiro/lumo/issues/157)).
- Don't print `doc` for macros that are not referred ([#153](https://github.com/anmonteiro/lumo/issues/153)).
- Correctly set __dirname and __filename when running script file ([#185](https://github.com/anmonteiro/lumo/issues/185)).
- Also Crawl `deps.cljs` files in dirs ([#184](https://github.com/anmonteiro/lumo/issues/184)).
- Suppress printing metadata for unknown types ([#189](https://github.com/anmonteiro/lumo/issues/189)).
- Fix brace highlighting for forms that span more than the terminal width ([#187](https://github.com/anmonteiro/lumo/issues/187)).

## [1.5.0](https://github.com/anmonteiro/lumo/compare/1.4.1...1.5.0) (2017-05-13)

### New features

- Add `find-doc` REPL function ([#141](https://github.com/anmonteiro/lumo/issues/141)).
- Add `source` REPL special ([#84](https://github.com/anmonteiro/lumo/issues/84)).
- Add `apropos` REPL function ([#86](https://github.com/anmonteiro/lumo/issues/86)).
- Print stacktraces ([#36](https://github.com/anmonteiro/lumo/issues/36)).
- Add support for running Lumo in the Git Bash on Windows ([#142](https://github.com/anmonteiro/lumo/issues/142)).

### Changes

- Upgrade Node.js to version 7.10.0.
- Upgrade ClojureScript to version 1.9.542. This includes the renaming of Spec
namespaces to `cljs.spec.alpha`, `cljs.spec.gen.alpha`, etc.

### Bug fixes

- Allow all asynchronous operations to finish before exiting when running scripts.
The fix that landed in version 1.4.1 still exhibited some issues ([#148](https://github.com/anmonteiro/lumo/issues/148)).
- Fix installation on Windows ([#149](https://github.com/anmonteiro/lumo/issues/149)).
- Don't crash if socket server can't bind to port ([#159](https://github.com/anmonteiro/lumo/issues/159)).
- Support multiple forms in `--eval` scripts ([#155](https://github.com/anmonteiro/lumo/issues/155)).
- Fix a bug that would prevent loading files from absolute paths ([#161](https://github.com/anmonteiro/lumo/issues/161)).

## [1.4.1](https://github.com/anmonteiro/lumo/compare/1.4.0...1.4.1) (2017-04-20)

### Changes

- Statically link the Lumo binary on Linux ([#137](https://github.com/anmonteiro/lumo/issues/137)).

### Bug fixes

- Allow all asynchronous operations to finish before exiting when running scripts.

## [1.4.0](https://github.com/anmonteiro/lumo/compare/1.3.0...1.4.0) (2017-04-19)

### New features

- Return exit code `1` on exception ([#58](https://github.com/anmonteiro/lumo/issues/58)).
- Pretty print evaluation results. This is turned on by default. It is posisble to
turn off pretty printing by binding `lumo.repl/*pprint-results*` to `false`.
- Add ability to kill infinite loops at the REPL with `Ctrl+C`.
- Print the Node.js version in the repl ([#104](https://github.com/anmonteiro/lumo/issues/104)).
- Add programmatic access to Lumo's version through `lumo.core/*lumo-version*`
([#127](https://github.com/anmonteiro/lumo/issues/127)).
- Interrupt printing at the REPL with `Ctrl+C` ([#107](https://github.com/anmonteiro/lumo/issues/107))
- Add missing Clojure repl special vars (*1, *2, *3, *e) ([#101](https://github.com/anmonteiro/lumo/issues/101))
- Make the classpath dynamic, add a new namespace `lumo.classpath` to interact
with the Lumo classpath ([#31](https://github.com/anmonteiro/lumo/issues/31)).

### Changes

- Print namespaced maps at the REPL.
- Do not print empty line if input is empty or whitespace only  (make behavior
consistent with `clojure.main`).
- Invalidate cache when source file changes ([#54](https://github.com/anmonteiro/lumo/issues/54)).
- Upgrade ClojureScript to version 1.9.521.
- Upgrade Closure Compiler JS to version v20170409.
- Upgrade Node.js to version 7.9.0.

### Bug fixes

- `print` always outputs newline ([#116](https://github.com/anmonteiro/lumo/issues/116)).
- Fix crash related to calculating indentation when entering multi-line forms at
the REPL ([#120](https://github.com/anmonteiro/lumo/issues/120)).
- Fix `doc` for special forms ([#124](https://github.com/anmonteiro/lumo/issues/124)).
- JavaScript completion only works in readline mode ([#103](https://github.com/anmonteiro/lumo/issues/103)).
- Comments in the REPL cause reader exception errors ([#74](https://github.com/anmonteiro/lumo/issues/74)).
- Fix error when calling `child_process.fork` ([#53](https://github.com/anmonteiro/lumo/issues/53)).
- Fix a bug that would prevent TTY support on Windows. Lumo is now at feature-parity
with every other supported platform.
- NPM installer defaults to Windows executable on failure ([#129](https://github.com/anmonteiro/lumo/issues/129)).
- Fix bug where completions for an empty suffix preceded by a NS alias would include
all vars in `cljs.core`.

## [1.3.0](https://github.com/anmonteiro/lumo/compare/1.2.0...1.3.0) (2017-04-02)

### New features

- Autocomplete JavaScript Node globals ([#85](https://github.com/anmonteiro/lumo/issues/85)).
- Add `dir` REPL special ([#87](https://github.com/anmonteiro/lumo/issues/87)).
- Add `-V / --version` CLI option to print the Lumo version.

### Changes

- Upgrade Node.js to version 7.8.0.
- Do not print verbose information on REPL startup, even if `--verbose`.
- Upgrade Google Closure Compiler to v20170218.
- Don't print `nil` result on `--eval` ([#108](https://github.com/anmonteiro/lumo/issues/108)).
- Remove readline history duplicates (`removeHistoryDuplicates` option introduced
in https://github.com/nodejs/node/pull/2982)

### Bug fixes

- Enable caching for files executed from the filesystem, provided their namespace
matches their location ([#73](https://github.com/anmonteiro/lumo/issues/73)).
- Port [CLJS-1948](http://dev.clojure.org/jira/browse/CLJS-1948)'s fix from upstream.
- Show completions for the empty suffixes ([#83](https://github.com/anmonteiro/lumo/issues/83)).

## [1.2.0](https://github.com/anmonteiro/lumo/compare/1.1.0...1.2.0) (2017-02-20)

### New features

- Add the ability to compile ClojureScript projects.

### Changes

- Upgrade Node.js to version 7.5.0.

### Bug fixes

- Fix a bug where `cljs.nodejs/require` wouldn't find modules in scripts run from
nested directories.

## [1.1.0](https://github.com/anmonteiro/lumo/compare/1.0.0...1.1.0) (2017-01-28)

### Changes

- Upgrade to ClojureScript 1.9.456 ([#71](https://github.com/anmonteiro/lumo/pull/71)).

### Bug fixes

- Regression where specifying a main script to be executed would print the banner
as if entering the REPL.
- Fix the semantics of the transformation of the load path into a classpath path
when using the `load` REPL special ([#49](https://github.com/anmonteiro/lumo/issues/49)).

## [1.0.0](https://github.com/anmonteiro/lumo/compare/1.0.0-alpha3...1.0.0) (2016-11-22)

### New features

- Highlight the matching brace when inserting a closing brace.
- TCP socket REPL ([#24](https://github.com/anmonteiro/lumo/pull/24)).
- REPL editing autocompletion.
- Add a `-m / --main` command line option that specifies a namespace in the
classpath in which to call a `-main` function with all args after it ([#27](https://github.com/anmonteiro/lumo/issues/27)).
- Add a `-a / --elide-asserts` command option that defines whether asserts in
evaluated code should be ignored ([#37](https://github.com/anmonteiro/lumo/issues/37)).
- `doc` REPL special function ([#26](https://github.com/anmonteiro/lumo/issues/26)).

### Changes

- Stop compiling Lumo with a static `--use-strict` V8 flag, allows to override it
at runtime ([#28](https://github.com/anmonteiro/lumo/issues/28)).
- Command line arg parsing has been rewritten so that CLI arguments are parsed in
the order they appear. Additionally, similarly to the Clojure REPL, arguments that
appear after a main option will be bound to the `lumo.core/*command-line-args*`
var, a seq of strings.
- Print a newline when pressing ctrl+C or evaluating empty form ([#29](https://github.com/anmonteiro/lumo/issues/29)).

## [1.0.0-alpha3](https://github.com/anmonteiro/lumo/compare/1.0.0-alpha2...1.0.0-alpha3) (2016-11-15)

### Changes

- Switch to a semantic versioning scheme. The next release will be 1.0.0-alpha3.

### Bug fixes

- Fix a regression in non-TTY mode introduced by emitting keypress events.
- Fix a crash that would happen if Parinfer wouldn't succeed at calculating the
indentation.

## [1.0-alpha2](https://github.com/anmonteiro/lumo/compare/1.0.0-alpha1...1.0.0-alpha2) (2016-11-13)

### New features

- Add `load` REPL special function. Same as [Clojure's `load`](http://clojure.github.io/clojure/clojure.core-api.html#clojure.core/load).
- Add support for Windows-formatted class paths ([#18](https://github.com/anmonteiro/lumo/pull/18)).
- Add support for indentation via Parinfer when multiline editing.

### Bug fixes

- Lack of OpenSSL support breaks some Node.js modules ([#2](https://github.com/anmonteiro/lumo/issues/2)).
- Allow foreign libraries to side-effect the global scope when required.
- Improve error message when a path is not passed to `-k` ([#14](https://github.com/anmonteiro/lumo/issues/14)).
- Don't throw when loading empty files ([#10](https://github.com/anmonteiro/lumo/issues/10)).
- `load-file` and init scripts shouldn't change the current namespace.
- Don't crash if JAR not found when looking for upstream foreign libs ([#19](https://github.com/anmonteiro/lumo/issues/19)).

## 1.0-alpha1 (2016-11-09)

- Initial version.
