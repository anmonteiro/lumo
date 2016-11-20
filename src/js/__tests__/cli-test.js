/* @flow */

import startCLI from '../cli';
import cljs from '../cljs';
import * as lumo from '../lumo';
import * as socketRepl from '../socketRepl';

jest.mock('../cljs');
jest.mock('../socketRepl');
jest.mock('../version', () => 'X.X.X');
jest.mock('../lumo', () => ({
  addSourcePaths: jest.fn((srcPaths: string[]) => undefined),
  load: jest.fn((path: string) => path),
}));

const originalArgv = process.argv;
const originalStdoutWrite = process.stdout.write;
const originalStderrWrite = process.stderr.write;

beforeEach(() => {
  process.stdout.write = jest.fn();
  process.stderr.write = jest.fn();
});

afterEach(() => {
  process.stdout.write = originalStdoutWrite;
  process.stderr.write = originalStderrWrite;
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
      value: ['', '', '-vK'],
    });
    startCLI();
    const [[parsedOpts]] = cljs.mock.calls;

    expect(parsedOpts.verbose).toBe(true);
    expect(parsedOpts.v).toBe(true);
    expect(parsedOpts.K).toBe(true);
    expect(parsedOpts['auto-cache']).toBe(true);
  });

  it('adds scripts when -[ie] specified', () => {
    const args = '-i foo.cljs -e :foo -e :bar';
    Object.defineProperty(process, 'argv', {
      value: ['', ''].concat(args.split(' ')),
    });

    startCLI();
    const [[parsedOpts]] = cljs.mock.calls;

    expect(parsedOpts.verbose).toBe(false);
    expect(parsedOpts.eval).toBeInstanceOf(Array);
    expect(parsedOpts.eval).toEqual([':foo', ':bar']);
    expect(parsedOpts.init).toEqual('foo.cljs');
    expect(parsedOpts.scripts.length).toEqual(3);
    expect(parsedOpts.e).toEqual(parsedOpts.eval);
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

  it('sets repl to false if a main path is specified', () => {
    const args = '-r foo.cljs';
    Object.defineProperty(process, 'argv', {
      value: ['', ''].concat(args.split(' ')),
    });

    startCLI();
    const [[parsedOpts]] = cljs.mock.calls;

    expect(parsedOpts._).toEqual(['foo.cljs']);
    expect(parsedOpts.repl).toBe(false);
  });

  describe('starts a socket server if -n or --socket-repl specified', () => {
    beforeEach(() => {
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
      expect(socketRepl.open).toHaveBeenCalledWith(5555);
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

  it('produces an error when an option is not given to -k / --cache', () => {
    const exit = process.exit;
    process.exit = jest.fn();

    const args = '-k';
    Object.defineProperty(process, 'argv', {
      value: ['', ''].concat(args.split(' ')),
    });

    startCLI();

    expect(process.exit).toHaveBeenCalledWith(-1);
    expect(process.stderr.write).toHaveBeenCalled();
    expect(process.stderr.write.mock.calls).toMatchSnapshot();

    process.exit = exit;
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
