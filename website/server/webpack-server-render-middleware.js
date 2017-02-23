/* eslint-disable no-console, import/no-extraneous-dependencies */
const path = require('path');
const url = require('url');
const MemoryFileSystem = require('memory-fs');
const evalAsModule = require('eval-as-module');

const consts = {
  LEADING_SLASH_RE: /^\//,
  INDEX_JS_SUFFIX_RE: /\/index\.js[^/]*$/,

  HAS_EXT_RE: /\.[^/]*$/,
  // Captures the set of tags and extension in parens ()
  ALL_TAGS_AND_EXT_RE: /\.([^/]+)$/,

  // URL bundle-routing scheme:
  // localhost:8080/path/to/Root.x.y.z.a.b.c.d.e.f.g.bundle
  //                             \----- tags ------/ \type/
  // Route types:
  PAGE_EXT_RE: /\.html$/,

  BUNDLE_EXT: '.bundle',
  BUNDLE_EXT_RE: /\.bundle$/,

  MAP_EXT: '.map',
  MAP_EXT_RE: /\.map$/,

  // Route tags:
  INCLUDE_REQUIRE_TAG: 'includeRequire',
  RUN_MODULE_TAG: 'runModule',

  // Misc:
  JS_SRC_EXT: '.js',
  JS_SRC_EXT_RE: /\.js[^/]*$/,
};

const middlewareCreator = (webpack, { cssBundleFilename, ...options }) => {
  const compiler = webpack;
  // the state, false: bundle invalid, true: bundle valid
  let state = false;
  let queue = [];
  const fs = new MemoryFileSystem();
  compiler.outputFileSystem = fs;
  let serverBundleStat;

  const watchOptions = {
    aggregateTimeout: 200,
    ...options.watchOptions,
  };

  if (cssBundleFilename != null) {
    consts.CSS_BUNDLE_RE = new RegExp(cssBundleFilename, 'i');
  }

  const compilerOutputPath = compiler.options.output.path;

  const filename = `${compilerOutputPath}/main.js`;

  function requireAsset(assetName) {
    const assetAbsolutePath = path.join(compilerOutputPath, assetName);
    const assetSource = fs.readFileSync(assetAbsolutePath, 'utf8');

    return evalAsModule(assetSource, assetAbsolutePath).exports;
  }

  compiler.plugin('done', stats => {
    if (!options.quiet) console.log(stats.toString());

    state = true;
    serverBundleStat = stats.toJson();

    // Do the stuff in nextTick, because bundle may be invalidated
    // if a change happend while compiling
    process.nextTick(() => {
      // check if still in valid state
      if (!state) return;

      console.info('webpack: bundle is now VALID.');

      // execute callbacks that are delayed
      queue.forEach(cb => cb());
      queue = [];
    });
  });

  const invalidPlugin = () => {
    if (state) {
      console.info('webpack: server bundle is now INVALID.');
    }
    state = false;
  };

  const invalidAsyncPlugin = (_, callback) => {
    invalidPlugin();
    callback();
  };

  compiler.plugin('invalid', invalidPlugin);
  compiler.plugin('watch-run', invalidAsyncPlugin);
  compiler.plugin('run', invalidAsyncPlugin);

  // wait for bundle valid
  const ready = (fn, req) => {
    if (state) return fn();
    console.log(
      `webpack: wait until server bundle finished: ${req.url || fn.name}`,
    );
    return queue.push(fn);
  };

  compiler.watch(watchOptions, err => {
    if (err) throw err;
  });

  return (req, res, next) => {
    async function processRequest() {
      const reqPath = url.parse(req.url).pathname;

      const isComponent =
        consts.PAGE_EXT_RE.test(reqPath) || !consts.HAS_EXT_RE.test(reqPath);

      const isCSSBundle =
        consts.CSS_BUNDLE_RE && consts.CSS_BUNDLE_RE.test(reqPath);

      if (!isComponent && !isCSSBundle) {
        return next();
      }

      let markup;
      if (isComponent) {
        const chunkPath = consts.HAS_EXT_RE.test(reqPath)
          ? reqPath.replace(consts.ALL_TAGS_AND_EXT_RE, '')
          : path.join(reqPath, 'index');
        const mainSource = fs.readFileSync(filename, 'utf8');
        const { assetsByChunkName } = serverBundleStat;
        const { exports: { default: renderPage } } = evalAsModule(
          mainSource,
          filename,
        );

        try {
          markup = await renderPage(
            {
              assetsByChunkName,
              requireAsset,
            },
            path.relative('/', chunkPath),
          );
        } catch (e) {
          return next(e);
        }
      } else if (isCSSBundle) {
        markup = fs.readFileSync(
          path.join(compilerOutputPath, reqPath),
          'utf8',
        );
      }

      res.setHeader('Date', new Date().toUTCString());
      // Always assume we had compiled something that may have changed.
      res.setHeader('Last-Modified', new Date().toUTCString());
      res.setHeader('Content-Length', Buffer.byteLength(markup, 'utf8'));
      res.setHeader(
        'Content-Type',
        `text/${isComponent ? 'html' : 'css'}; charset=utf-8'`,
      );

      return res.end(markup);
    }

    // delay the request until we have a vaild bundle
    ready(processRequest, req);
  };
};

module.exports = middlewareCreator;
