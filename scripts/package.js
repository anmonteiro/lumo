const nexe = require('nexe');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

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
};

function deflate(fname) {
  const input = fs.readFileSync(fname);
  fs.writeFileSync(fname, zlib.deflateSync(input));
}

const outputPath = 'main';
const resources = getDirContents('target')
      .filter(fname => fname.endsWith('.json') ||
              /(clojurescript-version|main\.js)/.test(fname) ||
              /\$macros\.js$/.test(fname));

resources.forEach(deflate);

nexe.compile({
  input: 'target/bundle.min.js',
  output: outputPath,
  nodeTempDir: 'tmp',
  nodeConfigureArgs: ['opt', 'val'], // for all your configure arg needs.
  // nodeMakeArgs: ["-j", "4"], // when you want to control the make process.
  nodeVCBuildArgs: ['nosign', 'x64'], // when you want to control the make process for windows.
  // By default "nosign" option will be specified
  // You can check all available options and its default values here:
  // https://github.com/nodejs/node/blob/master/vcbuild.bat
  resourceFiles: resources,
  browserifyExcludes: resources,
  resourceRoot: 'target',
  flags: true, // use this for applications that need command line flags.
  jsFlags: '--use_strict', // v8 flags
  framework: 'node',
  nodeVersion: '6.8.0',
}, err => {
  if (err) {
    throw err;
  }

  console.log(`Finished bundling. Nexe binary can be found in ${outputPath}`);
});
