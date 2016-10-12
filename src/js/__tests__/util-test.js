/* @flow */

import { srcPathsFromClasspathStrings } from '../util';

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
