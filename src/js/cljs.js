/* @flow */

const vm = require('vm');
const fs = require('fs');

let cljsSrc;

if (__DEV__) {
  cljsSrc = fs.readFileSync('./target/main.js', 'utf8');
} else {
  // $FlowExpectedError: only exists in the Nexe bundle.
  const nexeres = require('nexeres');

  cljsSrc = nexeres.get('main.js');
}

const cljsScript = new vm.Script(cljsSrc, {});

function newContext() {
  const context: Object = {
    module,
    require,
    process,
    console,
  };

  context.global = context;
  const ctx = vm.createContext(context);
  cljsScript.runInContext(ctx);
  return ctx;
}

const defaultContext = newContext();

function evalInContext(code: string) {
  // $FlowIssue: context can have globals
  defaultContext.lumo.repl.read_eval_print_str(code);
}

function getCurrentNS(): string {
  // $FlowIssue: context can have globals
  return defaultContext.lumo.repl.get_current_ns();
}

module.exports = {
  eval: evalInContext,
  currentNS: getCurrentNS,
};
