(ns lumo.io
  (:require fs))

(defn resource [path]
  (js/$$LUMO_GLOBALS.resource path))

(defn spit [filename content]
  (fs/writeFileSync filename content "utf8"))

(defn slurp [file-or-resource]
  (if (string? file-or-resource)
    (fs/readFileSync file-or-resource "utf8")
    (if (goog/isObject file-or-resource)
      (let [type (.-type file-or-resource)]
        (cond
          (identical? type "bundled")
          (js/$$LUMO_GLOBALS.load (.-src file-or-resource))

          (identical? type "file")
          (fs/readFileSync (.-src file-or-resource) "utf8")

          (identical? type "jar")
          (js/$$LUMO_GLOBALS.readSourceFromJar file-or-resource)))

      (throw (ex-info (str "Resource doesn't exist: " file-or-resource) {:file file-or-resource})))))

(defn copy [src dest]
  (if (string? src)
    (fs/copyFileSync src dest)
    (if (goog/isObject src)
      (let [type (.-type src)]
        (cond
          (identical? type "bundled")
          (spit dest (js/$$LUMO_GLOBALS.load (.-src src)))

          (identical? type "file")
          (fs/copyFileSync (.-src src) dest)

          (identical? type "jar")
          (spit dest (js/$$LUMO_GLOBALS.readSourceFromJar src))))

      (throw (ex-info (str "Resource doesn't exist: " src) {:file src})))))
