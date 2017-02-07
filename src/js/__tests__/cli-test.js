/* @flow */

import path from 'path';
// $FlowIssue: this module exists.
import v8 from 'v8';
import startCLI from '../cli';
import cljs from '../cljs';
import * as lumo from '../lumo';
import * as socketRepl from '../socketRepl';

jest.mock('net');
jest.mock('v8');
jest.mock('../cljs');
jest.mock('../socketRepl');
jest.mock('../version', () => 'X.X.X');
jest.mock('../lumo', () => ({
  addSourcePaths: jest.fn((srcPaths: string[]) => undefined),
  load: jest.fn((x: string) => x),
}));

const originalArgv = process.argv;
const originalStdoutWrite = process.stdout.write;
const originalStderrWrite = process.stderr.write;
const pathResolve = path.resolve;

beforeEach(() => {
  process.stdout.write = jest.fn();
  process.stderr.write = jest.fn();
  path.resolve = jest.fn((x: string) => x);
});

afterEach(() => {
  process.stdout.write = originalStdoutWrite;
  process.stderr.write = originalStderrWrite;
  path.resolve = pathResolve;
});

afterEach(() => {
  Object.defineProperty(process, 'argv', {
    value: originalArgv,
  });
  jest.resetModules();
  cljs.mockClear();
});

