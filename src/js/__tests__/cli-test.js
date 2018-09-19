/* @flow */
/* eslint-disable global-require */

import os from 'os';
import path, { delimiter as delim } from 'path';

let v8 = require('v8');

let lumo = require('../lumo');
let startCLI = require('../cli').default;
let socketRepl = require('../socketRepl');
let cljs = require('../cljs').default;

jest.mock('v8');
jest.mock('../socketRepl');
jest.mock('../repl');
jest.mock('../replHistory');
jest.mock('../version', () => 'X.X.X');
jest.mock('vm');
jest.mock('../lumo', () => ({
  addSourcePaths: jest.fn((srcPaths: string[]) => undefined),
  load: jest.fn((x: string) => x),
}));

jest.useFakeTimers();

const originalArgv = process.argv;
const originalStdoutWrite = process.stdout.write;
const originalStderrWrite = process.stderr.write;
const pathResolve = path.resolve;
const { exit, version: nodeVersion } = process;

beforeAll(() => {
  Object.defineProperty(process, 'version', {
    value: 'X.X.X',
  });
  process.exit = jest.fn();
});

afterAll(() => {
  Object.defineProperty(process, 'version', {
    value: nodeVersion,
  });
  process.exit = exit;
});

beforeEach(() => {
  process.stdout.write = jest.fn();
  process.stderr.write = jest.fn();
  path.resolve = jest.fn((x: string) => x);
});

afterEach(() => {
  process.stdout.write = originalStdoutWrite;
  process.stderr.write = originalStderrWrite;
  path.resolve = pathResolve;
  Object.defineProperty(process, 'argv', {
    value: originalArgv,
  });
});

