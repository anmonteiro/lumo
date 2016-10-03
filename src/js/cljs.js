const vm = require('vm');

const cljsSrc = require('./main.js');

const cljsScript = new vm.Script(cljsSrc, {});
const defaultContext = newContext();

function newContext (globals) {
  const context = globals || {module:module,require:require,process:process,console:console}
  context.global = context;
  const ctx = vm.createContext(context);
  cljsScript.runInContext(ctx);
  return ctx;
}

function evalInContext(code: string) {
  defaultContext.lumo.repl.read_eval_print_str(code);
}

function getCurrentNS(): string{
  return defaultContext.lumo.repl.get_current_ns();
}


module.exports = {
  eval: evalInContext,
  currentNS: getCurrentNS,
};
