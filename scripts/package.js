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

async function getDirContents(dir, accumPath = dir) {
  let filenames = await fs.readdir(dir);

  return filenames.reduce(async (previousPromise, filename) => {
    const ret = await previousPromise;
    const fname = path.resolve(accumPath, filename);
    const fStat = await fs.stat(fname);

    if (fStat.isDirectory()) {
      const newAccum = path.join(accumPath, filename);
      return ret.concat(await getDirContents(newAccum, newAccum));
    }

    ret.push(path.join(accumPath, filename));
    return ret;
  }, Promise.resolve([]));
}

async function deflate(fname) {
  const input = await fs.readFile(fname);

  await fs.writeFile(fname, zlib.deflateSync(input));
  return;
}

const isWindows = /^Windows/.test(os.type());
const outputPath = `build/${isWindows ? 'lumo.exe' : 'lumo'}`;

const resources = getDirContents('target').then(resources =>
  resources.filter(
    fname =>
      fname.endsWith('.aot.js.map') ||
      (!fname.endsWith('main.js') &&
        !fname.endsWith('bundle.js') &&
        !fname.endsWith('bundle.min.js') &&
        !fname.endsWith('google-closure-compiler-js.js') &&
        !fname.endsWith('aot.edn') &&
        !/target[\\\/]cljs[\\/]core.js/.test(fname) &&
        !fname.endsWith('.map')),
  ),
);
async function moveLibs(compiler, callback) {
  const contents = await fs.readFile('target/google-closure-compiler-js.js');

  await compiler.writeFileAsync('google-closure-compiler-js.js', contents);

  return callback();
}

function patchNodeFlags(compiler, options, callback) {
  const nodeCCPath = path.join(compiler.dir, 'src/node.cc');

  monkeyPatch(
    nodeCCPath,
    function(content) {
      return ~content.indexOf('//ProcessGlobalArgs');
    },
    function(content, next) {
      const newContent = content.replace(
        /(?<!int )ProcessGlobalArgs\(/g,
        '0;//ProcessGlobalArgs(',
      );

      next(null, newContent);
    },
    callback,
  );
}

function patchNodeGyp(compiler, options, callback) {
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
    function(complete) {
      patchNodeFlags(compiler, options, callback)
    },
  );

  return callback();
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
