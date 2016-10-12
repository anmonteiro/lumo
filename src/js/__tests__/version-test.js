/* @flow */

import version from '../version';

describe('version', () => {
  it('should be a string', () => {
    expect(typeof version).toBe('string');
  });
});
