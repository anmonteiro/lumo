/* @flow */

import crypto from 'crypto';
import fs from 'fs';
import Module from 'module';
import path from 'path';
import vm from 'vm';
import JSZip from 'jszip';
import DiscardingSender from './discarding-sender';
import * as lumo from './lumo';
import startREPL, { currentREPLInterface } from './repl';
import * as socketRepl from './socketRepl';

import type { CLIOptsType } from './cli';

// $FlowIssue: process has a binding function
const utilBinding = process.binding('util');

let ClojureScriptContext;

const interruptSentinel = {};
const scriptOptions = {
  displayErrors: true,
  breakOnSigint: true,
};

function lumoEval(
  source: string,
  isForeign: boolean,
  execPath: ?string,
): mixed {
  if (execPath != null) {
    const filename = path.resolve(execPath);
    const dirname = path.dirname(filename);
    const module = new Module(filename);

    module.filename = filename;
    module.paths = Module._nodeModulePaths(dirname);

    return module._compile(source, filename);
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

  if (currentREPLInterface != null) {
    utilBinding.startSigintWatchdog();
    const previouslyInRawMode = currentREPLInterface._setRawMode(false);

    try {
      ret = __DEV__
        ? // $FlowFixMe: this type differs according to the env
          vm.runInContext(source, ClojureScriptContext, scriptOptions)
        : vm.runInThisContext(source, scriptOptions);
    } catch (e) {
      if (e.message !== 'Script execution interrupted.') {
        throw e;
      }
    } finally {
      currentREPLInterface._setRawMode(previouslyInRawMode);
      const hadPendingSignals = utilBinding.stopSigintWatchdog();
      if (hadPendingSignals) {
        currentREPLInterface.emit('SIGINT');
      }
    }
  } else {
    ret = __DEV__
      ? // $FlowFixMe: this type differs according to the env
        vm.runInContext(source, ClojureScriptContext, scriptOptions)
      : vm.runInThisContext(source, scriptOptions);
  }

  if (isForeign) {
    // $FlowIssue: this exists
    ClojureScriptContext.module = _module;
    // $FlowIssue: this exists
    ClojureScriptContext.exports = _exports;
  }

  return ret;
}

function doPrint(cb: (value: string) => void, arg: string): void {
  if (currentREPLInterface != null) {
    utilBinding.startSigintWatchdog();
    const previouslyInRawMode = currentREPLInterface._setRawMode(false);

    try {
      cb(arg);
    } catch (e) {
      if (e !== interruptSentinel) {
        throw e;
      }
    } finally {
      currentREPLInterface._setRawMode(previouslyInRawMode);

      const hadPendingSignals = utilBinding.stopSigintWatchdog();
      if (hadPendingSignals) {
        currentREPLInterface.emit('SIGINT');
      }
    }
  } else {
    cb(arg);
  }
}

function newDevelopmentContext(): vm$Context {
  // $FlowFixMe: we know for sure this file will exist.
  const cljsScript = new vm.Script(lumo.load('main.js'), {});

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
      getJSCompletions: lumo.getJSCompletions,
      doPrint,
      JSZip,
      load: lumo.load,
      readCache: lumo.readCache,
      readSource: lumo.readSource,
      readFile: lumo.readFile,
      writeCache: lumo.writeCache,
      loadUpstreamForeignLibs: lumo.loadUpstreamForeignLibs,
      resource: lumo.resource,
      readSourceFromJar: lumo.readSourceFromJar,
      eval: lumoEval,
      addSourcePaths: lumo.addSourcePaths,
      getSourcePaths: lumo.getSourcePaths,
      removeSourcePath: lumo.removeSourcePath,
    },
    global: undefined,
  };

  context.global = context;

  const ctx = vm.createContext(context);
  cljsScript.runInContext(ctx);
  return ctx;
}

function newClojureScriptContext(): { [key: string]: mixed } {
  global.$$LUMO_GLOBALS = {
    crypto,
    fs,
    path,
    getGoogleClosureCompiler: lumo.getGoogleClosureCompiler,
    getJSCompletions: lumo.getJSCompletions,
    doPrint,
    JSZip,
    load: lumo.load,
    readCache: lumo.readCache,
    readSource: lumo.readSource,
    readFile: lumo.readFile,
    writeCache: lumo.writeCache,
    loadUpstreamForeignLibs: lumo.loadUpstreamForeignLibs,
    resource: lumo.resource,
    readSourceFromJar: lumo.readSourceFromJar,
    eval: lumoEval,
    addSourcePaths: lumo.addSourcePaths,
    getSourcePaths: lumo.getSourcePaths,
    removeSourcePath: lumo.removeSourcePath,
  };

  return global;
}

