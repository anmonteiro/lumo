const net = require('net');

jest.mock('net');

class MockServer {
  host: ?string;
  port: ?number;
  listening: boolean;
  closed: boolean;

  constructor(): void {
    this.host = null;
    this.port = null;
    this.listening = false;
    this.closed = false;
  }

  listen(port: number, host?: ?string): void {
    this.port = port;
    this.host = host;
    this.listening = true;
  }

  close(): void {
    this.closed = true;
  }
}

net.Server = MockServer;

function createMockServer(): net$Server {
  return new net.Server();
}

net.createServer = createMockServer;

type BufferCallback = { (data: Buffer): void };

class MockSocket {
  written: number;
  valuesWritten: string[];
  ended: boolean;
  onDataHandled: boolean;

  constructor(): void {
    this.written = 0;
    this.ended = false;
    this.valuesWritten = [];
    this.onDataHandled = false;
  }

  write(value: string): void {
    this.written += 1;
    this.valuesWritten.push(value);
  }

  on(type: string, callback: BufferCallback): void {
    if (type === 'data') {
      this.onDataHandled = true;
    }
  }
}

net.Socket = MockSocket;

jest.mock('../version', () => 'X.X.X');
jest.mock('../cljs', () => ({
  getCurrentNamespace: jest.fn(() => 'cljs.user'),
}));

const socketRepl = require('../socketRepl');

describe('open', () => {
  it('creates a new server and listens on a specified host and port', () => {
    const host = '0.0.0.0';
    const port = 1234;
    socketRepl.open(port, host);
    const socketServer = socketRepl.getSocketServer();
    expect(socketServer.host).toBe(host);
    expect(socketServer.port).toBe(port);
    expect(socketServer.listening).toBe(true);
  });
});

describe('close', () => {
  it('prevents further connections', () => {
    socketRepl.close();
    const socketServer = socketRepl.getSocketServer();
    expect(socketServer.closed).toBe(true);
  });
});

describe('handleConnection', () => {
  it('gives each connection a welcome message and data handler', () => {
    const mockSocket = new net.Socket();
    expect(mockSocket.written).toBe(0);
    expect(mockSocket.onDataHandled).toBe(false);
    socketRepl.handleConnection(mockSocket);
    expect(mockSocket.written).toBe(2);
    expect(mockSocket.onDataHandled).toBe(true);
  });
});
