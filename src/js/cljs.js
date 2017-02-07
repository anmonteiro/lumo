/* @flow */
/* eslint-disable no-underscore-dangle  */

import crypto from 'crypto';
import fs from 'fs';
// $FlowIssue: this module exists
import Module from 'module';
import path from 'path';
import vm from 'vm';
import * as lumo from './lumo';
import startREPL from './repl';

import type { CLIOptsType } from './cli';

let newContext;
let ClojureScriptContext;

function lumoEval(source: string, isForeign: boolean, execPath: ?string): mixed {
  if (execPath != null && !__DEV__) {
    const absoluteExecPath = path.resolve(execPath);
    const module = new Module(execPath);

    module.filename = absoluteExecPath;
    module.paths = Module._nodeModulePaths(path.dirname(absoluteExecPath));

    const script = 'global.require = require;\n' +
          'return require("vm").' +
          `runInThisContext(${JSON.stringify(source)}, ` +
         `{ filename: ${JSON.stringify(absoluteExecPath)}, displayErrors: true });\n`;

    return module._compile(script, `${execPath}-wrapper`);
  }

  // $FlowIssue: this exists
  const _module = ClojureScriptContext.module;
  // $FlowIssue: this also exists
  const _exports = ClojureScriptContext.exports;
  let ret;

  if (isForeign) {
    // this is a hack needed for foreign libraries to end up on global scope.
    // Closure Library's goog.bootstrap.nodeJs does the same thing.
    // $FlowIssue: this exists
    ClojureScriptContext.module = undefined;
    // $FlowIssue: this exists
    ClojureScriptContext.exports = undefined;
  }

  if (__DEV__) {
    // $FlowFixMe: this type differs according to the env
    ret = vm.runInContext(source, ClojureScriptContext);
  } else {
    ret = vm.runInThisContext(source);
  }

  if (isForeign) {
    // $FlowIssue: this exists
    ClojureScriptContext.module = _module;
    // $FlowIssue: this exists
    ClojureScriptContext.exports = _exports;
  }

  return ret;
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
      $$LUMO_GLOBALS: {
        crypto,
        fs,
        path,
        getGoogleClosureCompiler: lumo.getGoogleClosureCompiler,
        getParinfer: lumo.getParinfer,
        getJSZip: lumo.getJSZip,
        load: lumo.load,
        readCache: lumo.readCache,
        readSource: lumo.readSource,
        writeCache: lumo.writeCache,
        loadUpstreamForeignLibs: lumo.loadUpstreamForeignLibs,
        resource: lumo.resource,
        readSourceFromJar: lumo.readSourceFromJar,
        eval: lumoEval,
        readSourcePaths: lumo.readSourcePaths,
      },
      global: undefined,
    };

    context.global = context;

    const ctx = vm.createContext(context);
    cljsScript.runInContext(ctx);
    return ctx;
  };
} else {
  newContext = function newCtx(): {[key: string]: mixed} {
    global.$$LUMO_GLOBALS = {
      crypto,
      fs,
      path,
      getGoogleClosureCompiler: lumo.getGoogleClosureCompiler,
      getParinfer: lumo.getParinfer,
      getJSZip: lumo.getJSZip,
      load: lumo.load,
      readCache: lumo.readCache,
      readSource: lumo.readSource,
      writeCache: lumo.writeCache,
      loadUpstreamForeignLibs: lumo.loadUpstreamForeignLibs,
      resource: lumo.resource,
      readSourceFromJar: lumo.readSourceFromJar,
      eval: lumoEval,
      readSourcePaths: lumo.readSourcePaths,
    };

    // // $FlowExpectedError: only exists in the custom V8 startup snapshot
    initialize(); // eslint-disable-line no-undef

    return global;
  };
}

function setRuntimeOpts(opts: CLIOptsType): void {
  const { cache, verbose, repl } = opts;
  const staticFns = opts['static-fns'];
  const elideAsserts = opts['elide-asserts'];
  // $FlowIssue: context can have globals
  ClojureScriptContext.lumo.repl.init(repl, verbose, cache, staticFns, elideAsserts);
}

function initClojureScriptEngine(opts: CLIOptsType): void {
  if (ClojureScriptContext != null) {
    return;
  }
  const { args } = opts;

  ClojureScriptContext = newContext();
  // $FlowIssue: context can have globals
  ClojureScriptContext.cljs.user = {};
  /* eslint-disable no-underscore-dangle */
  // $FlowIssue: context can have globals
  ClojureScriptContext.cljs.nodejs.enable_util_print_BANG_();

  if (args.length > 0) {
    // $FlowIssue: context can have globals
    ClojureScriptContext.lumo.core._STAR_command_line_args_STAR_ =
      // $FlowIssue: context can have globals
      ClojureScriptContext.cljs.core.seq(args);
  }
  /* eslint-enable no-underscore-dangle */

  setRuntimeOpts(opts);
}

export function execute(
  code: string,
  type: string = 'text',
  expression: boolean = true,
  printNilResult: boolean = true,
  setNS: ?string): void {
  // $FlowIssue: context can have globals
  return ClojureScriptContext.lumo.repl.execute(
    type, code, expression, printNilResult, setNS);
}

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

export function getHighlightCoordinates(
  text: string[],
  pos: number): [number, number] {
  // $FlowIssue: context can have globals
  return ClojureScriptContext.lumo.repl.get_highlight_coordinates(text, pos);
}

export function getCompletions(line: string): string[] {
  // $FlowIssue: context can have globals
  return ClojureScriptContext.lumo.repl.get_completions(line);
}

function executeScripts(scripts: [string, string][]): void {
  scripts.forEach(([type, script]: [string, string]) => {
    executeScript(script, type);
  });
}

function runMain(mainNS: string, args: string[]): void {
  // $FlowIssue: context can have globals
  ClojureScriptContext.lumo.repl.run_main.apply(null, [mainNS, ...args]);
}

export default function startClojureScriptEngine(opts: CLIOptsType): void {
  const { args, mainNsName, mainScript, repl, scripts } = opts;

  if (scripts.length > 0) {
    initClojureScriptEngine(opts);
    executeScripts(scripts);
  }

  if (mainScript) {
    initClojureScriptEngine(opts);
    return executeScript(mainScript, 'path');
  }

  if (mainNsName) {
    initClojureScriptEngine(opts);
    return runMain(mainNsName, args);
  }

  if (repl) {
    process.nextTick(() => {
      initClojureScriptEngine(opts);
      execute('(require \'[lumo.repl :refer-macros [doc]])',
        'text', true, false, 'cljs.user');
    });

    return startREPL(opts);
  }

  return undefined;
}
