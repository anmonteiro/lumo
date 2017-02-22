declare class JSZip {
  constructor(): this,
  load: (buf: Buffer) => this,
  file: (x: string) => Object,
}
