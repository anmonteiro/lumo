(ns lumo.repl-tests
  (:require [cljs.nodejs :as node]
            [cljs.test :refer [deftest is testing use-fixtures]]
            [lumo.repl :as lumo]
            [lumo.common :as common]
            [lumo.test-util :as test-util]))

(use-fixtures :once test-util/with-lumo-globals test-util/with-cache)

(deftest test-is-readable?
  (is (false? (lumo/is-readable? "(")))
  (is (= (lumo/is-readable? "(+ 1 2)") ""))
  (is (= (lumo/is-readable? "(+ 1 2) :foo") " :foo"))
  (is (= (lumo/is-readable? "") ""))
  (is (= (lumo/is-readable? ")") "")))

(deftest indent-space-count-test
  (is (= (lumo/indent-space-count "(let [") 6))
  (is (= (lumo/indent-space-count "(do") 1))
  (is (= (lumo/indent-space-count "(let [a 1") 6))
  (is (= (lumo/indent-space-count "[[[[\n]") 2)))

(deftest test-form-start
  (is (= (lumo/form-start "( )" 2) 0))
  (is (= (lumo/form-start "(let [a 1\nb 2])" 13) 5))
  (is (= (lumo/form-start "#{1 2 3}" 7) 1))
  (is (= (lumo/form-start "(+ 1 2" 5) nil))
  (is (= (lumo/form-start "(let [a 1\n      b 2\n      c 3]" 29) 5))
  (is (= (lumo/form-start "(())" 3) 0)))

(deftest test-get-highlight-coords
  (is (= (js->clj (lumo/get-highlight-coordinates #js ["(+ 1 2)"] 6)) [0 0]))
  (is (= (js->clj (lumo/get-highlight-coordinates #js ["(+ 1 2"] 5)) [-1 -1]))
  (is (= (js->clj (lumo/get-highlight-coordinates #js ["(+ 1 2" ")"] 0)) [0 1]))
  (is (= (js->clj (lumo/get-highlight-coordinates
                    #js ["(let [a 1" "      b 2" "      c 3]"] 9))
         [5 2]))
  (is (= (js->clj (lumo/get-highlight-coordinates #js ["(let [a 1)"] 9)) [-1 -1]))
  (is (= (js->clj (lumo/get-highlight-coordinates #js ["(let [a 1])"] 9)) [5 0]))
  (is (= (js->clj (lumo/get-highlight-coordinates
                    #js ["(let [a 1" "" "      b 2" "      c 3]"] 9))
         [5 3]))
  (is (= (js->clj (lumo/get-highlight-coordinates #js ["(())"] 3)) [0 0])))

(defn is-completion [i o]
  (lumo/get-completions i
    (fn [completions]
      (is (= (js->clj completions) (sort (into [] (map str) o)))))))

(defn is-contains-completion
  ([i o]
   (is-contains-completion i o identity))
  ([i o f]
   (lumo/get-completions i
     (fn [completions]
       (is (f (contains? (set completions) o)))))))

(deftest test-get-completions
  (testing "keyword completions"
    (is-completion ":" lumo/keyword-completions)
    (is-completion ":a" [":args" ":as"])
    (is-completion ":ref" [":refer" ":refer-clojure" ":refer-macros"]))
  (testing "aliased namespaces completions"
    (with-redefs [lumo/current-alias-map (fn []
                                           '{string clojure.string})]
      (is-contains-completion "str" "string/")
      (is-contains-completion "(str" "(string/")
      (is-contains-completion "(set" "(set/" not))
    (with-redefs [lumo/all-ns (fn [] '(clojure.set clojure.string))]
      (is-contains-completion "(clojure.s" "(clojure.set")))
  (testing "cljs.core function completions"
    (is-contains-completion "sub" "subs")
    (is-contains-completion "mer" "merge"))
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
    (is-contains-completion "" "merge"))
  (testing "JS Completions"
    (is-contains-completion "js/con" "js/console")))

(deftest test-root-resource
  (is (= (lumo/root-resource 'foo-bar-baz) "/foo_bar_baz"))
  (is (= (lumo/root-resource 'foo.bar.baz) "/foo/bar/baz")))

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
")))
