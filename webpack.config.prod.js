var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    popup: "./src/scripts/popup.js",
    options: "./src/scripts/options.js"
  },
  output: {
    path: path.join(__dirname, 'dist/app/scripts'),
    filename: "[name]_bundle.js",
    //publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('styles.css')
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css?modules&importLoader=1&localIdentName=[hash:base64:5]!postcss'),
      include: path.join(__dirname, 'src')
    }, {
      test: /\.(png|jpg|svg|gif|otf|ttf|woff|eot)$/,
      loader: 'url',
      exclude: /node_modules/,
      include: path.join(__dirname, 'src')
    }]
  },
  postcss: () => {
    return [ require('postcss-import'), require('rucksack-css'), require('autoprefixer'), require('lost') ]
  }
};
