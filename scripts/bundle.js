const fs = require('fs');
const rollup = require('rollup').rollup;
const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babelMinify = require('rollup-plugin-babel-minify');

const packageDotJson = require('../package.json');
const argv = process.argv.slice(2);
const isDevBuild = /(--dev|-d)$/.test(argv[0]);
const isPkgDevBuild = /(--pkg-dev)$/.test(argv[0]);
const isPkgBuild = /(--pkg)$/.test(argv[0]);

function writeClojureScriptVersion() {
  const rs = fs.createReadStream('target/cljs/analyzer.js');
  let pos = 0;
  let index = 0;
  let acc = '';
  rs
    .on('data', chunk => {
      index = chunk.indexOf('\n');
      acc += chunk;
      if (index !== -1) {
        rs.close();
      } else {
        pos += chunk.length;
      }
    })
    .on('close', () => {
      const line = acc.slice(0, pos + index);
      const cljsVersion = /ClojureScript\s([0-9.]+)/.exec(line)[1];
      fs.writeFileSync('target/clojurescript-version', cljsVersion, 'utf8');
    });
}

writeClojureScriptVersion();

console.log(`Building ${isDevBuild || isPkgDevBuild ? 'development' : 'production'} bundle...`);

const external = [
  'google-closure-compiler-js',
  'assert',
  'crypto',
  'fs',
  'module',
  'net',
  'os',
  'path',
  'readline',
  'repl',
  'stream',
  'tty',
  'v8',
  'vm',
  'zlib',
];

const replacement = JSON.stringify(isDevBuild || isPkgDevBuild ? 'development' : 'production');
const plugins = [
  babel(),
  replace({
    values: {
      'process.env.NODE_ENV': replacement,
      'process.env.LUMO_VERSION': JSON.stringify(packageDotJson.version),
    },
  }),
  resolve({
    jsnext: true,
    main: true,
    preferBuiltins: true,
  }),
  commonjs({
    include: /posix-getopt|paredit\.js|jszip|pako/,
  }),
];

if (!isDevBuild && !isPkgDevBuild) {
  plugins.push(
    babelMinify({
      comments: false,
      removeConsole: true,
      removeDebugger: true,
    }),
  );
}


function pkgGenerateLumoEntryPoint (opts) {
  
  return `import startClojureScriptEngine from './cljs';
          import * as util from './util';
          import * as lumo from './lumo';
          import v8 from 'v8';

          const options = ${JSON.stringify(opts)};
          const classpath = options['classpath'];

          if (classpath.length !== 0) {
            const srcPaths = util.srcPathsFromClasspathStrings(classpath);
            options.classpath = srcPaths;
            lumo.addSourcePaths(srcPaths);
          };

          v8.setFlagsFromString('--use_strict');

          startClojureScriptEngine(options);`
};

if (isPkgDevBuild || isPkgBuild) {

  var opts =  JSON.parse(process.argv[3]);
  
  if (isPkgBuild) {
    opts.cache = 'aot';
  } else if (isPkgDevBuild) {
    opts.classpath.push('target');
  }
  
  fs.writeFileSync('src/js/pkg.js',
		   pkgGenerateLumoEntryPoint(opts), (err) => {
		     if (err) {
		       return console.log(err);
		     };
		     console.log('Wrote pkg.js lumo entry point ' + process.argv.slice(3));
		   });
};

rollup({
  input: (isPkgDevBuild || isPkgBuild) ? 'src/js/pkg.js' : 'src/js/index.js',
  plugins,
  external,
})
  .then(bundle => {
    bundle.write({
      format: 'cjs',
      file: `target/bundle${isDevBuild || isPkgDevBuild ? '': '.min'}.js`,
      interop: false,
      exports: 'none',
      intro: `;(function(){
"use strict";`,
      outro: '})();',
    });
  })
  .catch(console.error);
