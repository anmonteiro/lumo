/* @flow */
/* eslint-disable arrow-parens */

import { ensureDir, srcPathsFromClasspathStrings } from '../util';

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
    expect(ret).toEqual(['a', '/Users/foo/b', '/Users/foo/c', '/Users/foo/d']);
  });

  it('normalizes paths', () => {
    const ret = srcPathsFromClasspathStrings(['a//c/x/:~//b', '~/c//']);
    expect(ret).toEqual(['a/c/x/', '/Users/foo/b', '/Users/foo/c/']);
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
