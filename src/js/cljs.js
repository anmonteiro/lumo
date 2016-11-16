/* @flow */
/* eslint-disable no-underscore-dangle  */

import * as lumo from './lumo';
import startREPL from './repl';

import type { CLIOptsType } from './cli';

const parinfer = require('parinfer');
const vm = require('vm');

let newContext;
let ClojureScriptContext;

function lumoEval(source: string): mixed {
  if (__DEV__) {
    // $FlowFixMe: this type differs according to the env
    return vm.runInContext(source, ClojureScriptContext);
  }
  return vm.runInThisContext(source);
}

if (__DEV__) {
  newContext = function newCtx(): vm$Context {
    const cljsSrc = lumo.load('main.js');
    // $FlowFixMe: we know for sure this file will exist.
    const cljsScript = new vm.Script(cljsSrc, {});

    const context = {
      module,
      exports,
      require,
      process,
      console,
      parinfer,
      LUMO_LOAD: lumo.load,
      LUMO_READ_CACHE: lumo.readCache,
      LUMO_READ_SOURCE: lumo.readSource,
      LUMO_WRITE_CACHE: lumo.writeCache,
      LUMO_LOAD_UPS_DEPS_CLJS: lumo.loadUpstreamForeignLibs,
      LUMO_EXISTS: lumo.fileExists,
      LUMO_EVAL: lumoEval,
      global: undefined,
    };

    context.global = context;

    const ctx = vm.createContext(context);
    cljsScript.runInContext(ctx);
    return ctx;
  };
} else {
  newContext = function newCtx(): {[key: string]: mixed} {
    global.parinfer = parinfer;
    global.LUMO_LOAD = lumo.load;
    global.LUMO_READ_CACHE = lumo.readCache;
    global.LUMO_READ_SOURCE = lumo.readSource;
    global.LUMO_WRITE_CACHE = lumo.writeCache;
    global.LUMO_LOAD_UPS_DEPS_CLJS = lumo.loadUpstreamForeignLibs;
    global.LUMO_EXISTS = lumo.fileExists;
    global.LUMO_EVAL = lumoEval;

    // $FlowExpectedError: only exists in the custom V8 startup snapshot
    initialize(); // eslint-disable-line no-undef

    return global;
  };
}

function setRuntimeOpts(opts: CLIOptsType): void {
  const { cache, verbose, repl } = opts;
  const staticFns = opts['static-fns'];
  // $FlowIssue: context can have globals
  ClojureScriptContext.lumo.repl.init(repl, verbose, cache, staticFns);
}

function initClojureScriptEngine(opts: CLIOptsType): void {
  ClojureScriptContext = newContext();
  // $FlowIssue: context can have globals
  ClojureScriptContext.cljs.user = {};
  /* eslint-disable no-underscore-dangle */
  // $FlowIssue: context can have globals
  ClojureScriptContext.cljs.nodejs.enable_util_print_BANG_();
  /* eslint-enable no-underscore-dangle */

  setRuntimeOpts(opts);
}

/* eslint-disable indent */
export function execute(code: string,
                        type: string = 'text',
                        expression: boolean = true,
                        setNS: ?string): void {
  // $FlowIssue: context can have globals
  ClojureScriptContext.lumo.repl.execute(type, code, expression, setNS);
}
/* eslint-enable indent */

function executeScript(code: string, type: string): void {
  return execute(code, type, type !== 'path');
}

export function getCurrentNamespace(): string {
  // $FlowIssue: context can have globals
  return ClojureScriptContext.lumo.repl.get_current_ns();
}

export function isReadable(form: string): string | false {
  // $FlowIssue: context can have globals
  return ClojureScriptContext.lumo.repl.is_readable_QMARK_(form);
}

export function indentSpaceCount(text: string): number {
  // $FlowIssue: context can have globals
  return ClojureScriptContext.lumo.repl.indent_space_count(text);
}

export function getHighlightCoordinates(text: string[], pos: number): [number, number] {
  // $FlowIssue: context can have globals
  return ClojureScriptContext.lumo.repl.get_highlight_coordinates(text, pos);
}

function executeScripts(scripts: [string, string][]): void {
  scripts.forEach(([type, script]: [string, string]) => {
    executeScript(script, type);
  });
}

export default function startClojureScriptEngine(opts: CLIOptsType): void {
  const { repl, scripts, _ } = opts;
  const [mainScript] = _;
  let engineStarted = false;

  if (mainScript) {
    initClojureScriptEngine(opts);
    return executeScript(mainScript, 'path');
  }

  if (scripts.length > 0) {
    initClojureScriptEngine(opts);
    engineStarted = true;
    executeScripts(scripts);
    // $FlowIssue: context can have globals
    ClojureScriptContext.lumo.repl.set_ns('cljs.user');
  }

  if (repl) {
    if (!engineStarted) {
      process.nextTick(() => {
        initClojureScriptEngine(opts);
        engineStarted = true;
      });
    }
    return startREPL(opts);
  }

  return undefined;
}
