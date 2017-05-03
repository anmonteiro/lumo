#!/usr/bin/env node
'use strict';
var spawn = require('child_process').spawn;
var path = require('path');

var input = process.argv.slice(2);
var bin = process.platform === 'darwin' ||
  (process.platform === 'linux' && process.arch === 'x64')
  ? path.join(__dirname, 'lumo')
  : process.platform === 'win32' && process.arch === 'x64'
      ? path.join(__dirname, 'lumo.exe')
      : null;

if (bin !== null) {
  spawn(bin, input, { stdio: 'inherit' }).on('exit', process.exit);
} else {
  throw new Error('Platform not supported.');
}
