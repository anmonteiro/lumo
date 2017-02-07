const browserify = require('browserify');
const fs = require('fs');
const path = require('path');
const envify = require('envify/custom');
const derequire = require('derequire');
const uglify = require('uglify-js');

browserify({
  entries: ['node_modules/google-closure-compiler-js/compile.js'],
  standalone: 'googleClosureCompiler',
  commondir: false,
  builtins: false,
  insertGlobals: true,
  detectGlobals: true,
  insertGlobalVars: {
    process: undefined,
  },
  browserField: false,
}).bundle((err, buf) => {
    if (err) {
      throw err;
    }
    const code = buf.toString();
    const bundleFilename = path.join('target', 'googleClosureCompiler.js');
    fs.writeFile(bundleFilename, derequire(code), 'utf8', (err) => {
      if (err) {
        throw err;
      }
    });
});

function minify(filename){
  const { code } = uglify.minify(filename, {
    warnings: true,
  });
  fs.writeFileSync(filename, code, 'utf8');
}

browserify({
  entries: ['node_modules/parinfer'],
  standalone: 'parinfer',
  commondir: false,
  builtins: false,
  insertGlobals: true,
  detectGlobals: true,
  insertGlobalVars: {
    process: undefined,
  },
  browserField: false,
}).bundle((err, buf) => {
    if (err) {
      throw err;
    }
    const code = buf.toString();
    const bundleFilename = path.join('target', 'parinfer.js');
    fs.writeFile(bundleFilename, derequire(code), 'utf8', (err) => {
      if (err) {
        throw err;
      }
      minify(bundleFilename);
    });
});

browserify({
  entries: ['node_modules/jszip'],
  standalone: 'JSZip',
  commondir: false,
  builtins: false,
  insertGlobals: true,
  detectGlobals: true,
  insertGlobalVars: {
    process: undefined,
  },
  browserField: false,
}).bundle((err, buf) => {
    if (err) {
      throw err;
    }
    const code = buf.toString();
    const bundleFilename = path.join('target', 'jszip.js');
    fs.writeFile(bundleFilename, derequire(code), 'utf8', (err) => {
      if (err) {
        throw err;
      }
      minify(bundleFilename);
    });
});
