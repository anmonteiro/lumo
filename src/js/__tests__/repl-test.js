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

function mockReplHistory(line?: string, output?: stream$Writable): void {
  jest.mock('../replHistory', () => jest.fn(() => ({
    setPrompt,
    prompt,
    on: genOn(line),
    output: output || { write: jest.fn() },
    write: jest.fn(),
  })));
}

jest.mock('readline', () => ({
  on: jest.fn(),
  emitKeypressEvents: jest.fn(),
  clearLine: jest.fn(),
  cursorTo: jest.fn(),
  createInterface: jest.fn(() => ({
    on: jest.fn(),
    output: {
      write: jest.fn(),
    },
    setPrompt: jest.fn(),
    prompt: jest.fn(),
  })),
}));

jest.mock('../cljs', () => ({
  isReadable: jest.fn((input: string) => ''),
  execute: jest.fn(),
  getCurrentNamespace: jest.fn(() => 'cljs.user'),
}));

jest.mock('../socketRepl', () => ({
  open: jest.fn(),
  close: jest.fn(),
  handleConnection: jest.fn(),
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
    expect(on).toHaveBeenCalledTimes(3);
    expect(onCalls[0][0]).toBe('line');
    expect(onCalls[1][0]).toBe('SIGINT');
    expect(onCalls[2][0]).toBe('close');
  });

  it('sets event handlers for keypressing', () => {
    startREPL({});

    const onCalls = process.stdin.on.mock.calls;
    expect(process.stdin.on).toHaveBeenCalledTimes(1);
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

        expect(replHistory).toHaveBeenCalledTimes(1);
        expect(replHistoryCalls[0][0].terminal).toBe(true);
      });

      it('when dumb-terminal is true', () => {
        startREPL({
          'dumb-terminal': true,
        });

        const replHistoryCalls = replHistory.mock.calls;

        expect(replHistory).toHaveBeenCalledTimes(1);
        expect(replHistoryCalls[0][0].terminal).toBe(false);
      });
    });

    it('to true on Windows regardless', () => {
      util.isWindows = true;

      startREPL({
        'dumb-terminal': false,
      });

      const replHistoryCalls = replHistory.mock.calls;

      expect(replHistory).toHaveBeenCalledTimes(1);
      expect(replHistoryCalls[0][0].terminal).toBe(false);
    });

    it('doesn\'t set stdin to rawMode if dumbTerminal is true', () => {
      startREPL({
        'dumb-terminal': true,
      });

      expect(process.stdin.setRawMode).not.toHaveBeenCalled();
    });

    it('sets stdin to rawMode if dumbTerminal is false', () => {
      util.isWindows = false;

      startREPL({
        'dumb-terminal': false,
      });

      expect(process.stdin.setRawMode).toHaveBeenCalledWith(true);
    });
  });

  describe('exits when an exit command is specified', () => {
    const exit = process.exit;

    beforeEach(() => {
      process.exit = jest.fn();
      jest.resetModules();
    });

    afterAll(() => {
      process.exit = exit;
    });

    it('with ":cljs/quit"', () => {
      mockReplHistory(':cljs/quit', process.stdout);
      // eslint-disable-next-line global-require
      startREPL = require('../repl').default;

      startREPL({});

      expect(process.exit).toHaveBeenCalled();
    });

    it('with "exit"', () => {
      mockReplHistory('exit', process.stdout);
      // eslint-disable-next-line global-require
      startREPL = require('../repl').default;

      startREPL({});

      expect(process.exit).toHaveBeenCalled();
    });

    it('even if whitespace present', () => {
      mockReplHistory('  :cljs/quit  ', process.stdout);
      // eslint-disable-next-line global-require
      startREPL = require('../repl').default;

      startREPL({});

      expect(process.exit).toHaveBeenCalled();
    });


    it('should close the socket server', () => {
      mockReplHistory('exit', process.stdout);
      /* eslint-disable global-require */
      startREPL = require('../repl').default;
      const { close } = require('../socketRepl');
      /* eslint-enable global-require */

      startREPL({});

      expect(close).toHaveBeenCalled();
    });

    it('should destroy all REPL sessions', () => {
      mockReplHistory('exit', process.stdout);
      /* eslint-disable global-require */
      startREPL = require('../repl').default;
      const { sessions } = require('../repl');
      /* eslint-enable global-require */

      startREPL({});

      expect(Object.keys(sessions).length).toBe(0);
    });
  });

  describe('creates REPL sessions', () => {
    beforeAll(() => {
      jest.resetModules();
      mockReplHistory();
      // eslint-disable-next-line global-require
      startREPL = require('../repl').default;
    });

    it('when starting the REPL', () => {
      /* eslint-disable global-require */
      startREPL = require('../repl').default;
      const { sessions } = require('../repl');
      /* eslint-enable global-require */

      startREPL({});

      expect(Object.keys(sessions).length).toBe(1);
    });

    it('when establishing a socket connection', () => {
      jest.resetModules();
      /* eslint-disable global-require */
      startREPL = require('../repl').default;
      const { sessions } = require('../repl');
      const { handleConnection } = require.requireActual('../socketRepl');
      const net = require('net');
      /* eslint-enable global-require */

      startREPL({});

      expect(handleConnection(new net.Socket())).toBeDefined();
      expect(Object.keys(sessions).length).toBe(2);
      expect(handleConnection(new net.Socket())).toBeDefined();
      expect(Object.keys(sessions).length).toBe(3);
    });

    it('that are isolated by unique and incrementing ids', () => {
      jest.resetModules();
      /* eslint-disable global-require */
      startREPL = require('../repl').default;
      const { handleConnection } = require.requireActual('../socketRepl');
      const net = require('net');
      /* eslint-enable global-require */

      startREPL({});

      expect(handleConnection(new net.Socket()).sessionId).toBe(1);
      expect(handleConnection(new net.Socket()).sessionId).toBe(2);
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
