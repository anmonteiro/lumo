/* @flow */

const fs = require('fs');

let nexeres;

if (!__DEV__) {
  // $FlowExpectedError: only exists in the Nexe bundle.
  nexeres = require('nexeres'); // eslint-disable-line
}

function load(path: string): string {
  let res;
  if (__DEV__) {
    res = fs.readFileSync(`./target/${path}`, 'utf8');
  } else {
    res = nexeres.get(path);
  }

  return res;
}

module.exports = {
  load,
};
