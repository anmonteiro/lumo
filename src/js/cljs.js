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
import { isWhitespace } from './util';

import type { CLIOptsType } from './cli';

type sigintHandlerType = number => void;

// $FlowIssue: process has a binding function
const utilBinding = process.binding('util');

let ClojureScriptContext: vm$Context;

const interruptSentinel = {};
const scriptOptions = {
  displayErrors: true,
};
const interruptibleScriptOptions = {
  ...scriptOptions,
  breakOnSigint: true,
};

function getAndRemoveSigintEventListeners(): sigintHandlerType[] {
  const listeners = Array.prototype.slice.call(process.listeners('SIGINT'));
  process.removeAllListeners('SIGINT');

  return listeners;
}

function restoreSigintHandlers(handlers: sigintHandlerType[]): void {
  handlers.forEach((listener: sigintHandlerType) =>
    process.on('SIGINT', listener),
  );
}

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

    if (__DEV__) {
      const compiledWrapper = vm.runInContext(
        Module.wrap(source),
        ClojureScriptContext,
        {
          filename,
          lineOffset: 0,
          displayErrors: true,
        },
      );

      return compiledWrapper.call(
        module.exports,
        module.exports,
        require,
        module,
        filename,
        dirname,
      );
    }

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
    const sigintHandlers = getAndRemoveSigintEventListeners();
    utilBinding.startSigintWatchdog();
    const previouslyInRawMode = currentREPLInterface._setRawMode(false);

    try {
      ret = __DEV__
        ? vm.runInContext(
            source,
            ClojureScriptContext,
            interruptibleScriptOptions,
          )
        : vm.runInThisContext(source, interruptibleScriptOptions);
    } catch (e) {
      if (e.message !== 'Script execution interrupted.') {
        throw e;
      }
    } finally {
      currentREPLInterface._setRawMode(previouslyInRawMode);
      const hadPendingSignals = utilBinding.stopSigintWatchdog();
      restoreSigintHandlers(sigintHandlers);

      if (hadPendingSignals) {
        currentREPLInterface.emit('SIGINT');
      }
    }
  } else {
    ret = __DEV__
      ? vm.runInContext(source, ClojureScriptContext, scriptOptions)
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
    const sigintHandlers = getAndRemoveSigintEventListeners();
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
      restoreSigintHandlers(sigintHandlers);

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
    setTimeout,
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
      loadUpstreamJsLibs: lumo.loadUpstreamJsLibs,
      loadUpstreamDataReaders: lumo.loadUpstreamDataReaders,
      resource: lumo.resource,
      readSourceFromJar: lumo.readSourceFromJar,
      readDirFromJar: lumo.readDirFromJar,
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

function newClojureScriptContext(): vm$Context {
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
    loadUpstreamJsLibs: lumo.loadUpstreamJsLibs,
    loadUpstreamDataReaders: lumo.loadUpstreamDataReaders,
    resource: lumo.resource,
    readSourceFromJar: lumo.readSourceFromJar,
    readDirFromJar: lumo.readDirFromJar,
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
  const checkedArrays = opts['checked-arrays'];
  // $FlowIssue: context can have globals
  ClojureScriptContext.lumo.repl.init(
    repl,
    verbose,
    cache,
    staticFns,
    fnInvokeDirect,
    elideAsserts,
    checkedArrays,
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

  // https://github.com/planck-repl/planck/commit/3445dd7f9f3c3a13632bd5e92433959b7c1d2770
  // $FlowIssue: context can have globals
  ClojureScriptContext.cljs.core._STAR_print_newline_STAR_ = true;
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
    ClojureScriptContext.cljs.core._STAR_command_line_args_STAR_ =
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

export function getCurrentNamespace(sessionID: number): string {
  // $FlowIssue: context can have globals
  return ClojureScriptContext.lumo.repl.get_current_ns(sessionID);
}

export function isReadable(
  form: string,
  shouldThrowOnEOF?: boolean = false,
): ?string {
  // $FlowIssue: context can have globals
  return ClojureScriptContext.lumo.repl.is_readable_QMARK_(
    form,
    shouldThrowOnEOF,
  );
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

function executeScript(
  code: string,
  type: string,
  expression?: boolean = true,
): void {
  if (type === 'text') {
    let currentInput = code;
    let extraForms;

    for (;;) {
      try {
        extraForms = isReadable(currentInput, true);
      } catch (_) {
        break;
      }

      if (isWhitespace(currentInput)) {
        break;
      }

      if (extraForms != null) {
        currentInput = currentInput.substring(
          0,
          currentInput.length - extraForms.length,
        );

        execute(currentInput, 'text', expression, false);
        currentInput = extraForms;
      }
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

function runMainCliFn(): void {
  // $FlowIssue: context can have globals
  ClojureScriptContext.lumo.repl.run_main_cli_fn();
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
    executeScript(code, 'text', false);
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
  ClojureScriptContext.lumo.repl.run_accept_fn(fn, socket, acceptArgs);
}

type ReplOptsType = {
  host: string,
  port: number,
};

async function initSocketRepl(
  socketReplArgs: string,
  quiet: boolean,
): Promise<mixed> {
  // Possible socketrepl format
  //  port OR host:port OR
  // {"host": "localhost", ;; Defaults to localhost
  //  "port": 12345, ;; Required
  //  "accept": "some.namespaced/fn", ;; Defaults to opening a socket repl
  //  "args": ["a list of args", 9999, {"foo": "bar"}]} ;; This has no default
  const hostAndPortRegex = /(?:(?:(^.*?):)|^)(\d{1,5})$/;
  const [, host, port] = socketReplArgs.match(hostAndPortRegex) || [];

  try {
    const parsedOpts = /^{/.test(socketReplArgs)
      ? JSON.parse(socketReplArgs)
      : { host, port };

    const replOpts: ReplOptsType = {
      port: parseInt(parsedOpts.port, 10),
      host: parsedOpts.host,
    };

    // This tweak is required because the thrown error varies in different node
    // versions and jest does not allow yet to specify the snapshot name at runtime.
    // It's been worked on though, see:
    //   https://github.com/facebook/jest/pull/5838#issuecomment-382476612
    const errorMsg = `Port should be > 0 and < 65536. Received ${
      parsedOpts.port
    }.`;
    if (Number.isNaN(replOpts.port)) {
      throw new Error(errorMsg);
    } else if (replOpts.port < 1 || replOpts.port > 65536) {
      throw new Error(errorMsg);
    }

    // $FlowIssue: we have converted port to number
    await socketRepl.open(replOpts);

    if (!quiet) {
      process.stdout.write(
        `Lumo socket REPL listening at ${
          replOpts.host != null ? host : 'localhost'
        }:${replOpts.port}.\n`,
      );
    }
  } catch (e) {
    // I wanted to destructure with { message } but
    // ran into https://github.com/facebook/flow/issues/3874
    process.stderr.write(`Error: ${e.message}\n`);
  }
}

async function startClojureScriptEngine(opts: CLIOptsType): Promise<mixed> {
  const { args, mainNsName, mainScript, repl, scripts, quiet } = opts;
  const socketReplArgs = opts['socket-repl'];

  if (socketReplArgs != null) {
    await initSocketRepl(socketReplArgs, quiet);
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
      initClojureScriptEngine(opts);
      if (!__DEV__) {
        setPrintFns(new DiscardingSender());
      }

      execute(
        "(require '[lumo.repl :refer [apropos find-doc find-var] :refer-macros [dir doc source]])",
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

  if (!mainNsName && !repl) {
    initClojureScriptEngine(opts);
    runMainCliFn();
  }
}

export default startClojureScriptEngine;
