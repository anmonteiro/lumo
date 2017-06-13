/* @flow */

import fs from 'fs';
import os from 'os';
import path from 'path';
import {
  ensureDir,
  getPomDependencies,
  srcPathsFromClasspathStrings,
  isWhitespace,
  isWindows,
} from '../util';

describe('srcPathsFromClasspathStrings', () => {
  const homedir = os.homedir;
  const pathResolve = path.resolve;

  beforeEach(() => {
    os.homedir = jest.fn(() => '/Users/foo');
    path.resolve = jest.fn((x: string) => x);
  });

  afterEach(() => {
    os.homedir = homedir;
    path.resolve = pathResolve;
  });

  if (isWindows) {
    it('splits multiple paths with both ; and : separators', () => {
      expect(srcPathsFromClasspathStrings(['a;b', 'c:d', 'e'])).toEqual([
        'a',
        'b',
        'c',
        'd',
        'e',
      ]);
    });
  } else {
    it("splits multiple paths on ':' ", () => {
      expect(srcPathsFromClasspathStrings(['a:b', 'c:d', 'e', 'f;g'])).toEqual([
        'a',
        'b',
        'c',
        'd',
        'e',
        'f;g',
      ]);
    });
  }
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

  it("should create a new folder when it doesn't exist", () => {
    fs.existsSync = jest.fn((_: string) => false);
    fs.mkdirSync = jest.fn();

    ensureDir('foo');
    expect(fs.mkdirSync).toBeCalledWith('foo');
  });

  it('should throw an error if path exists and is not a folder', () => {
    fs.existsSync = jest.fn((_: string) => true);
    fs.statSync = jest.fn((_: string) => new fs.Stats());
    fs.Stats.prototype.isDirectory = jest.fn(() => false);

    expect(() => {
      ensureDir('somefile');
    }).toThrow('somefile exists but is not a directory.');
  });

  it('should flow through if everything is OK', () => {
    fs.mkdirSync = jest.fn();
    fs.existsSync = jest.fn((_: string) => true);
    fs.statSync = jest.fn((_: string) => new fs.Stats());
    fs.Stats.prototype.isDirectory = jest.fn(() => true);

    expect(() => {
      ensureDir('somefolder');
    }).not.toThrow();
    expect(fs.existsSync).toHaveBeenCalledTimes(1);
    expect(fs.statSync).toHaveBeenCalledTimes(1);
    expect(fs.mkdirSync).not.toBeCalled();
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

describe('getPomDependencies', () => {
  const pom = fs.readFileSync(path.join(__dirname, 'fixtures/pom.xml'));

  it('should retrieve the dependencies in a POM file', () => {
    expect(getPomDependencies(pom)).toEqual([
      {
        group: 'com.google.javascript',
        artifact: 'closure-compiler-unshaded',
        version: 'v20170521',
      },
      {
        group: 'org.clojure',
        artifact: 'tools.reader',
        version: '1.0.0-beta3',
      },
      {
        group: 'com.cognitect',
        artifact: 'transit-clj',
        version: '0.8.300',
      },
    ]);
  });
});
