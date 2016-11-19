/* @flow */

import * as cljs from './cljs';
import replHistory from './replHistory';
import { currentTimeMicros, isWhitespace, isWindows } from './util';
import { close as socketServerClose } from './socketRepl';

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

type StreamWriteHandler = (line: string) => void;

const exitCommands = new Set([':cljs/quit', 'exit']);
const input: string[] = [''];
let lastKeypressTime: number;
let isPasting: boolean;
const pendingHighlights = [];
const stdoutWrite = process.stdout.write;
const stderrWrite = process.stderr.write;

const resultBuffer: string[] = [];
const errorBuffer: string[] = [];
const writeToResultBuffer = (line: string) => { resultBuffer.push(line); };
const writeToErrorBuffer = (line: string) => { errorBuffer.push(line); };

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

function hookOutputStreams(writeOutput: StreamWriteHandler, writeError: StreamWriteHandler): void {
  // $FlowIssue - assignment of process.stdout.write
  process.stdout.write = writeOutput;
  // $FlowIssue - assignment of process.stderr.write
  process.stderr.write = writeError;
}

export function unhookOutputStreams(): void {
  // $FlowIssue - assignment of process.stdout.write
  process.stdout.write = stdoutWrite;
  // $FlowIssue - assignment of process.stderr.write
  process.stderr.write = stderrWrite;
}

function consumeBuffer(buffer: string[], stream: stream$Writable | tty$WriteStream): void {
  let len = buffer.length;

  while (len > 0) {
    const line = buffer.shift();
    stream.write(line);
    len -= 1;
  }
}

export function processLine(sessionId: number, rl: readline$Interface, line: string): void {
  const isMainRepl = sessionId === 0;
  let extraForms = false;

  if (!input[sessionId]) {
    input[sessionId] = '';
  }

  if (exitCommands.has(line)) {
    // $FlowIssue - use of rl.output
    return isMainRepl ? process.exit() : rl.output.destroy();
  }

  if (isWhitespace(input[sessionId])) {
    input[sessionId] = line;
  } else {
    input[sessionId] = `${input[sessionId]}\n${line}`;
  }

  for (;;) {
    extraForms = cljs.isReadable(input[sessionId]);

    if (extraForms !== false) {
      input[sessionId] = input[sessionId].substring(0, input[sessionId].length - extraForms.length);

      if (!isWhitespace(input[sessionId])) {
        hookOutputStreams(writeToResultBuffer,
                          isMainRepl ? writeToErrorBuffer : writeToResultBuffer);
        cljs.execute(input[sessionId]);
        unhookOutputStreams();

        // $FlowIssue - use of rl.output
        consumeBuffer(resultBuffer, rl.output);
        consumeBuffer(errorBuffer, process.stderr);
      } else {
        prompt(rl);
        break;
      }

      input[sessionId] = extraForms;
    } else {
      // partially entered form, prepare for processing the next line.
      prompt(rl, true);

      if (!isPasting) {
        const spaceCount = cljs.indentSpaceCount(input[sessionId]);
        if (spaceCount !== -1) {
          rl.write(' '.repeat(spaceCount));
        }
      }
      break;
    }
  }

  return undefined;
}

function handleSIGINT(sessionId: number, rl: readline$Interface): void {
  input[sessionId] = '';

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
function highlight(sessionId: number,
                   rlInt: readline$Interface,
                   char: string,
                   line: string,
                   cursor: number): void {
  /* eslint-enable indent */
  const rl = rlInt;
  const pos = cursor - 1;

  if (char === ')' || char === ']' || char === '}') {
    const lines = input[sessionId] === '' ? [] : input[sessionId].split('\n');
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
        highlight(sessionId, rl, c, rl.line, rl.cursor);
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

function handleKeyPress(sessionId: number, rl: readline$Interface, c: string, key: KeyType): void {
  const now = currentTimeMicros();
  isPasting = (now - lastKeypressTime) < 10000;
  lastKeypressTime = now;

  if (!isPasting) {
    // $FlowIssue: these properties exist
    highlight(sessionId, rl, c, rl.line, rl.cursor);
  }
}

export default function startREPL(opts: CLIOptsType): void {
  const dumbTerminal = isWindows ? true : opts['dumb-terminal'];
  const sessionId = 0;

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

  prompt(rl, false, 'cljs.user');

  rl.on('line', (line: string) => processLine(sessionId, rl, line));
  rl.on('SIGINT', () => handleSIGINT(sessionId, rl));
  rl.on('close', () => socketServerClose());

  lastKeypressTime = currentTimeMicros();
  process.stdin.on('keypress', (c: string, key: KeyType) => handleKeyPress(sessionId, rl, c, key));
}
