/* @flow */

import type { CLIOptsType } from './cli';

const readline = require('readline');

let rl;
let cljs;

function prompt(p: string = `${cljs.currentNS()}=> `) {
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

  // eslint-disable-next-line global-require
  cljs = require('./cljs');
  cljs.setRuntimeOpts(opts);

  rl.on('line', (line: string) => {
    cljs.eval(line);
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
