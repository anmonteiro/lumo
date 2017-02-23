import path from 'path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

export default (async function renderPage(
  { assetsByChunkName, requireAsset },
  request,
) {
  /* eslint-disable no-undef, camelcase */
  const originalRequire = __non_webpack_require__;
  __non_webpack_require__ = mod => {
    const assetKey = path.relative('./', mod).replace(/\.js[^/]*$/, '');
    if (assetsByChunkName[assetKey] != null) {
      return requireAsset(mod);
    }

    return originalRequire(mod);
  };
  /* eslint-enable no-undef, camelcase */

  const { default: component } = await import(
    /* webpackChunkName: "[request]" */
    `./src/${path.join(request)}.js`,
  );
  return `<!DOCTYPE html>${renderToStaticMarkup(createElement(component))}`;
});
