const nexe = require('nexe');
const monkeyPatch = require('nexe/lib/monkeypatch');
const fs = require('fs');
const path = require('path');
const os = require('os');
const zlib = require('zlib');
const embed = require('./embed');

const nodeVersion = '8.3.0';

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

const outputPath = `build/${/^Windows/.test(os.type()) ? 'lumo.exe' : 'lumo'}`;
const resources = getDirContents('target').filter(
  fname =>
    !fname.endsWith('main.js') &&
    !fname.endsWith('bundle.js') &&
    !fname.endsWith('bundle.min.js') &&
    !fname.endsWith('google-closure-compiler-js.js') &&
    !fname.endsWith('aot.edn') &&
    !/target[\\\/]cljs[\\/]core.js/.test(fname) &&
    !fname.endsWith('.map'),
);

function moveLibs(compiler, options, callback) {
  fs.writeFileSync(
    `${compiler.dir}/google-closure-compiler-js.js`,
    fs.readFileSync(`target/google-closure-compiler-js.js`),
  );

  callback(null, compiler, options);
}

function patchVCBuild(compiler, options, callback) {
  const vcbuildPath = path.join(compiler.dir, 'vcbuild.bat');

  monkeyPatch(
    vcbuildPath,
    function(content) {
      return ~content.indexOf('withsnapshot');
    },
    function(content, next) {
      const newContent = content
        .replace(
          'set nosnapshot=',
          `set nosnapshot=
set withsnapshot=`,
        )
        .replace(
          'if /i "%1"=="nosnapshot"    set nosnapshot=1&goto arg-ok',
          `if /i "%1"=="nosnapshot"    set nosnapshot=1&goto arg-ok
if /i "%1"=="withsnapshot"    set withsnapshot=1&goto arg-ok`,
        )
        .replace(
          'if defined nosnapshot set configure_flags=%configure_flags% --without-snapshot',
          `if defined nosnapshot set configure_flags=%configure_flags% --without-snapshot
if defined withsnapshot set configure_flags=%configure_flags% --with-snapshot`,
        );
      next(null, newContent);
    },
    callback,
  );
}

Promise.all(resources.map(deflate)).then(() => {
  embed(resources, 'target');

  nexe.compile(
    {
      input: 'target/bundle.min.js',
      output: outputPath,
      nodeTempDir: 'tmp',
      patchFns: [moveLibs, patchVCBuild],
      nodeConfigureArgs: [
        '--without-dtrace',
        '--without-npm',
        '--without-inspector',
        '--without-etw',
        '--without-perfctr',
        '--with-snapshot',
        '--link-module',
        './google-closure-compiler-js.js',
      ],
      nodeMakeArgs: ['-j', '8'],

      nodeVCBuildArgs: ['nosign', 'x64', 'noetw', 'noperfctr', 'withsnapshot'],
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
