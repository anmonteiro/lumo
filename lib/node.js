declare module 'module' {
  declare class Module {
    constructor(id: string, parent?: Module): void;

    filename: string;
    paths: string[];

    static _nodeModulePaths(path: string): string[];
    _compile(script: string, path: string): mixed;
  }

  declare var exports: typeof Module;
}

declare class readline$Interface extends events$EventEmitter {
  close(): void;
  pause(): void;
  prompt(preserveCursor?: boolean): void;
  question(query: string, callback: (answer: string) => void): void;
  resume(): void;
  setPrompt(prompt: string): void;
  write(
    val: string | void | null,
    key?: {
      name: string,
      ctrl?: boolean,
      shift?: boolean,
      meta?: boolean,
    },
  ): void;
  _refreshLine(): void;

  line: string;
  cursor: number;
  terminal: boolean;
  _prompt: string;
  history: string[];
  input: stream$Readable;
  output: stream$Writable;
}
