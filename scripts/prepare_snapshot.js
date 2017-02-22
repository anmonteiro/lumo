const fs = require('fs');

const x = fs.readFileSync('target/main.js', 'utf8');

const str = x
  .replace(/(cljs\.nodejs={};[\s\S]+?a;return b}\(\);return null};)/, 'this.initialize=(function(){$1});')
  .replace(/var boot={cljs:{}};boot.cljs.*?={};/, '')
  .replace(/cljs.nodejscli={};cljs.core.truth_\(COMPILED\)[\s\S]+?cljs.core.drop.cljs\$core\$IFn\$_invoke\$arity\$2\(2,process.argv\)\);/, '');

fs.writeFileSync('target/main.js', str, 'utf8');
