/* @flow */

import net from 'net';
import readline from 'readline';
import { createBanner } from './cli';
import { createSession, prompt, processLine, unhookOutputStreams } from './repl';


let socketServer: ?net$Server = null;
const sockets: net$Socket[] = [];

export function getSocketServer(): ?net$Server {
  return socketServer;
}

export function handleConnection(socket: net$Socket): readline$Interface {
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

  // $FlowIssue - output missing from readline$Interface
  rl.output.write(createBanner());
  prompt(rl, false, 'cljs.user');
  return rl;
}

export function close(): void {
  unhookOutputStreams();

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

export function open(port: number, host?: string): void {
  socketServer = net.createServer((socket: net$Socket) => handleConnection(socket));
  socketServer.listen(port, host);

  process.on('SIGTERM', close);
  process.on('SIGHUP', close);
}
