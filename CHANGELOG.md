# Changelog

## [master](https://github.com/anmonteiro/lumo/compare/1.0.0-alpha2...HEAD) (unreleased)

### New features

- Highlight the matching brace when inserting a closing brace.
- TCP socket REPL ([#24](https://github.com/anmonteiro/lumo/pull/24)).

### Changes

- Stop compiling Lumo with a static `--use-strict` V8 flag, allows to override it
at runtime ([#28](https://github.com/anmonteiro/lumo/issues/28)).

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
