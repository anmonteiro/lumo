/* eslint-disable import/no-extraneous-dependencies */
const http = require('http');
const path = require('path');

const compression = require('compression');
const connect = require('connect');
const errorhandler = require('errorhandler');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const optimist = require('optimist');
const serveStatic = require('serve-static');
const webpack = require('webpack');

const convert = require('./convert.js');
const webpackServerRenderMiddleware = require('./webpack-server-render-middleware');
const webpackConfig = require('../webpack.config');

const compiler = webpack(webpackConfig);

const argv = optimist.argv;

const PROJECT_ROOT = path.resolve(__dirname, '..');
const FILE_SERVE_ROOT = path.join(PROJECT_ROOT, 'src');

let port = argv.port;
if (argv.$0.indexOf('node ./server/generate.js') !== -1) {
  // Using a different port so that you can publish the website
  // and keeping the server up at the same time.
  port = 8079;
}

const app = connect()
  .use((req, res, next) => {
    // convert all the md files on every request. This is not optimal
    // but fast enough that we don't really need to care right now.
    convert(next);
  })
  .use(
    webpackServerRenderMiddleware(compiler, {
      quiet: true,
      cssBundleFilename: 'css/main.css',
    }),
  )
  // .use(reactSSRMiddleware)
  .use(serveStatic(FILE_SERVE_ROOT))
  .use(favicon(path.join(FILE_SERVE_ROOT, 'favicon.ico')))
  .use(morgan('combined'))
  .use(compression())
  .use(errorhandler());

const portToUse = port || 8080;
const server = http.createServer(app);
server.listen(portToUse);

// eslint-disable-next-line no-console
console.log(`Open http://localhost:${portToUse}/index.html`);

module.exports = server;
