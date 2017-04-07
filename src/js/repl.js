/* @flow */

import os from 'os';
import path from 'path';
import readline from 'readline';
// $FlowIssue: it's there
import repl from 'repl';
import tty from 'tty';
import ArrayStream from './array-stream';
import * as cljs from './cljs';
import * as lumo from './lumo';
import replHistory from './replHistory';
import { currentTimeMicros, isWhitespace, isWindows } from './util';
import { close as socketServerClose } from './socketRepl';

import type { CLIOptsType } from './cli';

type KeyType = {
  name: string,
  ctrl?: boolean,
  shift?: boolean,
  meta?: boolean,
};

export type REPLSession = {
  sessionId: number,
  rl: readline$Interface,
  isMain: boolean,
  input: string,
};

const exitCommands = new Set([':cljs/quit', 'exit']);
let sessionCount = 0;
let lastKeypressTime: number;
let isPasting: boolean;
const pendingHighlights = [];

const sessions: { [key: number]: REPLSession } = {};

export function prompt(
  rl: readline$Interface,
  isSecondary: boolean = false,
  p: string = cljs.getCurrentNamespace(),
): void {
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

export function deleteSession(session: REPLSession): void {
  delete sessions[session.sessionId];
}

function stopREPL(): void {
  socketServerClose();

  const keys = Object.keys(sessions);
  keys.forEach((sessionId: string) =>
    deleteSession(sessions[parseInt(sessionId, 10)]));

  process.exit(lumo.EXIT_VALUE);
}

export function processLine(replSession: REPLSession, line: string): void {
  const session = replSession;
  const { input, rl, isMain } = session;

  let extraForms = false;

  if (exitCommands.has(line.trim())) {
    // $FlowIssue - use of rl.output
    return isMain ? stopREPL() : rl.output.destroy();
  }

  if (isWhitespace(input)) {
    session.input = line;
  } else {
    session.input = `${input}\n${line}`;
  }

  for (;;) {
    const currentInput = session.input;
    extraForms = cljs.isReadable(currentInput);

    if (extraForms !== false) {
      session.input = currentInput.substring(
        0,
        currentInput.length - extraForms.length,
      );

      if (!isWhitespace(session.input)) {
        // $FlowIssue: rl.output is there
        cljs.setPrintFns(rl.output);
        cljs.execute(session.input);
        cljs.setPrintFns();
        // If *print-newline* is off, we need to emit a newline now, otherwise
        // the prompt and line editing will overwrite any printed output on the
        // current line.
        if (!cljs.isPrintingNewline()) {
          // $FlowIssue: rl.output is there
          rl.output.write('\n');
        }
      } else {
        prompt(rl);
        break;
      }

      session.input = extraForms;
    } else {
      // partially entered form, prepare for processing the next line.
      prompt(rl, true);

      if (!isPasting) {
        const spaceCount = cljs.indentSpaceCount(currentInput);
        if (spaceCount !== -1) {
          rl.write(' '.repeat(spaceCount));
        }
      }
      break;
    }
  }

  return undefined;
}

function handleSIGINT(replSession: REPLSession): void {
  const session = replSession;
  session.input = '';

  // $FlowIssue: missing property in interface
  session.rl.output.write('\n\n');

  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);

  session.rl.write(null, {
    ctrl: true,
    name: 'u',
  });

  prompt(session.rl);
}

function highlight(
  replSession: REPLSession,
  char: string,
  line: string,
  cursor: number,
): void {
  const session = replSession;
  const { rl, input } = session;
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
      readline.emitKeypressEvents(readStream, rl);

      readStream.once('keypress', (c: string, key: KeyType) => {
        const [tid] = pendingHighlights.shift();
        clearTimeout(tid);
        // $FlowIssue
        readline.moveCursor(rl.output, cursor - cursorX, linesUp);
        // $FlowIssue
        rl.input = oldInput;
        rl.resume();
        readStream.destroy();
        rl.write(c, key);
        // $FlowIssue
        highlight(session, c, rl.line, rl.cursor);
      });

      // $FlowIssue
      rl.input = readStream;

      const now = currentTimeMicros();
      const timeout = setTimeout(
        () => {
          const to = pendingHighlights[0];

          if (to != null && to[1] === now) {
            pendingHighlights.shift();
            // $FlowIssue: rl.output is there
            readline.moveCursor(rl.output, cursor - cursorX, linesUp);
            // $FlowIssue: rl.input is there
            rl.input = oldInput;
            rl.resume();
            readStream.destroy();
          }
        },
        500,
      );

      pendingHighlights.push([timeout, now]);
    }
  }
}

function handleKeyPress(session: REPLSession, c: string, key: KeyType): void {
  const rl = session.rl;

  const now = currentTimeMicros();
  isPasting = now - lastKeypressTime < 10000;
  lastKeypressTime = now;

  if (!isPasting) {
    // $FlowIssue: these properties exist
    highlight(session, c, rl.line, rl.cursor);
  }
}

export function createSession(
  rl: readline$Interface,
  isMain: boolean,
): REPLSession {
  const session: REPLSession = {
    sessionId: sessionCount,
    rl,
    input: '',
    isMain,
  };

  sessionCount += 1;

  sessions[session.sessionId] = session;

  return session;
}

function getJSCompletions(
  line: string,
  match: string,
  cb: (?Error, [string[], string]) => void,
): void {
  const flat = new ArrayStream();
  const nodeReplServer = new repl.REPLServer('', flat);
  const lineWithoutMatch = line.substring(0, line.length - match.length);

  return nodeReplServer.completer(match, (err: ?Error, [
    jsCompletions,
  ]: [string[], string]) => {
    const completions = jsCompletions.reduce(
      (cs: string[], c: string) => {
        if (c === '') {
          return cs;
        }

        cs.push(`${lineWithoutMatch}${c}`);
        return cs;
      },
      [],
    );
    return cb(err, [completions, line]);
  });
}

function completer(
  line: string,
  cb: (err: ?Error, [string[], string]) => void,
): void {
  const jsMatches = /js\/(\S*)$/g.exec(line);

  if (jsMatches != null) {
    return getJSCompletions(line, jsMatches[1], cb);
  }

  return cb(null, [cljs.getCompletions(line), line]);
}

export default function startREPL(opts: CLIOptsType): void {
  const dumbTerminal = isWindows ? true : opts['dumb-terminal'];

  const rl = replHistory({
    path: path.join(os.homedir(), '.lumo_history'),
    historySize: 200,
    input: process.stdin,
    output: process.stdout,
    terminal: !dumbTerminal,
    removeHistoryDuplicates: true,
    completer,
  });

  const session = createSession(rl, true);

  readline.emitKeypressEvents(process.stdin, rl);
  if (process.stdin.isTTY && !dumbTerminal) {
    // $FlowIssue
    process.stdin.setRawMode(true);
  }

  prompt(rl, false, 'cljs.user');

  rl.on('line', (line: string) => processLine(session, line));
  rl.on('SIGINT', () => handleSIGINT(session, rl));
  rl.on('close', () => stopREPL());

  lastKeypressTime = currentTimeMicros();
  process.stdin.on('keypress', (c: string, key: KeyType) =>
    handleKeyPress(session, c, key));
}
