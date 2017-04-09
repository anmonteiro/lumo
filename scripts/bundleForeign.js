const rollup = require('rollup').rollup;
const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const commonjs = require('rollup-plugin-commonjs');

rollup({
  entry: 'node_modules/google-closure-compiler-js/compile.js',
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    resolve({
      jsnext: true,
      main: true,
    }),
    commonjs(),
  ],
})
  .then(bundle => {
    bundle.write({
      format: 'cjs',
      dest: 'target/google-closure-compiler-js.js',
      useStrict: false,
    });
  })
  .catch(console.error);
