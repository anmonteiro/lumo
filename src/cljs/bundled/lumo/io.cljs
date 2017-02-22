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
