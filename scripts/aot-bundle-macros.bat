REM remove the target dir
echo y | rd target /s || goto :error

REM remove possible artifacts of failed compilations
echo y | rd lumo-cljs /s

REM move the backed up resources back to target
mv resources_bak target || goto :error

echo "### Compiling Macro Namespaces"

mkdir lumo-cljs\out\macros-tmp || goto :error

echo (require 'lumo.build.api 'lumo.analyzer 'lumo.cljs-deps 'lumo.closure 'lumo.compiler 'lumo.io 'lumo.json 'lumo.util 'clojure.core.reducers 'clojure.zip 'clojure.data 'cljs.nodejs 'cljs.pprint 'cljs.test 'cljs.analyzer.api) (require-macros 'lumo.repl 'lumo.util 'clojure.template 'cljs.pprint 'cljs.spec 'cljs.spec.impl.gen 'cljs.test 'cljs.reader 'cljs.env.macros 'cljs.analyzer.macros 'cljs.compiler.macros) | build\lumo.exe --quiet -c target -sdk lumo-cljs/out/macros-tmp || goto :error

mv lumo-cljs\out\macros-tmp\clojure_SLASH_core_SLASH_reducers.js target\clojure\core\reducers.js || goto :error
mv lumo-cljs\out\macros-tmp\clojure_SLASH_core_SLASH_reducers.cache.json target\clojure\core\reducers.cache.json || goto :error
mv lumo-cljs\out\macros-tmp\clojure_SLASH_data.js target\clojure\data.js || goto :error
mv lumo-cljs\out\macros-tmp\clojure_SLASH_data.cache.json target\clojure\data.cache.json || goto :error
mv lumo-cljs\out\macros-tmp\clojure_SLASH_zip.js target\clojure\zip.js || goto :error
mv lumo-cljs\out\macros-tmp\clojure_SLASH_zip.cache.json target\clojure\zip.cache.json || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_analyzer_SLASH_api.js target\cljs\analyzer\api.js || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_analyzer_SLASH_api.cache.json target\cljs\analyzer\api.cache.json || goto :error
mv lumo-cljs\out\macros-tmp\lumo_SLASH_analyzer.js target\lumo\analyzer.js || goto :error
mv lumo-cljs\out\macros-tmp\lumo_SLASH_analyzer.cache.json target\lumo\analyzer.cache.json || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_nodejs.js target\cljs\nodejs.js || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_nodejs.cache.json target\cljs\nodejs.cache.json || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_pprint.js target\cljs\pprint.js || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_pprint.cache.json target\cljs\pprint.cache.json || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_test.js target\cljs\test.js || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_test.cache.json target\cljs\test.cache.json || goto :error
mv lumo-cljs\out\macros-tmp\lumo_SLASH_build_SLASH_api.js target\lumo\build\api.js || goto :error
mv lumo-cljs\out\macros-tmp\lumo_SLASH_build_SLASH_api.cache.json target\lumo\build\api.cache.json || goto :error
mv lumo-cljs\out\macros-tmp\lumo_SLASH_cljs_deps.js target\lumo\cljs_deps.js || goto :error
mv lumo-cljs\out\macros-tmp\lumo_SLASH_cljs_deps.cache.json target\lumo\cljs_deps.cache.json || goto :error
mv lumo-cljs\out\macros-tmp\lumo_SLASH_closure.js target\lumo\closure.js || goto :error
mv lumo-cljs\out\macros-tmp\lumo_SLASH_closure.cache.json target\lumo\closure.cache.json || goto :error
mv lumo-cljs\out\macros-tmp\lumo_SLASH_compiler.js target\lumo\compiler.js || goto :error
mv lumo-cljs\out\macros-tmp\lumo_SLASH_compiler.cache.json target\lumo\compiler.cache.json || goto :error
mv lumo-cljs\out\macros-tmp\lumo_SLASH_io.js target\lumo\io.js || goto :error
mv lumo-cljs\out\macros-tmp\lumo_SLASH_io.cache.json target\lumo\io.cache.json || goto :error
mv lumo-cljs\out\macros-tmp\lumo_SLASH_json.js target\lumo\json.js || goto :error
mv lumo-cljs\out\macros-tmp\lumo_SLASH_json.cache.json target\lumo\json.cache.json || goto :error
mv lumo-cljs\out\macros-tmp\lumo_SLASH_util.js target\lumo\util.js || goto :error
mv lumo-cljs\out\macros-tmp\lumo_SLASH_util.cache.json target\lumo\util.cache.json || goto :error

mv lumo-cljs\out\macros-tmp\lumo_SLASH_repl$macros.js target\lumo\repl$macros.js || goto :error
mv lumo-cljs\out\macros-tmp\lumo_SLASH_repl$macros.cache.json target\lumo\repl$macros.cache.json || goto :error
mv lumo-cljs\out\macros-tmp\lumo_SLASH_util$macros.js target\lumo\util$macros.js || goto :error
mv lumo-cljs\out\macros-tmp\lumo_SLASH_util$macros.cache.json target\lumo\util$macros.cache.json || goto :error
mv lumo-cljs\out\macros-tmp\clojure_SLASH_template$macros.js target\clojure\template$macros.js || goto :error
mv lumo-cljs\out\macros-tmp\clojure_SLASH_template$macros.cache.json target\clojure\template$macros.cache.json || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_analyzer_SLASH_macros$macros.js target\cljs\analyzer\macros$macros.js || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_analyzer_SLASH_macros$macros.cache.json target\cljs\analyzer\macros$macros.cache.json || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_compiler_SLASH_macros$macros.js target\cljs\compiler\macros$macros.js || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_compiler_SLASH_macros$macros.cache.json target\cljs\compiler\macros$macros.cache.json || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_env_SLASH_macros$macros.js target\cljs\env\macros$macros.js || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_env_SLASH_macros$macros.cache.json target\cljs\env\macros$macros.cache.json || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_pprint$macros.js target\cljs\pprint$macros.js || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_pprint$macros.cache.json target\cljs\pprint$macros.cache.json || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_test$macros.js target\cljs\test$macros.js || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_test$macros.cache.json target\cljs\test$macros.cache.json || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_reader$macros.js target\cljs\reader$macros.js || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_reader$macros.cache.json target\cljs\reader$macros.cache.json || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_tools_SLASH_reader_SLASH_reader_types$macros.cache.json target\cljs\tools\reader\reader_types$macros.cache.json  || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_tools_SLASH_reader_SLASH_reader_types$macros.js target\cljs\tools\reader\reader_types$macros.js || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_spec$macros.js target\cljs\spec$macros.js || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_spec$macros.cache.json target\cljs\spec$macros.cache.json || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_spec_SLASH_impl_SLASH_gen$macros.js target\cljs\spec\impl\gen$macros.js || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_spec_SLASH_impl_SLASH_gen$macros.cache.json target\cljs\spec\impl\gen$macros.cache.json || goto :error

echo y | rd lumo-cljs /s

:error
exit /b %errorlevel%