describe('getCliOpts', () => {
  it('parses single dash properties when they appear together', () => {
    Object.defineProperty(process, 'argv', {
      value: ['', '', '-vsqdK'],
    });
    startCLI();
    const [[parsedOpts]] = cljs.mock.calls;

    expect(parsedOpts.verbose).toBe(true);
    expect(parsedOpts['static-fns']).toBe(true);
    expect(parsedOpts['dumb-terminal']).toBe(true);
    expect(parsedOpts['auto-cache']).toBe(true);
  });

  describe('adds scripts when -[ie] specified', () => {
    it('simple case', () => {
      const args = '-i foo.cljs -e :foo -e :bar';
      Object.defineProperty(process, 'argv', {
        value: ['', ''].concat(args.split(' ')),
      });

      startCLI();
      const [[parsedOpts]] = cljs.mock.calls;
      expect(parsedOpts.verbose).toBe(false);
      expect(parsedOpts.scripts.length).toEqual(3);
    });

    it('scripts are added according to the CLI agrs order', () => {
      const args = '-i foo.cljs -e :foo -i bar.cljs';
      Object.defineProperty(process, 'argv', {
        value: ['', ''].concat(args.split(' ')),
      });

      startCLI();
      const [[parsedOpts]] = cljs.mock.calls;

      expect(parsedOpts.scripts.length).toEqual(3);
      expect(parsedOpts.scripts).toEqual([
        ['path', 'foo.cljs'],
        ['text', ':foo'],
        ['path', 'bar.cljs']]);
    });
  });

  it('sets srcPaths if -c specified', () => {
    const args = '-c foo:bar';
    Object.defineProperty(process, 'argv', {
      value: ['', ''].concat(args.split(' ')),
    });

    startCLI();
    const [[parsedOpts]] = cljs.mock.calls;

    expect(parsedOpts.classpath).toEqual(['foo', 'bar']);
    expect(lumo.addSourcePaths).toHaveBeenCalledWith(['foo', 'bar']);
  });

  it('sets repl to true and ignores main path if -r specified before main', () => {
    const args = '-r foo.cljs';
    Object.defineProperty(process, 'argv', {
      value: ['', ''].concat(args.split(' ')),
    });

    startCLI();
    const [[parsedOpts]] = cljs.mock.calls;

    expect(parsedOpts.args).toEqual(['foo.cljs']);
    expect(parsedOpts.repl).toBe(true);
  });

  it('sets repl to true and includes every other argument in args after a mainOpt', () => {
    const args = '-r --verbose --socket-repl localhost:5555';
    Object.defineProperty(process, 'argv', {
      value: ['', ''].concat(args.split(' ')),
    });

    startCLI();
    const [[parsedOpts]] = cljs.mock.calls;

    expect(parsedOpts.args).toEqual(['--verbose', '--socket-repl', 'localhost:5555']);
    expect(parsedOpts.repl).toBe(true);
  });

  it('sets repl to false if a main path is specified', () => {
    const args = 'foo.cljs -r';
    Object.defineProperty(process, 'argv', {
      value: ['', ''].concat(args.split(' ')),
    });

    startCLI();
    const [[parsedOpts]] = cljs.mock.calls;

    expect(parsedOpts.args).toEqual(['-r']);
    expect(parsedOpts.repl).toBe(false);
  });

  describe('starts a socket server if -n or --socket-repl specified', () => {
    afterEach(() => {
      socketRepl.open.mockClear();
    });

    it('on localhost if only port given', () => {
      const args = '-n 5555';
      Object.defineProperty(process, 'argv', {
        value: ['', ''].concat(args.split(' ')),
      });

      startCLI();
      const [[parsedOpts]] = cljs.mock.calls;

      expect(parsedOpts['socket-repl']).toBe('5555');
      expect(parsedOpts.repl).toBe(true);
      expect(socketRepl.open).toHaveBeenCalledTimes(1);
      expect(socketRepl.open).toHaveBeenCalledWith(5555, undefined);
    });

    it('on host and port if only both given', () => {
      const args = '-n 192.168.1.254:5555';
      Object.defineProperty(process, 'argv', {
        value: ['', ''].concat(args.split(' ')),
      });

      startCLI();
      const [[parsedOpts]] = cljs.mock.calls;

      expect(parsedOpts['socket-repl']).toBe('192.168.1.254:5555');
      expect(parsedOpts.repl).toBe(true);
      expect(socketRepl.open).toHaveBeenCalledTimes(1);
      expect(socketRepl.open).toHaveBeenCalledWith(5555, '192.168.1.254');
    });
  });

  it('doesn\'t start a socket server if the options are earmuffed', () => {
    const args = '-r -n 192.168.1.254:5555';
    Object.defineProperty(process, 'argv', {
      value: ['', ''].concat(args.split(' ')),
    });

    startCLI();
    const [[parsedOpts]] = cljs.mock.calls;

    expect(parsedOpts.repl).toBe(true);
    expect(parsedOpts['socket-repl']).toBeUndefined();
    expect(parsedOpts.repl).toBe(true);
    expect(socketRepl.open).not.toHaveBeenCalled();
  });

  it('adds cache paths to opts if -k specified', () => {
    const args = '-k src';
    Object.defineProperty(process, 'argv', {
      value: ['', ''].concat(args.split(' ')),
    });

    startCLI();

    const [[parsedOpts]] = cljs.mock.calls;

    expect(parsedOpts.cache).toEqual('src');
  });

  it('produces an error when an option is not given to -k / --cache', () => {
    const args = '-k';
    Object.defineProperty(process, 'argv', {
      value: ['', ''].concat(args.split(' ')),
    });

    startCLI();

    expect(process.stderr.write).toHaveBeenCalled();
    expect(process.stderr.write.mock.calls).toMatchSnapshot();
  });

  it('adds main-ns to opts and every arg after it to args', () => {
    const args = '-m foo.core foo bar baz qux';
    Object.defineProperty(process, 'argv', {
      value: ['', ''].concat(args.split(' ')),
    });

    startCLI();

    const [[parsedOpts]] = cljs.mock.calls;

    expect(parsedOpts.mainNsName).toEqual('foo.core');
    expect(parsedOpts.args).toEqual(['foo', 'bar', 'baz', 'qux']);
  });

  describe('sets elide-asserts to true in opts', () => {
    it('if -a specified', () => {
      const args = '-a';
      Object.defineProperty(process, 'argv', {
        value: ['', ''].concat(args.split(' ')),
      });

      startCLI();

      const [[parsedOpts]] = cljs.mock.calls;

      expect(parsedOpts['elide-asserts']).toBe(true);
    });

    it('if --elide-asserts specified', () => {
      const args = '--elide-asserts';
      Object.defineProperty(process, 'argv', {
        value: ['', ''].concat(args.split(' ')),
      });

      startCLI();

      const [[parsedOpts]] = cljs.mock.calls;

      expect(parsedOpts['elide-asserts']).toBe(true);
    });
  });
});

describe('print Functions', () => {
  describe('printBanner', () => {
    it('should print the banner to stdout', () => {
      Object.defineProperty(process, 'argv', {
        value: ['', ''],
      });

      startCLI();
      expect(process.stdout.write.mock.calls).toMatchSnapshot();
    });

    it('prints socket REPL info in addition to the banner if -n specified', () => {
      Object.defineProperty(process, 'argv', {
        value: ['', '', '-n', '5555'],
      });

      startCLI();
      expect(process.stdout.write.mock.calls).toMatchSnapshot();
    });

    it('doesn\'t print if -q / --quiet', () => {
      Object.defineProperty(process, 'argv', {
        value: ['', '', '-q'],
      });

      startCLI();
      expect(process.stdout.write).not.toHaveBeenCalled();
    });

    it('doesn\'t print if not entering the REPL (main script)', () => {
      Object.defineProperty(process, 'argv', {
        value: ['', '', 'foo.cljs'],
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
  it('always sets use-strict in V8\'s options', () => {
    Object.defineProperty(process, 'argv', {
      value: ['', ''],
    });

    startCLI();

    expect(v8.setFlagsFromString).toHaveBeenCalledWith('--use_strict');
  });
});
