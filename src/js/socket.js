import net from 'net';
import * as cljs from './cljs';
import { createBanner } from './cli';

const HOST = '127.0.0.1';
const PORT = 5555;

let socketServer = null;

function getPrompt () {
  return `${cljs.getCurrentNamespace()}=> `;
}

export function start (quiet = false) {
  socketServer = net.createServer(c => {
    c.write(createBanner());
    c.write(getPrompt());

    c.on('data', data => {
      const text = data.toString();

      // end connection when special `:cljs/quit` is sent
      if (text.trim() === ':cljs/quit') {
        c.end('Goodbye!');
        return;
      }

      cljs.execute(text, undefined, undefined, undefined, value => {
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
   !quiet && console.log(`TCP socket REPL listening at ${HOST}:${PORT}`);
  socketServer.listen(PORT, HOST);
}

export function end () {
  socketServer.close();
  socketServer = null;
}
