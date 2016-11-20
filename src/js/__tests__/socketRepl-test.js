import net from 'net';

let socketRepl = require('../socketRepl');

const on = jest.fn((type: string, f: (x?: string) => void) => {
  switch (type) {
    case 'line': f('(+ 1 2'); return f(')');
    case 'SIGINT': return f();
    default: return undefined;
  }
});

jest.mock('../repl');
jest.mock('readline', () => ({
  createInterface: jest.fn((opts: {[key: string]: mixed}) => ({
    on,
    output: opts.output,
    write: jest.fn(),
  })),
}));

type SocketCallback = { (socket: net$Socket): void };

const serverHost = '0.0.0.0';
const serverPort = 12345;
const netCreateServer = net.createServer;
const netServerListen = net.Server.prototype.listen;
const netServerClose = net.Server.prototype.close;
const netSocketWrite = net.Socket.prototype.write;
const netSocketOn = net.Socket.prototype.on;

describe('open', () => {
  let socketServer;

  beforeEach(() => {
    net.createServer = jest.fn((callback: SocketCallback) => {
      socketServer = new net.Server();
      return socketServer;
    });
    net.Server.prototype.listen = jest.fn((port: number, host: ?string) => undefined);
    net.Server.prototype.close = jest.fn();
  });

  afterEach(() => {
    socketRepl.close();
    net.createServer = netCreateServer;
    net.Server.prototype.listen = netServerListen;
  });

  it('creates a server listening on a specified host and port', () => {
    socketRepl.open(serverPort, serverHost);

    expect(socketServer.listen).toHaveBeenCalledTimes(1);
    expect(socketServer.listen).toHaveBeenCalledWith(serverPort, serverHost);
  });
});

describe('close', () => {
  let socketServer;

  beforeEach(() => {
    jest.resetModules();
    socketRepl = require('../socketRepl'); // eslint-disable-line global-require
    net.createServer = jest.fn((callback: SocketCallback) => {
      socketServer = new net.Server();
      return socketServer;
    });
    net.Server.prototype.listen = jest.fn((port: number, host: ?string) => undefined);
    net.Server.prototype.close = jest.fn(() => {
      socketServer = null;
    });
  });

  afterEach(() => {
    socketRepl.close();
    socketServer = null;
    net.createServer = netCreateServer;
    net.Server.prototype.listen = netServerListen;
    net.Server.prototype.close = netServerClose;
  });

  it('doesn\'t close the server if already closed', () => {
    socketRepl.close();

    expect(socketServer).toBeUndefined();
    expect(net.Server.prototype.close).not.toHaveBeenCalled();
  });

  it('closes the server', () => {
    socketRepl.open(serverPort, serverHost);
    socketRepl.close();

    expect(net.Server.prototype.close).toHaveBeenCalledTimes(1);
  });
});

describe('handleConnection', () => {
  let handleConnection;
  let socket: ?net$Socket = null;

  beforeEach(() => {
    net.createServer = jest.fn((callback: SocketCallback) => {
      handleConnection = callback;
      return {
        listen: jest.fn(),
        close: jest.fn(),
      };
    });
    net.Socket.prototype.write = jest.fn((text: string) => undefined);
    net.Socket.prototype.on = jest.fn();
    socketRepl.open(serverPort, serverHost);
    socket = new net.Socket();
  });

  afterEach(() => {
    socket.end();
    net.Socket.prototype.write = netSocketWrite;
    net.Socket.prototype.on = netSocketOn;
  });

  it('prints welcome message and prompt', () => {
    handleConnection(socket);
    expect(socket.write).toHaveBeenCalled();
  });

  it('tears down every active socket connection on close', () => {
    handleConnection(socket);
    socket.destroy = jest.fn();
    socketRepl.close();
    expect(socket.destroy).toHaveBeenCalled();
  });
});
