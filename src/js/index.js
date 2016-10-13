/* @flow */

import * as cli from './cli';
import * as lumo from './lumo';
import startREPL from './repl';
import * as util from './util';

import type { CLIOptsType } from './cli';

function processRuntimeOpts(cliOpts: CLIOptsType): void {
  const opts = { ...cliOpts };
  const { cache, classpath, help, quiet, verbose } = opts;
  const autoCache = opts['auto-cache'];

  // if help, print help and bail
  if (help) {
    return cli.printHelp();
  }

  if (!quiet) {
    cli.printBanner();
  }

  if (cache || autoCache) {
    const cachePath = cache || '.lumo_cache';
    util.ensureDir(cachePath);

    opts.cache = cachePath;
  }

  // TODO: print classpath to stdout if `:verbose`
  if (classpath != null) {
    const cp = Array.isArray(classpath) ? classpath : [classpath];
    const srcPaths = util.srcPathsFromClasspathStrings(cp);

    lumo.setSourcePaths(srcPaths);
  }

  return startREPL(opts);
}

function main(): void {
  const cliOpts = cli.getCLIOpts();

  processRuntimeOpts(cliOpts);
}

main();
