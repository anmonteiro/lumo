/* @flow */

import os from 'os';
import path from 'path';
import readline from 'readline';
import tty from 'tty';
import * as cljs from './cljs';
import replHistory from './replHistory';
import { currentTimeMicros, isWhitespace, indentationSpaces } from './util';
import { close as socketServerClose } from './socketRepl';

import type { CLIOptsType } from './cli';

type KeyType = {
  name: string,
  ctrl?: boolean,
  shift?: boolean,
  meta?: boolean,
  code?: string,
};

export type REPLSession = {
  id: number,
  rl: readline$Interface,
  isMain: boolean,
  isReverseSearch: boolean,
  reverseSearchBuffer: string,
  input: string,
  searchPos: number,
  previousPrompt: string,
  previousLine: string,
  previousCursor: number,
  isPasting: boolean,
  lastKeypressTime: number,
};

const exitCommands = new Set([':cljs/quit', 'exit']);
let sessionCount = 0;
const pendingHighlights = [];

const sessions: { [key: number]: REPLSession } = {};

export function prompt(
  { id, rl }: REPLSession,
  isSecondary: boolean = false,
  p: string = cljs.getCurrentNamespace(id),
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

// eslint-disable-next-line import/no-mutable-exports
export let currentREPLInterface: ?readline$Interface;

export function deleteSession(session: REPLSession): void {
  cljs.clearREPLSessionState(session.id);
  delete sessions[session.id];
}

function stopREPL(): void {
  socketServerClose();

  const keys = Object.keys(sessions);
  keys.forEach((id: string) => deleteSession(sessions[parseInt(id, 10)]));

  process.exit();
}

function inferPastingBehavior(replSession: REPLSession): void {
  const session = replSession;
  const now = currentTimeMicros();
  session.isPasting = now - session.lastKeypressTime < 10000;
  session.lastKeypressTime = now;
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
        cljs.setPrintFns(rl.output);
        currentREPLInterface = rl;

        cljs.execute(session.input, 'text', true, true, session.id);

        currentREPLInterface = null;
        cljs.setPrintFns();
        // If *print-newline* is off, we need to emit a newline now, otherwise
        // the prompt and line editing will overwrite any printed output on the
        // current line.
        if (!cljs.isPrintingNewline()) {
          rl.output.write('\n');
        }
      } else {
        prompt(session);
        break;
      }

      session.input = extraForms;
    } else {
      // partially entered form, prepare for processing the next line.
      prompt(session, true);

      if (!session.isPasting) {
        const indentation = indentationSpaces(currentInput);

        if (indentation != null) {
          // write explicitly to the output stream when socket or non-TTY
          if (isMain && rl.terminal) {
            rl.write(indentation);
          } else {
            rl.output.write(indentation);
          }
        }
      }
      break;
    }
  }
  return undefined;
}

function stopReverseSearch(
  replSession: REPLSession,
  clear: boolean = true,
): void {
  const session = replSession;
  session.isReverseSearch = false;
  session.reverseSearchBuffer = '';

  if (clear) {
    session.rl.write(null, {
      ctrl: true,
      name: 'u',
    });
  }
}

function handleSIGINT(replSession: REPLSession): void {
  const session = replSession;
  const lineLength = session.rl.line.length + session.rl._prompt.length;
  // $FlowIssue: columns exists in stream$Writable
  const numberOfLines = Math.floor(lineLength / session.rl.output.columns);

  session.rl.output.write('\n'.repeat(numberOfLines + 2));
  session.input = '';

  prompt(session);
  stopReverseSearch(replSession);
}

function highlight(
  replSession: REPLSession,
  char: string,
  line: string,
  cursor: number,
): void {
  const session = replSession;
  const { rl, input } = session;

  if (char === ')' || char === ']' || char === '}') {
    // $FlowIssue: columns exists in stream$Writable
    const terminalColumns = rl.output.columns;
    const promptLength = rl._prompt.length;
    const cursorAbsolutePos = cursor + promptLength;
    const lines = input === '' ? [] : input.split('\n');
    lines.push(line);
    const [cursorX, linesUp] = cljs.getHighlightCoordinates(lines, cursor - 1);

    let dx = cursor - cursorX;
    let dy = linesUp;

    if (
      cursorAbsolutePos > terminalColumns &&
      dx > cursorAbsolutePos % terminalColumns
    ) {
      dx = (dx - terminalColumns) % terminalColumns;
      dy += Math.floor(cursorAbsolutePos / terminalColumns);
    }

    if (linesUp !== -1) {
      readline.moveCursor(rl.output, -dx, -dy);
      rl.pause();

      // set the readline input stream to a new one so that we can listen for
      // keypress events while stdin is paused.
      const oldInput = rl.input;
      // $FlowIssue: constructor accepts 2 args
      const readStream = new tty.ReadStream(0, {});
      readStream.setRawMode(true);
      readline.emitKeypressEvents(readStream, rl);

      readStream.once('keypress', (c: string, key: KeyType) => {
        const [tid] = pendingHighlights.shift();
        clearTimeout(tid);
        readline.moveCursor(rl.output, dx, dy);
        rl.input = oldInput;
        rl.resume();
        readStream.destroy();
        rl.write(c, key);
        highlight(session, c, rl.line, rl.cursor);
      });

      rl.input = readStream;

      const now = currentTimeMicros();
      const timeout = setTimeout(() => {
        const to = pendingHighlights[0];

        if (to != null && to[1] === now) {
          pendingHighlights.shift();
          readline.moveCursor(rl.output, dx, dy);
          rl.input = oldInput;
          rl.resume();
          readStream.destroy();
        }
      }, 500);

      pendingHighlights.push([timeout, now]);
    }
  }
}

