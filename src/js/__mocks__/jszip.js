const JSZip = jest.genMockFromModule('jszip');

JSZip.mockImplementation(() => ({
  load: jest.fn((path: string) => {
    if (/foo/.test(path)) {
      return {
        file: () => ({
          asText: () => 'zipContents',
        }),
      };
    }
    return null;
  }),
}));

module.exports = JSZip;
