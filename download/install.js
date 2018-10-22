// Installation code adapted from https://github.com/zeit/now-cli/
var path = require('path')
var fs = require('fs')

var dist = path.join(__dirname, 'dist')
var src = path.join(__dirname, 'src')

// Don't install when developing locally
if (fs.existsSync(src)) {
  process.exit(0)
}

require(path.join(dist, 'download.js'))
