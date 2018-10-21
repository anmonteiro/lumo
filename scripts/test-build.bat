REM test the build artifact
build\lumo.exe -c src\test\cljs;src\test\lumo;src\test\cljs_cp -D org.clojure/test.check:0.10.0-alpha3 scripts\lumo_test.cljs --test-cli-option true
