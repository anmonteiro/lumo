import net from 'net';
import * as cljs from './cljs';
import { createBanner } from './cli';

const HOST = '127.0.0.1';
const PORT = 5555;

let socketServer: net$Server = null;

function getPrompt(): string {
  return `${cljs.getCurrentNamespace()}=> `;
}

export function start(quiet: boolean = false): void {
  socketServer = net.createServer((c: net$Socket) => {
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

    // c.on('end', () => { /* console.log('Client disconnected'); */ });
    // c.on('drain', () => { /* console.log('Client drain'); */ });
    // c.on('error', () => { /* console.log('Client error'); */ });
  });

  // logging here so that REPL output isn't disturbed, though probably
  // should just be output in `cli.js` instead with the rest, based on
  // flag value
  if (!quiet) {
    // eslint-disable-next-line no-console
    //console.log(`TCP socket REPL listening at ${HOST}:${PORT}`);
  }

  socketServer.listen(PORT, HOST);
}

export function end(): void {
  socketServer.close();
  socketServer = null;
}
