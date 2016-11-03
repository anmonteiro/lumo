/* @flow */

import cli from '../cli';
import index from '../index';

jest.mock('../cli');

describe('index', () => {
  it('doesn\'t export anything', () => {
    expect(index).toEqual({});
  });
  it('should defer to the cli module', () => {
    expect(cli).toHaveBeenCalled();
  });
});
