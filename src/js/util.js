/* @flow */

const fs = require('fs');
const os = require('os');
const path = require('path');

function expandPath(somePath: string): string {
  return somePath.startsWith('~') ? somePath.replace(/^~/, os.homedir) : somePath;
}

export const isWindows: boolean = /^Windows/.test(os.type());

export function srcPathsFromClasspathStrings(cpStrs: string[]): string[] {
  return cpStrs.reduce((ret: string[], colonSepPaths: string) => {
    const sep = !isWindows ? ':' : ';';
    const paths = colonSepPaths.split(sep);

    return ret.concat(paths.map(expandPath).map(path.normalize));
  }, []);
}

/* eslint-disable consistent-return */
export function ensureDir(dir: string): void {
  if (!fs.existsSync(dir)) {
    return fs.mkdirSync(dir);
  }

  const stats = fs.statSync(dir);

  if (!stats.isDirectory()) {
    throw new Error(`${dir} exists but is not a directory.`);
  }
}

export function ensureArray<T>(maybeArray: T[] | T): T[] {
  return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}

export function isWhitespace(s: string): boolean {
  return s.trim() === '';
}
