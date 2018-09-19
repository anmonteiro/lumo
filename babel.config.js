'use strict';

module.exports = {
  env: {
    test: {
      presets: ['@babel/preset-env'],
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties',
      ],
    },
    development: {
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties',
      ],
    },
    production: {
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties',
      ],
    },
  },
  plugins: ['transform-flow-strip-types', './scripts/babel/strip-dev'],
};
