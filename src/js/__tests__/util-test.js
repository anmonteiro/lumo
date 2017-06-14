/* @flow */

import fs from 'fs';
import os from 'os';
import path from 'path';
import {
  ensureDir,
  srcPathsFromMavenDependencies,
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

describe('mavenCoordinatesToPath', () => {
  const osHomedir = os.homedir;
  beforeAll(() => {
    os.homedir = jest.fn(() => '/Users/foo');
  });

  afterAll(() => {
    os.homedir = osHomedir;
  });

  it('should decode a group/artifact:version encoded dep to its local path ', () => {
    expect(
      srcPathsFromMavenDependencies(['org.clojure/clojurescript:1.9.562']),
    ).toEqual([
      '/Users/foo/.m2/repository/org/clojure/clojurescript/1.9.562/clojurescript-1.9.562.jar',
    ]);

    expect(
      srcPathsFromMavenDependencies([
        'org.clojure/clojurescript:1.9.562,cljsjs/react:15.5.0-0',
      ]),
    ).toEqual([
      '/Users/foo/.m2/repository/org/clojure/clojurescript/1.9.562/clojurescript-1.9.562.jar',
      '/Users/foo/.m2/repository/cljsjs/react/15.5.0-0/react-15.5.0-0.jar',
    ]);

    expect(
      srcPathsFromMavenDependencies(
        ['org.clojure/clojurescript:1.9.562'],
        '~/.m3',
      ),
    ).toEqual([
      '/Users/foo/.m3/org/clojure/clojurescript/1.9.562/clojurescript-1.9.562.jar',
    ]);

    expect(srcPathsFromMavenDependencies(['rewrite-clj:0.6.0'])).toEqual([
      '/Users/foo/.m2/repository/rewrite-clj/rewrite-clj/0.6.0/rewrite-clj-0.6.0.jar',
    ]);
  });
});
