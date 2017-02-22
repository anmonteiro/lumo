/* @flow */

import fs from 'fs';
import os from 'os';
import path from 'path';

function expandPath(somePath: string): string {
  const tildeExpandedPath = somePath.startsWith('~') ?
        somePath.replace(/^~/, os.homedir) : somePath;
  return path.resolve(tildeExpandedPath);
}

export const isWindows: boolean = /^Windows/.test(os.type());

export function srcPathsFromClasspathStrings(cpStrs: string[]): string[] {
  return cpStrs.reduce((ret: string[], colonSepPaths: string) => {
    const sep = !isWindows ? ':' : /;|:/;
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

export function isWhitespace(s: string): boolean {
  return s.trim() === '';
}

export function currentTimeMicros(): number {
  const [secs, nanos] = process.hrtime();
  return ((secs * 1e9) + nanos) / 1e3;
}
