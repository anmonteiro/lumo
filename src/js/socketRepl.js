import net from 'net';
import * as cljs from './cljs';
import { createBanner } from './cli';


let socketServer: ?net$Server = null;

export function getSocketServer(): ?net$Server {
  return socketServer;
}

function getPrompt(): string {
  return `${cljs.getCurrentNamespace()}=> `;
}

export function handleConnection(c: net$Socket): void {
  c.write(createBanner());
  c.write(getPrompt());

  c.on('data', (data: Buffer) => {
    const text = data.toString();

    // end connection when special `:cljs/quit` is sent
    if (text.trim() === ':cljs/quit') {
      c.end('Goodbye!');
      return;
    }

    cljs.execute(text, undefined, undefined, undefined, (value: string) => {
      c.write(`${value}\n\n`);
      c.write(getPrompt());
    });
  });
}

export function open(port: number = 5555, host: string = '127.0.0.1'): void {
  socketServer = net.createServer((c: net$Socket) => handleConnection);

  socketServer.listen(port, host);
}

export function close(): void {
  if (!socketServer) {
    return;
  }

  socketServer.close();
}
