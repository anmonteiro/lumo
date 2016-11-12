/* @flow */

import * as cljs from './cljs';
import replHistory from './replHistory';
import { isWhitespace, isWindows } from './util';

import type { CLIOptsType } from './cli';

const os = require('os');
const path = require('path');
const readline = require('readline');

const exitCommands = new Set([':cljs/quit', 'exit']);
let input: string = '';

/* eslint-disable indent */
function prompt(rl: readline$Interface,
                isSecondary: boolean = false,
                p: string = cljs.getCurrentNamespace()): void {
  /* eslint-enable indent */
  let promptText;

  if (isSecondary) {
    const spaces = ' '.repeat(p.length - 2);
    promptText = `${spaces}#_=> `;
  } else {
    promptText = `${p}=> `;
  }
  rl.setPrompt(promptText);
  rl.prompt();
}

function processLine(rl: readline$Interface, line: string): void {
  let extraForms = false;

  if (exitCommands.has(line)) {
    process.exit();
  }

  if (isWhitespace(input)) {
    input = line;
  } else {
    input = `${input}\n${line}`;
  }

  for (;;) {
    extraForms = cljs.isReadable(input);

    if (extraForms !== false) {
      input = input.substring(0, input.length - extraForms.length);

      if (!isWhitespace(input)) {
        cljs.execute(input);
      } else {
        prompt(rl);
        break;
      }

      input = extraForms;
    } else {
      // partially entered form, prepare for processing the next line.
      prompt(rl, true);

      rl.write(' '.repeat(cljs.indentSpaceCount(input)));
      break;
    }
  }
}

function handleSIGINT(rl: readline$Interface): void {
  input = '';

  // $FlowIssue: missing property in interface
  rl.output.write('\n');

  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);

  rl.write(null, {
    ctrl: true,
    name: 'u',
  });

  prompt(rl);
}

export default function startREPL(opts: CLIOptsType): void {
  const dumbTerminal = isWindows ? true : opts['dumb-terminal'];

  const rl = replHistory({
    path: path.join(os.homedir(), '.lumo_history'),
    historySize: 200,
    input: process.stdin,
    output: process.stdout,
    terminal: !dumbTerminal,
  });

  // $FlowIssue
  readline.emitKeypressEvents(process.stdin, rl);
  if (process.stdin.isTTY) {
    // $FlowIssue
    process.stdin.setRawMode(true);
  }

  prompt(rl, false, 'cljs.user');

  rl.on('line', (line: string) => processLine(rl, line));
  rl.on('SIGINT', () => handleSIGINT(rl));
}
