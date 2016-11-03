/* @flow */

import startCLJS, * as cljs from '../cljs';
import startREPL from '../repl';

jest.mock('../repl');
jest.mock('../lumo');

describe('startClojureScriptEngine', () => {
  const nextTick = process.nextTick;

  beforeEach(() => {
    startREPL.mockClear();
    process.nextTick = jest.fn();
  });

  afterEach(() => {
    process.nextTick = nextTick;
  });

  it('should start a REPL if opts.repl is true', () => {
    startCLJS({
      repl: true,
      _: [],
      scripts: [],
    });

    expect(startREPL).toHaveBeenCalled();
    expect(process.nextTick).toHaveBeenCalled();
  });

  it('returns undefined if opts.repl is false', () => {
    const ret = startCLJS({
      repl: false,
      _: [],
      scripts: [],
    });

    expect(startREPL).not.toHaveBeenCalled();
    expect(process.nextTick).not.toHaveBeenCalled();

    expect(ret).toBeUndefined();

    startREPL.mockClear();

    const ret2 = startCLJS({
      repl: false,
      _: [],
      scripts: [['text', ':foo'], ['path', 'foo.cljs']],
    });

    expect(startREPL).not.toHaveBeenCalled();
    expect(ret2).toBeUndefined();
    expect(process.nextTick).not.toHaveBeenCalled();
  });

  it('calls `executeScript` and bails if there\'s a main opt', () => {
    startCLJS({
      repl: false,
      _: ['foo.cljs'],
      scripts: [],
    });

    expect(startREPL).not.toHaveBeenCalled();
    expect(process.nextTick).not.toHaveBeenCalled();
  });

  it('doesn\'t init the CLJS engine if it already started', () => {
    startCLJS({
      repl: true,
      _: [],
      // scripts will init the ClojureScript engine
      scripts: [['text', ':foo'], ['path', 'foo.cljs']],
    });

    expect(process.nextTick).not.toHaveBeenCalled();
    expect(startREPL).toHaveBeenCalled();
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