describe('getCliOpts', () => {
  describe('with mocked CLJS', () => {
    beforeEach(() => {
      cljs = require('../cljs').default;
      jest.mock('../cljs');
      lumo = require('../lumo');
      startCLI = require('../cli').default;
    });

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('parses single dash properties when they appear together', async () => {
      Object.defineProperty(process, 'argv', {
        value: ['', '', '-vsqdfK'],
      });
      await startCLI();

      const [[parsedOpts]] = cljs.mock.calls;

      expect(parsedOpts.verbose).toBe(true);
      expect(parsedOpts['static-fns']).toBe(true);
      expect(parsedOpts['fn-invoke-direct']).toBe(true);
      expect(parsedOpts['dumb-terminal']).toBe(true);
      expect(parsedOpts['auto-cache']).toBe(true);
    });

    describe('adds scripts when -[ie] specified', () => {
      it('simple case', async () => {
        const args = '-i foo.cljs -e :foo -e :bar';
        Object.defineProperty(process, 'argv', {
          value: ['', ''].concat(args.split(' ')),
        });

        await startCLI();
        const [[parsedOpts]] = cljs.mock.calls;
        expect(parsedOpts.verbose).toBe(false);
        expect(parsedOpts.scripts.length).toEqual(3);
      });

      it('scripts are added according to the CLI agrs order', async () => {
        const args = '-i foo.cljs -e :foo -i bar.cljs';
        Object.defineProperty(process, 'argv', {
          value: ['', ''].concat(args.split(' ')),
        });

        await startCLI();
        const [[parsedOpts]] = cljs.mock.calls;

        expect(parsedOpts.scripts.length).toEqual(3);
        expect(parsedOpts.scripts).toEqual([
          ['path', 'foo.cljs'],
          ['text', ':foo'],
          ['path', 'bar.cljs'],
        ]);
      });
    });

    it('sets srcPaths if -c specified', async () => {
      const args = `-c foo${delim}bar`;
      Object.defineProperty(process, 'argv', {
        value: ['', ''].concat(args.split(' ')),
      });

      await startCLI();
      const [[parsedOpts]] = cljs.mock.calls;

      expect(parsedOpts.classpath).toEqual(['foo', 'bar']);
      expect(lumo.addSourcePaths).toHaveBeenCalledWith(['foo', 'bar']);
    });

    it('sets repl to true and ignores main path if -r specified before main', async () => {
      const args = '-r foo.cljs';
      Object.defineProperty(process, 'argv', {
        value: ['', ''].concat(args.split(' ')),
      });

      await startCLI();
      const [[parsedOpts]] = cljs.mock.calls;

      expect(parsedOpts.args).toEqual(['foo.cljs']);
      expect(parsedOpts.repl).toBe(true);
    });

    it('sets repl to true and includes every other argument in args after a mainOpt', async () => {
      const args = '-r --verbose --socket-repl localhost:5555';
      Object.defineProperty(process, 'argv', {
        value: ['', ''].concat(args.split(' ')),
      });

      await startCLI();
      const [[parsedOpts]] = cljs.mock.calls;

      expect(parsedOpts.args).toEqual([
        '--verbose',
        '--socket-repl',
        'localhost:5555',
      ]);
      expect(parsedOpts.repl).toBe(true);
    });

    it('sets repl to false if a main path is specified', async () => {
      const args = 'foo.cljs -r';
      Object.defineProperty(process, 'argv', {
        value: ['', ''].concat(args.split(' ')),
      });

      await startCLI();
      const [[parsedOpts]] = cljs.mock.calls;

      expect(parsedOpts.args).toEqual(['-r']);
      expect(parsedOpts.repl).toBe(false);
    });

    it('adds cache paths to opts if -k specified', async () => {
      const args = '-k src';
      Object.defineProperty(process, 'argv', {
        value: ['', ''].concat(args.split(' ')),
      });

      await startCLI();

      const [[parsedOpts]] = cljs.mock.calls;

      expect(parsedOpts.cache).toEqual('src');
    });

    it('produces an error when an option is not given to -k / --cache', async () => {
      const args = '-k';
      Object.defineProperty(process, 'argv', {
        value: ['', ''].concat(args.split(' ')),
      });

      await startCLI();

      expect(process.stderr.write).toHaveBeenCalled();
      expect(process.stderr.write.mock.calls).toMatchSnapshot();
    });

    it('adds main-ns to opts and every arg after it to args', async () => {
      const args = '-m foo.core foo bar baz qux';
      Object.defineProperty(process, 'argv', {
        value: ['', ''].concat(args.split(' ')),
      });

      await startCLI();

      const [[parsedOpts]] = cljs.mock.calls;

      expect(parsedOpts.mainNsName).toEqual('foo.core');
      expect(parsedOpts.args).toEqual(['foo', 'bar', 'baz', 'qux']);
    });

    describe('sets elide-asserts to true in opts', () => {
      it('if -a specified', async () => {
        const args = '-a';
        Object.defineProperty(process, 'argv', {
          value: ['', ''].concat(args.split(' ')),
        });

        await startCLI();

        const [[parsedOpts]] = cljs.mock.calls;

        expect(parsedOpts['elide-asserts']).toBe(true);
      });

      it('if --elide-asserts specified', async () => {
        const args = '--elide-asserts';
        Object.defineProperty(process, 'argv', {
          value: ['', ''].concat(args.split(' ')),
        });

        await startCLI();

        const [[parsedOpts]] = cljs.mock.calls;

        expect(parsedOpts['elide-asserts']).toBe(true);
      });
    });

    describe('sets checked-arrays to in opts', () => {
      it('if -A specified', async () => {
        const args = '-A warn';
        Object.defineProperty(process, 'argv', {
          value: ['', ''].concat(args.split(' ')),
        });

        await startCLI();

        const [[parsedOpts]] = cljs.mock.calls;

        expect(parsedOpts['checked-arrays']).toBe('warn');
      });

      it('if --checked-arrays specified', async () => {
        const args = '--checked-arrays error';
        Object.defineProperty(process, 'argv', {
          value: ['', ''].concat(args.split(' ')),
        });

        await startCLI();

        const [[parsedOpts]] = cljs.mock.calls;

        expect(parsedOpts['checked-arrays']).toBe('error');
      });
    });

    describe('sets srcPaths with local maven repo JARs when -D specified', () => {
      const osHomedir = os.homedir;
      beforeAll(() => {
        os.homedir = jest.fn(() => '/Users/foo');
      });

      afterAll(() => {
        os.homedir = osHomedir;
      });

      it('only -D specified', async () => {
        const args = '-D cljsjs/react:15.5.0-0';
        Object.defineProperty(process, 'argv', {
          value: ['', ''].concat(args.split(' ')),
        });

        await startCLI();
        const [[parsedOpts]] = cljs.mock.calls;

        expect(parsedOpts.classpath).toEqual([
          path.join.apply(null, [
            '/Users',
            'foo',
            '.m2',
            'repository',
            'cljsjs',
            'react',
            '15.5.0-0/react-15.5.0-0.jar',
          ]),
        ]);
        expect(lumo.addSourcePaths).toHaveBeenCalledWith([
          path.join.apply(null, [
            '/Users',
            'foo',
            '.m2',
            'repository',
            'cljsjs',
            'react',
            '15.5.0-0',
            'react-15.5.0-0.jar',
          ]),
        ]);
      });

      it('-D and -L to override local repo', async () => {
        const args = '-D cljsjs/react:15.5.0-0 -L ~/some-location';
        Object.defineProperty(process, 'argv', {
          value: ['', ''].concat(args.split(' ')),
        });

        await startCLI();
        const [[parsedOpts]] = cljs.mock.calls;

        expect(parsedOpts.classpath).toEqual([
          path.join.apply(null, [
            '/Users',
            'foo',
            'some-location',
            'cljsjs',
            'react',
            '15.5.0-0',
            'react-15.5.0-0.jar',
          ]),
        ]);
        expect(lumo.addSourcePaths).toHaveBeenCalledWith([
          path.join.apply(null, [
            '/Users',
            'foo',
            'some-location',
            'cljsjs',
            'react',
            '15.5.0-0',
            'react-15.5.0-0.jar',
          ]),
        ]);
      });
    });
  });

  describe('Socket repl', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.unmock('../cljs');
      startCLI = require('../cli').default;
      cljs = require('../cljs').default;
      jest.unmock('../socketRepl');
      socketRepl = require('../socketRepl');
    });

    afterEach(() => {
      socketRepl.close();
    });

    it('starts a socket server if only a port given', async () => {
      jest.resetModules();
      jest.mock('../socketRepl');
      socketRepl = require('../socketRepl');
      startCLI = require('../cli').default;

      const args = '-n 5555';
      Object.defineProperty(process, 'argv', {
        value: ['', ''].concat(args.split(' ')),
      });

      await startCLI();

      expect(socketRepl.open).toHaveBeenCalledTimes(1);
      expect(socketRepl.open).toHaveBeenCalledWith({
        host: undefined,
        port: 5555,
      });
    });

    describe('throws errors if you give it', () => {
      it('an empty string', async () => {
        const args = '-n';
        Object.defineProperty(process, 'argv', {
          value: ['', ''].concat(args.split(' ')),
        });

        await startCLI();

        expect.assertions(2);
        expect(process.stderr.write).toHaveBeenCalled();
        expect(process.stderr.write.mock.calls).toMatchSnapshot();
      });

      it('an empty object', async () => {
        const args = '-n {}';
        Object.defineProperty(process, 'argv', {
          value: ['', ''].concat(args.split(' ')),
        });

        await startCLI();

        expect(process.stderr.write).toHaveBeenCalled();
        expect(process.stderr.write.mock.calls).toMatchSnapshot();
      });

      it('invalid JSON', async () => {
        const args = '-n {port: 12345}';
        Object.defineProperty(process, 'argv', {
          value: ['', ''].concat(args.split(' ')),
        });

        await startCLI();

        expect(process.stderr.write).toHaveBeenCalled();
        expect(process.stderr.write.mock.calls).toMatchSnapshot();
      });

      it('just a host string', async () => {
        const args = '-n localhost';
        Object.defineProperty(process, 'argv', {
          value: ['', ''].concat(args.split(' ')),
        });

        await startCLI();

        expect(process.stderr.write).toHaveBeenCalled();
        expect(process.stderr.write.mock.calls).toMatchSnapshot();
      });

      it('just a host object', async () => {
        const args = '-n {"host":"localhost"}';
        Object.defineProperty(process, 'argv', {
          value: ['', ''].concat(args.split(' ')),
        });

        await startCLI();

        expect(process.stderr.write).toHaveBeenCalled();
        expect(process.stderr.write.mock.calls).toMatchSnapshot();
      });

      it("a port string that isn't a number", async () => {
        const args = '-n foobar';
        Object.defineProperty(process, 'argv', {
          value: ['', ''].concat(args.split(' ')),
        });

        await startCLI();

        expect(process.stderr.write).toHaveBeenCalled();
        expect(process.stderr.write.mock.calls).toMatchSnapshot();
      });

      it("a port object that isn't a number", async () => {
        const args = '-n {"port":"foobar"}';
        Object.defineProperty(process, 'argv', {
          value: ['', ''].concat(args.split(' ')),
        });

        await startCLI();

        expect(process.stderr.write).toHaveBeenCalled();
        expect(process.stderr.write.mock.calls).toMatchSnapshot();
      });

      it('a port number equal to 0', async () => {
        const args = '-n {"port":0}';
        Object.defineProperty(process, 'argv', {
          value: ['', ''].concat(args.split(' ')),
        });

        await startCLI();

        expect(process.stderr.write).toHaveBeenCalled();
        expect(process.stderr.write.mock.calls).toMatchSnapshot();
      });

      it('a port number less than 0', async () => {
        const args = '-n {"port":-1000}';
        Object.defineProperty(process, 'argv', {
          value: ['', ''].concat(args.split(' ')),
        });

        await startCLI();

        expect(process.stderr.write).toHaveBeenCalled();
        expect(process.stderr.write.mock.calls).toMatchSnapshot();
      });

      it('a port number higher than 65536', async () => {
        const args = '-n {"port":7753888}';
        Object.defineProperty(process, 'argv', {
          value: ['', ''].concat(args.split(' ')),
        });

        await startCLI();

        expect(process.stderr.write).toHaveBeenCalled();
        expect(process.stderr.write.mock.calls).toMatchSnapshot();
      });
    });
  });
});

