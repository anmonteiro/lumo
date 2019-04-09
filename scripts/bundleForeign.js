const rollup = require('rollup').rollup;
const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const commonjs = require('rollup-plugin-commonjs');

rollup({
  input: 'node_modules/google-closure-compiler-js/compile.js',
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    resolve({
      mainFields: ['module', 'main', 'jsnext:main'],
    }),
    commonjs(),
  ],
})
  .then(bundle => {
    bundle.write({
      format: 'cjs',
      file: 'target/google-closure-compiler-js.js',
      strict: false,
    });
  })
  .catch(console.error);
