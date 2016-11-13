/* @flow */

import * as util from '../util';

// functions are hoisted, calling this before defining for readability
// eslint-disable-next-line no-use-before-define
mockReplHistory();
const replHistory = require('../replHistory');

let startREPL = require('../repl').default;

const processStdinOn = process.stdin.on;
const processStdinSetRaw = process.stdin.setRawMode;

process.stdin.on = jest.fn((type: string, cb: (key: string) => void) => {
  cb('return');
});

process.stdin.setRawMode = jest.fn();

const setPrompt = jest.fn();
const prompt = jest.fn();
let on;

function genOn(line: ?string = null): JestMockFn {
  on = jest.fn((type: string, f: (x?: string) => void) => {
    switch (type) {
      case 'line': f(line || '(+ 1 2'); return f(line || ')');
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
    process.stdin.on.mockClear();
    replHistory.mockClear();
    setPrompt.mockClear();
    prompt.mockClear();
  });

  afterAll(() => {
    process.stdin.on = processStdinOn;
    process.stdin.setRawMode = processStdinSetRaw;
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

  it('sets event handlers for keypressing', () => {
    startREPL({});

    const onCalls = process.stdin.on.mock.calls;
    expect(onCalls.length).toBe(1);
    expect(onCalls[0][0]).toBe('keypress');
  });

  describe('sets dumb-terminal', () => {
    const isWin = util.isWindows;

    beforeEach(() => {
      process.stdin.setRawMode.mockClear();
    });

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

    it('doesn\'t set stdin to rawMode if dumbTerminal is true', () => {
      startREPL({
        'dumb-terminal': true,
      });

      expect(process.stdin.setRawMode).not.toHaveBeenCalled();
    });

    it('sets stdin to rawMode if dumbTerminal is false', () => {
      startREPL({
        'dumb-terminal': false,
      });
      expect(process.stdin.setRawMode).toHaveBeenCalledWith(true);
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
        indentSpaceCount: jest.fn((text: string) => 0),
      }));
      // eslint-disable-next-line global-require
      startREPL = require('../repl').default;

      startREPL({});
      expect(setPrompt).toHaveBeenCalledWith('       #_=> ');
    });
  });
});
