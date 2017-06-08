declare module 'module' {
  declare class Module {
    constructor(id: string, parent?: Module): void,

    filename: string,
    paths: string[],

    static _nodeModulePaths(path: string): string[],
    _compile(script: string, path: string): mixed,
  }

  declare var exports: typeof Module;
}
declare class x {
  _prompt: string,
}

declare class readline$Interface extends events$EventEmitter {
  close(): void,
  pause(): void,
  prompt(preserveCursor?: boolean): void,
  question(query: string, callback: (answer: string) => void): void,
  resume(): void,
  setPrompt(prompt: string): void,
  write(
    val: string | void | null,
    key?: {
      name: string,
      ctrl?: boolean,
      shift?: boolean,
      meta?: boolean,
    },
  ): void,
  _refreshLine(): void,

  line: string,
  cursor: number,
  _prompt: string,
  history: string[],
  input: stream$Readable,
  output: stream$Writable,
}

// remove when https://github.com/facebook/flow/pull/4125 is merged
declare class Stats {
  dev: number,
  ino: number,
  mode: number,
  nlink: number,
  uid: number,
  gid: number,
  rdev: number,
  size: number,
  blksize: number,
  blocks: number,
  atime: Date,
  mtime: Date,
  ctime: Date,
  birthtime: Date,
  atimeMs: number,
  mtimeMs: number,
  ctimeMs: number,
  birthtimeMs: number,

  isFile(): boolean,
  isDirectory(): boolean,
  isBlockDevice(): boolean,
  isCharacterDevice(): boolean,
  isSymbolicLink(): boolean,
  isFIFO(): boolean,
  isSocket(): boolean,
}
