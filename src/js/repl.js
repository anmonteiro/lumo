/* @flow */

import * as cljs from './cljs';

import type { CLIOptsType } from './cli';

const readline = require('readline');

let rl;

export function prompt(p: string = `${cljs.getCurrentNamespace()}=> `) {
  rl.setPrompt(p);
  rl.prompt();
}

export default function startREPL(opts: CLIOptsType) {
  const dumbTerminal = opts['dumb-terminal'];

  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: !dumbTerminal,
  });

  prompt('cljs.user=> ');

  rl.on('line', (line: string) => {
    cljs.execute(line);
    prompt();
  });

  rl.on('SIGINT', () => {
    // $FlowIssue: missing property in interface
    rl.output.write('\n');

    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);

    rl.write(null, {
      ctrl: true,
      name: 'u',
    });

    prompt();
  });
}
