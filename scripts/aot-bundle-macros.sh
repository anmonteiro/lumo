set -e

# remove the target dir
rm -rf target

# remove possible artifacts of failed compilations
rm -rf lumo-cljs

# move the backed up resources back to target
mv resources_bak target

echo "### Compiling Macro Namespaces"

mkdir -p lumo-cljs/out/macros-tmp

$(pwd)/build/lumo --quiet -c target -sfdk lumo-cljs/out/macros-tmp <<REPL_INPUT
(require 'lumo.build.api
         'lumo.analyzer
         'lumo.cljs-deps
         'lumo.classpath
         'lumo.closure
         'lumo.compiler
         'lumo.io
         'lumo.json
         'lumo.util
         'cljs.pprint
         'clojure.core.reducers
         'clojure.zip
         'clojure.data
         'clojure.reflect
         'clojure.browser.net
         'clojure.browser.event
         'cljs.nodejs
         'cljs.test
         'cljs.analyzer.api
         'cljs.spec.test.alpha
         'cljs.core.specs.alpha)
(require-macros 'lumo.repl
                'lumo.util
                'clojure.template
                'cljs.pprint
                'cljs.spec.alpha
                'cljs.spec.gen.alpha
                'cljs.spec.test.alpha
                'cljs.support
                'cljs.test
                'cljs.reader
                'cljs.tools.reader.reader-types
                'cljs.env.macros
                'cljs.analyzer.macros
                'cljs.compiler.macros)
REPL_INPUT

mv lumo-cljs/out/macros-tmp/clojure_SLASH_core_SLASH_reducers.js target/clojure/core/reducers.js
mv lumo-cljs/out/macros-tmp/clojure_SLASH_core_SLASH_reducers.cache.json target/clojure/core/reducers.cache.json
mv lumo-cljs/out/macros-tmp/clojure_SLASH_data.js target/clojure/data.js
mv lumo-cljs/out/macros-tmp/clojure_SLASH_data.cache.json target/clojure/data.cache.json
mv lumo-cljs/out/macros-tmp/clojure_SLASH_reflect.js target/clojure/reflect.js
mv lumo-cljs/out/macros-tmp/clojure_SLASH_reflect.cache.json target/clojure/reflect.cache.json
mv lumo-cljs/out/macros-tmp/clojure_SLASH_browser_SLASH_net.js target/clojure/browser/net.js
mv lumo-cljs/out/macros-tmp/clojure_SLASH_browser_SLASH_net.cache.json target/clojure/browser/net.cache.json
mv lumo-cljs/out/macros-tmp/clojure_SLASH_browser_SLASH_event.js target/clojure/browser/event.js
mv lumo-cljs/out/macros-tmp/clojure_SLASH_browser_SLASH_event.cache.json target/clojure/browser/event.cache.json
mv lumo-cljs/out/macros-tmp/clojure_SLASH_zip.js target/clojure/zip.js
mv lumo-cljs/out/macros-tmp/clojure_SLASH_zip.cache.json target/clojure/zip.cache.json
mv lumo-cljs/out/macros-tmp/cljs_SLASH_analyzer_SLASH_api.js target/cljs/analyzer/api.js
mv lumo-cljs/out/macros-tmp/cljs_SLASH_analyzer_SLASH_api.cache.json target/cljs/analyzer/api.cache.json
mv lumo-cljs/out/macros-tmp/lumo_SLASH_analyzer.js target/lumo/analyzer.js
mv lumo-cljs/out/macros-tmp/lumo_SLASH_analyzer.cache.json target/lumo/analyzer.cache.json
mv lumo-cljs/out/macros-tmp/cljs_SLASH_nodejs.js target/cljs/nodejs.js
mv lumo-cljs/out/macros-tmp/cljs_SLASH_nodejs.cache.json target/cljs/nodejs.cache.json
mv lumo-cljs/out/macros-tmp/cljs_SLASH_pprint.js target/cljs/pprint.js
mv lumo-cljs/out/macros-tmp/cljs_SLASH_pprint.cache.json target/cljs/pprint.cache.json
mv lumo-cljs/out/macros-tmp/cljs_SLASH_test.js target/cljs/test.js
mv lumo-cljs/out/macros-tmp/cljs_SLASH_test.cache.json target/cljs/test.cache.json
mv lumo-cljs/out/macros-tmp/lumo_SLASH_build_SLASH_api.js target/lumo/build/api.js
mv lumo-cljs/out/macros-tmp/lumo_SLASH_build_SLASH_api.cache.json target/lumo/build/api.cache.json
mv lumo-cljs/out/macros-tmp/lumo_SLASH_cljs_deps.js target/lumo/cljs_deps.js
mv lumo-cljs/out/macros-tmp/lumo_SLASH_cljs_deps.cache.json target/lumo/cljs_deps.cache.json
mv lumo-cljs/out/macros-tmp/lumo_SLASH_classpath.js target/lumo/classpath.js
mv lumo-cljs/out/macros-tmp/lumo_SLASH_classpath.cache.json target/lumo/classpath.cache.json
mv lumo-cljs/out/macros-tmp/lumo_SLASH_closure.js target/lumo/closure.js
mv lumo-cljs/out/macros-tmp/lumo_SLASH_closure.cache.json target/lumo/closure.cache.json
mv lumo-cljs/out/macros-tmp/lumo_SLASH_compiler.js target/lumo/compiler.js
mv lumo-cljs/out/macros-tmp/lumo_SLASH_compiler.cache.json target/lumo/compiler.cache.json
mv lumo-cljs/out/macros-tmp/lumo_SLASH_io.js target/lumo/io.js
mv lumo-cljs/out/macros-tmp/lumo_SLASH_io.cache.json target/lumo/io.cache.json
mv lumo-cljs/out/macros-tmp/lumo_SLASH_json.js target/lumo/json.js
mv lumo-cljs/out/macros-tmp/lumo_SLASH_json.cache.json target/lumo/json.cache.json
mv lumo-cljs/out/macros-tmp/lumo_SLASH_util.js target/lumo/util.js
mv lumo-cljs/out/macros-tmp/lumo_SLASH_util.cache.json target/lumo/util.cache.json
mv lumo-cljs/out/macros-tmp/cljs_SLASH_spec_SLASH_test_SLASH_alpha.js target/cljs/spec/test/alpha.js
mv lumo-cljs/out/macros-tmp/cljs_SLASH_spec_SLASH_test_SLASH_alpha.cache.json target/cljs/spec/test/alpha.cache.json
mv lumo-cljs/out/macros-tmp/cljs_SLASH_core_SLASH_specs_SLASH_alpha.js target/cljs/core/specs/alpha.js
mv lumo-cljs/out/macros-tmp/cljs_SLASH_core_SLASH_specs_SLASH_alpha.cache.json target/cljs/core/specs/alpha.cache.json

mv lumo-cljs/out/macros-tmp/lumo_SLASH_repl\$macros.js target/lumo/repl\$macros.js
mv lumo-cljs/out/macros-tmp/lumo_SLASH_repl\$macros.cache.json target/lumo/repl\$macros.cache.json
mv lumo-cljs/out/macros-tmp/lumo_SLASH_util\$macros.js target/lumo/util\$macros.js
mv lumo-cljs/out/macros-tmp/lumo_SLASH_util\$macros.cache.json target/lumo/util\$macros.cache.json
mv lumo-cljs/out/macros-tmp/clojure_SLASH_template\$macros.js target/clojure/template\$macros.js
mv lumo-cljs/out/macros-tmp/clojure_SLASH_template\$macros.cache.json target/clojure/template\$macros.cache.json
mv lumo-cljs/out/macros-tmp/cljs_SLASH_analyzer_SLASH_macros\$macros.js target/cljs/analyzer/macros\$macros.js
mv lumo-cljs/out/macros-tmp/cljs_SLASH_analyzer_SLASH_macros\$macros.cache.json target/cljs/analyzer/macros\$macros.cache.json
mv lumo-cljs/out/macros-tmp/cljs_SLASH_compiler_SLASH_macros\$macros.js target/cljs/compiler/macros\$macros.js
mv lumo-cljs/out/macros-tmp/cljs_SLASH_compiler_SLASH_macros\$macros.cache.json target/cljs/compiler/macros\$macros.cache.json
mv lumo-cljs/out/macros-tmp/cljs_SLASH_env_SLASH_macros\$macros.js target/cljs/env/macros\$macros.js
mv lumo-cljs/out/macros-tmp/cljs_SLASH_env_SLASH_macros\$macros.cache.json target/cljs/env/macros\$macros.cache.json
mv lumo-cljs/out/macros-tmp/cljs_SLASH_pprint\$macros.js target/cljs/pprint\$macros.js
mv lumo-cljs/out/macros-tmp/cljs_SLASH_pprint\$macros.cache.json target/cljs/pprint\$macros.cache.json
mv lumo-cljs/out/macros-tmp/cljs_SLASH_support\$macros.js target/cljs/support\$macros.js
mv lumo-cljs/out/macros-tmp/cljs_SLASH_support\$macros.cache.json target/cljs/support\$macros.cache.json
mv lumo-cljs/out/macros-tmp/cljs_SLASH_test\$macros.js target/cljs/test\$macros.js
mv lumo-cljs/out/macros-tmp/cljs_SLASH_test\$macros.cache.json target/cljs/test\$macros.cache.json
mv lumo-cljs/out/macros-tmp/cljs_SLASH_reader\$macros.js target/cljs/reader\$macros.js
mv lumo-cljs/out/macros-tmp/cljs_SLASH_reader\$macros.cache.json target/cljs/reader\$macros.cache.json
mv lumo-cljs/out/macros-tmp/cljs_SLASH_tools_SLASH_reader_SLASH_reader_types\$macros.cache.json target/cljs/tools/reader/reader_types\$macros.cache.json
mv lumo-cljs/out/macros-tmp/cljs_SLASH_tools_SLASH_reader_SLASH_reader_types\$macros.js target/cljs/tools/reader/reader_types\$macros.js
mv lumo-cljs/out/macros-tmp/cljs_SLASH_spec_SLASH_alpha\$macros.js target/cljs/spec/alpha\$macros.js
mv lumo-cljs/out/macros-tmp/cljs_SLASH_spec_SLASH_alpha\$macros.cache.json target/cljs/spec/alpha\$macros.cache.json
mv lumo-cljs/out/macros-tmp/cljs_SLASH_spec_SLASH_gen_SLASH_alpha\$macros.js target/cljs/spec/gen/alpha\$macros.js
mv lumo-cljs/out/macros-tmp/cljs_SLASH_spec_SLASH_gen_SLASH_alpha\$macros.cache.json target/cljs/spec/gen/alpha\$macros.cache.json
mv lumo-cljs/out/macros-tmp/cljs_SLASH_spec_SLASH_test_SLASH_alpha\$macros.js target/cljs/spec/test/alpha\$macros.js
mv lumo-cljs/out/macros-tmp/cljs_SLASH_spec_SLASH_test_SLASH_alpha\$macros.cache.json target/cljs/spec/test/alpha\$macros.cache.json
mv lumo-cljs/out/macros-tmp/cljs_SLASH_core_SLASH_specs_SLASH_alpha\$macros.js target/cljs/core/specs/alpha\$macros.js
mv lumo-cljs/out/macros-tmp/cljs_SLASH_core_SLASH_specs_SLASH_alpha\$macros.cache.json target/cljs/core/specs/alpha\$macros.cache.json

rm -rf lumo-cljs
