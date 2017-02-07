# Changelog

## [master](https://github.com/anmonteiro/lumo/compare/1.1.0...HEAD) (unreleased)

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
