declare var lumo: {|
  internal: {|
    embedded: {|
      keys: () => string[],
      get: (name: string) => string,
      resources: { [string]: string },
    |},
  |},
|};

declare var process: Process & {
  exitValue: number,
};
