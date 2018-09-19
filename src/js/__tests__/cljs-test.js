/* @flow */
/* eslint-disable global-require */

let vm = require('vm');
let startREPL = require('../repl').default;
let { default: startCLJS, ...cljs } = require('../cljs');

jest.mock('../repl');
jest.mock('../lumo', () => ({
  load: () => '',
}));
jest.mock('vm');

jest.useFakeTimers();

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

const { exit } = process;

beforeAll(() => {
  process.exit = jest.fn();
});

afterAll(() => {
  process.exit = exit;
});

beforeEach(async () => {
  jest.clearAllMocks();
  cljs = require('../cljs');
  startCLJS = cljs.default;
  startREPL = require('../repl').default;
  vm = require('vm');
});

describe('startClojureScriptEngine', () => {
  it('should start a REPL if opts.repl is true', async () => {
    await startCLJS({
      repl: true,
      scripts: [],
    });

    jest.runAllTicks();
    expect(startREPL).toHaveBeenCalled();
  });

  it('returns undefined if opts.repl is false', async () => {
    const ret = await startCLJS({
      repl: false,
      scripts: [],
      args: [],
    });

    expect(startREPL).not.toHaveBeenCalled();
    expect(ret).toBeUndefined();

    startREPL.mockClear();

    const ret2 = await startCLJS({
      repl: false,
      scripts: [['text', ':foo'], ['path', 'foo.cljs']],
      args: [],
    });

    expect(startREPL).not.toHaveBeenCalled();
    expect(ret2).toBeUndefined();
  });

  it("calls `executeScript` and bails if there's a main opt", async () => {
    await startCLJS({
      repl: false,
      mainScript: 'foo.cljs',
      scripts: [],
    });

    expect(startREPL).not.toHaveBeenCalled();
  });

  it("doesn't init the CLJS engine if it already started", async () => {
    await startCLJS({
      repl: true,
      // scripts will init the ClojureScript engine
      scripts: [['text', ':foo'], ['path', 'foo.cljs']],
      args: [],
    });

    jest.runAllTicks();
    expect(startREPL).toHaveBeenCalled();
  });

  it('sets args and calls runMainNS if mainNsName specified', async () => {
    await startCLJS({
      mainNsName: 'foo.core',
      args: ['a', 'b', 'c'],
      scripts: [],
    });

    jest.runAllTicks();
    expect(vm.ctx.cljs.core.seq).toHaveBeenCalled();
  });

  describe('in development', () => {
    beforeAll(() => {
      jest.clearAllMocks();
    });

    it('creates and returns a vm context', async () => {
      await startCLJS({
        repl: true,
        scripts: [],
        args: [],
      });

      jest.runAllTicks();
      expect(vm.createContext).toHaveBeenCalled();
      expect(vm.createContext).toHaveBeenCalledTimes(1);
    });
  });
});

describe('misc fns', () => {
  beforeEach(async () => {
    await startCLJS({
      repl: true,
      scripts: [],
    });
    jest.runAllTicks();
  });

  describe('isReadable', () => {
    it('calls into the CLJS context', async () => {
      expect(cljs.isReadable('()')).toBe('');
    });
  });

  describe('getCurrentNamespace', () => {
    it('calls into the CLJS context', () => {
      expect(cljs.getCurrentNamespace(0)).toBe('cljs.user');
    });
  });

  describe('getHighlightCoordinates', () => {
    it('calls into the CLJS context', () => {
      expect(cljs.getHighlightCoordinates('(let [a 1)')).toBe(0);
    });
  });
});

describe('lumoEval', () => {
  describe('in development', () => {
    beforeEach(() => {
      vm.runInContext.mockClear();
    });

    it('evals expressions in the ClojureScript context', async () => {
      await startCLJS({
        repl: true,
        _: [],
        scripts: [],
      });
      jest.runAllTicks();

      vm.ctx.$$LUMO_GLOBALS.eval('source');
      expect(vm.runInContext).toHaveBeenCalledTimes(1);
    });
  });

  describe('in production', () => {
    let startClojureScriptEngine;

    beforeEach(() => {
      Object.assign(
        global,
        {
          initialize: jest.fn(),
          __DEV__: false,
        },
        vm.ctx,
      );
      startClojureScriptEngine = require('../cljs').default;
    });

    afterEach(() => {
      Object.keys(vm.ctx)
        .concat(['initialize'])
        .filter((x: string) => !/console|process|module|exports/.test(x))
        .forEach((key: string, idx: number) => {
          global[key] = undefined;
        });
      __DEV__ = true;
    });

    it('evals expressions in the ClojureScript context', async () => {
      expect.assertions(1);

      await startClojureScriptEngine({
        repl: true,
        _: [],
        scripts: [],
        args: [],
      });
      jest.runAllTicks();

      global.$$LUMO_GLOBALS.eval('source', false);
      expect(vm.runInThisContext).toHaveBeenCalledTimes(1);
    });
  });
});
