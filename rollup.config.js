import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-js-harmony';

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

console.log(babelrc({ addModuleOptions: false }));
// babelrc({ addModuleOptions: false })
export default {
  entry: 'src/js/index.js',
  plugins: [
    babel(),
    resolve({ jsnext: true, main: true }),
    commonjs(),
    uglify({}, minify),
  ],
  external,
  targets: [
    {
      dest: 'x.js',
      format: 'cjs',
      sourceMap: true,
    },
  ],
};
