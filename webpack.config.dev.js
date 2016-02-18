var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    popup: ["./src/scripts/popup.js", "webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr"],
    options: ["./src/scripts/options.js", "webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr"]
  },
  output: {
    path: path.join(__dirname, '.tmp'),
    filename: "[name]_bundle.js",
    publicPath: 'http://localhost:3000/scripts/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: path.join(__dirname, 'src')
    }, {
      test: /\.css$/,
      loader: 'style!css?sourceMap&modules&importLoader=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss?sourceMap',
      exclude: /node_modules/,
      include: path.join(__dirname, 'src')
    }, {
      test: /\.(png|jpg|svg|gif|otf|ttf|woff|eot)$/,
      loader: 'url?name=[name]-[hash].[ext]',
      exclude: /node_modules/,
      include: path.join(__dirname, 'src')
    }]
  },
  postcss: () => {
    return [ require('postcss-import'), require('rucksack-css'), require('autoprefixer'), require('lost') ]
  }
};
