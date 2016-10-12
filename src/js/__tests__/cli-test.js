/* flow */

import * as cli from '../cli';

const originalArgv = process.argv;

afterEach(() => {
  Object.defineProperty(process, 'argv', {
    value: originalArgv,
  });
});

describe('getCliOpts', () => {
  it('parses single dash properties when they appear together', () => {
    Object.defineProperty(process, 'argv', {
      value: ['', '', '-vK'],
    });
    const parsedOpts = cli.getCLIOpts();
    expect(parsedOpts.verbose).toBe(true);
    expect(parsedOpts.v).toBe(true);
    expect(parsedOpts.K).toBe(true);
    expect(parsedOpts['auto-cache']).toBe(true);
  });

  it('parses single dash properties when they appear together', () => {
    const args = '-e :foo -e :bar';
    Object.defineProperty(process, 'argv', {
      value: ['', ''].concat(args.split(' ')),
    });

    const parsedOpts = cli.getCLIOpts();
    expect(parsedOpts.verbose).toBe(false);
    expect(parsedOpts.eval).toBeInstanceOf(Array);
    expect(parsedOpts.eval).toEqual([':foo', ':bar']);
    expect(parsedOpts.e).toEqual(parsedOpts.eval);
  });
});

jest.mock('../version', () => 'X.X.X');

describe('getVersionString', () => {
  it('should read the version string from the \'version\' module', () => {
    expect(cli.getVersionString()).toBe('Lumo X.X.X');
  });
});

jest.mock('../lumo', () => ({
  load: jest.fn((path: string) => path), // eslint-disable-line arrow-parens
}));

describe('getClojureScriptVersionString', () => {
  it('should read the version string from the bundle using lumo.load', () => {
    expect(cli.getClojureScriptVersionString()).toBe('ClojureScript clojurescript-version');
  });
});

describe('print Functions', () => {
  const originalStdoutWrite = process.stdout.write;

  beforeEach(() => {
    process.stdout.write = jest.fn();
  });
  afterEach(() => {
    process.stdout.write = originalStdoutWrite;
  });


  describe('printBanner', () => {
    it('should print the banner to stdout', () => {
      cli.printBanner();
      expect(process.stdout.write).toBeCalledWith(`Lumo X.X.X
ClojureScript clojurescript-version
 Exit: Control+D or :cljs/quit
`);
    });
  });

  describe('printBanner', () => {
    it('should print the banner to stdout', () => {
      cli.printHelp();
      expect(process.stdout.write).toBeCalledWith(`Lumo X.X.X
Usage:  lumo [init-opt*] [main-opt] [arg*]

  With no options or args, runs an interactive Read-Eval-Print Loop

  init options:
    -i, --init path          Load a file or resource
    -e, --eval string        Evaluate expressions in string; print non-nil values
    -c cp, --classpath cp    Use colon-delimited cp for source directories and
                             JARs
    -K, --auto-cache         Create and use .planck_cache dir for cache
    -k, --cache path         If dir exists at path, use it for cache
    -q, --quiet              Quiet mode; doesn't print the banner initially
    -v, --verbose            Emit verbose diagnostic output
    -d, --dumb-terminal      Disable line editing / VT100 terminal control

  main options:
    -m, --main ns-name       Call the -main function from a namespace with args
    -r, --repl               Run a repl
    path                     Run a script from a file or resource
    -                        Run a script from standard input
    -h, -?, --help           Print this help message and exit
    -l, --legal              Show legal info (licenses and copyrights)

  The init options may be repeated and mixed freely, but must appear before
  any main option.

  Paths may be absolute or relative in the filesystem.
`);
    });
  });
});
