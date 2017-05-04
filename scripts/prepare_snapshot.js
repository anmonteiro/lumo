const fs = require('fs');

const x = fs.readFileSync('target/main.js', 'utf8');

// prettier-ignore
const str = x
  .replace(
    /(cljs\.compiler\.emit_constant\.cljs\$core\$IMultiFn\$_add_method\$arity\$3\(null,Date,function\(a\){[\s\S]+?,0\)\)}\);[\s\S]+?cljs\.core\.UUID,function\(a\){a=a\.toString\(\);return[\s\S]+?UUID\("',a,'", ',cljs\.core\.hash\(a\),"\)"\],0\)\)}\);)/,
    'this.initialize1=(function(){$1});'
  )
  .replace(
    /(com\.cognitect\.transit\.handlers\.ctorGuidProperty[\s\S]+?randomUUID\(\);)/,
    'this.initialize2=(function(){$1});'
  )  .replace(
    /(lumo.repl.emit_fn=function\(a\)[\s\S]+cljs.compiler.emit_constant.cljs\$core\$IMultiFn\$_add_method\$arity\$3\(null,cljs.core.Var,function\(a\){return lumo.repl.emit_fn\(a\)}\);)/,
    'this.initialize3=(function(){$1});'
  );

// prettier-ignore
fs.writeFileSync(
  'target/main.js',
  str.replace(/var boot={cljs:{}};boot.cljs.*?={};/, ''),
  'utf8'
);
