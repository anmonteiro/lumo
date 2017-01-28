set -e

# remove the target dir
rm -rf target

# remove possible artifacts of failed compilations
rm -rf lumo-cljs

# move the backed up resources back to target
mv resources_bak target

echo "### Compiling Macro Namespaces"

mkdir -p lumo-cljs/out/macros-tmp

$(pwd)/build/lumo --quiet -c target -sdk lumo-cljs/out/macros-tmp <<REPL_INPUT
(require-macros 'lumo.repl 'clojure.template 'cljs.spec 'cljs.spec.impl.gen 'cljs.test 'cljs.reader)
REPL_INPUT

mv lumo-cljs/out/macros-tmp/lumo_SLASH_repl\$macros.js target/lumo/repl\$macros.js
mv lumo-cljs/out/macros-tmp/lumo_SLASH_repl\$macros.cache.json target/lumo/repl\$macros.cache.json
mv lumo-cljs/out/macros-tmp/clojure_SLASH_template\$macros.js target/clojure/template\$macros.js
mv lumo-cljs/out/macros-tmp/clojure_SLASH_template\$macros.cache.json target/clojure/template\$macros.cache.json
mv lumo-cljs/out/macros-tmp/cljs_SLASH_test\$macros.js target/cljs/test\$macros.js
mv lumo-cljs/out/macros-tmp/cljs_SLASH_test\$macros.cache.json target/cljs/test\$macros.cache.json
mv lumo-cljs/out/macros-tmp/cljs_SLASH_reader\$macros.js target/cljs/reader\$macros.js
mv lumo-cljs/out/macros-tmp/cljs_SLASH_reader\$macros.cache.json target/cljs/reader\$macros.cache.json
mv lumo-cljs/out/macros-tmp/cljs_SLASH_spec\$macros.js target/cljs/spec\$macros.js
mv lumo-cljs/out/macros-tmp/cljs_SLASH_spec\$macros.cache.json target/cljs/spec\$macros.cache.json
mv lumo-cljs/out/macros-tmp/cljs_SLASH_spec_SLASH_impl_SLASH_gen\$macros.js target/cljs/spec/impl/gen\$macros.js
mv lumo-cljs/out/macros-tmp/cljs_SLASH_spec_SLASH_impl_SLASH_gen\$macros.cache.json target/cljs/spec/impl/gen\$macros.cache.json

rm -rf lumo-cljs
