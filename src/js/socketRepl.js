/* @flow */

import net from 'net';
import readline from 'readline';
import { createBanner } from './cli';
import { createSession, deleteSession, prompt, processLine, unhookOutputStreams } from './repl';

import type { REPLSession } from './repl';

let socketServer: ?net$Server = null;
const sockets: net$Socket[] = [];

let sessionCount = 0;

// XXX Whichever function is set to handle the socket should cleanup on the socket's `close` event
function openRepl(socket: net$Socket): REPLSession {
  const rl = readline.createInterface({
    input: socket,
    output: socket,
  });

  const session = createSession(rl, false);

  socket.on('close', () => {
    deleteSession(session);
  });

  rl.on('line', (line: string) => {
    if (!socket.destroyed) {
      processLine(session, line, false);
    }
  });

  rl.on('close', () => socket.destroy());

  // $FlowIssue - output missing from readline$Interface
  rl.output.write(createBanner());
  prompt(rl, false, 'cljs.user');

  return session;
}

// This takes in a socket, and handles the socket life cycle
function handleConnection(socket: net$Socket, accept: Function): void {
  accept(socket);

  // ??? Do we actually care what session id the repl returns?
  // AAA Let's go with no.
  socket.on('close', () => {
    delete sockets[sessionCount];
  });

  sockets[sessionCount] = socket;

  sessionCount += 1;
}

export function close(): void {
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

export function open(port: number, host?: string = 'localhost', accept?: Function = openRepl): void {
  socketServer = net.createServer((socket: net$Socket) => handleConnection(socket, accept));
  socketServer.listen(port, host);

  process.on('SIGTERM', close);
  process.on('SIGHUP', close);
}
