const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')
module.exports = (env) => {
  return {
    entry: {
      app: './src/app.js'
    },
    output: {
      path: path.join(__dirname, './dist'),
      publicPath: './dist/',
      filename: '[name].bundle.js',
      chunkFilename: '[name].[contenthash:8].js'
    },
  
    plugins: [
      new MiniCssExtractPlugin(
        {
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].css'
        }
      )
    ],
  
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.less$/i,
          exclude: /(node_modules|bower_components)/,
          use: [
            env.production
              ? {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  hmr: false
                }
              }
              : {
                loader: 'style-loader',
                options: { injectType: 'styleTag', attributes: { class: 'chu' }, esModule: true }
              },
  
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                importLoaders: 2,
                esModule: true,
                modules: {
                  localIdentName: '[path][name]__[local]--[hash:base64:5]'
                }
              }
            },
            'postcss-loader',
            'less-loader'
          ]
        }
      ]
    },
  
    optimization: {
      runtimeChunk: 'single',
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true, // Must be set to true if using source-maps in production
          terserOptions: {
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
          }
        }),
        new OptimizeCSSAssetsPlugin({})
      ],
      splitChunks: {
        chunks: 'all',
        minChunks: 1,
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.less$/,
            minSize: 0,
            enforce: true,
          },
        },
      },
    },
  
    devtool: 'none' || 'cheap-module-source-map',
    mode: 'production'
  }
}