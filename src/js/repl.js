/* @flow */

import * as cljs from './cljs';
import replHistory from './replHistory';
import { currentTimeMicros, isWhitespace, isWindows } from './util';

import type { CLIOptsType } from './cli';

const os = require('os');
const path = require('path');
const readline = require('readline');
const tty = require('tty');

type KeyType = {
  name: string,
  ctrl?: boolean,
  shift?: boolean,
  meta?: boolean,
};

const exitCommands = new Set([':cljs/quit', 'exit']);
let input: string = '';
let lastKeypressTime: number;
let isPasting: boolean;
const pendingHighlights = [];

/* eslint-disable indent */
export function prompt(rl: readline$Interface,
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

export function processLine(rl: readline$Interface, line: string): void {
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
        const oldWrite = process.stdout.write;
        const resultLines: string[] = [];
        // $FlowIssue - assignment of process.stdout.write
        process.stdout.write = (m: string) => resultLines.push(m);
        cljs.execute(input);
        // $FlowIssue - assignment of process.stdout.write
        process.stdout.write = oldWrite;
        // $FlowIssue - use of rl.output.write of write
        resultLines.forEach((l: string) => rl.output.write(l));
      } else {
        prompt(rl);
        break;
      }

      input = extraForms;
    } else {
      // partially entered form, prepare for processing the next line.
      prompt(rl, true);

      if (!isPasting) {
        const spaceCount = cljs.indentSpaceCount(input);
        if (spaceCount !== -1) {
          rl.write(' '.repeat(spaceCount));
        }
      }
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

/* eslint-disable indent */
function highlight(rlInt: readline$Interface,
                   char: string,
                   line: string,
                   cursor: number): void {
  /* eslint-enable indent */
  const rl = rlInt;
  const pos = cursor - 1;

  if (char === ')' || char === ']' || char === '}') {
    const lines = input === '' ? [] : input.split('\n');
    lines.push(line);
    const [cursorX, linesUp] = cljs.getHighlightCoordinates(lines, pos);

    if (linesUp !== -1) {
      // $FlowIssue: rl.output is there
      readline.moveCursor(rl.output, -(cursor - cursorX), -linesUp);
      rl.pause();

      // set the readline input stream to a new one so that we can listen for
      // keypress events while stdin is paused.
      // $FlowIssue
      const oldInput = rl.input;
      const readStream = new tty.ReadStream(null, {});
      readStream.setRawMode(true);
      // $FlowIssue
      readline.emitKeypressEvents(readStream, rl);

      readStream.once('keypress', (c: string, key: KeyType) => {
        const [tid] = pendingHighlights.shift();
        clearTimeout(tid);
        // $FlowIssue
        readline.moveCursor(rl.output, (cursor - cursorX), linesUp);
        // $FlowIssue
        rl.input = oldInput;
        rl.resume();
        readStream.destroy();
        rl.write(c, key);
        // $FlowIssue
        highlight(rl, c, rl.line, rl.cursor);
      });

      // $FlowIssue
      rl.input = readStream;

      const now = currentTimeMicros();
      const timeout = setTimeout(() => {
        const to = pendingHighlights[0];

        if (to != null && to[1] === now) {
          pendingHighlights.shift();
          // $FlowIssue: rl.output is there
          readline.moveCursor(rl.output, (cursor - cursorX), linesUp);
          // $FlowIssue: rl.input is there
          rl.input = oldInput;
          rl.resume();
          readStream.destroy();
        }
      }, 500);

      pendingHighlights.push([timeout, now]);
    }
  }
}

function handleKeyPress(rl: readline$Interface, c: string, key: KeyType): void {
  const now = currentTimeMicros();
  isPasting = (now - lastKeypressTime) < 10000;
  lastKeypressTime = now;

  if (!isPasting) {
    // $FlowIssue: these properties exist
    highlight(rl, c, rl.line, rl.cursor);
  }
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
  if (process.stdin.isTTY && !dumbTerminal) {
    // $FlowIssue
    process.stdin.setRawMode(true);
  }

  process.on('uncaughtException', (err: Error) => undefined);

  prompt(rl, false, 'cljs.user');

  rl.on('line', (line: string) => processLine(rl, line));
  rl.on('SIGINT', () => handleSIGINT(rl));

  lastKeypressTime = currentTimeMicros();
  process.stdin.on('keypress', (c: string, key: KeyType) => handleKeyPress(rl, c, key));
}
