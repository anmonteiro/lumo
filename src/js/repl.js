/* @flow */

import * as cljs from './cljs';
import replHistory from './replHistory';
import { currentTimeMicros, isWhitespace, isWindows } from './util';

import { createBanner } from './cli';
import type { CLIOptsType } from './cli';

const os = require('os');
const path = require('path');
const readline = require('readline');
const tty = require('tty');
const net = require('net');

type KeyType = {
  name: string,
  ctrl?: boolean,
  shift?: boolean,
  meta?: boolean,
};

type StreamWriteHandler = (line: string) => void;

const exitCommands = new Set([':cljs/quit', 'exit']);
let sessionCount = 0;
let lastKeypressTime: number;
let isPasting: boolean;
const pendingHighlights = [];
const stdoutWrite = process.stdout.write;
const stderrWrite = process.stderr.write;
const resultBuffer: string[] = [];
const errorBuffer: string[] = [];
const writeToResultBuffer = (line: string) => { resultBuffer.push(line); };
const writeToErrorBuffer = (line: string) => { errorBuffer.push(line); };
let socketServer: ?net$Server = null;
const sockets: net$Socket[] = [];
const input: string[] = [];

type REPLSession = {
  sessionId: number,
  rl: readline$Interface,
  isMain: boolean,
};

const sessions: { [key: number]: REPLSession } = {};

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

function stopSocketServer(): void {
  if (!socketServer) {
    return;
  }

  sockets.forEach((socket: net$Socket) => {
    try {
      socket.destroy();
    } catch (e) {} // eslint-disable-line no-empty
  });

  socketServer.close();
}

function stopREPL(): void {
  stopSocketServer();
  unhookOutputStreams();
  process.exit();
}

function consumeBuffer(buffer: string[], stream: stream$Writable | tty$WriteStream): void {
  let len = buffer.length;

  while (len > 0) {
    const line = buffer.shift();
    stream.write(line);
    len -= 1;
  }
}

export function processLine(session: REPLSession, line: string): void {
  let extraForms = false;

  // TODO: move this elsewhere
  if (exitCommands.has(line)) {
    // $FlowIssue - use of rl.output
    return session.isMain ? stopREPL() : session.rl.output.destroy();
  }

  if (isWhitespace(input[session.sessionId])) {
    input[session.sessionId] = line;
  } else {
    input[session.sessionId] = `${input[session.sessionId]}\n${line}`;
  }

  for (;;) {
    extraForms = cljs.isReadable(input[session.sessionId]);

    if (extraForms !== false) {
      input[session.sessionId] = input[session.sessionId]
        .substring(0, input[session.sessionId].length - extraForms.length);

      if (!isWhitespace(input[session.sessionId])) {
        hookOutputStreams(writeToResultBuffer,
                          session.isMain ? writeToErrorBuffer : writeToResultBuffer);
        cljs.execute(input[session.sessionId]);
        unhookOutputStreams();

        // $FlowIssue - use of rl.output
        consumeBuffer(resultBuffer, session.rl.output);
        consumeBuffer(errorBuffer, process.stderr);
      } else {
        prompt(session.rl);
        break;
      }

      input[session.sessionId] = extraForms;
    } else {
      // partially entered form, prepare for processing the next line.
      prompt(session.rl, true);

      if (!isPasting) {
        const spaceCount = cljs.indentSpaceCount(input[session.sessionId]);
        if (spaceCount !== -1) {
          session.rl.write(' '.repeat(spaceCount));
        }
      }
      break;
    }
  }

  return undefined;
}

function handleSIGINT(session: REPLSession): void {
  input[session.sessionId] = '';

  // $FlowIssue: missing property in interface
  session.rl.output.write('\n');

  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);

  session.rl.write(null, {
    ctrl: true,
    name: 'u',
  });

  prompt(session.rl);
}

/* eslint-disable indent */
function highlight(session: REPLSession,
                   char: string,
                   line: string,
                   cursor: number): void {
  /* eslint-enable indent */
  const rl = session.rl;
  const pos = cursor - 1;

  if (char === ')' || char === ']' || char === '}') {
    const lines = input[session.sessionId] === '' ? [] : input[session.sessionId].split('\n');
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
        highlight(session, c, rl.line, rl.cursor);
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

function handleKeyPress(session: REPLSession, c: string, key: KeyType): void {
  const now = currentTimeMicros();
  isPasting = (now - lastKeypressTime) < 10000;
  lastKeypressTime = now;

  if (!isPasting) {
    // $FlowIssue: these properties exist
    highlight(session, c, session.rl.line, session.rl.cursor);
  }
}

export function createSession(rl: readline$Interface, isMain: boolean): REPLSession {
  sessionCount += 1;

  const session: REPLSession = {
    sessionId: sessionCount - 1,
    rl,
    isMain,
  };

  sessions[session.sessionId] = session;
  input[session.sessionId] = '';

  return session;
}

function handleConnection(socket: net$Socket): readline$Interface {
  const rl = readline.createInterface({
    input: socket,
    output: socket,
  });

  const session = createSession(rl, false);

  socket.on('close', () => delete sockets[session.sessionId]);
  sockets[session.sessionId] = socket;

  rl.on('line', (line: string) => {
    if (!socket.destroyed) {
      processLine(session, line, false);
    }
  });

  rl.on('close', () => socket.destroy());

  socket.write(createBanner());
  prompt(rl, false, 'cljs.user');
  return rl;
}

function startSocketServer(port: number, host?: string): void {
  socketServer = net.createServer((socket: net$Socket) => handleConnection(socket));
  socketServer.listen(port, host);
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

  const session = createSession(rl, true);

  // $FlowIssue
  readline.emitKeypressEvents(process.stdin, rl);
  if (process.stdin.isTTY && !dumbTerminal) {
    // $FlowIssue
    process.stdin.setRawMode(true);
  }

  prompt(rl, false, 'cljs.user');

  rl.on('line', (line: string) => processLine(session, line));
  rl.on('SIGINT', () => handleSIGINT(session));
  rl.on('close', () => stopREPL());

  lastKeypressTime = currentTimeMicros();
  process.stdin.on('keypress', (c: string, key: KeyType) => handleKeyPress(session, c, key));

  process.on('SIGTERM', () => stopREPL());
  process.on('SIGHUP', () => stopREPL());

  if (opts.repl && opts['socket-repl']) {
    const hostPortTokens = opts['socket-repl'].split(':');
    if (hostPortTokens.length === 1 && !isNaN(hostPortTokens[0])) {
      startSocketServer(parseInt(hostPortTokens[0], 10));
    } else if (hostPortTokens.length === 2 && !isNaN(hostPortTokens[1])) {
      startSocketServer(parseInt(hostPortTokens[1], 10), hostPortTokens[0]);
    }
  }
}
