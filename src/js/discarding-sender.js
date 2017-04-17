import Stream from 'stream';

export default class DiscardingSender extends Stream.Writable {
  // eslint-disable-next-line class-methods-use-this
  _write(
    chunk: Buffer | string,
    encoding: string,
    cb: (error: ?Error, data?: Buffer | string) => void,
  ): boolean {
    setImmediate(cb);
    return false;
  }
}
