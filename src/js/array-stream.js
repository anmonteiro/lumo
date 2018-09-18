import Stream from 'stream';

// A stream to push an array into a REPL
// used in REPLServer.complete
export default class ArrayStream extends Stream {
  constructor(): void {
    super();

    this.run = function run(data: string | Buffer): void {
      const self = this;
      data.forEach((line: string) => {
        self.emit('data', `${line}\n`);
      });
    };
  }

  readable = true;

  writable = true;

  /* eslint-disable class-methods-use-this */
  resume(): void {}

  write(): void {}
  /* eslint-enable class-methods-use-this */
}
