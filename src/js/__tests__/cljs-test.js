/* @flow */

import startCLJS, * as cljs from '../cljs';
import startREPL from '../repl';

const vm = require('vm');

jest.mock('../repl');

jest.mock('../lumo', () => ({
  load: () => '',
}));

jest.mock('vm');

jest.useFakeTimers();

const ctx = {
  cljs: {
    nodejs: {
      enable_util_print_BANG_: () => {},
    },
  },
  lumo: {
    repl: {
      init: () => {},
      set_ns: () => {},
      execute: () => {},
      is_readable_QMARK_: () => true,
      get_current_ns: () => 'cljs.user',
    },
  },
};

vm.createContext.mockImplementation(() => ctx);

describe('startClojureScriptEngine', () => {
  beforeEach(() => {
    startREPL.mockClear();
  });

  it('should start a REPL if opts.repl is true', () => {
    startCLJS({
      repl: true,
      _: [],
      scripts: [],
    });

    expect(startREPL).toHaveBeenCalled();
  });

  it('returns undefined if opts.repl is false', () => {
    const ret = startCLJS({
      repl: false,
      _: [],
      scripts: [],
    });

    expect(startREPL).not.toHaveBeenCalled();
    expect(ret).toBeUndefined();

    startREPL.mockClear();

    const ret2 = startCLJS({
      repl: false,
      _: [],
      scripts: [['text', ':foo'], ['path', 'foo.cljs']],
    });

    expect(startREPL).not.toHaveBeenCalled();
    expect(ret2).toBeUndefined();
  });

  it('calls `executeScript` and bails if there\'s a main opt', () => {
    startCLJS({
      repl: false,
      _: ['foo.cljs'],
      scripts: [],
    });

    expect(startREPL).not.toHaveBeenCalled();
  });

  it('doesn\'t init the CLJS engine if it already started', () => {
    startCLJS({
      repl: true,
      _: [],
      // scripts will init the ClojureScript engine
      scripts: [['text', ':foo'], ['path', 'foo.cljs']],
    });

    expect(startREPL).toHaveBeenCalled();
  });

  describe('in development', () => {
    beforeEach(() => {
      jest.runAllTicks();
      vm.createContext.mockClear();
    });

    it('creates and returns a vm context', () => {
      startCLJS({
        repl: true,
        _: [],
        scripts: [],
      });

      jest.runAllTicks();
      expect(vm.createContext).toHaveBeenCalled();
      expect(vm.createContext.mock.calls.length).toBe(1);
    });
  });

  describe('in production', () => {
    let startClojureScriptEngine;

    beforeEach(() => {
      jest.resetModules();
      Object.assign(global, {
        initialize: jest.fn(),
        __DEV__: false,
      }, ctx);
      // eslint-disable-next-line global-require
      startClojureScriptEngine = require('../cljs').default;
    });

    afterEach(() => {
      Object.keys(ctx).concat(['initialize']).forEach((key: string, idx: number) => {
        global[key] = undefined;
      });
      __DEV__ = true;
    });

    it('calls the global initialize function', () => {
      startClojureScriptEngine({
        repl: true,
        _: [],
        scripts: [],
      });

      jest.runAllTicks();

      // eslint-disable-next-line no-undef
      expect(initialize).toHaveBeenCalled();
    });
  });
});

describe('isReadable', () => {
  it('calls into the CLJS context', () => {
    expect(cljs.isReadable('()')).toBe(true);
  });
});

describe('getCurrentNamespace', () => {
  it('calls into the CLJS context', () => {
    expect(cljs.getCurrentNamespace()).toBe('cljs.user');
  });
});
