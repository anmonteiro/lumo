/* @flow */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

let nexeres;
let sourcePaths = [''];

if (!__DEV__) {
  // $FlowExpectedError: only exists in the Nexe bundle.
  nexeres = require('nexeres'); // eslint-disable-line
}

function load(filename: string): ?string {
  try {
    if (__DEV__) {
      return fs.readFileSync(`./target/${filename}`, 'utf8');
    }
    const gzipped = nexeres.get(filename);

    return zlib.inflateSync(gzipped).toString();
  } catch (_) {
    return null;
  }
}

function readSource(filename: string): ?string {
  for (const srcPath of sourcePaths) {
    try {
      return fs.readFileSync(path.join(srcPath, filename), 'utf8');
    } catch (_) {} // eslint-disable-line no-empty
  }
  return null;
}

function readCache(filename: string): ?string {
  try {
    return fs.readFileSync(filename, 'utf8');
  } catch (_) {
    return null;
  }
}

function setSourcePaths(srcPaths: string[]): void {
  sourcePaths = srcPaths;
}

module.exports = {
  load,
  readSource,
  readCache,
  setSourcePaths,
};
