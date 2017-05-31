const nexe = require('nexe');
const fs = require('fs');
const path = require('path');
const os = require('os');
const zlib = require('zlib');
const embed = require('./embed');

const nodeVersion = '8.0.0';

function getDirContents(dir, accumPath = dir) {
  let filenames = fs.readdirSync(dir);

  // prettier-ignore
  return filenames.reduce(
    (ret, filename) => {
      const fname = path.resolve(accumPath, filename);
      const fStat = fs.statSync(fname);

      if (fStat.isDirectory()) {
        const newAccum = path.join(accumPath, filename);
        return ret.concat(getDirContents(newAccum, newAccum));
      }

      ret.push(path.join(accumPath, filename));
      return ret;
    },
    []
  );
}

function deflate(fname) {
  return new Promise((resolve, reject) => {
    fs.readFile(fname, (err, input) => {
      fs.writeFileSync(fname, zlib.deflateSync(input));
      resolve();
    });
  });
}

const outputPath = `build/${/^Windows/.test(os.type()) ? 'lumo.exe' : 'lumo'}`;
// prettier-ignore
const resources = getDirContents('target').filter(
  fname =>
    !fname.endsWith('main.js') &&
    !fname.endsWith('bundle.js') &&
    !fname.endsWith('bundle.min.js') &&
    !fname.endsWith('google-closure-compiler-js.js') &&
    !fname.endsWith('aot.edn') &&
    !/target[\\\/]cljs[\\/]core.js/.test(fname) &&
    !fname.endsWith('.map')
);

function moveLibs(compiler, options, callback) {
  // prettier-ignore
  fs.writeFileSync(
    `${compiler.dir}/google-closure-compiler-js.js`,
    fs.readFileSync(`target/google-closure-compiler-js.js`)
  );

  callback();
}

Promise.all(resources.map(deflate)).then(() => {
  embed(resources, 'target');

  // prettier-ignore
  nexe.compile(
    {
      input: 'target/bundle.min.js',
      output: outputPath,
      nodeTempDir: 'tmp',
      patchFns: moveLibs,
      nodeConfigureArgs: [
        '--without-dtrace',
        '--without-npm',
        '--without-inspector',
        '--without-etw',
        '--without-perfctr',
        '--link-module', './google-closure-compiler-js.js',
      ].concat(os.type() === 'Linux' ? ['--fully-static'] : []),
      nodeMakeArgs: ['-j', '8'],
      nodeVCBuildArgs: ['nosign', 'x64', 'noetw', 'noperfctr'],
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
        `Finished bundling. Nexe binary can be found in ${outputPath}`
      );
    }
  );
});
