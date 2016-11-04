/* @flow */

import startREPL from '../repl';
import replHistory from '../replHistory';

const setPrompt = jest.fn();
const prompt = jest.fn();
const on = jest.fn();

jest.mock('../replHistory', () => jest.fn(() => ({
  setPrompt,
  prompt,
  on,
})));

describe('startREPL', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a readline interface', () => {
    startREPL({});

    expect(replHistory).toHaveBeenCalled();
  });

  it('sets and emits the prompt', () => {
    startREPL({});

    expect(setPrompt).toHaveBeenCalled();
    expect(prompt).toHaveBeenCalled();
  });

  it('sets event handlers for line input and Ctrl+C', () => {
    startREPL({});

    const onCalls = on.mock.calls;
    expect(onCalls.length).toBe(2);
    expect(onCalls[0][0]).toBe('line');
    expect(onCalls[1][0]).toBe('SIGINT');
  });
});
