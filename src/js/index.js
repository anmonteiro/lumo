/* @flow */

const readline = require('readline');
// const path = require('path');

process.stdout.write('cljs.user=> ');
// $FlowExpectedError: this is only available when CLJS artifacts are built
const cljs = require('./main');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

function prompt(p?: string = cljs.lumo.repl.get_current_ns() + '=> ') {
  rl.setPrompt(p);
  rl.prompt();
}

// prompt(cljs.lumo.repl.get_current_ns());

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




// if (__DEV__) {
//   // this needs to be in a var so that nexe won't bundle the development files
//   const devJS = path.join(__dirname, '../../out/main');
//   cljs = require(devJS);
// } else {
//   cljs = require('../../out/main');
//   //cljs = require('./main');
// }

// if(process.env.NODE_ENV === 'production') {

//                                            } else {

//                                            }
