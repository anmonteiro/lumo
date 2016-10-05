const nexe = require('nexe');

const outputPath = 'main';

nexe.compile({
  input: 'target/bundle.js',
  output: outputPath,
  nodeTempDir: 'tmp',
  nodeConfigureArgs: ['opt', 'val'], // for all your configure arg needs.
  // nodeMakeArgs: ["-j", "4"], // when you want to control the make process.
  nodeVCBuildArgs: ['nosign', 'x64'], // when you want to control the make process for windows.
  // By default "nosign" option will be specified
  // You can check all available options and its default values here:
  // https://github.com/nodejs/node/blob/master/vcbuild.bat
  resourceFiles: ['target/main.js'], // array of files to embed.
  browserifyExcludes: ['target/main.js'],
  resourceRoot: 'target',
  flags: true, // use this for applications that need command line flags.
  jsFlags: '--use_strict', // v8 flags
  framework: 'node',
  nodeVersion: '6.7.0',
}, function(err) {
  if (err) {
    throw err;
  }

  console.log(`Finished bundling. Nexe binary can be found in ${outputPath}`);
});
