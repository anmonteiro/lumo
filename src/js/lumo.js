/* @flow */

import fs from 'fs';
import path from 'path';
// $FlowIssue: it's there
import { REPLServer } from 'repl';
// $FlowIssue: this module exists.
import v8 from 'v8';
import zlib from 'zlib';
import JSZip from 'jszip';
import ArrayStream from './array-stream';
import * as util from './util';

// TODO: make this a set
const sourcePaths = [''];

type SourceType = {|
  source: string,
  modified: number,
|};

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

  const fname = util.isWindows ? filename.replace(/\//g, '\\') : filename;

  return lumo.internal.embedded.resources[fname] != null;
}

export function load(filename: string): ?string {
  if (__DEV__) {
    try {
      return fs.readFileSync(`./target/${filename}`, 'utf8');
    } catch (e) {
      return null;
    }
  }

  const fname = util.isWindows ? filename.replace(/\//g, '\\') : filename;
  const gzipped = lumo.internal.embedded.get(fname);
  if (gzipped != null) {
    return zlib.inflateSync(gzipped).toString();
  }

  return null;
}

// eslint-disable-next-line flowtype/no-weak-types
export function getGoogleClosureCompiler(): Function {
  v8.setFlagsFromString('--nouse_strict');

  // eslint-disable-next-line global-require
  const googleClosureCompiler = require('google-closure-compiler-js');

  // TODO: don't set use_strict back if it was never on in the first place
  v8.setFlagsFromString('--use_strict');
  return googleClosureCompiler;
}

// TODO: cache JARs that we know have a given file / path
export function readSource(filename: string): ?SourceType {
  const len = sourcePaths.length;
  for (let i = 0; i < len; i += 1) {
    const srcPath = sourcePaths[i];

    try {
      if (srcPath.endsWith('.jar')) {
        const data = fs.readFileSync(srcPath);
        const zip = new JSZip().load(data);
        const file = zip.file(filename);

        if (file != null) {
          return {
            source: file.asText(),
            modified: file.date.getTime(),
          };
        }
      }
      const filePath = path.join(srcPath, filename);
      return {
        source: fs.readFileSync(filePath, 'utf8'),
        modified: fs.statSync(filePath).mtime.getTime(),
      };
    } catch (_) {} // eslint-disable-line no-empty
  }
  return null;
}

export function readCache(filename: string): ?SourceType {
  try {
    return {
      source: fs.readFileSync(filename, 'utf8'),
      modified: fs.statSync(filename).mtime.getTime(),
    };
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

export function resource(filename: string): ?ResourceType {
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

export function addSourcePaths(srcPaths: string[]): void {
  const expanded = srcPaths.map((srcPath: string) =>
    // $FlowIssue
    path.normalize(util.expandPath(srcPath)),
  );

  sourcePaths.push(...expanded);
}

export function stat(path: string): fs.Stats {
  return fs.statSync(path);
}

export function readdir(path: string): string[] {
  return fs.readdirSync(path);
}

export function readSourcePaths(): string[] {
  return [...sourcePaths];
}

export function readSourceFromJar({
  jarPath,
  src,
}: {
  type: string,
  jarPath: string,
  src: string,
}): string {
  const data = fs.readFileSync(jarPath);
  const zip = new JSZip().load(data);
  const source = zip.file(src);

  return source.asText();
}

export function dumpSDK(outdir: string): void {
  if (!__DEV__) {
    lumo.internal.embedded.keys().forEach((res: string) => {
      const idx = res.lastIndexOf('/');

      if (idx !== -1) {
        util.ensureDir(path.join(outdir, res.slice(0, idx)));
      }

      // $FlowFixMe: need to check result of res, but bundled resources will be
      fs.writeFileSync(path.join(outdir, res), load(res), 'utf8');
    });
  }
}

// based on https://github.com/nodejs/node/blob/98971/lib/repl.js#L710
export function getJSCompletions(
  line: string,
  match: string,
  cb: (string[]) => void,
): void {
  const flat = new ArrayStream();
  const nodeReplServer = new REPLServer('', flat);
  const lineWithoutMatch = line.substring(0, line.length - match.length);

  return nodeReplServer.completer(match, (err: ?Error, [jsCompletions]: [
    string[],
    string,
  ]) => {
    const completions = jsCompletions.reduce((cs: string[], c: string) => {
      if (c === '') {
        return cs;
      }

      cs.push(`${lineWithoutMatch}${c}`);
      return cs;
    }, []);
    return cb(completions);
  });
}

export function removeSourcePath(srcPath: string): void {
  sourcePaths.splice(sourcePaths.indexOf(srcPath), 1);
}
