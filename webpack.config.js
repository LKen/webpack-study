const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: './app.js'
  },
  output: {
    filename: '[name].[hash:5].bundle.js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      // chunks: ['app'],
      inject: true,
      minify: false,
      'meta': {
        'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no'
        // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      }
    }),
  ],
  mode: 'development'
}