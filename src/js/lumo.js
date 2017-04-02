/* @flow */

import fs from 'fs';
import path from 'path';
// $FlowIssue: this module exists.
import v8 from 'v8';
import zlib from 'zlib';
import requireFromString from 'require-from-string';
import * as util from './util';

let nexeres;
let bundledResources;
const bundledLibraries = {};
const sourcePaths = [''];

if (!__DEV__) {
  // $FlowExpectedError: only exists in the Nexe bundle.
  nexeres = require('nexeres'); // eslint-disable-line
}

type jsCodeType = {
  src: string,
  path: string,
  sourceMap: string,
};

type ClosureCompilerType = (
  opts: {
    jsCode: Array<jsCodeType>,
    externs: string[],
    languageIn: string,
    languageOut: string,
    compilationLevel: string,
  },
) => {
  compiled: string,
  errors: string[],
  warnings: string[],
};

type ResourceType =
  | {|
      type: 'bundled',
      src: string,
    |}
  | {|
      type: 'file',
      src: string,
    |}
  | {|
      type: 'jar',
      jarPath: string,
      src: string,
      date: number,
    |};

function isBundled(filename: string): boolean {
  if (__DEV__) {
    return fs.existsSync(`./target/${filename}`);
  }

  if (bundledResources === undefined) {
    bundledResources = new Set(nexeres.keys());
  }
  const fname = util.isWindows ? filename.replace(/\//g, '\\') : filename;

  return bundledResources.has(fname);
}

export function load(filename: string): ?string {
  if (isBundled(filename)) {
    if (__DEV__) {
      return fs.readFileSync(`./target/${filename}`, 'utf8');
    }
    const fname = util.isWindows ? filename.replace(/\//g, '\\') : filename;
    const gzipped = nexeres.get(fname);

    return zlib.inflateSync(gzipped).toString();
  }

  return null;
}

export function getGoogleClosureCompiler(): ClosureCompilerType {
  const property = 'closureCompiler';
  if (!Object.prototype.hasOwnProperty.call(bundledLibraries, property)) {
    v8.setFlagsFromString('--nouse_strict');
    if (__DEV__) {
      /* eslint-disable global-require */
      bundledLibraries[
        property
      ] = require('google-closure-compiler-js').compile;
      /* eslint-enable global-require */
    } else {
      const closureCompilerSource = load('googleClosureCompiler.js');
      bundledLibraries[property] = requireFromString(closureCompilerSource);
    }
    // TODO: don't set use_strict back if it was never on in the first place
    v8.setFlagsFromString('--use_strict');
  }

  return bundledLibraries[property];
}

/* eslint-disable flowtype/no-weak-types */
export function getParinfer(): {
  version: string,
  indentMode: Function,
  parenMode: Function,
} {
  /* eslint-enable flowtype/no-weak-types */
  const property = 'parinfer';
  if (!Object.prototype.hasOwnProperty.call(bundledLibraries, property)) {
    if (__DEV__) {
      // eslint-disable-next-line global-require
      bundledLibraries[property] = require('parinfer');
    } else {
      bundledLibraries[property] = requireFromString(load('parinfer.js'));
    }
  }

  return bundledLibraries[property];
}

export function getJSZip(): Class<JSZip> {
  const property = 'JSZip';
  if (!Object.prototype.hasOwnProperty.call(bundledLibraries, property)) {
    if (__DEV__) {
      // eslint-disable-next-line global-require
      bundledLibraries[property] = require('jszip');
    } else {
      bundledLibraries[property] = requireFromString(load('jszip.js'));
    }
  }

  return bundledLibraries[property];
}

// TODO: cache JARs that we know have a given file / path
export function readSource(filename: string): ?string {
  const JSZip = getJSZip();
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
  const JSZip = getJSZip();
  return sourcePaths.reduce(
    (ret: string[], srcPath: string) => {
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
    },
    [],
  );
}

export function resource(filename: string): ?ResourceType {
  const JSZip = getJSZip();
  const len = sourcePaths.length;

  if (isBundled(filename)) {
    return {
      type: 'bundled',
      src: filename,
    };
  }

  for (let i = 0; i < len; i += 1) {
    const srcPath = sourcePaths[i];

    if (srcPath.endsWith('.jar')) {
      const data = fs.readFileSync(srcPath);
      const zip = new JSZip().load(data);
      const file = zip.file(filename);

      if (file != null) {
        return {
          type: 'jar',
          jarPath: path.resolve(srcPath),
          src: filename,
          date: file.date,
        };
      }
    }

    if (fs.existsSync(path.join(srcPath, filename))) {
      return {
        type: 'file',
        src: path.resolve(srcPath, filename),
      };
    }
  }

  return null;
}

// $FlowIssue
export function addSourcePaths(srcPaths: string[]): void {
  sourcePaths.push(...srcPaths);
}

export function readSourcePaths(): string[] {
  return [...sourcePaths];
}

export function readSourceFromJar(
  {
    jarPath,
    src,
  }: {
    type: string,
    jarPath: string,
    src: string,
  },
): string {
  const JSZip = getJSZip();
  const data = fs.readFileSync(jarPath);
  const zip = new JSZip().load(data);
  const source = zip.file(src);

  return source.asText();
}

export function dumpSDK(outdir: string): void {
  if (!__DEV__) {
    nexeres.keys().forEach((res: string) => {
      const idx = res.lastIndexOf('/');

      if (idx !== -1) {
        util.ensureDir(path.join(outdir, res.slice(0, idx)));
      }

      // $FlowFixMe: need to check result of res, but bundled resources will be
      fs.writeFileSync(path.join(outdir, res), load(res), 'utf8');
    });
  }
}
