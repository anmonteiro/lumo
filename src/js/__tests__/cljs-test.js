/* @flow */

import startCLJS, * as cljs from '../cljs';
import startREPL from '../repl';

let vm = require('vm');

jest.mock('../repl');

jest.mock('../lumo', () => ({
  load: () => '',
}));

jest.mock('vm');

jest.useFakeTimers();

const ctx = {
  cljs: {
    core: {
      set_print_fn_BANG_: jest.fn(),
      set_print_err_fn_BANG_: jest.fn(),
      // eslint-disable-next-line prefer-arrow-callback
      seq: jest.fn(function seq<T>(x: T[]): T[] {
        return x;
      }),
    },
  },
  lumo: {
    repl: {
      init: () => {},
      set_ns: () => {},
      execute: () => {},
      is_readable_QMARK_: () => '',
      get_current_ns: () => 'cljs.user',
      indent_space_count: (text: string) => 0,
      get_highlight_coordinates: (text: string) => 0,
      get_completions: (text: string) => [],
      run_main: (mainNS: string, args: string[]) => undefined,
    },
    core: {},
  },
};

let cljsContext;

function setupVmMocks(): void {
  vm.createContext.mockImplementation((x: vm$Context) => x);

  vm.Script.prototype.runInContext.mockImplementation((context: vm$Context) => {
    cljsContext = Object.assign(context, ctx);
    return cljsContext;
  });
}

setupVmMocks();

const exit = process.exit;

beforeAll(() => {
  process.exit = jest.fn();
});

afterAll(() => {
  process.exit = exit;
});

describe('startClojureScriptEngine', () => {
  beforeEach(() => {
    startREPL.mockClear();
  });

  it('should start a REPL if opts.repl is true', () => {
    startCLJS({
      repl: true,
      scripts: [],
    });

    expect(startREPL).toHaveBeenCalled();
  });

  it('returns undefined if opts.repl is false', () => {
    const ret = startCLJS({
      repl: false,
      scripts: [],
      args: [],
    });

    expect(startREPL).not.toHaveBeenCalled();
    expect(ret).toBeUndefined();

    startREPL.mockClear();

    const ret2 = startCLJS({
      repl: false,
      scripts: [['text', ':foo'], ['path', 'foo.cljs']],
      args: [],
    });

    expect(startREPL).not.toHaveBeenCalled();
    expect(ret2).toBeUndefined();
  });

  it("calls `executeScript` and bails if there's a main opt", () => {
    startCLJS({
      repl: false,
      mainScript: 'foo.cljs',
      scripts: [],
    });

    expect(startREPL).not.toHaveBeenCalled();
  });

  it("doesn't init the CLJS engine if it already started", () => {
    startCLJS({
      repl: true,
      // scripts will init the ClojureScript engine
      scripts: [['text', ':foo'], ['path', 'foo.cljs']],
      args: [],
    });

    expect(startREPL).toHaveBeenCalled();
  });

  it('sets args and calls runMainNS if mainNsName specified', () => {
    jest.resetModules();
    /* eslint-disable global-require */
    const startClojureScriptEngine = require('../cljs').default;
    vm = require('vm');
    /* eslint-enable global-require */
    setupVmMocks();

    startClojureScriptEngine({
      mainNsName: 'foo.core',
      args: ['a', 'b', 'c'],
      scripts: [],
    });

    expect(ctx.cljs.core.seq).toHaveBeenCalled();
  });

  describe('in development', () => {
    let startClojureScriptEngine;

    beforeAll(() => {
      jest.resetModules();
      /* eslint-disable global-require */
      startClojureScriptEngine = require('../cljs').default;
      vm = require('vm');
      /* eslint-enable global-require */
      setupVmMocks();
    });

    it('creates and returns a vm context', () => {
      startClojureScriptEngine({
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

describe('isReadable', () => {
  it('calls into the CLJS context', () => {
    expect(cljs.isReadable('()')).toBe('');
  });
});

describe('getCurrentNamespace', () => {
  it('calls into the CLJS context', () => {
    expect(cljs.getCurrentNamespace()).toBe('cljs.user');
  });
});

describe('indentSpaceCount', () => {
  it('calls into the CLJS context', () => {
    expect(cljs.indentSpaceCount('')).toBe(0);
  });
});

describe('getHighlightCoordinates', () => {
  it('calls into the CLJS context', () => {
    expect(cljs.getHighlightCoordinates('(let [a 1)')).toBe(0);
  });
});

describe('indentSpaceCount', () => {
  it('calls into the CLJS context', () => {
    expect(cljs.getCompletions('(de)')).toEqual([]);
  });
});

describe('lumoEval', () => {
  describe('in development', () => {
    beforeEach(() => {
      vm.runInContext.mockClear();
    });

    it('evals expressions in the ClojureScript context', () => {
      startCLJS({
        repl: true,
        _: [],
        scripts: [],
      });
      jest.runAllTicks();

      cljsContext.$$LUMO_GLOBALS.eval('source');
      expect(vm.runInContext).toHaveBeenCalledTimes(1);
    });
  });

  describe('in production', () => {
    let startClojureScriptEngine;

    beforeEach(() => {
      jest.resetModules();
      Object.assign(
        global,
        {
          initialize1: jest.fn(),
          initialize2: jest.fn(),
          __DEV__: false,
        },
        ctx,
      );
      // eslint-disable-next-line global-require
      startClojureScriptEngine = require('../cljs').default;
    });

    afterEach(() => {
      Object.keys(ctx)
        .concat(['initialize1', 'initialize2'])
        .forEach((key: string, idx: number) => {
          global[key] = undefined;
        });
      __DEV__ = true;
    });

    it('evals expressions in the ClojureScript context', () => {
      startClojureScriptEngine({
        repl: true,
        _: [],
        scripts: [],
        args: [],
      });
      jest.runAllTicks();

      cljsContext.$$LUMO_GLOBALS.eval('source');
      expect(vm.runInThisContext).toHaveBeenCalledTimes(1);
    });
  });
});
