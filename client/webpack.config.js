const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const pkg = require('./package.json');

const reScript = /\.m?js$/;
const isDebug = !process.argv.includes('--release');
const isAnalyze =
  process.argv.includes('--analyze') || process.argv.includes('--analyse');

module.exports = {
  name: 'perfanalyzer-webpack-config',
  target: 'web',
  entry: {
    perfanalyzer: ['./src/polyfill/index.js', './src/index.js'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: reScript,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          cache: true,
          configFile: path.join(__dirname, './.eslintrc.json'),
        },
      },
      {
        test: reScript,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          cacheDirectory: isDebug,
          babelrc: false,
          configFile: false,
          presets: [
            [
              '@babel/preset-env',
              {
                targets: pkg.browserslist,
                forceAllTransforms: !isDebug, // for UglifyJS
                modules: false,
                useBuiltIns: false,
                debug: false,
              },
            ],
          ],
          plugins: [
            // Experimental ECMAScript proposals or ES2020 stable
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-nullish-coalescing-operator',
            '@babel/plugin-proposal-optional-chaining',
          ],
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      __API_ADDRESS__: isDebug
        ? JSON.stringify('http://localhost:3001/metrics')
        : JSON.stringify('http://perfanalyzer.herokuapp.com/metrics'),
    }),
    ...(isDebug
      ? []
      : [
          // Enable compression for release
          new CompressionPlugin({
            algorithm: 'brotliCompress',
            test: /\.js$/,
          }),
          // Webpack Bundle Analyzer
          ...(isAnalyze ? [new BundleAnalyzerPlugin()] : []),
        ]),
  ],
  // Don't attempt to continue if there are any errors.
  bail: !isDebug,
  cache: isDebug,
  devtool: isDebug ? 'cheap-module-inline-source-map' : 'source-map',
  mode: isDebug ? 'development' : 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  output: {
    filename: isDebug ? '[name].js' : '[name].[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
