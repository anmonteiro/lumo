# Changelog

## [master](https://github.com/anmonteiro/lumo/compare/1.4.1...HEAD) (unreleased)

### New features

- Add `find-doc` REPL function ([#141](https://github.com/anmonteiro/lumo/issues/141)).
- Add `source` REPL special ([#84](https://github.com/anmonteiro/lumo/issues/84)).
- Add `apropos` REPL function ([#86](https://github.com/anmonteiro/lumo/issues/86)).
- Print stacktraces ([#36](https://github.com/anmonteiro/lumo/issues/36)).
- Add support for running Lumo in the Git Bash on Windows ([#142](https://github.com/anmonteiro/lumo/issues/142)).

### Changes

- Upgrade Node.js to version 7.10.0.

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