function setRuntimeOpts(opts: CLIOptsType): void {
  const { cache, verbose, repl } = opts;
  const staticFns = opts['static-fns'];
  const fnInvokeDirect = opts['fn-invoke-direct'];
  const elideAsserts = opts['elide-asserts'];
  // $FlowIssue: context can have globals
  ClojureScriptContext.lumo.repl.init(
    repl,
    verbose,
    cache,
    staticFns,
    fnInvokeDirect,
    elideAsserts,
  );
}

let cljsSender: stream$Writable;

function printFn(...args: string[]): void {
  if (utilBinding.watchdogHasPendingSigint()) {
    throw interruptSentinel;
  }
  cljsSender.write(args.join(' '));
}

function printErrFn(...args: string[]): void {
  if (utilBinding.watchdogHasPendingSigint()) {
    throw interruptSentinel;
  }

  process.stderr.write(args.join(' '));
}

export function setPrintFns(stream?: stream$Writable): void {
  if (stream == null || stream === process.stdout) {
    cljsSender = process.stdout;
    // $FlowIssue: context can have globals
    ClojureScriptContext.cljs.core.set_print_err_fn_BANG_(printErrFn);
  } else {
    cljsSender = stream;
    // $FlowIssue: context can have globals
    ClojureScriptContext.cljs.core.set_print_err_fn_BANG_(printFn);
  }
  // $FlowIssue: context can have globals
  ClojureScriptContext.cljs.core.set_print_fn_BANG_(printFn);
}

function initClojureScriptEngine(opts: CLIOptsType): void {
  if (ClojureScriptContext != null) {
    return;
  }
  const { args } = opts;

  ClojureScriptContext = __DEV__
    ? newDevelopmentContext()
    : newClojureScriptContext();

  // $FlowIssue: context can have globals
  ClojureScriptContext.cljs.user = {};

  setPrintFns();

  if (args != null && args.length > 0) {
    // $FlowIssue: context can have globals
    ClojureScriptContext.lumo.core._STAR_command_line_args_STAR_ =
      // $FlowIssue: context can have globals
      ClojureScriptContext.cljs.core.seq(args);
  }

  setRuntimeOpts(opts);
}

export function execute(
  code: string,
  type?: string = 'text',
  expression?: boolean = true,
  printNilResult?: boolean = true,
  sessionID?: number = 0,
  setNS?: string,
): void {
  // $FlowIssue: context can have globals
  return ClojureScriptContext.lumo.repl.execute(
    type,
    code,
    expression,
    printNilResult,
    setNS,
    sessionID,
  );
}

export function getCurrentNamespace(): string {
  // $FlowIssue: context can have globals
  return ClojureScriptContext.lumo.repl.get_current_ns();
}

export function isReadable(form: string): string | false {
  // $FlowIssue: context can have globals
  return ClojureScriptContext.lumo.repl.is_readable_QMARK_(form);
}

export function getHighlightCoordinates(
  text: string[],
  pos: number,
): [number, number] {
  // $FlowIssue: context can have globals
  return ClojureScriptContext.lumo.repl.get_highlight_coordinates(text, pos);
}

export function getCompletions(line: string, cb: (string[]) => void): void {
  // $FlowIssue: context can have globals
  return ClojureScriptContext.lumo.repl.get_completions(line, cb);
}

export function isPrintingNewline(): boolean {
  // $FlowIssue: context can have globals
  return ClojureScriptContext.cljs.core._STAR_print_newline_STAR_;
}

export function clearREPLSessionState(sessionID: number): void {
  // $FlowIssue: context can have globals
  return ClojureScriptContext.lumo.repl.clear_state_for_session(sessionID);
}

function executeScript(code: string, type: string): void {
  if (type === 'text') {
    let currentInput = code;
    let extraForms = isReadable(currentInput);

    while (currentInput) {
      if (extraForms) {
        currentInput = currentInput.substring(
          0,
          currentInput.length - extraForms.length,
        );
      }

      execute(currentInput, 'text', true, false);
      currentInput = extraForms;
      extraForms = !!currentInput && isReadable(currentInput);
    }
  } else {
    execute(code, 'path', false, false);
  }
}

function executeScripts(scripts: [string, string][]): void {
  scripts.forEach(([type, script]: [string, string]) => {
    executeScript(script, type);
    if (process.exitCode != null) {
      process.exit();
    }
  });
}

