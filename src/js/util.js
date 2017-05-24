/* @flow */

import fs from 'fs';
import os from 'os';
import path from 'path';

export function expandPath(somePath: string): string {
  const tildeExpandedPath = somePath.startsWith('~')
    ? somePath.replace(/^~/, os.homedir)
    : somePath;
  return path.resolve(tildeExpandedPath);
}

export const isWindows: boolean = /^Windows/.test(os.type());

export function srcPathsFromClasspathStrings(cpStrs: string[]): string[] {
  return cpStrs.reduce((ret: string[], colonSepPaths: string) => {
    const sep = !isWindows ? ':' : /;|:/;
    const paths = colonSepPaths.split(sep);

    ret.push(...paths);
    return ret;
  }, []);
}

export function isWhitespace(s: string): boolean {
  return s.trim() === '';
}

// eslint-disable-next-line consistent-return
function ensureDirInner(dir: string): void {
  if (!fs.existsSync(dir)) {
    return fs.mkdirSync(dir);
  }

  const stats = fs.statSync(dir);

  if (!stats.isDirectory()) {
    throw new Error(`${dir} exists but is not a directory.`);
  }
}

export function ensureDir(dir: string): void {
  const dirs = dir.split(/(\/[^\/]+)/); // eslint-disable-line no-useless-escape
  const len = dirs.length;

  for (let i = 0; i < len; i += 1) {
    if (!isWhitespace(dirs[i])) {
      ensureDirInner(dirs.slice(0, i + 1).join(''));
    }
  }
}

export function currentTimeMicros(): number {
  const [secs, nanos] = process.hrtime();
  // eslint-disable-next-line no-mixed-operators
  return (secs * 1e9 + nanos) / 1e3;
}
