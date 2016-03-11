const webpack = require('webpack');
const path = require('path');
const paths = require('../paths');
import { webpack as config } from '../config';
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  stats: {
    children: false
  },

  plugins: [
    // Define free variables. Useful for having development builds with debug logging or adding global constants.
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      filename: 'popup/index.html',
      template: path.resolve(paths.SRC, 'popup/index.html'),
    })
  ],
  externals: {
    'window': 'window',
    'require': 'require'
  },

  module: {
    resolve: {
      alias: {
        jquery: 'node_modules/jquery/src/jquery.js'
      }
    },
    loaders: [
      // copy required static files
      {
        test: /\.(html|jpg|png|json)$/,
        loader: `file-loader?name=[path][name].[ext]&context=${paths.SRC}`
      },
      {
        test: paths.THEME_VARIABLES,
        loader: 'sass-variables'
      },
      {
        test: require.resolve('arrive'),
        loader: 'imports?this=>window'
      }
    ]
  }
};