function runMain(mainNS: string, args: string[]): void {
  // $FlowIssue: context can have globals
  ClojureScriptContext.lumo.repl.run_main.apply(null, [mainNS, ...args]);
}

function processStdin(): void {
  let code = '';
  process.stdin.on('data', (chunk: string) => {
    code += chunk;
  });
  process.stdin.on('error', () => {
    process.stderr.write('Error processing stdin.\n');
    process.exit(1);
  });
  process.stdin.on('end', () => {
    executeScript(code, 'text');
  });
}

// Runs the namespaced cljs function passed into it, which should accept a
// socket as its only argument
// TODO: Is this really the best generalization? Should it be?
export function runAcceptFN(
  fn: string,
  socket?: net$Socket,
  acceptArgs?: Array<mixed>,
): void {
  // $FlowIssue: context can have globals
  ClojureScriptContext.lumo.repl.run_accept_fn.call(
    null,
    fn,
    socket,
    acceptArgs,
  );
}

export default (async function startClojureScriptEngine(
  opts: CLIOptsType,
): Promise<mixed> {
  const { args, mainNsName, mainScript, repl, scripts, quiet } = opts;
  const socketReplArgs = opts['socket-repl'];

  if (socketReplArgs != null) {
    // Possible socketrepl format
    //  port OR host:port
    //  port:host is no longer accepted (was it ever?)
    // {"host": "localhost", ;; Defaults to localhost
    //  "port": 12345, ;; Required
    //  "accept": "some.namespaced/fn", ;; Defaults to opening a socket repl
    //  "args": ["a list of args", 9999, {"foo": "bar"}]} ;; This has no default
    initClojureScriptEngine(opts);

    const hostAndPortRegex = /(?:(?:(^.*):)|^)(\d{1,5})$/;
    const jsonRegex = /^{/; // We only accept JSON objects, ports, or host:port pairs

    const hostPortMatch = socketReplArgs.match(hostAndPortRegex);

    // TODO: I think I need to handle default cases for these variables differently
    let host = '';
    let port = '';
    let acceptFn: (socket: net$Socket) => void | string;
    let acceptArgs: Array<mixed>;
    let replOpts;

    if (jsonRegex.test(socketReplArgs)) {
      // This throws SyntaxError if we're passed invalid JSON
      replOpts = JSON.parse(socketReplArgs);
    } else if (hostPortMatch != null) {
      // The leading comma is really important here, as the first result from
      // match is the whole string, and we want the matched groups, which come
      // afterwards.
      // NOTE: host will be undefined if we only match a port, this is ok.
      [, host, port] = hostPortMatch;
    } else {
      throw new SyntaxError(
        `Got Socket REPL args, but they were unparsable. Args were: ${socketReplArgs}`,
      );
    }

    if (replOpts != null) {
      host = replOpts.host;
      port = replOpts.port;
      acceptFn = replOpts.accept;
      acceptArgs = replOpts.args;
    }

    if (isNaN(parseInt(port, 10))) {
      throw new SyntaxError(`Specified port is not a number. Port is: ${port}`);
    }

    try {
      await socketRepl.open(parseInt(port, 10), host, acceptFn, acceptArgs);

      if (!quiet) {
        process.stdout.write(
          `Lumo socket REPL listening at ${host != null
            ? host
            : 'localhost'}:${port}.\n`,
        );
      }
    } catch (e) {
      // I wanted to destructure with { message } but
      // ran into https://github.com/facebook/flow/issues/3874
      process.stderr.write(`Error: ${e.message}\n`);
    }
  }

  if (scripts.length > 0) {
    initClojureScriptEngine(opts);
    executeScripts(scripts);
  }

  if (mainScript) {
    initClojureScriptEngine(opts);
    if (mainScript === '-') {
      processStdin();
    } else {
      executeScript(mainScript, 'path');
    }
  }

  if (mainNsName) {
    initClojureScriptEngine(opts);
    runMain(mainNsName, args);
  }

  if (repl) {
    process.nextTick(() => {
      initClojureScriptEngine(opts); // XXX Why doesn't the previous call cover this?
      if (!__DEV__) {
        setPrintFns(new DiscardingSender());
      }

      execute(
        "(require '[lumo.repl :refer [apropos find-doc] :refer-macros [dir doc source]])",
        'text',
        true,
        false,
        0,
        'cljs.user',
      );

      setPrintFns();
    });

    startREPL(opts);
  }

  ClojureScriptContext = null;
  return undefined;
});
