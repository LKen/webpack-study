module.exports = {
  entry: {
    app: './src/app.ts'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].[hash:5].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'ts-loader'
        }
      }
    ]
  },
  devtool: 'cheap-module-source-map',
  mode: 'development'
}