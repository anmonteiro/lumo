/* flow */

const os = require('os');
const util = require('../util');

describe('srcPathsFromClasspathStrings', () => {
  const homedir = os.homedir;

  beforeEach(() => {
    os.homedir = jest.fn(() => '/Users/foo');
  });

  afterEach(() => {
    os.homedir = homedir;
  });


  it('splits multiple paths on \':\' ', () => {
    expect(util.srcPathsFromClasspathStrings(['a:b', 'c:d', 'e'])).toEqual(['a', 'b', 'c', 'd', 'e']);
  });

  it('expands ', () => {
    const ret = util.srcPathsFromClasspathStrings(['a:~/b', '~/c:~/d']);
    expect(ret).toEqual(['a', '/Users/foo/b', '/Users/foo/c', '/Users/foo/d']);
  });
});
