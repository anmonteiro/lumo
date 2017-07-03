const vm = jest.genMockFromModule('vm');

vm.ctx = {
  cljs: {
    core: {
      set_print_fn_BANG_: jest.fn(),
      set_print_err_fn_BANG_: jest.fn(),
      // eslint-disable-next-line prefer-arrow-callback
      seq: jest.fn(function seq<T>(x: T[]): T[] {
        return x;
      }),
    },
  },
  lumo: {
    repl: {
      init: () => {},
      set_ns: () => {},
      execute: () => {},
      is_readable_QMARK_: () => '',
      get_current_ns: (id: number) => 'cljs.user',
      get_highlight_coordinates: (text: string) => 0,
      get_completions: (text: string) => [],
      run_main: (mainNS: string, args: string[]) => undefined,
    },
    core: {},
  },
};

vm.createContext.mockImplementation((context: vm$Context) =>
  Object.assign(vm.ctx, context),
);

module.exports = vm;
