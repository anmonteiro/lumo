/* @flow */

import { ensureArray, ensureDir, srcPathsFromClasspathStrings,
         isWhitespace, isWindows } from '../util';

const fs = require('fs');
const os = require('os');

describe('srcPathsFromClasspathStrings', () => {
  const homedir = os.homedir;

  beforeEach(() => {
    os.homedir = jest.fn(() => '/Users/foo');
  });

  afterEach(() => {
    os.homedir = homedir;
  });


  it('splits multiple paths on \':\' ', () => {
    expect(srcPathsFromClasspathStrings(['a:b', 'c:d', 'e'])).toEqual(['a', 'b', 'c', 'd', 'e']);
  });

  it('expands ', () => {
    const ret = srcPathsFromClasspathStrings(['a:~/b', '~/c:~/d']);

    if (isWindows) {
      expect(ret).toEqual(['a', '\\Users\\foo\\b', '\\Users\\foo\\c', '\\Users\\foo\\d']);
    } else {
      expect(ret).toEqual(['a', '/Users/foo/b', '/Users/foo/c', '/Users/foo/d']);
    }
  });

  it('normalizes paths', () => {
    const ret = srcPathsFromClasspathStrings(['a//c/x/:~//b', '~/c//']);

    if (isWindows) {
      expect(ret).toEqual(['a\\c\\x\\', '\\Users\\foo\\b', '\\Users\\foo\\c\\']);
    } else {
      expect(ret).toEqual(['a/c/x/', '/Users/foo/b', '/Users/foo/c/']);
    }
  });
});

describe('ensureDir', () => {
  const mkdirSync = fs.mkdirSync;
  const existsSync = fs.existsSync;
  const statSync = fs.statSync;
  const isDir = fs.Stats.prototype.isDirectory;

  afterEach(() => {
    fs.mkdirSync = mkdirSync;
    fs.existsSync = existsSync;
    fs.statSync = statSync;
    fs.Stats.prototype.isDirectory = isDir;
  });

  it('should create a new folder when it doesn\'t exist', () => {
    fs.existsSync = jest.fn((path: string) => false);
    fs.mkdirSync = jest.fn();

    ensureDir('foo');
    expect(fs.mkdirSync).toBeCalledWith('foo');
  });

  it('should throw an error if path exists and is not a folder', () => {
    fs.existsSync = jest.fn((path: string) => true);
    fs.statSync = jest.fn((path: string) => new fs.Stats());
    fs.Stats.prototype.isDirectory = jest.fn(() => false);

    expect(() => {
      ensureDir('somefile');
    }).toThrow('somefile exists but is not a directory.');
  });

  it('should flow through if everything is OK', () => {
    fs.mkdirSync = jest.fn();
    fs.existsSync = jest.fn((path: string) => true);
    fs.statSync = jest.fn((path: string) => new fs.Stats());
    fs.Stats.prototype.isDirectory = jest.fn(() => true);

    expect(() => {
      ensureDir('somefolder');
    }).not.toThrow();
    expect(fs.existsSync.mock.calls.length).toBe(1);
    expect(fs.statSync.mock.calls.length).toBe(1);
    expect(fs.mkdirSync).not.toBeCalled();
  });
});

describe('ensureArray', () => {
  it('returns the same input if passed an array', () => {
    const arr = [1, 2];
    expect(ensureArray(arr)).toBe(arr);
  });

  it('returns an array if passed a single element', () => {
    expect(ensureArray(1)).toEqual([1]);
  });
});

describe('isWhitespace', () => {
  it('returns true given any whitespace string', () => {
    expect(isWhitespace('')).toBe(true);
    expect(isWhitespace('  ')).toBe(true);
    expect(isWhitespace('\t')).toBe(true);
    expect(isWhitespace('\n')).toBe(true);
    expect(isWhitespace('\r')).toBe(true);
  });

  it('returns false given any non-whitespace string', () => {
    expect(isWhitespace('a')).toBe(false);
    expect(isWhitespace('a b')).toBe(false);
    expect(isWhitespace('a\n')).toBe(false);
  });
});
