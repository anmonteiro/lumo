/* @flow */

import startClojureScriptEngine from './cljs';
import printLegal from './legal';
import * as lumo from './lumo';
import * as util from './util';
import * as socketRepl from './socketRepl';
import version from './version';

// $FlowIssue: this module exists.
const v8 = require('v8'); // eslint-disable-line import/no-unresolved
const minimist = require('minimist');

type ScriptsType = [string, string][];

export type CLIOptsType = {
  _: string[],
  verbose: boolean,
  v: boolean,
  help: boolean,
  h: boolean,
  '?': boolean,
  repl: boolean,
  r: boolean,
  'auto-cache': boolean,
  K: boolean,
  quiet: boolean,
  q: boolean,
  'dumb-terminal': boolean,
  d: boolean,
  'static-fns': boolean,
  s: boolean,
  legal: boolean,
  l: boolean,
  init?: string | string[],
  i?: string | string[],
  eval?: string | string[],
  e?: string | string[],
  cache?: string,
  k?: string,
  classpath?: string | string[],
  c?: string | string[],
  n?: string,
  'socket-repl'?: string,
  host?: string,
  port?: number,
  scripts: ScriptsType,
  [key: string]: boolean | string,
};

function getClojureScriptVersionString(): string {
  // $FlowFixMe: we know for sure this file will exist.
  return `ClojureScript ${lumo.load('clojurescript-version')}`;
}

function getVersionString(): string {
  return `Lumo ${version}`;
}

export function createBanner(): string {
  return `${getVersionString()}
${getClojureScriptVersionString()}
 Exit: Control+D or :cljs/quit or exit
`;
}

function printBanner(): void {
  process.stdout.write(createBanner());
}

function printHelp(): void {
  process.stdout.write(`${getVersionString()}
Usage:  lumo [init-opt*] [main-opt] [arg*]

  With no options or args, runs an interactive Read-Eval-Print Loop

  init options:
    -i, --init path                  Load a file or resource
    -e, --eval string                Evaluate expressions in string; print
                                     non-nil values
    -c cp, --classpath cp            Use colon-delimited cp for source
                                     directories and JARs
    -K, --auto-cache                 Create and use .planck_cache dir for cache
    -k, --cache path                 If dir exists at path, use it for cache
    -q, --quiet                      Quiet mode; doesn't print the banner
    -v, --verbose                    Emit verbose diagnostic output
    -d, --dumb-terminal              Disable line editing / VT100 terminal
                                     control
    -s, --static-fns                 Generate static dispatch function calls
    -n, --socket-repl [host:]port    Start a TCP socket REPL at host:port

  main options:
    -r, --repl                       Run a repl
    path                             Run a script from a file or resource
    -h, -?, --help                   Print this help message and exit
    -l, --legal                      Show legal info (licenses and copyrights)

  The init options may be repeated and mixed freely, but must appear before
  any main option.

  Paths may be absolute or relative in the filesystem.
`);
    // -m, --main ns-name       Call the -main function from a namespace with args
    // -                        Run a script from standard input
}

function getCLIOpts(): CLIOptsType {
  return minimist(process.argv.slice(2), {
    boolean: [
      'verbose',
      'help',
      'repl',
      'auto-cache',
      'quiet',
      'dumb-terminal',
      'static-fns',
      'legal',
    ],
    string: ['eval', 'cache', 'classpath', 'socket-repl'],
    alias: {
      c: 'classpath',
      v: 'verbose',
      h: 'help',
      '?': 'help',
      i: 'init',
      e: 'eval',
      r: 'repl',
      K: 'auto-cache',
      k: 'cache',
      q: 'quiet',
      d: 'dumb-terminal',
      s: 'static-fns',
      l: 'legal',
      n: 'socket-repl',
    },
  });
}

function addScriptsType(scripts: string[] | string, type: string): ScriptsType {
  return util.ensureArray(scripts).map((script: string) => [type, script]);
}

function processOpts(cliOpts: CLIOptsType): CLIOptsType {
  const opts = { ...cliOpts };
  const { cache, classpath, init, repl } = opts;
  const autoCache = opts['auto-cache'];
  const evl = opts.eval;
  const scripts = [];

  if ({}.hasOwnProperty.call(opts, 'cache') || autoCache) {
    if (cache != null && util.isWhitespace(cache)) {
      process.stderr.write('lumo: option requires an argument: -k / --cache\n');
      process.exit(-1);
    }

    const cachePath = cache || '.lumo_cache';
    util.ensureDir(cachePath);

    opts.cache = cachePath;
  }

  // TODO: print classpath to stdout if `:verbose`
  if (classpath != null) {
    // if (verbose) {
    //   console.log(`Classpath resolves to: `);
    // }

    const cp = util.ensureArray(classpath);
    const srcPaths = util.srcPathsFromClasspathStrings(cp);

    opts.classpath = srcPaths;
    lumo.addSourcePaths(srcPaths);
  }

  // process scripts (--eval and --init)
  // TODO: these should be processed in order.
  // atm --init foo.cljs --eval :foo --init bar.cljs will be executed in this order:
  // foo.cljs -> bar.cljs -> :foo
  // we want: foo.cljs -> :foo -> bar.cljs
  if (init != null) {
    scripts.push(...addScriptsType(init, 'path'));
  }

  if (evl != null) {
    scripts.push(...addScriptsType(evl, 'text'));
  }

  opts.repl = scripts.length === 0 || repl;
  opts.scripts = scripts;

  if (opts.repl && opts['socket-repl']) {
    const hostPortTokens = opts['socket-repl'].split(':');
    if (hostPortTokens.length === 1 && !isNaN(hostPortTokens[0])) {
      socketRepl.open(parseInt(hostPortTokens[0], 10));
    } else if (hostPortTokens.length === 2 && !isNaN(hostPortTokens[1])) {
      socketRepl.open(parseInt(hostPortTokens[1], 10), hostPortTokens[0]);
    }
  }

  return opts;
}

export default function startCLI(): void {
  const opts = processOpts(getCLIOpts());
  const mainScript = opts._.length > 0;

  v8.setFlagsFromString('--use_strict');

  if (mainScript) {
    opts.repl = false;
  }

  const { help, legal, quiet, repl } = opts;

  // if help, print help and bail
  if (help) {
    return printHelp();
  }

  if (legal) {
    return printLegal();
  }

  if (repl && !quiet) {
    printBanner();
  }

  return startClojureScriptEngine(opts);
}
