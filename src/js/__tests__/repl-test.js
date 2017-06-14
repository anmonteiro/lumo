/* @flow */

import net from 'net';
import * as util from '../util';

// functions are hoisted, calling this before defining for readability
// eslint-disable-next-line no-use-before-define
mockReplHistory();
const replHistory = require('../replHistory');

let startREPL = require('../repl').default;

const processStdinOn = process.stdin.on;
const processStdinSetRaw = process.stdin.setRawMode;

process.stdin.on = jest.fn(
  (
    type: string,
    cb: (
      string,
      { name: string, code?: string, ctrl: boolean, meta: boolean },
    ) => void,
  ) => {
    cb('return', { name: 'return' });
  },
);

process.stdin.setRawMode = jest.fn();

const mockSetPrompt = jest.fn();
const mockPrompt = jest.fn();
let on;

function mockOn(line: ?string = null): JestMockFn {
  on = jest.fn((type: string, f: (x?: string) => void) => {
    switch (type) {
      case 'line':
        f(line || '(+ 1 2');
        return f(line || ')');
      case 'SIGINT':
        return f();
      default:
        return undefined;
    }
  });
  return on;
}

function mockReplHistory(
  mockLine?: string,
  mockOutput?: stream$Writable,
): void {
  jest.mock('../replHistory', () =>
    jest.fn(() => ({
      setPrompt: mockSetPrompt,
      prompt: mockPrompt,
      on: mockOn(mockLine),
      output: mockOutput || { write: jest.fn() },
      write: jest.fn(),
    })),
  );
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
  setPrintFns: jest.fn(),
  isPrintingNewline: jest.fn(),
  getCurrentNamespace: jest.fn(() => 'cljs.user'),
  clearREPLSessionState: jest.fn,
}));

jest.mock('../socketRepl', () => ({
  open: jest.fn(),
  close: jest.fn(),
}));

describe('startREPL', () => {
  beforeEach(() => {
    process.stdin.on.mockClear();
    replHistory.mockClear();
    mockSetPrompt.mockClear();
    mockPrompt.mockClear();
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

    expect(mockSetPrompt).toHaveBeenCalled();
    expect(mockPrompt).toHaveBeenCalled();
  });

  it('sets event handlers for line input and Ctrl+C', () => {
    startREPL({});

    const onCalls = on.mock.calls;
    expect(on).toHaveBeenCalledTimes(4);
    expect(onCalls[0][0]).toBe('line');
    expect(onCalls[1][0]).toBe('SIGINT');
    expect(onCalls[2][0]).toBe('close');
    expect(onCalls[3][0]).toBe('SIGCONT');
  });

  it('sets event handlers for keypressing', () => {
    startREPL({});

    const onCalls = process.stdin.on.mock.calls;
    expect(process.stdin.on).toHaveBeenCalledTimes(1);
    expect(onCalls[0][0]).toBe('keypress');
  });

  describe('sets dumb-terminal', () => {
    const isTTY = process.stdin.isTTY;

    beforeEach(() => {
      process.stdin.isTTY = true;
      process.stdin.setRawMode.mockClear();
    });

    afterEach(() => {
      process.stdin.isTTY = isTTY;
    });

    describe('according to the option on all platforms', () => {
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

    it("doesn't set stdin to rawMode if dumbTerminal is true", () => {
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
      const repl = require('../repl');
      startREPL = repl.default;
      /* eslint-enable global-require */
      const originalObjectKeys = Object.keys;
      let sessions;
      Object.keys = jest.fn((x: { [key: mixed]: mixed }) => {
        sessions = x;
        return originalObjectKeys(x);
      });

      startREPL({});

      expect(originalObjectKeys(sessions).length).toBe(0);
      Object.keys = originalObjectKeys;
    });
  });

  describe('creates REPL sessions', () => {
    beforeAll(() => {
      jest.resetModules();
      mockReplHistory();
      // eslint-disable-next-line global-require
      startREPL = require('../repl').default;
    });

    describe('socket REPL', () => {
      const netCreateServer = net.createServer;
      let handleConnection;
      let socket;

      beforeEach(() => {
        jest.resetModules();
        /* eslint-disable global-require */
        startREPL = require('../repl').default;
        const socketRepl = require.requireActual('../socketRepl');
        net.createServer = jest.fn((callback: SocketCallback) => {
          handleConnection = callback;
          return {
            listen: jest.fn(function() {
              return this;
            }),
            close: jest.fn(),
            on: jest.fn(),
          };
        });
        socketRepl.open(12345);
        socket = new net.Socket();
        socket.on = jest.fn((type: string, f: () => void) => f());
        /* eslint-enable global-require */
      });

      afterEach(() => {
        net.createServer = netCreateServer;
      });

      it('when establishing a socket connection', () => {
        const repl = require('../repl'); // eslint-disable-line global-require
        const replCreateSession = repl.createSession;
        repl.createSession = jest.fn(() => ({
          id: 0,
        }));
        startREPL({});

        handleConnection(socket);
        handleConnection(socket);

        expect(repl.createSession).toHaveBeenCalledTimes(2);

        repl.createSession = replCreateSession;
      });

      it('that are isolated by unique and incrementing ids', () => {
        startREPL({});

        expect(handleConnection(socket).id).toBe(1);
        expect(handleConnection(socket).id).toBe(2);
      });
    });
  });

  describe('emits the correct prompt according to the line', () => {
    beforeAll(() => {
      jest.resetModules();
      mockReplHistory();
      // eslint-disable-next-line global-require
      startREPL = require('../repl').default;
      mockSetPrompt.mockClear();
    });

    it('should emit the primary prompt after input is completely readable', () => {
      startREPL({});

      expect(mockSetPrompt).toHaveBeenCalledWith('cljs.user=> ');
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
      expect(mockSetPrompt).toHaveBeenCalledWith('       #_=> ');
    });
  });
});
