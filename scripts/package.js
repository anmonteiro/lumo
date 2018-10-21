const nexe = require('nexe');
const fs = require('fs').promises;
const path = require('path');
const os = require('os');
const zlib = require('zlib');

const lumoInternalDir = 'LUMO__INTERNAL__CLASSPATH';
const argv = process.argv.slice(0);
const nodeVersion = argv[2];
const isCI = argv[3] ? true : false;

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
const resources = getDirContents(lumoInternalDir).then(resources =>
  resources.filter(
    fname =>
      fname.endsWith('.aot.js.map') ||
      (!fname.endsWith('main.js') &&
        !fname.endsWith('bundle.js') &&
        !fname.endsWith('bundle.min.js') &&
        !fname.endsWith('google-closure-compiler-js.js') &&
        !fname.endsWith('aot.edn') &&
        !new RegExp(`${lumoInternalDir}[\\\\\\\/]cljs[\\\\\\/]core.js`).test(
          fname,
        ) &&
        !fname.endsWith('.map')),
  ),
);

async function moveLibs(compiler, callback) {
  const contents = await fs.readFile(
    `${lumoInternalDir}/google-closure-compiler-js.js`,
  );

  await compiler.writeFileAsync('google-closure-compiler-js.js', contents);

  return callback();
}

async function patchNodeGyp(compiler, callback) {
  await compiler.replaceInFileAsync(
    'node.gyp',
    "'deps/node-inspect/lib/internal/inspect_repl.js',",
    `'deps/node-inspect/lib/internal/inspect_repl.js',
   'google-closure-compiler-js.js',`,
  );

  return callback();
}

resources.then(resources =>
  Promise.all(resources.map(deflate)).then(async () => {
    try {
      await fs.mkdir('build');
    } catch(_) {}

    nexe.compile(
      {
        input: path.resolve(`${lumoInternalDir}/bundle.min.js`),
        output: outputPath,
        build: 'true',
        targets: [nodeVersion],
        bundle: false,
        temp: 'tmp',
        patches: [moveLibs, patchNodeGyp],
        configure: [
          '--without-dtrace',
          '--without-npm',
          '--without-inspector',
          '--without-etw',
          '--without-perfctr',
          '--with-snapshot',
        ],
        make: ['-j', '8'],
        vcBuild: ['nosign', 'x64', 'noetw', 'noperfctr', 'no-cctest'],
        name: 'Lumo',
        resources,
        enableNodeCli: false,
        snapshot: `${lumoInternalDir}/main.js`,
        warmup: `${lumoInternalDir}/main.js`,
        verbose: true,
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
  }),
);
