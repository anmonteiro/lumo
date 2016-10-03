set -e

#gsed -e "s/'/\\\'/g" -e "1s/^/module.exports = ' /" -e "\$s/$/';/" z.js
#| gsed -e ':a;N;$!ba;s/\n/ /g' > lol.js
# -e 's/\\/\\\\/g'

gnused() {
  if hash gsed 2>/dev/null; then
    gsed "$@"
  else
    sed "$@"
  fi
}

# wrap the CLJS source in a string and export that
# requires `brew install gsed` on macOS
gnused -i -e 's/\\/\\\\/g' -e 's/`/\\`/g' -e '1s/^/module.exports = ` /' -e '$s/$/`;/' target/main.js

# Transpile ES6 -> ES5
npm run babel

# copy generated output to the target dir
cp lib/* target

# Remove generated lib/ dir created by babel
rm -rf lib
