/* @flow */

import replHistory from '../replHistory';

const readline = require('readline');
const fs = require('fs');

jest.mock('readline');

readline.createInterface = jest.fn(() => ({
  _addHistory: jest.fn(() => 'qux'),
  history: [],
}));

jest.mock('fs');

type statCbType = (err: ?Error, ret: {size: number}) => void;
fs.stat = jest.fn((path: string, cb: statCbType) => {
  cb(null, { size: 10 });
});

fs.close = jest.fn((_: number, cb: () => void) => cb());
fs.rename = jest.fn((old: string, newName: string, cb: () => void) => cb());
fs.open = jest.fn((path: string, flags: string, cb: () => void) => cb());
fs.unlink = jest.fn((_: string, cb: () => void) => cb());

const streamWrite = jest.fn();

fs.createWriteStream = jest.fn(() => ({
  write: streamWrite,
  fd: 42,
}));

fs.createReadStream = jest.fn((path: string, opts: { [key: string]: string }) => ({
  on: jest.fn((type: string, cb: (e?: string) => void) => {
    switch (type) {
      case 'data':
        return path === 'nonExistent' ? cb('') : cb('foo\nbar\n');
      case 'end':
        return cb();

      default: return undefined;
    }
  }),
}));

describe('replHistory', () => {
  beforeEach(() => {
    readline.createInterface.mockClear();
    fs.createWriteStream.mockClear();
    fs.stat.mockClear();
    streamWrite.mockClear();
  });

  it('creates a readline interface and saves history when terminal is true', () => {
    replHistory({ terminal: true });

    expect(readline.createInterface).toHaveBeenCalled();
    expect(fs.createWriteStream).toHaveBeenCalled();
  });

  it('doesn\'t save history when terminal is false', () => {
    replHistory({});

    expect(fs.createWriteStream).not.toHaveBeenCalled();
  });

  it('loads REPL history from file if existent path and historySize passed', () => {
    const rl = replHistory({
      historySize: 10,
      path: '~/.history',
      terminal: true,
    });

    expect(rl.history.length).toBeGreaterThan(0);
  });

  describe('doesn\'t load REPL history from file', () => {
    it('if path isn\'t passed in options', () => {
      const rl = replHistory({
        terminal: true,
        historySize: 10,
      });

      expect(fs.stat).not.toHaveBeenCalled();
      expect(rl.history).toEqual([]);
    });

    it('if path doesn\'t exist', () => {
      const rl = replHistory({
        terminal: true,
        historySize: 10,
        path: 'nonExistent',
      });

      expect(rl.history).toEqual(['']);
    });

    it('if historySize not passed in options', () => {
      const rl = replHistory({
        terminal: true,
        path: 'foo',
      });

      expect(fs.stat).not.toHaveBeenCalled();
      expect(rl.history).toEqual([]);
    });
  });

  describe('adds lines to history', () => {
    it('persists them to file', () => {
      const rl = replHistory({
        historySize: 10,
        path: '~/.history',
        terminal: true,
      });

      rl._addHistory(); // eslint-disable-line no-underscore-dangle
      expect(streamWrite).toHaveBeenCalledTimes(1);
      expect(streamWrite).toHaveBeenCalledWith('qux\n', 'utf8');
    });
  });

  describe('renames an existent repl history file when it\'s past the maximum size', () => {
    const fsStat = fs.stat;

    beforeEach(() => {
      fs.stat = jest.fn()
        .mockImplementationOnce((path: string, cb: statCbType) => cb(null, { size: 0x10000000 }))
        .mockImplementationOnce((path: string, cb: statCbType) => cb(null, { size: 0x100 }));
    });

    afterAll(() => {
      fs.stat = fsStat;
    });

    it('if an old one doesn\'t exist', () => {
      fs.exists = jest.fn((_: string, cb: (ret: boolean) => void) => cb(false));

      replHistory({
        historySize: 10,
        path: '~/.history',
        terminal: true,
      });

      expect(fs.rename).toHaveBeenCalled();
      expect(fs.unlink).not.toHaveBeenCalled();
    });

    it('unlinking the old one if necessary', () => {
      fs.exists = jest.fn((_: string, cb: (ret: boolean) => void) => cb(true));

      replHistory({
        historySize: 10,
        path: '~/.history',
        terminal: true,
      });

      expect(fs.unlink).toHaveBeenCalled();
      expect(fs.rename).toHaveBeenCalled();
    });
  });
});
