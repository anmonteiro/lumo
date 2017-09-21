(ns test-check.core-test
  (:require [cljs.spec.test.alpha :as stest]
            [test-check.core])
  (:require-macros [cljs.spec.test.alpha :as stest]))

(stest/summarize-results (stest/check 'test-check.core))
