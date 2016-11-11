/* @flow */

import startCLI from '../cli';
import cljs from '../cljs';
import * as lumo from '../lumo';

jest.mock('../cljs');
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
      value: ['', '', '-vq'],
    });
    startCLI();
    const [[parsedOpts]] = cljs.mock.calls;

    expect(parsedOpts.verbose).toBe(true);
    expect(parsedOpts.v).toBe(true);
    expect(parsedOpts.q).toBe(true);
    expect(parsedOpts['quiet']).toBe(true);
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
