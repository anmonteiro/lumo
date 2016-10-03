/* @flow */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

// eslint-disable-next-line no-use-before-define
prompt('cljs.user=> ');

const cljs = require('./cljs');

function prompt(p: string = `${cljs.currentNS()}=> `) {
  rl.setPrompt(p);
  rl.prompt();
}

rl.on('line', (line: string) => {
  cljs.eval(line);
  prompt();
});

rl.on('close', () => {
  // $FlowIssue: missing property in interface
  rl.output.write('closing!');
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
