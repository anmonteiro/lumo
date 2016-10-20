/* @flow */
/* eslint-disable no-underscore-dangle */

const readline = require('readline');
const fs = require('fs');

type replHistory$Opts = {
  input: stream$Readable,
  output?: stream$Stream,
  completer?: (completions: Array<string>, matchedString: string) => void,
  terminal?: boolean,
  historySize?: number,
  path: string,
};

const maxDiskSize = 0x1000000;
let histStream;

function getHistoryStream(path: string): stream$Writable {
  if (histStream == null) {
    histStream = fs.createWriteStream(path, {
      flags: 'a+',
      defaultEncoding: 'utf8',
    });
  }

  return histStream;
}

function onLoad(path: string, maxLength: number, offset: number, cb: Function) {
  // $FlowIssue: it's there
  const { fd } = getHistoryStream(path);
  const rs = fs.createReadStream(path, {
    encoding: 'utf-8',
    fd,
    start: offset,
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
      onLoad(path, maxLength, offset - (0x100 * maxLength), cb);
    } else {
      tail = tail.slice(-maxLength);
      tail.reverse();
      cb(tail);
    }
  });
}

function loadHistory(path: string, maxLength: number, cb: Function) {
  fs.stat(path, (err: ?Error, stat: fs.Stats) => {
    const totalSize = stat.size;
    if (totalSize > maxDiskSize) {
      const rename = function rename() {
        fs.rename(path, `${path}.old`, () => {
          // $FlowIssue: mode is optional
          fs.open(path, 'a+', (e: ?ErrnoError, fd: number) => {
            loadHistory(path, maxLength, cb);
          });
        });
      };

      // $FlowIssue: it's there
      const { fd } = getHistoryStream(path);

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
      onLoad(path, maxLength, totalSize, cb);
    }
  });
}

export default function createInterface(options: replHistory$Opts) {
  const { path, historySize, terminal } = options;
  const rl = readline.createInterface(options);
  const stream = getHistoryStream(path);

  if (terminal) {
    // $FlowIssue: private property
    const oldAddHistory = rl._addHistory;

    // $FlowIssue: private property
    rl._addHistory = function _addHistory() {
      // $FlowIssue: it's there
      const [last] = rl.history;
      const line = oldAddHistory.call(rl);

      if (line.length > 0 && line !== last) {
        stream.write(`${line}\n`, 'utf8');
      }
      return line;
    };

    if (historySize) {
      loadHistory(path, historySize, (history: string[]) => {
        // $FlowIssue: it's there
        rl.history.push(...history);
      });
    }
  }

  return rl;
}
