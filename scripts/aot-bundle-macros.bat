REM remove the target dir
echo y | rd target /s || goto :error

REM remove possible artifacts of failed compilations
echo y | rd lumo-cljs /s

REM move the backed up resources back to target
mv resources_bak target || goto :error

echo "### Compiling Macro Namespaces"

mkdir lumo-cljs\out\macros-tmp || goto :error

echo (require-macros 'clojure.template 'cljs.spec 'cljs.spec.impl.gen 'cljs.test) | build\lumo.exe --quiet -c target -sdk lumo-cljs/out/macros-tmp || goto :error

mv lumo-cljs\out\macros-tmp\clojure_SLASH_template$macros.js target\clojure\template$macros.js || goto :error
mv lumo-cljs\out\macros-tmp\clojure_SLASH_template$macros.cache.json target\clojure\template$macros.cache.json || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_test$macros.js target\cljs\test$macros.js || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_test$macros.cache.json target\cljs\test$macros.cache.json || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_spec$macros.js target\cljs\spec$macros.js || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_spec$macros.cache.json target\cljs\spec$macros.cache.json || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_spec_SLASH_impl_SLASH_gen$macros.js target\cljs\spec\impl\gen$macros.js || goto :error
mv lumo-cljs\out\macros-tmp\cljs_SLASH_spec_SLASH_impl_SLASH_gen$macros.cache.json target\cljs\spec\impl\gen$macros.cache.json || goto :error

echo y | rd lumo-cljs /s

:error
exit /b %errorlevel%
