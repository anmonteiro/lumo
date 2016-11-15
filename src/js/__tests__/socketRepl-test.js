import net from 'net';
import * as socketRepl from '../socketRepl';

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
    expect(socketServer.listen.mock.calls.length).toBe(1);
    expect(socketServer.listen.mock.calls[0][0]).toBe(serverPort);
    expect(socketServer.listen.mock.calls[0][1]).toBe(serverHost);
  });
});


describe('close', () => {
  beforeEach(() => {
    net.createServer = jest.fn((callback: SocketCallback) => new net.Server());
    net.Server.prototype.listen = jest.fn((port: number, host: ?string) => undefined);
    net.Server.prototype.close = jest.fn(() => netServerClose.bind(this));
    socketRepl.open(serverPort, serverHost);
  });

  afterEach(() => {
    socketRepl.close();
    net.createServer = netCreateServer;
    net.Server.prototype.listen = netServerListen;
    net.Server.prototype.close = netServerClose;
  });

  it('closes the server', () => {
    socketRepl.close();
    const socketServer = socketRepl.getSocketServer();
    expect(socketServer.close.mock.calls.length).toBe(1);
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
    expect(socket.write).toHaveBeenCalledTimes(2);
  });
});
