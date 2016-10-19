/* @flow */

import * as cljs from './cljs';

import type { CLIOptsType } from './cli';

const readline = require('readline');
const readlineHist = require('readline-history');
const path = require('path');
const os = require('os');

let rl;

export function prompt(p: string = `${cljs.getCurrentNamespace()}=> `) {
  rl.setPrompt(p);
  rl.prompt();
}

export default function startREPL(opts: CLIOptsType) {
  const dumbTerminal = opts['dumb-terminal'];

  process.stdout.write('cljs.user=> ');

  readlineHist.createInterface({
    path: path.join(os.homedir(), '.lumo_history'),
    maxLength: 200,
    input: process.stdin,
    output: process.stdout,
    terminal: !dumbTerminal,
    next: (rli: readline$Interface) => {
      rl = rli;
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
    },
  });
}
