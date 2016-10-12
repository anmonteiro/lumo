/* @flow */

let lumo = require('../lumo');
const fs = require('fs');
const zlib = require('zlib');

jest.mock('jszip');

describe('lumo', () => {
  const readFileSync = fs.readFileSync;
  beforeEach(() => {
    fs.readFileSync = jest.fn((path: string) => {
      if (/foo/.test(path)) {
        return 'fooContents';
      }
      throw new Error('file doesn\'t exist');
    });
  });

  afterEach(() => {
    fs.readFileSync = readFileSync;
  });

  describe('load', () => {
    describe('in __DEV__', () => {
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
        zlib.inflateSync = jest.fn((x: any) => x); // eslint-disable-line arrow-parens
        jest.mock('nexeres', () => ({
          get: (resource: string) => {
            if (resource === 'foo') {
              return 'fooContents';
            }
            throw new Error('Inexistent resource');
          },
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

  describe('readSource', () => {
    afterEach(() => {
      lumo.setSourcePaths([]);
    });

    it('cycles through the source paths', () => {
      const srcPaths = ['a', 'b', 'c'];
      lumo.setSourcePaths(srcPaths);
      const source = lumo.readSource('bar/baz');
      const mockCalls = fs.readFileSync.mock.calls;

      expect(source).toBe(null);
      expect(mockCalls.length).toBe(3);
      // eslint-disable-next-line arrow-parens
      expect(mockCalls.map((x: string[]) => x[0])).toEqual(srcPaths.map((path: string) => `${path}/bar/baz`));
    });

    describe('reads JAR archives', () => {
      it('should return the source when JAR has the source', () => {
        const srcPaths = ['foo.jar'];
        lumo.setSourcePaths(srcPaths);

        const source = lumo.readSource('some/thing');

        expect(source).toBe('zipContents');
      });

      it('should return null when the JAR doesn\'t have the source', () => {
        const srcPaths = ['other.jar'];
        lumo.setSourcePaths(srcPaths);

        const source = lumo.readSource('some/thing');

        expect(source).toBe(null);
      });
    });
  });
});
