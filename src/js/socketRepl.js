/* @flow */

import net from 'net';
import readline from 'readline';
import { createBanner } from './cli';
import { prompt, processLine } from './repl';


let socketServer: ?net$Server = null;

export function getSocketServer(): ?net$Server {
  return socketServer;
}

export function handleConnection(socket: net$Socket): readline$Interface {
  socket.write(createBanner());

  const rl = readline.createInterface({ input: socket, output: socket, terminal: true });
  prompt(rl, false, 'cljs.user');
  rl.on('line', (line: string) => processLine(rl, line, (value: string) => socket.write(`${value}\n`)));
  rl.on('SIGINT', () => socket.end('Goodbye!'));
  return rl;
}

export function open(port: number, host?: string): void {
  socketServer = net.createServer((socket: net$Socket) => handleConnection(socket));
  socketServer.listen(port, host);
}

export function close(): void {
  if (!socketServer) {
    return;
  }

  socketServer.close();
}
