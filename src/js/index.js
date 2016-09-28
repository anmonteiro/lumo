/* @flow */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

prompt('cljs.user=> ');

// $FlowExpectedError: this is only available when CLJS artifacts are built
const cljs = require('./main');

function prompt(p?: string = cljs.lumo.repl.get_current_ns() + '=> ') {
  rl.setPrompt(p);
  rl.prompt();
}

rl.on('line', (line: string) => {
  cljs.lumo.repl.read_eval_print_str(line);
  prompt();
});

rl.on('close', () => {
  console.log('crlh, close!');
});

rl.on('SIGINT', () => {
  rl.write(null, {
    ctrl: true,
    name: 'u'
  });
  console.log();
  readline.clearLine(process.stdout, 0)
  readline.cursorTo(process.stdout, 0)
  prompt();
});
