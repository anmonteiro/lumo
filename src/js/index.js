/* @flow */

import type { CLIOptsType } from './cli';

const repl = require('./repl');
const cli = require('./cli');

function processRuntimeOpts({ help, quiet, ...opts }: CLIOptsType): void {
  // if help, print help and bail
  if (help) {
    return cli.printHelp();
  }

  if (!quiet) {
    cli.printBanner();
  }

  return repl.start(opts);
}

function main(): void {
  const cliOpts = cli.getCLIOpts();

  processRuntimeOpts(cliOpts);
}

main();
