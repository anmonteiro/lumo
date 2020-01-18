(ns lumo.repl-tests
  (:require [cljs.nodejs :as node]
            [cljs.test :as t :refer [deftest is testing use-fixtures]]
            [cljs.spec.alpha :as s]
            [lumo.core :as core]
            [lumo.repl :as lumo]
            [lumo.common :as common]
            [lumo.test-util :as test-util]))

(when-not test-util/lumo-env?
  (use-fixtures :once test-util/with-lumo-globals test-util/with-cache))

(deftest test-is-readable?
  (is (nil? (#'lumo/is-readable? "(")))
  (is (= (#'lumo/is-readable? "(+ 1 2)") ""))
  (is (= (#'lumo/is-readable? "(+ 1 2) :foo") " :foo"))
  (is (nil? (#'lumo/is-readable? "")))
  (is (= (#'lumo/is-readable? ")") "")))

(deftest test-form-start
  (is (= (#'lumo/form-start "( )" 2) 0))
  (is (= (#'lumo/form-start "(let [a 1\nb 2])" 13) 5))
  (is (= (#'lumo/form-start "#{1 2 3}" 7) 1))
  (is (= (#'lumo/form-start "(+ 1 2" 5) nil))
  (is (= (#'lumo/form-start "(let [a 1\n      b 2\n      c 3]" 29) 5))
  (is (= (#'lumo/form-start "(())" 3) 0)))

(deftest test-get-highlight-coords
  (is (= (js->clj (#'lumo/get-highlight-coordinates #js ["(+ 1 2)"] 6)) [0 0]))
  (is (= (js->clj (#'lumo/get-highlight-coordinates #js ["(+ 1 2"] 5)) [-1 -1]))
  (is (= (js->clj (#'lumo/get-highlight-coordinates #js ["(+ 1 2" ")"] 0)) [0 1]))
  (is (= (js->clj (#'lumo/get-highlight-coordinates
                    #js ["(let [a 1" "      b 2" "      c 3]"] 9))
         [5 2]))
  (is (= (js->clj (#'lumo/get-highlight-coordinates #js ["(let [a 1)"] 9)) [-1 -1]))
  (is (= (js->clj (#'lumo/get-highlight-coordinates #js ["(let [a 1])"] 9)) [5 0]))
  (is (= (js->clj (#'lumo/get-highlight-coordinates
                    #js ["(let [a 1" "" "      b 2" "      c 3]"] 9))
         [5 3]))
  (is (= (js->clj (#'lumo/get-highlight-coordinates #js ["(())"] 3)) [0 0])))

(defn is-completion [i o]
  (lumo/get-completions i
    (fn [completions]
      (let [sorted (sort (into [] (map str) o))]
        (is (= (js->clj completions) sorted) (str i " should generate the " sorted " completion, instead we got " (or completions "nothing")))))))

(defn is-contains-completion
  ([i o]
   (is-contains-completion i o identity))
  ([i o f]
   (lumo/get-completions i
     (fn [completions]
       (is (f (contains? (set completions) o)) (str i " should generate completions that contain " o " completion, instead we got " (or completions "nothing")))))))

(defn is-empty-completion
  [i]
  (lumo/get-completions i
     (fn [completions]
       (is (empty? (set completions)) (str i "should generate no completion")))))

(when test-util/lumo-env?
  (deftest test-get-completions
    (testing "corner cases"
      (is-completion "(" (mapv #(str "(" %) (#'lumo/completion-candidates true nil)))
      (is-completion "" (#'lumo/completion-candidates false nil)))
    (testing "keyword completions"
      (is-completion ":" @#'lumo/keyword-completions)
      (is-completion ":a" [":added" ":arglists" ":args" ":as" ":author"])
      (is-completion ":ref" [":refer" ":refer-clojure" ":refer-macros"]))
    (testing "aliased namespaces completions"
      (with-redefs [lumo/current-alias-map (fn []
                                             '{string clojure.string})]
        (is-contains-completion "str" "string/")
        (is-contains-completion "(str" "(string/")
        (is-contains-completion "(set" "(set/" not)
        (testing "LUMO-258"
          (is-contains-completion "(string/ends" "(string/ends-with?")
          (is-contains-completion "(string/ends" "(string/ends_with_QMARK_" not)))
      (with-redefs [lumo/all-ns (fn [] '(clojure.set clojure.string))]
        (is-contains-completion "(clojure.s" "(clojure.set")))
    (testing "cljs.core function completions"
      (is-contains-completion "sub" "subs")
      (is-contains-completion "mer" "merge")
      (is-contains-completion "clojure.core/mer" "clojure.core/merge"))
    (testing "referred vars completions"
      (with-redefs [lumo/get-namespace (fn [_]
                                         '{:uses {foo foo.core}
                                           :requires {foo.core foo.core}
                                           :use-macros {longer-var bar.core}})]
        (is-contains-completion "fo" "foo")
        (is-contains-completion "lon" "longer-var")
        (is-contains-completion "(lon" "(longer-var")))
    (testing "LUMO-83"
      (is-contains-completion "clojure.core/" "clojure.core/merge")
      (is-contains-completion "" "merge")
      (with-redefs [lumo/current-alias-map (fn []
                                             '{string clojure.string})]
        (is-contains-completion "(string/" "(string/merge" not)))
    (testing "JS Completions"
      (is-contains-completion "js/con" "js/console"))
    (testing "LUMO-157"
      (is-contains-completion "(-" "(->")
      (is-contains-completion "(-" "(->>")
      (is-contains-completion "(->" "(->>")
      (is-contains-completion "(->" "(->merge" not)
      (is-contains-completion "*" "*clojurescript-version*")
      (is-contains-completion "*" "*merge" not)
      (is-contains-completion "(<" "(<merge" not)
      (is-contains-completion "(=" "(=merge" not)
      (is-contains-completion "(&" "(&merge" not)
      (is-contains-completion "(?" "(?merge" not)
      (is-contains-completion "(/" "(/merge" not)
      (is-contains-completion "(?" "(?merge" not))
    (testing "JS completions"
      (is-contains-completion "(require 'goog.m" "(require 'goog.math")
      (is-contains-completion "g/isF" "g/isFunction"))
    (testing "Spec completions"
      (testing "namespace fully qualified completion"
        (s/def ::a-spec string?)
        (is-contains-completion ":lumo.repl-tests/" ":lumo.repl-tests/a-spec")
        (reset! @#'s/registry-ref {}))
      (with-redefs [lumo/current-alias-map (constantly '{common lumo.common})]
        (testing "namespace fully qualified completion - alias"
          (s/def ::common/a-spec string?)
          (is-contains-completion "::common/" "::common/a-spec")
          (reset! @#'s/registry-ref {})))
      (testing "arbitrary fully qualified keyword"
        (s/def :arbitrary/a-spec string?)
        (is-contains-completion ":arbitrary/" ":arbitrary/a-spec")
        (reset! @#'s/registry-ref {})))
    (testing "prefix filtering"
      (with-redefs [lumo/get-namespace (fn []
                                         '{:defs {red6hlolli {:name cljs.user/red6hlolli}}})]
        (is-contains-completion "red6" "red6hlolli")))
    (testing "LUMO-332"
      (with-redefs [lumo/get-namespace (fn [ns]
                                         '{:name foo-1.core
                                           :defs {xyz {:name foo-1.core/xyz}
                                                  bar2 {:name foo-1.core/bar2}
                                                  baz-3 {:name foo-1.core/baz-3}}
                                           :uses {foo-1 foo-1.core}
                                           :requires {foo-1.core foo-1.core}})
                    lumo/all-ns (fn []
                                  '(foo-1.core))]
        (is-completion "foo-1.co" ["foo-1.core"])
        (is-completion "foo-1.core/" ["foo-1.core/baz-3" "foo-1.core/bar2" "foo-1.core/xyz"])
        (is-completion "foo-1.core/ba" ["foo-1.core/baz-3" "foo-1.core/bar2"])))
    (testing "LUMO-362"
      (is-contains-completion "(+" "(+"))
    (testing "LUMO-365"
      (is-empty-completion "(require '")
      (is-empty-completion "'"))
    (testing "LUMO-465"
      (with-redefs [lumo/get-namespace (fn [ns]
                                         '{:name foo-1.core
                                           :defs {camelCase {:name foo-1.core/camelCase}}
                                           :uses {foo-1 foo-1.core}
                                           :requires {foo-1.core foo-1.core}})
                    lumo/all-ns (fn []
                                  '(foo-1.core))]
        (is-completion "foo-1.core/cam" ["foo-1.core/camelCase"])
        (is-empty-completion "foo-1.core/camelc")))))


(deftest test-root-resource
  (is (= (#'lumo/root-resource 'foo-bar-baz) "/foo_bar_baz"))
  (is (= (#'lumo/root-resource 'foo.bar.baz) "/foo/bar/baz")))

(deftest test-get-arglists
  (is (= (lumo/get-arglists "whatever") nil))
  (is (= (lumo/get-arglists "map") '([f] [f coll] [f c1 c2] [f c1 c2 c3] [f c1 c2 c3 & colls])))
  (is (= (lumo/get-arglists "when") '([test & body]))))

(deftest test-repl-special-doc
  (is (= (with-out-str (lumo/doc merge))
         "-------------------------
cljs.core/merge
([& maps])
  Returns a map that consists of the rest of the maps conj-ed onto
  the first.  If a key occurs in more than one map, the mapping from
  the latter (left-to-right) will be the mapping in the result.
"))
  (is (= (with-out-str (lumo/doc if))
         "-------------------------
if
   (if test then else?)
Special Form
  Evaluates test. If not the singular values nil or false,
  evaluates and yields then, otherwise, evaluates and yields else. If
  else is not supplied it defaults to nil.

  Please see http://clojure.org/special_forms#if
"))
  (is (empty? (with-out-str (lumo/doc every)))))

(deftest test-apropos
  (is (some #{'cljs.core/ffirst} (lumo/apropos "ffirst")))
  (is (some #{'cljs.core/ffirst} (lumo/apropos 'ffirst)))
  ;; Clojure compat
  (is (= () (lumo/apropos ffirst)))
  (is (some #{'cljs.core/ffirst 'cljs.core/nfirst} (lumo/apropos #"[a-z]+first")))
  (is (some #{'cljs.core/aget} (lumo/apropos "aget"))))

(when test-util/lumo-env?
  (deftest test-cli-args
    ;; this requires to run:
    ;;   ./build/lumo -c test scripts/lumo_test.cljs --test-cli-option true
    (is (not-any? #(= (.-execPath js/process) %1) cljs.core/*command-line-args*) "It should not contain process.execPath")
    (is (not-any? #(= "nexe.js" %1) cljs.core/*command-line-args*) "It should not contain the path to the JavaScript file being executed")
    (is (= ["--test-cli-option" "true"] cljs.core/*command-line-args*) "It should contained the expected options (in order)")))

(when test-util/lumo-env?
  (deftest test-eval
    (is (= 1 (core/eval 1)))
    (is (= 3 (core/eval '(+ 1 2))))
    (is (= 3 (core/eval (list + 1 2))))
    (is (= 17 (core/eval '(let [a 10] (+ 3 4 a)))))
    (is (= 5 ((eval (eval '+)) 2 3)))))

(deftest ns->bundled-js-path-tests
  (is (nil? (lumo/ns->bundled-js-path nil)))
  (is (= "main.js" (lumo/ns->bundled-js-path 'cljs.core)))
  (is (= "lazy_map/core.js" (lumo/ns->bundled-js-path 'lazy_map.core))))

(deftest stacktrace-function->sym-tests
  (is (= "cljs$core$seq" (lumo/stacktrace-function->sym "cljs.core.seq")))
  (is (= "cljs$core$seq" (lumo/stacktrace-function->sym "Object.cljs.core.seq")) "the Object prefix should be trimmed away")
  (is (= "cljs$core$ffirst" (lumo/stacktrace-function->sym "cljs.core.ffirst")))
  (is (= "cljs.core.LazySeq.cljs$core$ISeqable$_seq$arity$1"
         (lumo/stacktrace-function->sym "cljs.core.LazySeq.cljs$core$ISeqable$_seq$arity$1")) "should not convert strings representing protocols")
  (is (nil? (lumo/stacktrace-function->sym nil))))

(deftest demunge-tests
  (is (nil? (lumo/demunge-sym "") "demunging an empty string should return nil"))

  (testing "demunging a symbol"
    (is (= '{:ns cljs.core :sym cljs.core/seq} (lumo/demunge-sym "cljs$core$seq")))
    (is (= '{:ns cljs.core :sym cljs.core/ffirst} (lumo/demunge-sym "cljs$core$ffirst"))))

  (testing "demunging a protocol"
    (is (= '{:ns cljs.core :obj cljs.core.LazySeq :sym cljs.core/-seq :protocol cljs.core/ISeqable}
           (lumo/demunge-sym "cljs.core.LazySeq.cljs$core$ISeqable$_seq$arity$1")))
    (is (= '{:ns cljs.core :obj Function.cljs.core.apply :sym cljs.core/-invoke :protocol cljs.core/IFn}
           (lumo/demunge-sym "Function.cljs.core.apply.cljs$core$IFn$_invoke$arity$2")))
    (is (= '{:ns cljs.core :obj Function.cljs.core.trampoline :sym cljs.core/-invoke :protocol cljs.core/IFn}
           (lumo/demunge-sym "Function.cljs.core.trampoline.cljs$core$IFn$_invoke$arity$variadic")))))

(when test-util/lumo-env?
  (deftest patch-embedded-stacktrace-tests
    (let [st-entry {:file "vm.js" :function "Script.runInThisContext" :line 65 :column 33}]
      (is (= st-entry (lumo/patch-embedded-stacktrace st-entry)) "it should not touch an entry that is not either <embedded> or evalmachine.<anonymous>"))

    (let [st-entry {:file "<embedded>" :function "Object.cljs.core.first" :line 503 :column 213}
          expected {:file "cljs/core.js" :function "Object.cljs.core.first" :line 503 :column 213}]
      (is (= expected (lumo/patch-embedded-stacktrace st-entry))))

    (let [st-entry {:file "evalmachine.<anonymous>" :function "Function.cljs.core.apply.cljs$core$IFn$_invoke$arity$2" :line 333 :column 444}
          expected {:file "cljs/core.js" :function "Function.cljs.core.apply.cljs$core$IFn$_invoke$arity$2" :line 333 :column 444}]
      (is (= expected (lumo/patch-embedded-stacktrace st-entry))))

    (let [st-entry {:file "evalmachine.<anonymous>" :function "cljs.core.ffirst" :line 563 :column 448}
          expected {:file "cljs/core.js" :function "cljs.core.ffirst" :line 563 :column 448}]
      (is (= expected (lumo/patch-embedded-stacktrace st-entry))))))

(when test-util/lumo-env?
  (deftest ffirst-stacktrace-smoke-tests
    (let [st-entries [{:file "evalmachine.<anonymous>" :function "Object.cljs.core.seq" :line 502 :column 410} {:file "evalmachine.<anonymous>" :function "Object.cljs.core.first" :line 503 :column 213} {:file "evalmachine.<anonymous>" :function "cljs.core.ffirst" :line 563 :column 448} {:file "evalmachine.<anonymous>" :function nil :line 1 :column 18} {:file "vm.js" :function "ContextifyScript.Script.runInContext" :line 59 :column 29} {:file "vm.js" :function "Object.runInContext" :line 120 :column 6} {:file "Object.lumoEval" :function nil :line nil :column nil} {:file "Object.lumo.repl.caching_node_eval" :function nil :line nil :column nil} {:file "evalmachine.<anonymous>" :function nil :line 5824 :column 287} {:file "evalmachine.<anonymous>" :function "z" :line 5825 :column 306}]]
      (= (into [] lumo/stacktrace-patch-xf st-entries)
         [{:file "cljs/core.js" :function "Object.cljs.core.seq" :line 502 :column 410}
          {:file "cljs/core.js" :function "Object.cljs.core.first" :line 503 :column 213}
          {:file "cljs/core.js" :function "cljs.core.ffirst" :line 563 :column 448}
          {:file "vm.js" :function "ContextifyScript.Script.runInContext" :line 59 :column 29}
          {:file "vm.js" :function "Object.runInContext" :line 120 :column 6}
          {:file "Object.lumoEval" :function nil :line nil :column nil}
          {:file "Object.lumo.repl.caching_node_eval" :function nil :line nil :column nil}]))))

(when test-util/lumo-env?
  (deftest patch-missing-function-stacktrace-tests
    (let [st-entry {:file "Object.lumo.repl.caching_node_eval" :function nil :line nil :column nil}
          embedded {:file "<embedded>" :function "Object.lumo.repl.caching_node_eval" :line nil :column nil}]
      (is (= embedded (lumo/patch-missing-function-stacktrace st-entry))))))
