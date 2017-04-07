const browserify = require('browserify');
const fs = require('fs');
const path = require('path');
const envify = require('envify/custom');
const derequire = require('derequire');
// const uglify = require('uglify-js');

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

function minifyi(filename) {
  const { code } = uglify.minify(filename, {
    warnings: true,
  });
  const matches = /(.*)(\.[^.]+)$/.exec(filename);
  fs.writeFile(`${matches[1]}.min${matches[2]}`, code, 'utf8');
}

//writeClojureScriptVersion();
1;
// prettier-ignore
console.log(
  `Building ${isDevBuild ? 'development' : 'production'} bundle with Browserify...`
);

// // prettier-ignore
// browserify({
//   entries: ['src/js/index.js'],
//   commondir: false,
//   builtins: false,
//   insertGlobals: true,
//   detectGlobals: true,
//   insertGlobalVars: {
//     process: undefined,
//   },
//   browserField: false,
// })
//   .transform('babelify')
//   .transform(
//     envify({
//       _: 'purge',
//       NODE_ENV: isDevBuild ? 'development' : 'production',
//     })
//   )
//   .exclude('nexeres')
//   .exclude('v8')
//   .exclude('google-closure-compiler-js')
//   .exclude('parinfer')
//   .exclude('jszip')
//   .bundle((err, buf) => {
//     if (err) {
//       throw err;
//     }
//     const code = buf.toString();
//     const bundleFilename = path.join('target', 'bundle.js');
//     fs.writeFile(bundleFilename, derequire(code), 'utf8', err => {
//       if (err) {
//         throw err;
//       }
//       if (!isDevBuild) {
//         minify(bundleFilename);
//       }
//     });
//   });

const rollup = require('rollup').rollup;
const babel = require('rollup-plugin-babel');
const babelrc = require('babelrc-rollup').default;
const replace = require('rollup-plugin-replace');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify');
const minify = require('uglify-js-harmony').minify;

const external = [
  'google-closure-compiler-js',
  'jszip',
  'parinfer',
  'v8',
  'readline',
  'net',
  'tty',
  'repl',
  'path',
  'fs',
  'crypto',
  'module',
  'vm',
  'os',
  'zlib',
];

const plugins = [babel(), resolve({ jsnext: true, main: true }), commonjs()];

// prettier-ignore
if (!isDevBuild) {
  plugins.push(
    ...[
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      uglify({}, minify),
    ]
  );
}

console.log(plugins.length);
// babelrc({ addModuleOptions: false })
rollup({
  entry: 'src/js/index.js',
  plugins,
  external,
  // targets: [
  //   {
  //     dest: 'x.js',
  //     format: 'cjs',
  //     sourceMap: true,
  //   },
  // ]
}).then(bundle => {
  // const result = bundle.generate({
  //   format: 'cjs',
  // });

  bundle.write({
    format: 'cjs',
    dest: `target/bundle${!isDevBuild ? '.min' : ''}.js`,
  });
});
