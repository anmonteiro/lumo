const webpack = require('webpack');
const path = require('path');

const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  // 'process.env.NODE_ENV': JSON.stringify('production')
});

const ignore = new webpack.IgnorePlugin(/(main.out\/.*|\.map)$/); // /(map|clj.?|json)$/

module.exports = {
  entry: ['./target/index.js', './target/main.js'],
  output: {
    filename: 'bundle.js',
  },
  target: 'node',
  resolve: {
    extensions: ['', '.js'],
  },
  plugins: [definePlugin, ignore],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components|main.*)/,
      loader: 'babel', // 'babel-loader' is also a valid name to reference
      query: {
        presets: ['es2015', 'stage-0'],
      },
    },
    ],
  },
};
