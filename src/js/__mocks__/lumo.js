const lumo = jest.genMockFromModule('../lumo.js');

// mocking so that we can init the ClojureScript context without actually
// doing it
lumo.load.mockImplementation(() => `
cljs = {
  nodejs: {
    enable_util_print_BANG_: () => {},
  },
};

lumo = {
  repl: {
    init: () => {},
    set_ns: () => {},
    execute: () => {},
    is_readable_QMARK_: () => true,
    get_current_ns: () => 'cljs.user',
  },
};
`);

module.exports = lumo;
