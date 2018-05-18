/* @flow */

import fs from 'fs';
import os from 'os';
import path from 'path';
import paredit from 'paredit.js';

export function expandPath(somePath: string): string {
  const tildeExpandedPath = somePath.startsWith('~')
    ? somePath.replace(/^~/, os.homedir())
    : somePath;
  return path.resolve(tildeExpandedPath);
}

export const isWindows: boolean = /^Windows/.test(os.type());

export function srcPathsFromClasspathStrings(cpStrs: string[]): string[] {
  return cpStrs.reduce((ret: string[], colonSepPaths: string) => {
    const paths = colonSepPaths.split(path.delimiter);

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

function mavenCoordinatesToPath(
  dependency: string,
  localRepo: string = path.join(os.homedir(), '.m2/repository'),
): string {
  const groupArtifact = dependency.split('/');

  let group;
  let artifact;

  if (groupArtifact.length === 1) {
    // group and artifact are the same
    const actualGroupArtifact = groupArtifact[0].split(':')[0];
    [group, artifact] = [actualGroupArtifact, actualGroupArtifact];
  } else {
    [group, artifact] = [groupArtifact[0], groupArtifact[1].split(':')[0]];
  }

  let version = dependency.split(':')[1];

  // we weren't passed a version, search for the latest available locally
  if (version == null) {
    const versions = fs.readdirSync(
      path.join(expandPath(localRepo), ...group.split('.'), artifact),
    );

    version = versions.reduce((a: string, b: string): string => {
      if (global.goog.string.compareVersions(a, b) < 0) {
        return b;
      }
      return a;
    });
  }

  return path.join(
    expandPath(localRepo),
    ...group.split('.'),
    artifact,
    version,
    `${artifact}-${version}.jar`,
  );
}

export function srcPathsFromMavenDependencies(
  dependencies: string[],
  localRepo?: string,
): string[] {
  return dependencies.reduce((ret: string[], commaSeparatedDeps: string) => {
    const paths = commaSeparatedDeps
      .split(',')
      .map((dep: string) => mavenCoordinatesToPath(dep, localRepo));

    ret.push(...paths);
    return ret;
  }, []);
}

export function indentationSpaces(text: string): ?string {
  const source = `${text}\n`;
  const count = source.length;
  const ast = paredit.parse(source);
  const { changes } = paredit.editor.indentRange(ast, source, count, count);
  const insertionChange = changes.find(
    ([type]: [string, number, string]) => type === 'insert',
  );

  if (insertionChange != null) {
    return insertionChange[2];
  }

  return null;
}
