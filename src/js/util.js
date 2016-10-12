/* @flow */

const os = require('os');

function expandPath(somePath: string): string {
  return somePath.startsWith('~') ? somePath.replace(/^~/, os.homedir) : somePath;
}

function srcPathsFromClasspathStrings(cpStrs: string[]): string[] {
  return cpStrs.reduce((ret: string[], colonSepPaths: string) => {
    const paths = colonSepPaths.split(':');

    return ret.concat(paths.map(expandPath));
  }, []);
}

module.exports = {
  srcPathsFromClasspathStrings,
};
