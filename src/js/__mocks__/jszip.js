const JSZip = jest.genMockFromModule('jszip');

JSZip.mockImplementation(() => ({
  load: jest.fn((path: string) => {
    if (/foo/.test(path)) {
      return {
        file: () => ({
          asText: () => 'zipContents',
          date: new Date(),
        }),
        filter: () => ['zipContents'],
      };
    }
    return null;
  }),
}));

module.exports = JSZip;
