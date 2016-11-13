import net from 'net';
import * as cljs from './cljs'

const HOST = '127.0.0.1';
const PORT = 5555;

let socketServer = null;

export function start () {
  socketServer = net.createServer(c => {
    console.log('Client connected');

    c.on('drain', () => {
      console.log('Client drain');
    });

    c.on('error', () => {
      console.log('Client error');
    });

    c.on('data', d => {
      const text = d.toString('utf8')
      console.log(text)
      cljs.execute(text)
    });

    c.on('end', () => {
      console.log('Client disconnected');
    });
  });

  socketServer.listen(PORT, HOST, () => {
    console.log('Socket server bound to ${PORT}');
  });
}

export function end () {
  socketServer.close();
  socketServer = null;
}
