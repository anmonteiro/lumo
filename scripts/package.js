const nexe = require('nexe');
const fs = require('fs');
const path = require('path');
const os = require('os');
const zlib = require('zlib');

const nodeVersion = '7.8.0';

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
    !fname.endsWith('google-closure-compiler-js.js')
    // !fname.endsWith('parinfer.js') &&
    // !fname.endsWith('jszip.js')
);

function moveLibs(compiler, options, callback) {
  [
    //'parinfer', 'jszip',
    'google-closure-compiler-js',
  ].forEach(lib => {
    // prettier-ignore
    fs.writeFileSync(
      `${compiler.dir}/${lib}.js`,
      fs.readFileSync(`target/${lib}.js`)
    );
  });

  callback();
}

Promise.all(resources.map(deflate)).then(() => {
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
        // '--link-module', './parinfer.js',
        // '--link-module', './jszip.js',
      ],
      // nodeMakeArgs: ["-j", "4"], // when you want to control the make process.
      nodeVCBuildArgs: ['nosign', 'x64', 'noetw', 'noperfctr'], // when you want to control the make process for windows.
      // By default "nosign" option will be specified
      // You can check all available options and its default values here:
      // https://github.com/nodejs/node/blob/master/vcbuild.bat
      resourceFiles: resources,
      browserifyExcludes: resources.concat(['nexeres', 'v8', 'google-closure-compiler-js', 'parinfer', 'jszip']),
      resourceRoot: 'target',
      flags: true, // use this for applications that need command line flags.
      jsFlags: [
        // '--use_strict',
        // '--prepare_always_opt',
        // '--always_opt',
        // '--compiled_keyed_generic_loads',
      ].join(' '),
      startupSnapshot: 'target/main.js',
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
