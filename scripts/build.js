const browserify = require('browserify');
const fs = require('fs');
const path = require('path');
const envify = require('envify/custom');
const derequire = require('derequire');

const argv = process.argv.slice(2);
const isDevBuild = /(--dev|-d)$/.test(argv[0]);

function writeClojureScriptVersion() {
  const rs = fs.createReadStream('target/cljs/analyzer.js');
  let pos = 0;
  let index = 0;
  let acc = '';
  rs
    .on('data', (chunk) => {
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
    NODE_ENV: isDevBuild ? 'development' : 'production',
  }))
  .exclude('nexeres')
  .bundle((err, buf) => {
    if (err) {
      throw err;
    }
    const code = buf.toString();

    fs.writeFile(path.join('target', 'bundle.js'), derequire(code), 'utf8');
});
