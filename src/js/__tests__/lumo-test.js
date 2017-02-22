/* @flow */

import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

let lumo = require('../lumo');

jest.mock('jszip');
// this needs to be here or tests start randomly failing with `can't find .babelrc`
require('jszip');

describe('lumo', () => {
  const readFileSync = fs.readFileSync;
  const existsSync = fs.existsSync;

  beforeEach(() => {
    fs.readFileSync = jest.fn((p: string) => {
      if (/foo/.test(p)) {
        return 'fooContents';
      }
      throw new Error(`file doesn't exist: ${p}`);
    });
  });

  afterEach(() => {
    fs.readFileSync = readFileSync;
    fs.existsSync = existsSync;
  });

  describe('load', () => {
    describe('in __DEV__', () => {
      fs.existsSync = jest.fn(() => true);
      it('returns the contents of a (bundled) file when it exists', () => {
        expect(lumo.load('foo')).toBe('fooContents');
      });

      it('returns null when a file doesn\'t exist', () => {
        expect(lumo.load('nonExistent')).toBe(null);
      });
    });

    describe('in production', () => {
      const inflateSync = zlib.inflateSync;

      beforeEach(() => {
        jest.resetModules();
        zlib.inflateSync = jest.fn((x: string) => x);
        jest.mock('nexeres', () => ({
          get: (resource: string) => {
            if (resource === 'foo') {
              return 'fooContents';
            }
            throw new Error('Inexistent resource');
          },
          keys: () => ['foo'],
        }), { virtual: true });

        __DEV__ = false;
        lumo = require('../lumo'); // eslint-disable-line global-require
      });

      afterEach(() => {
        __DEV__ = true;
        zlib.inflateSync = inflateSync;
      });

      it('returns the contents of a (bundled) file when it exists', () => {
        expect(lumo.load('foo')).toBe('fooContents');
      });

      it('returns null when a file doesn\'t exist', () => {
        expect(lumo.load('nonExistent')).toBe(null);
      });
    });
  });

  describe('readCache', () => {
    it('returns the contents of a (cached) file when it exists', () => {
      expect(lumo.readCache('foo')).toBe('fooContents');
    });

    it('returns null when a file doesn\'t exist', () => {
      expect(lumo.readCache('nonExistent')).toBe(null);
    });
  });

  describe('writeCache', () => {
    const writeFileSync = fs.writeFileSync;
    beforeEach(() => {
      fs.writeFileSync = jest.fn((fname: string,
                                  contents: string,
                                  encoding: string) => {
        if (/foo/.test(fname)) {
          return;
        }
        throw new Error('some error');
      });
    });

    afterEach(() => {
      fs.writeFileSync = writeFileSync;
    });

    it('writes correctly if directory exists', () => {
      expect(lumo.writeCache('foo', 'bar')).toBeUndefined();
    });

    it('catches and returns an error if it can\'t write', () => {
      expect(lumo.writeCache('nonExistent', 'contents')).toBeInstanceOf(Error);
    });
  });

  describe('readSource', () => {
    beforeEach(() => {
      jest.resetModules();
      lumo = require('../lumo'); // eslint-disable-line global-require
    });

    afterEach(() => {
    });

    it('cycles through the source paths', () => {
      const srcPaths = ['a', 'b', 'c'];
      lumo.addSourcePaths(srcPaths);
      const lumoPaths = ['', ...srcPaths];

      fs.readFileSync = jest.fn((filename: string) => {
        throw new Error(`file doesn't exist: ${filename}`);
      });

      const source = lumo.readSource('bar/baz');
      const mockCalls = fs.readFileSync.mock.calls;

      expect(source).toBe(null);
      expect(fs.readFileSync).toHaveBeenCalledTimes(4);
      expect(mockCalls.map((x: string[]) => x[0])).toEqual(
        lumoPaths.map((p: string) => path.join(p, 'bar/baz')));
    });

    describe('reads JAR archives', () => {
      it('should return the source when JAR has the source', () => {
        const srcPaths = ['foo.jar'];
        lumo.addSourcePaths(srcPaths);

        const source = lumo.readSource('some/thing');

        expect(source).toBe('zipContents');
      });

      it('should return null when the JAR doesn\'t have the source', () => {
        const source = lumo.readSource('some/thing');

        expect(source).toBe(null);
      });
    });
  });

  describe('loadUpstreamForeignLibs', () => {
    beforeEach(() => {
      jest.resetModules();
      lumo = require('../lumo'); // eslint-disable-line global-require
    });

    it('should return an array with the file contents when JAR has deps.cljs', () => {
      const srcPaths = ['foo.jar'];
      lumo.addSourcePaths(srcPaths);

      const source = lumo.loadUpstreamForeignLibs('some/thing');

      expect(source).toEqual(['zipContents']);
    });

    it('should return an empty array when the JAR doesn\'t have deps.cljs', () => {
      const source = lumo.loadUpstreamForeignLibs('some/thing');

      expect(source).toEqual([]);
    });

    it('shouldn\'t crash when a JAR isn\'t found', () => {
      const srcPaths = ['bar.jar'];
      lumo.addSourcePaths(srcPaths);

      const source = lumo.loadUpstreamForeignLibs('some/thing');

      expect(source).toEqual([]);
    });
  });

  describe('resource', () => {
    beforeEach(() => {
      jest.resetModules();
      lumo = require('../lumo'); // eslint-disable-line global-require
    });

    it('cycles through the source paths', () => {
      const srcPaths = ['a', 'b', 'c'];
      lumo.addSourcePaths(srcPaths);
      const lumoPaths = ['', ...srcPaths];

      fs.existsSync = jest.fn((_: string) => false);

      const exists = lumo.resource('bar/baz');
      const mockCalls = fs.existsSync.mock.calls;

      expect(exists).toBe(null);
      expect(fs.existsSync).toHaveBeenCalledTimes(5);
      expect(mockCalls.map((x: string[]) => x[0])).toEqual(
        ['./target/bar/baz'].concat(lumoPaths.map((p: string) => path.join(p, 'bar/baz'))));
    });

    it('returns the representation for the resource when it exists', () => {
      fs.existsSync = jest.fn((_: string) => true);
      expect(lumo.resource('some-file')).toEqual({
        type: 'bundled',
        src: 'some-file',
      });
    });

    describe('reads JAR archives', () => {
      it('should return true when JAR has the file', () => {
        const srcPaths = ['foo.jar'];
        lumo.addSourcePaths(srcPaths);

        fs.existsSync = jest.fn((fname: string) => /foo/.test(fname));

        expect(lumo.resource('some/thing')).toMatchObject({
          type: 'jar',
          src: 'some/thing',
        });
      });

      it('should return false when the JAR doesn\'t have the file', () => {
        expect(lumo.resource('some/thing')).toBe(null);
      });
    });
  });
});
