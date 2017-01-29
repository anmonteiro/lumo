/* @flow */

import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import JSZip from 'jszip';
import { isWindows } from './util';

let nexeres;
const sourcePaths = [''];

if (!__DEV__) {
  // $FlowExpectedError: only exists in the Nexe bundle.
  nexeres = require('nexeres'); // eslint-disable-line
}

export function load(filename: string): ?string {
  try {
    if (__DEV__) {
      return fs.readFileSync(`./target/${filename}`, 'utf8');
    }
    const fname = isWindows ? filename.replace(/\//g, '\\') : filename;
    const gzipped = nexeres.get(fname);

    return zlib.inflateSync(gzipped).toString();
  } catch (_) {
    return null;
  }
}

// TODO: cache JARs that we know have a given file / path
export function readSource(filename: string): ?string {
  const len = sourcePaths.length;
  for (let i = 0; i < len; i += 1) {
    const srcPath = sourcePaths[i];

    try {
      if (srcPath.endsWith('.jar')) {
        const data = fs.readFileSync(srcPath);
        const zip = new JSZip().load(data);
        const source = zip.file(filename);

        if (source != null) {
          return source.asText();
        }
      }

      return fs.readFileSync(path.join(srcPath, filename), 'utf8');
    } catch (_) {} // eslint-disable-line no-empty
  }
  return null;
}

export function readCache(filename: string): ?string {
  try {
    return fs.readFileSync(filename, 'utf8');
  } catch (_) {
    return null;
  }
}

export function writeCache(filename: string, source: string): ?Error {
  try {
    return fs.writeFileSync(filename, source, 'utf8');
  } catch (e) {
    return e;
  }
}

export function loadUpstreamForeignLibs(): string[] {
  return sourcePaths.reduce((ret: string[], srcPath: string) => {
    if (srcPath.endsWith('.jar')) {
      try {
        const data = fs.readFileSync(srcPath);
        const zip = new JSZip().load(data);
        const source = zip.file('deps.cljs');

        if (source != null) {
          ret.push(source.asText());
        }
      } catch (_) {} // eslint-disable-line no-empty
    }
    return ret;
  }, []);
}

export function fileExists(filename: string): boolean {
  const len = sourcePaths.length;
  for (let i = 0; i < len; i += 1) {
    const srcPath = sourcePaths[i];

    if (srcPath.endsWith('.jar')) {
      const data = fs.readFileSync(srcPath);
      const zip = new JSZip().load(data);
      const file = zip.file(filename);

      if (file != null) {
        return true;
      }
    }

    if (fs.existsSync(path.join(srcPath, filename))) {
      return true;
    }
  }

  return false;
}

// $FlowIssue
export function addSourcePaths(srcPaths: string[]): void {
  sourcePaths.push(...srcPaths);
}
