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

function embed(resourceFiles = [], resourceRoot = '', pkgSourcePaths = []) {
  if (!Array.isArray(resourceFiles)) {
    throw new Error('Bad Argument: resourceFiles is not an array');
  }

  let buffer =
    '\nlumo.internal={embedded: {}};lumo.internal.embedded.resources={\n';
  for (let i = 0; i < resourceFiles.length; i++) {
    var relativePath = path.relative(resourceRoot, resourceFiles[i]);

    if (pkgSourcePaths.length !== 0) {
      if (pkgSourcePaths.some(cp => relativePath.startsWith(cp))) {
      	relativePath = relativePath.replace(cp,'').replace(/^\//, '');
      }
      if (relativePath.startsWith('aot')){
	relativePath = relativePath.replace('aot/', '').replace(/_SLASH_/g, '/');
      }
    }

    buffer += JSON.stringify(relativePath) + ':"';
    buffer += encode(resourceFiles[i]) + '",\n';
  }

  buffer +=
    '\n};\n\nlumo.internal.embedded.keys=function(){return Object.keys(lumo.internal.embedded.resources);}';
  buffer += '\n\nlumo.internal.embedded.get=';
  buffer += accessor.toString();
  fs.appendFileSync('target/main.js', buffer);
}

module.exports = embed;
