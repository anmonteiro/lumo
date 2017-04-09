const fs = require('fs');
const rollup = require('rollup').rollup;
const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify');
const minify = require('uglify-js-harmony').minify;

const argv = process.argv.slice(2);
const isDevBuild = /(--dev|-d)$/.test(argv[0]);

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

console.log(`Building ${isDevBuild ? 'development' : 'production'} bundle...`);

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
  'tty',
  'v8',
  'vm',
  'zlib',
];

// TODO:
// - babili
const replacement = JSON.stringify(isDevBuild ? 'development' : 'production');
const plugins = [
  babel(),
  replace({
    'process.env.NODE_ENV': replacement,
  }),
  resolve({
    jsnext: true,
    main: true,
    preferBuiltins: true,
  }),
  commonjs({
    include: /posix-getopt|parinfer|jszip|pako/,
  }),
];

if (!isDevBuild) {
  plugins.push(uglify({}, minify));
}

rollup({
  entry: 'src/js/index.js',
  plugins,
  external,
})
  .then(bundle => {
    bundle.write({
      format: 'cjs',
      dest: `target/bundle${!isDevBuild ? '.min' : ''}.js`,
    });
  })
  .catch(console.error);
