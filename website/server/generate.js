/* eslint-disable no-console */
const request = require('request');
const glob = require('glob');
const fs = require('fs.extra');
const mkdirp = require('mkdirp');
const server = require('./server.js');

// Sadly, our setup fatals when doing multiple concurrent requests
// I don't have the time to dig into why, it's easier to just serialize
// requests.
const queue = (() => {
  let isExecuting = false;
  const q = [];

  function execute() {
    if (isExecuting) {
      return;
    }
    if (q.length === 0) {
      return;
    }
    const fn = q.shift();
    isExecuting = true;
    fn(() => {
      isExecuting = false;
      execute();
    });
  }

  function push(fn) {
    q.push(fn);
    execute();
  }

  return { push };
})();

glob('src/**/*.*', (er, files) => {
  files.push('src/css/main.css');

  files.forEach(file => {
    console.log('file', file);
    let targetFile = file.replace(/^src/, 'build');
    if (file.match(/\.js$/) || file.match(/\.css$/)) {
      targetFile = targetFile.replace(/\.js$/, '.html');
      queue.push(cb => {
        request(
          `http://localhost:8079/${targetFile.replace(/^build\//, '')}`,
          (error, response, body) => {
            mkdirp.sync(targetFile.replace(new RegExp('/[^/]*$'), ''));
            fs.writeFileSync(targetFile, body);
            cb();
          },
        );
      });
    } else {
      queue.push(cb => {
        mkdirp.sync(targetFile.replace(new RegExp('/[^/]*$'), ''));
        fs.copy(file, targetFile, cb);
      });
    }
  });

  queue.push(cb => {
    console.log('Generated website');
    server.close();
    cb();
  });
});
