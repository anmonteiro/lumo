/* @flow */

// functions are hoisted, calling this before defining for readability
// eslint-disable-next-line no-use-before-define
mockReplHistory();
const replHistory = require('../replHistory');

let startREPL = require('../repl').default;

const setPrompt = jest.fn();
const prompt = jest.fn();
let on;

function genOn(line: ?string = null) {
  on = jest.fn((type: string, f: Function) => {
    switch (type) {
      case 'line': return f(line || '(+ 1 2)');
      case 'SIGINT': return f();
      default: return undefined;
    }
  });
  return on;
}

function mockReplHistory(line?: string) {
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
  // eslint-disable-next-line arrow-parens
  isReadable: jest.fn((input: string) => ''),
  execute: jest.fn(),
  getCurrentNamespace: jest.fn(() => 'cljs.user'),
}));

describe('startREPL', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
      jest.clearAllMocks();
    });

    it('should emit the primary prompt after input is completely readable', () => {
      startREPL({});

      expect(setPrompt).toHaveBeenCalledWith('cljs.user=> ');
    });

    it('should emit the secondary prompt', () => {
      jest.resetModules();
      jest.mock('../cljs', () => ({
        // eslint-disable-next-line arrow-parens
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
