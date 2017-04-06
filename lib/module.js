declare module 'module' {
  declare class Module {
    filename: string,
    paths: string[],

    static _nodeModulePaths(path: string): string[],
    _compile(script: string, path: string): mixed,
  }

  declare var exports: typeof Module;
}