describe('print Functions', () => {
  describe('printBanner', () => {
    const { stdin } = process;

    beforeAll(() => {
      Object.defineProperty(process, 'stdin', {
        value: { on: jest.fn() },
      });
    });

    afterAll(() => {
      Object.defineProperty(process, 'stdin', {
        value: stdin,
      });
    });

    it('should print the banner to stdout', () => {
      Object.defineProperty(process, 'argv', {
        value: ['', ''],
      });

      startCLI();
      expect(process.stdout.write.mock.calls).toMatchSnapshot();
    });

    it('prints socket REPL info in addition to the banner if -n specified', async () => {
      Object.defineProperty(process, 'argv', {
        value: ['', '', '-n', '5555'],
      });

      await startCLI();
      socketRepl.close();
      expect(process.stdout.write.mock.calls).toMatchSnapshot();
    });

    it("doesn't print if -q / --quiet", () => {
      Object.defineProperty(process, 'argv', {
        value: ['', '', '-q'],
      });

      startCLI();
      expect(process.stdout.write).not.toHaveBeenCalled();
    });

    it("doesn't print if not entering the REPL (main script)", () => {
      Object.defineProperty(process, 'argv', {
        value: ['', '', 'foo.cljs'],
      });

      startCLI();
      expect(process.stdout.write).not.toHaveBeenCalled();
    });

    it("doesn't print if evaluating from stdin.", () => {
      Object.defineProperty(process, 'argv', {
        value: ['', '', '-'],
      });

      startCLI();
      expect(process.stdout.write).not.toHaveBeenCalled();
    });
  });

  describe('printHelp', () => {
    it('should print the help text to stdout', () => {
      Object.defineProperty(process, 'argv', {
        value: ['', '', '-h'],
      });

      startCLI();
      expect(process.stdout.write.mock.calls).toMatchSnapshot();
    });
  });

  describe('printLegal', () => {
    it('should print the legal information to stdout', () => {
      Object.defineProperty(process, 'argv', {
        value: ['', '', '-l'],
      });

      startCLI();
      expect(process.stdout.write.mock.calls).toMatchSnapshot();
    });
  });
});

describe('starting Lumo', () => {
  beforeAll(() => {
    v8 = require('v8');
    startCLI = require('../cli').default;
  });

  it("always sets use-strict in V8's options", async () => {
    Object.defineProperty(process, 'argv', {
      value: ['', ''],
    });

    await startCLI();

    expect(v8.setFlagsFromString).toHaveBeenCalledWith('--use_strict');
  });
});
