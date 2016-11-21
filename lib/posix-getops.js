type Getopt$Option = {|
  option: string,
  optarg: string,
  error?: true,
|};

declare module 'posix-getopt' {
  declare class BasicParser {
    constructor(optstr: string, argv: string[], optind?: number): void,
    getopt: () => Getopt$Option | void,
    optind: () => number,
  }
  declare module.exports: {|
    BasicParser: typeof BasicParser,
  |}
}
