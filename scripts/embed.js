const path = require('path');
const fs = require('fs');

function accessor(key) {
  var resource = lumo.internal.embedded.resources[key];
  if (resource != null) {
    return new Buffer(resource, 'base64');
  }
}

function encode(filePath) {
  return fs.readFileSync(filePath).toString('base64');
}

function embed(resourceFiles = [], resourceRoot = '') {
  if (!Array.isArray(resourceFiles)) {
    throw new Error('Bad Argument: resourceFiles is not an array');
  }

  let buffer = 'lumo.internal={embedded: {}};lumo.internal.embedded.resources={\n';
  for (let i = 0; i < resourceFiles.length; i++) {
    buffer += JSON.stringify(path.relative(resourceRoot, resourceFiles[i])) +
      ':"';
    buffer += encode(resourceFiles[i]) + '",\n';
  }

  buffer += '\n};\n\nlumo.internal.embedded.keys=function(){return Object.keys(lumo.internal.embedded.resources);}';
  buffer += '\n\nlumo.internal.embedded.get=';
  buffer += accessor.toString();
  fs.appendFileSync('target/main.js', buffer);
}

module.exports = embed;
