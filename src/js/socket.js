import net from 'net';

const HOST = '127.0.0.1';
const PORT = 5555;

let socketServer = null;

export function start () {
  socketServer = net.createServer(c => {
    console.log('Client connected');
    console.log(c)

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
