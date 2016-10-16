const fs = require('fs');
const spawn = require( 'child_process' ).spawnSync;

var x = fs.readFileSync('target/main.js', 'utf8');

// Assumes the `cljs.nodejs` namespace is at the end of the file
var str = x.split(/(?=cljs.nodejs={})/, 2);

fs.writeFileSync('target/main.js', str.join('\nthis.initialize=(function(){') + '});', 'utf8');
