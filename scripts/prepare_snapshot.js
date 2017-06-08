const fs = require('fs');

const x = fs.readFileSync('target/main.js', 'utf8');

fs.writeFileSync(
  'target/main.js',
  x.replace(/var boot={cljs:{}};boot.cljs.*?={};/, ''),
  'utf8',
);
