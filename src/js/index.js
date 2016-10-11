/* @flow */

import type { CLIOptsType } from './cli';

const cli = require('./cli');
const lumo = require('./lumo');
const repl = require('./repl');

function srcPathsFromClasspathStrings(cpStrs: string[]): string[] {
  return cpStrs.reduce((ret: string[], colonSepPaths: string) => {
    const paths = colonSepPaths.split(':');

    return ret.concat(paths);
  }, []);
}

function processRuntimeOpts({ help, quiet, classpath, ...opts }: CLIOptsType): void {
  // if help, print help and bail
  if (help) {
    return cli.printHelp();
  }

  if (!quiet) {
    cli.printBanner();
  }

  if (classpath != null) {
    const cp = Array.isArray(classpath) ? classpath : [classpath];
    const srcPaths = srcPathsFromClasspathStrings(cp);

    lumo.setSourcePaths(srcPaths);
  }

  return repl.start(opts);
}

function main(): void {
  const cliOpts = cli.getCLIOpts();

  processRuntimeOpts(cliOpts);
}

main();
