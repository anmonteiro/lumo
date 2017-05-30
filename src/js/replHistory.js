/* @flow */
/* eslint-disable no-underscore-dangle */

import readline from 'readline';
import fs from 'fs';

type replHistory$Opts = {
  input: stream$Readable,
  output?: stream$Stream,
  // $FlowIssue: completer type definition is wrong
  completer?: (line: string, cb: (?Error, [string[], string]) => void) => void,
  terminal?: boolean,
  historySize?: number,
  path: string,
  removeHistoryDuplicates?: boolean,
};

const maxDiskSize = 0x1000000;

function onLoad(
  path: string,
  fd: number,
  maxLength: number,
  offset: number,
  cb: (ret: string[]) => void,
): void {
  const rs = fs.createReadStream(path, {
    encoding: 'utf-8',
    fd,
    start: Math.max(offset, 0),
    autoClose: false,
  });
  let tail = '';

  rs.on('data', (chunk: string) => {
    // $FlowIssue: slice can return a string
    tail += chunk;
  });

  rs.on('end', () => {
    tail = tail.slice(0, -1); // history file always ends in newline
    // $FlowIssue: slice can return a string
    tail = tail.split('\n');

    if (offset > 0 && tail.length < maxLength) {
      // eslint-disable-next-line no-mixed-operators
      onLoad(path, fd, maxLength, offset - 0x100 * maxLength, cb);
    } else {
      tail = tail.slice(-maxLength);
      tail.reverse();
      cb(tail);
    }
  });
}

function loadHistory(
  path: string,
  fd: number,
  maxLength: number,
  cb: (ret: string[]) => void,
): void {
  fs.stat(path, (err: ?Error, stat: fs.Stats) => {
    const totalSize = stat.size;
    if (totalSize > maxDiskSize) {
      const rename = function rename(): void {
        fs.rename(path, `${path}.old`, () => {
          // $FlowIssue: mode is optional
          fs.open(path, 'a+', (e: ?ErrnoError, ffd: number) => {
            loadHistory(path, ffd, maxLength, cb);
          });
        });
      };

      if (fd != null) {
        fs.close(fd, () => {
          const oldPath = `${path}.old`;
          fs.exists(oldPath, (exists: boolean) => {
            if (exists) {
              fs.unlink(oldPath, rename);
            } else {
              rename();
            }
          });
        });
      }
    } else {
      onLoad(path, fd, maxLength, totalSize, cb);
    }
  });
}

export default function createInterface(
  options: replHistory$Opts,
): readline$Interface {
  const { path, historySize, terminal } = options;

  const rl = readline.createInterface(options);

  if (terminal) {
    const stream = fs.createWriteStream(path, {
      flags: 'a+',
      defaultEncoding: 'utf8',
    });

    // $FlowIssue: private property
    const oldAddHistory = rl._addHistory;

    // $FlowIssue: private property
    rl._addHistory = function _addHistory(): string {
      // $FlowIssue: it's there
      const [last] = rl.history;
      const line = oldAddHistory.call(rl);

      if (line.length > 0 && line !== last) {
        stream.write(`${line}\n`, 'utf8');
      }
      return line;
    };

    if (path != null && historySize != null) {
      stream.on('open', (fd: number) => {
        loadHistory(path, fd, historySize, (history: string[]) => {
          // $FlowIssue: it's there
          rl.history.push(...history);
        });
      });
    }
  }

  return rl;
}
