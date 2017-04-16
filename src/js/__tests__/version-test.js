/* @flow */

let version;
beforeAll(() => {
  process.env.LUMO_VERSION = 'X.X.X';
  version = require('../version').default; // eslint-disable-line global-require
});

afterAll(() => {
  delete process.env.LUMO_VERSION;
});

describe('version', () => {
  it('should be replaced by the env variable LUMO_VERSION at build time', () => {
    expect(version).toBe('X.X.X');
  });
});
