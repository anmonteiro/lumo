/* @flow */

import net from 'net';
import readline from 'readline';
import { createBanner } from './cli';
import { prompt, processLine, unhookOutputStreams } from './repl';

let socketServer: ?net$Server = null;
const sockets: { [id: string]: net$Socket } = {};

function handleConnection(socket: net$Socket): readline$Interface {
  const socketId = `${socket.remoteAddress || ''}:${socket.remotePort}`;
  socket.on('close', () => delete sockets[socketId]);
  sockets[socketId] = socket;

  const rl = readline.createInterface({
    input: socket,
    output: socket,
  });

  rl.on('line', (line: string) => {
    if (!socket.destroyed) {
      processLine(rl, line, false);
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

  Object.keys(sockets)
    .forEach((socketId: string) => {
      try {
        sockets[socketId].destroy();
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
