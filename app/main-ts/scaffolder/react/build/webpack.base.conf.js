
const path = require('path');
const utils = require('./utils');
const config = require('../config');
const debug = require('debug')('app:config:base');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

debug('创建webpack base配置');

module.exports = {
  entry: {
    app: './src/main.js',
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath
      : (process.env.NODE_ENV === 'test' ? config.test.assetsPublicPath : config.dev.assetsPublicPath),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      src: resolve('src'),
      doraemon: '@zcy/doraemon',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
    ],
  },
};
debug('webpack base配置创建成功');
