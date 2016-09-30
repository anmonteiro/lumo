/* @flow */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

// eslint-disable-next-line no-use-before-define
prompt('cljs.user=> ');

// $FlowExpectedError: this is only available when CLJS artifacts are built
const cljs = require('./main'); // eslint-disable-line import/no-unresolved

function prompt(p: string = `${cljs.lumo.repl.get_current_ns()}=> `) {
  rl.setPrompt(p);
  rl.prompt();
}

rl.on('line', (line: string) => {
  cljs.lumo.repl.read_eval_print_str(line);
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
