const async = require("async");
const nexe = require('../vendor/nexe');
const monkeyPatch = require('../vendor/nexe/monkeypatch');
const fs = require('fs');
const path = require('path');
const os = require('os');
const zlib = require('zlib');
const embed = require('./embed');

const argv = process.argv.slice(0);
const nodeVersion = argv[2];

function getDirContents(dir, accumPath = dir) {
  let filenames = fs.readdirSync(dir);

  return filenames.reduce((ret, filename) => {
    const fname = path.resolve(accumPath, filename);
    const fStat = fs.statSync(fname);

    if (fStat.isDirectory()) {
      const newAccum = path.join(accumPath, filename);
      return ret.concat(getDirContents(newAccum, newAccum));
    }

    ret.push(path.join(accumPath, filename));
    return ret;
  }, []);
}

function deflate(fname) {
  return new Promise((resolve, reject) => {
    fs.readFile(fname, (err, input) => {
      fs.writeFileSync(fname, zlib.deflateSync(input));
      resolve();
    });
  });
}

const isWindows = /^Windows/.test(os.type());
const outputPath = `build/${isWindows ? 'lumo.exe' : 'lumo'}`;

const resources = getDirContents('target').filter(
    fname =>
      fname.endsWith('.aot.js.map') ||
      (!fname.endsWith('main.js') &&
        !fname.endsWith('bundle.js') &&
        !fname.endsWith('bundle.min.js') &&
        !fname.endsWith('google-closure-compiler-js.js') &&
        !fname.endsWith('aot.edn') &&
        !/target[\\\/]cljs[\\/]core.js/.test(fname) &&
        !fname.endsWith('.map')),
  );

function moveLibs(compiler, options, callback) {
  fs.writeFileSync(
    `${compiler.dir}/google-closure-compiler-js.js`,
    fs.readFileSync(`target/google-closure-compiler-js.js`),
  );

  callback(null, compiler, options);
}

function patchNodeGyp(compiler, options, complete) {
  const gypPath = path.join(compiler.dir, 'node.gyp');

  monkeyPatch(
    gypPath,
    function(content) {
      return ~content.indexOf('google-closure-compiler-js.js');
    },
    function(content, next) {
      const newContent = content.replace(
        "'deps/node-inspect/lib/internal/inspect_repl.js',",
        `'deps/node-inspect/lib/internal/inspect_repl.js',
      'google-closure-compiler-js.js',`,
      );
      next(null, newContent);
    },
    complete,
  );
}

Promise.all(resources.map(deflate)).then(() => {
  embed(resources, 'target');

  nexe.compile(
    {
      input: 'target/bundle.min.js',
      output: outputPath,
      nodeTempDir: 'tmp',
      patchFns: [moveLibs, patchNodeGyp],
      nodeConfigureArgs: [
        '--without-dtrace',
        '--without-npm',
        '--without-inspector',
        '--without-etw',
        '--with-snapshot',
      ].concat(isWindows ? ['--openssl-no-asm'] : []),
      nodeMakeArgs: ['-j', '8'],
      nodeVCBuildArgs: ['nosign', 'x64', 'noetw'],
      flags: true,
      startupSnapshot: 'target/main.js',
      noBundle: true,
      framework: 'node',
      nodeVersion,
    },
    err => {
      if (err) {
        throw err;
      }
      console.log(
        `Finished bundling. Nexe binary can be found in ${outputPath}`,
      );
    },
  );
});
