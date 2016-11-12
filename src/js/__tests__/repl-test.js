/* @flow */

import * as util from '../util';

// functions are hoisted, calling this before defining for readability
// eslint-disable-next-line no-use-before-define
mockReplHistory();
const replHistory = require('../replHistory');

let startREPL = require('../repl').default;

const setPrompt = jest.fn();
const prompt = jest.fn();
let on;

function genOn(line: ?string = null): JestMockFn {
  on = jest.fn((type: string, f: (x?: string) => void) => {
    switch (type) {
      case 'line': return f(line || '(+ 1 2)');
      case 'SIGINT': return f();
      default: return undefined;
    }
  });
  return on;
}

function mockReplHistory(line?: string): void {
  jest.mock('../replHistory', () => jest.fn(() => ({
    setPrompt,
    prompt,
    on: genOn(line),
    output: {
      write: jest.fn(),
    },
    write: jest.fn(),
  })));
}

jest.mock('readline');
jest.mock('../cljs', () => ({
  isReadable: jest.fn((input: string) => ''),
  execute: jest.fn(),
  getCurrentNamespace: jest.fn(() => 'cljs.user'),
}));

describe('startREPL', () => {
  beforeEach(() => {
    replHistory.mockClear();
    setPrompt.mockClear();
    prompt.mockClear();
  });

  it('creates a readline interface', () => {
    startREPL({});

    expect(replHistory).toHaveBeenCalled();
  });

  it('sets and emits the prompt', () => {
    startREPL({});

    expect(setPrompt).toHaveBeenCalled();
    expect(prompt).toHaveBeenCalled();
  });

  it('sets event handlers for line input and Ctrl+C', () => {
    startREPL({});

    const onCalls = on.mock.calls;
    expect(onCalls.length).toBe(2);
    expect(onCalls[0][0]).toBe('line');
    expect(onCalls[1][0]).toBe('SIGINT');
  });

  describe('sets dumb-terminal', () => {
    const isWin = util.isWindows;

    afterEach(() => {
      util.isWindows = isWin;
    });

    describe('according to the option in non-windows platforms', () => {
      util.isWindows = false;

      it('when dumb-terminal is false', () => {
        startREPL({
          'dumb-terminal': false,
        });

        const replHistoryCalls = replHistory.mock.calls;

        expect(replHistoryCalls.length).toBe(1);
        expect(replHistoryCalls[0][0].terminal).toBe(true);
      });

      it('when dumb-terminal is true', () => {
        startREPL({
          'dumb-terminal': true,
        });

        const replHistoryCalls = replHistory.mock.calls;

        expect(replHistoryCalls.length).toBe(1);
        expect(replHistoryCalls[0][0].terminal).toBe(false);
      });
    });

    it('to true on Windows regardless', () => {
      util.isWindows = true;

      startREPL({
        'dumb-terminal': false,
      });

      const replHistoryCalls = replHistory.mock.calls;

      expect(replHistoryCalls.length).toBe(1);
      expect(replHistoryCalls[0][0].terminal).toBe(false);
    });
  });

  describe('calls process.exit if an exit command is specified', () => {
    const exit = process.exit;

    beforeEach(() => {
      process.exit = jest.fn();
      jest.resetModules();
    });

    afterAll(() => {
      process.exit = exit;
    });

    it(':cljs/quit', () => {
      mockReplHistory(':cljs/quit');
      // eslint-disable-next-line global-require
      startREPL = require('../repl').default;

      startREPL({});

      expect(process.exit).toHaveBeenCalled();
    });

    it('exit', () => {
      mockReplHistory('exit');
      // eslint-disable-next-line global-require
      startREPL = require('../repl').default;

      startREPL({});

      expect(process.exit).toHaveBeenCalled();
    });
  });

  describe('emits the correct prompt according to the line', () => {
    beforeAll(() => {
      jest.resetModules();
      mockReplHistory();
      // eslint-disable-next-line global-require
      startREPL = require('../repl').default;
      setPrompt.mockClear();
    });

    it('should emit the primary prompt after input is completely readable', () => {
      startREPL({});

      expect(setPrompt).toHaveBeenCalledWith('cljs.user=> ');
    });

    it('should emit the secondary prompt', () => {
      jest.resetModules();
      jest.mock('../cljs', () => ({
        isReadable: jest.fn((input: string) => false),
        execute: jest.fn(),
        getCurrentNamespace: jest.fn(() => 'cljs.user'),
      }));
      // eslint-disable-next-line global-require
      startREPL = require('../repl').default;

      startREPL({});
      expect(setPrompt).toHaveBeenCalledWith('       #_=> ');
    });
  });
});
