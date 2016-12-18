(ns lumo.path-tests
  (:require [cljs.nodejs :as node]
            [cljs.test :refer [deftest is testing]]
            [lumo.path :as path]
            [lumo.path.posix :as posix]
            [lumo.path.windows :as win]))

(deftest test-basename
  (is (= "baz.quux" (path/basename  "/foo/bar/baz.quux")))
  (is (= "baz.quux" (posix/basename "/foo/bar/baz.quux")))
  (is (= "baz.quux" (win/basename   "C:\\foo\\bar\\baz.quux"))))

(deftest test-dirname
  (is (#{"/foo/bar" "C:\\foo\\bar"}  (path/dirname  "/foo/bar/baz.quux")))
  (is (= "/foo/bar"     (posix/dirname "/foo/bar/baz.quux")))
  (is (= "C:\\foo\\bar" (win/dirname   "C:\\foo\\bar\\baz.quux"))))

(deftest test-extension
  (is (= ".quux" (path/extension  "/foo/bar/baz.quux")))
  (is (= ".quux" (posix/extension "/foo/bar/baz.quux")))
  (is (= ".quux" (win/extension   "C:\\foo\\bar\\baz.quux"))))

(deftest test-absolute?
  (is (path/absolute?  (path/resolve ".")))
  (is (posix/absolute? "/a/b"))
  (is (win/absolute?   "C:\\a\\b")))

(deftest test-join
  (is (#{"foo/bar" "foo\\bar"}  (path/join "foo" "bar")))
  (is (= "foo/bar"  (posix/join "foo" "bar")))
  (is (= "foo\\bar" (win/join "foo" "bar"))))

(deftest test-normalize
  (is (= "foo" (path/normalize "./foo")))
  (is (= "foo" (posix/normalize "./foo")))
  (is (= "foo" (win/normalize "./foo"))))

(deftest test-relative
  (is (= ".." (path/relative  (path/resolve  "package.json") ".")))
  (is (= ".." (posix/relative (posix/resolve "package.json") (posix/resolve "."))))
  (is (= ".." (win/relative   (win/resolve "package.json")  "."))))

(deftest test-resolve
  (is (= (path/resolve  ".") (path/resolve)))
  (is (= (posix/resolve ".") (posix/resolve)))
  (is (= (win/resolve   ".") (win/resolve))))

(deftest test-parse
  (let [r1 (path/parse  (path/resolve "package.json"))
        r2 (posix/parse (posix/resolve "package.json"))
        r3 (win/parse   (win/resolve "package.json"))
        posix-root (posix/resolve)
        win-root   (win/resolve)]
    (is (= "package.json" (:base r1) (:base r2) (:base r3)))
    (is (= ".json" (:ext r1) (:ext r2) (:ext r3)))
    (is (= "package" (:name r1) (:name r2) (:name r3)))
    (is (= posix-root (:dir r2)))
    (is (= win-root   (:dir r3)))
    (is (#{posix-root win-root} (:dir r1)))))
    

(deftest test-format
  (let [b1 (path/resolve "package.json")
        b2 (posix/resolve "package.json")
        b3 (win/resolve "package.json")
        p1 (path/parse  b1)
        p2 (posix/parse b2)
        p3 (win/parse   b3)
        r1 (path/format  (path/parse b1))
        r2 (posix/format (posix/parse b2))
        r3 (win/format   (win/parse b3))]
    (is (= b1 r1))
    (is (= b2 r2))
    (is (= b3 r3))))

