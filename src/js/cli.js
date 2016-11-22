/* @flow */

// $FlowIssue: this module exists.
import v8 from 'v8'; // eslint-disable-line import/no-unresolved
// $FlowIssue: this is allowed
import { BasicParser as GOParser } from 'posix-getopt';
import startClojureScriptEngine from './cljs';
import printLegal from './legal';
import * as lumo from './lumo';
import * as util from './util';
import * as socketRepl from './socketRepl';
import version from './version';

type ScriptsType = [string, string][];

export type CLIOptsType = {
  verbose: boolean,
  help: boolean,
  repl: boolean,
  'auto-cache'?: boolean,
  quiet: boolean,
  'dumb-terminal': boolean,
  'static-fns': boolean,
  legal: boolean,
  'elide-asserts': boolean,
  cache?: string,
  classpath: string[],
  'socket-repl'?: string,
  mainNsName?: string,
  mainScript?: string,
  scripts: ScriptsType,
  args: string[],
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
 Docs: (doc function-name-here)
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
    -i, --init path              Load a file or resource
    -e, --eval string            Evaluate expressions in string; print
                                 non-nil values
    -c cp, --classpath cp        Use colon-delimited cp for source
                                 directories and JARs
    -K, --auto-cache             Create and use .planck_cache dir for cache
    -k, --cache path             If dir exists at path, use it for cache
    -q, --quiet                  Quiet mode; doesn't print the banner
    -v, --verbose                Emit verbose diagnostic output
    -d, --dumb-terminal          Disable line editing / VT100 terminal
                                 control
    -s, --static-fns             Generate static dispatch function calls
    -n addr, --socket-repl addr  Enable a socket REPL where x is port or IP:port

  main options:
    -m ns-name, --main=ns-name   Call the -main function from a namespace
                                 with args
    -r, --repl                   Run a repl
    path                         Run a script from a file or resource
    -h, -?, --help               Print this help message and exit
    -l, --legal                  Show legal info (licenses and copyrights)

  The init options may be repeated and mixed freely, but must appear before
  any main option.

  Paths may be absolute or relative in the filesystem.
`);
  // -                        Run a script from standard input
}

function getCLIOpts(): CLIOptsType {
  const argv = process.argv.slice(2);
  const argc = argv.length;
  const optstr = [
    'h(help)?',
    'q(quiet)',
    'l(legal)',
    'i:(init)',
    'e:(eval)',
    'c:(classpath)',
    'v(verbose)',
    'd(dumb-terminal)',
    'n:(socket-repl)',
    's(static-fns)',
    'a(elide-asserts)',
    'm:(main)',
    'r(repl)',
    'k:(cache)',
    'K(auto-cache)',
  ].join('');

  const parser = new GOParser(optstr, argv, 0);
  const ret: CLIOptsType = {
    scripts: [],
    classpath: [],
    help: false,
    legal: false,
    repl: false,
    verbose: false,
    'dumb-terminal': false,
    'static-fns': false,
    'elide-asserts': false,
    quiet: false,
    args: [],
  };
  let foundMainOpt = false;
  let option = parser.getopt();

  while (!foundMainOpt && option != null) {
    switch (option.option) {
      case '?':
        ret.help = true;
        break;
      case 'h':
        foundMainOpt = true;
        ret.help = true;
        break;
      case 'q':
        ret.quiet = true;
        break;
      case 'l':
        foundMainOpt = true;
        ret.legal = true;
        break;
      case 'i':
        ret.scripts.push(['path', option.optarg]);
        break;
      case 'e':
        ret.scripts.push(['text', option.optarg]);
        break;
      case 'c':
        ret.classpath.push(option.optarg);
        break;
      case 'v':
        ret.verbose = true;
        break;
      case 'd':
        ret['dumb-terminal'] = true;
        break;
      case 'n':
        ret['socket-repl'] = option.optarg;
        break;
      case 's':
        ret['static-fns'] = true;
        break;
      case 'a':
        ret['elide-asserts'] = true;
        break;
      case 'm':
        foundMainOpt = true;
        ret.mainNsName = option.optarg;
        break;
      case 'r':
        foundMainOpt = true;
        ret.repl = true;
        break;
      case 'k':
        ret.cache = option.optarg;
        break;
      case 'K':
        ret['auto-cache'] = true;
        break;
      default:
        break;
    }
    option = parser.getopt();
  }

  const optind = parser.optind();
  if (!foundMainOpt && optind < argc) {
    ret.mainScript = argv[optind];
    ret.args = argv.slice(optind + 1);
  } else {
    ret.args = argv.slice(optind);
  }

  return ret;
}

function processOpts(cliOpts: CLIOptsType): CLIOptsType {
  const opts = { ...cliOpts };
  const { cache, classpath, args, mainNSName, repl, scripts } = opts;
  const autoCache = opts['auto-cache'];
  const startSocketRepl = opts['socket-repl'];

  opts.repl = (scripts.length === 0 &&
               !mainNSName &&
               args.length === 0) || repl;

  if (cache || autoCache) {
    const cachePath = cache || '.lumo_cache';
    util.ensureDir(cachePath);

    opts.cache = cachePath;
  }

  // TODO: print classpath to stdout if `:verbose`
  if (classpath != null) {
    // if (verbose) {
    //   console.log(`Classpath resolves to: `);
    // }

    const srcPaths = util.srcPathsFromClasspathStrings(classpath);

    opts.classpath = srcPaths;
    lumo.addSourcePaths(srcPaths);
  }

  if (startSocketRepl) {
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
  v8.setFlagsFromString('--use_strict');

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
