const browserify = require('browserify');
const fs = require('fs');
const path = require('path');
const envify = require('envify/custom');
const derequire = require('derequire');

const argv = process.argv.slice(2);
const isDevBuild = /(--dev|-d)$/.test(argv[0]);

console.log(`Building ${isDevBuild ? 'development' : 'production'} bundle with Browserify...`);

browserify({
  entries: ['src/js/index.js'],
  commondir: false,
  builtins: false,
  insertGlobals: true,
  detectGlobals: true,
  insertGlobalVars: {
    process: undefined,
  },
  browserField: false,
}).transform('babelify')
  .transform(envify({
    _: 'purge',
    NODE_ENV: process.env.BUILD_DEV ? 'development' : 'production',
  }))
  .exclude('nexeres')
  .bundle((err, buf) => {
    if (err) {
      throw err;
    }
    const code = buf.toString();

    fs.writeFile(path.join('target', 'bundle.js'), derequire(code), 'utf8');
});
