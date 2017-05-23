(ns lumo.io)

(defn resource [path]
  (js/$$LUMO_GLOBALS.resource path))

(defn spit [filename content]
  (js/$$LUMO_GLOBALS.fs.writeFileSync filename content "utf8"))

(defn slurp [file-or-resource]
  (cond
    (string? file-or-resource) (js/$$LUMO_GLOBALS.fs.readFileSync file-or-resource "utf8")

    (and (goog/isObject file-or-resource) (= (.-type file-or-resource) "bundled"))
    (js/$$LUMO_GLOBALS.load (.-src file-or-resource))

    (and (goog/isObject file-or-resource) (= (.-type file-or-resource) "file"))
    (js/$$LUMO_GLOBALS.fs.readFileSync (.-src file-or-resource) "utf8")

    (and (goog/isObject file-or-resource) (= (.-type file-or-resource) "jar"))
    (js/$$LUMO_GLOBALS.readSourceFromJar file-or-resource)

    :else (do
            (js/console.log "omg it happened" file-or-resource (pr-str file-or-resource))
            (throw (ex-info "should never happen!" {:x file-or-resource})))))

(def ^:private fs (js/require "fs"))
(def ^:private readline (js/require "readline"))

;; function readFileAsync (file, encoding) {
;;   return new Promise(function (resolve, reject) {
;;     fs.readFile(file, encoding, function (err, data) {
;;       if (err) return reject(err) // rejects the promise with `err` as the reason
;;       resolve(data)               // fulfills the promise with `data` as the value
;;     })
;;   })
;; }
;; readFileAsync('myfile.txt').then(console.log, console.error)

(defn *readline* []
  (. (new js/Promise
          (fn [callback error-callback]
            (.createInterface readline #js {"input" (.-stdin js/process)
                                            "output" (.-stdout js/process)
                                            "terminal" false}
                              (.on readline "line"
                                   (fn [line]
                                     (callback line)))
                              (.on readline "error"
                                   (fn [error]
                                     (error-callback error))))
            #_(.readFile fs file encoding
                         (fn [err data]
                           (if err (reject err)
                               (resolve data))))))
     then println js/Error))

;; (*readline*)

;; (.ls js/process)

;; (. (readFileAsync "build.boot" "utf8") then print print)