function handleKeyPress(
  replSession: REPLSession,
  c: string,
  { name, ctrl, meta, code, ...key }: KeyType,
): void {
  const session = replSession;
  const rl = session.rl;
  const isReverseSearch = session.isReverseSearch;
  const isReverseSearchKey = ctrl && name === 'r';

  // TODO: factor this out into own function
  if (isReverseSearch || isReverseSearchKey) {
    let failedSearch = false;
    if (isReverseSearchKey && !isReverseSearch) {
      session.isReverseSearch = true;
      session.searchPos = 0;
      session.previousPrompt = rl._prompt;
      session.previousLine = rl.line;
      session.previousCursor = rl.cursor;
    } else if (isReverseSearch) {
      const isNewline = name === 'return' || name === 'enter';
      if ((ctrl && !isReverseSearchKey) || code != null || isNewline) {
        const isCancelSearch = name === 'g';

        stopReverseSearch(session, isCancelSearch);

        if (isCancelSearch) {
          rl.line = session.previousLine;
          rl.cursor = session.previousCursor;
        }

        if (!isNewline) {
          rl.setPrompt(session.previousPrompt);
          rl.prompt(true);
        }

        return;
      } else if ((!ctrl && !meta) || isReverseSearchKey) {
        // not a special character
        if (
          name != null &&
          name !== 'space' &&
          name !== 'backspace' &&
          name.length > 1
        ) {
          return;
        }

        if (!isReverseSearchKey) {
          session.searchPos = 0;
          if (name === 'backspace') {
            const buf = session.reverseSearchBuffer;
            session.reverseSearchBuffer = buf.substring(0, buf.length - 1);
          } else {
            session.reverseSearchBuffer += c;
          }
        }

        const buf = session.reverseSearchBuffer;
        if (buf !== '') {
          let match;
          for (let i = session.searchPos; i < rl.history.length; i += 1) {
            const entry = rl.history[i];
            const idxOf = entry.indexOf(buf);
            if (entry !== rl.line && idxOf !== -1) {
              match = [i, entry, idxOf];
              break;
            }
          }
          if (match != null) {
            const [i, entry, idxOf] = match;
            session.searchPos = i + 1;
            rl.line = entry;
            rl.cursor = idxOf;
            // no more results
          } else {
            if (!isReverseSearchKey) {
              let prevLine = rl.line.split('');
              prevLine.splice(rl.cursor - 1, 1);
              prevLine = prevLine.join('');
              rl.line = prevLine;
              rl.cursor -= 1;
            }
            failedSearch = true;
          }
          rl._refreshLine();
        } else {
          session.rl.write(null, {
            ctrl: true,
            name: 'u',
          });
        }
      }
    }
    rl.setPrompt(
      `(${failedSearch
        ? 'failed '
        : ''}reverse-i-search)\`${session.reverseSearchBuffer}': `,
    );
    rl.prompt(true);
  } else {
    inferPastingBehavior(session);

    if (!session.isPasting) {
      highlight(session, c, rl.line, rl.cursor);
    }
  }
}

export function createSession(
  rl: readline$Interface,
  isMain: boolean,
): REPLSession {
  const session: REPLSession = {
    id: sessionCount,
    rl,
    input: '',
    isMain,
    reverseSearchBuffer: '',
    isReverseSearch: false,
    searchPos: 0,
    previousPrompt: rl._prompt,
    previousLine: rl.line,
    previousCursor: rl.cursor,
    lastKeypressTime: currentTimeMicros(),
    isPasting: false,
  };

  sessionCount += 1;

  sessions[session.id] = session;

  return session;
}

function completer(
  line: string,
  cb: (err: ?Error, [string[], string]) => void,
): void {
  return cljs.getCompletions(line, (completions: string[]) => {
    cb(null, [completions, line]);
  });
}

export default function startREPL(opts: CLIOptsType): void {
  const dumbTerminal = opts['dumb-terminal'];

  const rl = replHistory({
    path: path.join(os.homedir(), '.lumo_history'),
    historySize: 200,
    input: process.stdin,
    output: process.stdout,
    terminal: !dumbTerminal,
    completer,
  });

  const session = createSession(rl, true);

  readline.emitKeypressEvents(process.stdin, rl);
  if (process.stdin.isTTY && !dumbTerminal) {
    // $FlowIssue
    process.stdin.setRawMode(true);
  }

  prompt(session, false, 'cljs.user');

  rl.on('line', (line: string) => processLine(session, line));
  rl.on('SIGINT', () => handleSIGINT(session));
  rl.on('close', () => stopREPL());
  rl.on('SIGCONT', () => rl.prompt());

  process.stdin.on('keypress', (c: string, key: KeyType) =>
    handleKeyPress(session, c, key),
  );
}
