import net from 'net';

let socketRepl = require('../socketRepl');

type SocketCallback = { (socket: net$Socket): void };

const serverHost = '0.0.0.0';
const serverPort = 12345;
const netCreateServer = net.createServer;
const netServerListen = net.Server.prototype.listen;
const netServerClose = net.Server.prototype.close;
const netSocketWrite = net.Socket.prototype.write;
const netSocketOn = net.Socket.prototype.on;

describe('open', () => {
  beforeEach(() => {
    net.createServer = jest.fn((callback: SocketCallback) => new net.Server());
    net.Server.prototype.listen = jest.fn((port: number, host: ?string) => undefined);
    socketRepl.open(serverPort, serverHost);
  });

  afterEach(() => {
    socketRepl.close();
    net.createServer = netCreateServer;
    net.Server.prototype.listen = netServerListen;
  });

  it('creates a server listening on a specified host and port', () => {
    const socketServer = socketRepl.getSocketServer();
    expect(socketServer.listen).toHaveBeenCalledTimes(1);
    expect(socketServer.listen.mock.calls[0][0]).toBe(serverPort);
    expect(socketServer.listen.mock.calls[0][1]).toBe(serverHost);
  });
});

describe('close', () => {
  beforeEach(() => {
    jest.resetModules();
    socketRepl = require('../socketRepl'); // eslint-disable-line global-require
    net.createServer = jest.fn((callback: SocketCallback) => new net.Server());
    net.Server.prototype.listen = jest.fn((port: number, host: ?string) => undefined);
    net.Server.prototype.close = jest.fn(() => netServerClose.bind(this));
  });

  afterEach(() => {
    socketRepl.close();
    net.createServer = netCreateServer;
    net.Server.prototype.listen = netServerListen;
    net.Server.prototype.close = netServerClose;
  });

  it('doesn\'t close the server if already closed', () => {
    socketRepl.close();
    const socketServer = socketRepl.getSocketServer();
    expect(socketServer).toBeNull();
  });


  it('closes the server', () => {
    socketRepl.open(serverPort, serverHost);
    socketRepl.close();
    const socketServer = socketRepl.getSocketServer();
    expect(socketServer.close).toHaveBeenCalledTimes(1);
  });
});

describe('handleConnection', () => {
  let socket: ?net$Socket = null;

  beforeEach(() => {
    net.Socket.prototype.write = jest.fn((text: string) => undefined);
    net.Socket.prototype.on = jest.fn();
    socket = new net.Socket();
  });

  afterEach(() => {
    socket.end();
    net.Socket.prototype.write = netSocketWrite;
    net.Socket.prototype.on = netSocketOn;
  });

  it('prints welcome message and prompt', () => {
    socketRepl.handleConnection(socket);
    expect(socket.write).toHaveBeenCalled();
  });
});
