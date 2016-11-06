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

fs.stat = jest.fn((path: string, cb: Function) => {
  cb(null, { size: 10 });
});

const streamWrite = jest.fn();

fs.createWriteStream = jest.fn(() => ({
  write: streamWrite,
}));

fs.createReadStream = jest.fn((path: string, opts: Object) => ({
  on: jest.fn((type: string, cb: Function) => {
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
    jest.clearAllMocks();
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
      expect(streamWrite.mock.calls.length).toBe(1);
      expect(streamWrite).toHaveBeenCalledWith('qux\n', 'utf8');
    });
  });
});
