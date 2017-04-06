const fs = require('fs');

const x = fs.readFileSync('target/main.js', 'utf8');

// prettier-ignore
fs.writeFileSync(
  'target/main.js',
  x.replace(/var boot={cljs:{}};boot.cljs.*?={};/, ''),
  'utf8'
);
