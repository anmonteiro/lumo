/* @flow */

import * as cljs from './cljs';
import replHistory from './replHistory';

import type { CLIOptsType } from './cli';

const os = require('os');
const path = require('path');
const readline = require('readline');

export function prompt(rl: readline$Interface, p: string = `${cljs.getCurrentNamespace()}=> `) {
  rl.setPrompt(p);
  rl.prompt();
}

export default function startREPL(opts: CLIOptsType) {
  const dumbTerminal = opts['dumb-terminal'];

  const rl = replHistory({
    path: path.join(os.homedir(), '.lumo_history'),
    historySize: 200,
    input: process.stdin,
    output: process.stdout,
    terminal: !dumbTerminal,
  });

  prompt(rl, 'cljs.user=> ');

  rl.on('line', (line: string) => {
    cljs.execute(line);
    prompt(rl);
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

    prompt(rl);
  });
}
