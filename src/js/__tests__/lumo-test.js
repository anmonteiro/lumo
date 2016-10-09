/* flow */

let lumo = require('../lumo');
const fs = require('fs');
const zlib = require('zlib');

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

  describe('readFile', () => {
    it('returns the contents of a (bundled) file when it exists', () => {
      expect(lumo.readFile('foo')).toBe('fooContents');
    });

    it('returns null when a file doesn\'t exist', () => {
      expect(lumo.readFile('nonExistent')).toBe(null);
    });
  });
});
