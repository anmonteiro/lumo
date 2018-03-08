<img src="./logo/full.png" alt="lumo logo" title="lumo" align="right" width="150" height="150" />

## Submitting a Pull Request (PR)

Before you submit your Pull Request (PR) consider the following guidelines:

* Search [GitHub](https://github.com/anmonteiro/lumo/pulls) for an open or
  closed PR. You don't want to duplicate effort. Write on the Slack #lumo
  channel if unsure.

* Create your patch **including appropriate test cases**.

* When finished, run the pre-compilation tests:

  ```shell
  yarn lint
  yarn type:check
  yarn test
  boot test
  ```

* Compile `lumo`:

  ```shell
  boot release
  ```

* Run the CLJS test suite against `./build/lumo` (Linux or Windows):

  ```shell
  ./scripts/test-build
  ```

  ```shell
  scripts/test-build.bat
  ```

* Add your PR changes to 
  [CHANGELOG.md](./CHANGELOG.md),
  including the relevant link to either the issue or the PR itself.

* In GitHub, open a pull request to `lumo:master`.

* If we suggest changes then:
  * Make the required updates (please).
  * Re-run the test suites to ensure tests are still passing.
  * Rebase your branch if necessary and force push to your GitHub repository (this will update your PR).

Thank you for your contribution!

## Development workflow

In order to start watch-compilation use:

```shell
boot dev
```

Then in another terminal execute the following for a plain dev REPL with autocaching:

```shell
yarn dev
```

Or this other command for a dev REPL that includes the test suite on the classpath:

```shell
yarn test-dev
```

The latter repl is useful for trying out failing tests individually:

```clojure
cljs.user=> (require 'lumo.repl-tests)
nil
cljs.user=> (in-ns 'lumo.repl-tests)
lumo.repl-tests=> (t/test-var #'test-apropos)
nil
;; hopefully :)
```
