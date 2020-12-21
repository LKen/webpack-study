const webpack = require('webpack')
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env) => {
  return {
    entry: {
      app: './src/app.js'
    },
    output: {
      path: path.join(__dirname, './dist'),
      publicPath: './',
      filename: 'static/js/[name].[contenthash:8].js',
      chunkFilename: 'static/js/[name].[contenthash:8].js'
    },

    resolve: {
      alias: {
        jquery$: path.resolve(__dirname, './src/lib/jquery.js')
      },

      extensions: [
        '.mjs',
        '.js',
        '.jsx',
        '.vue',
        '.json',
        '.wasm'
      ]
    },

    module: {
      rules: [
        /* config.module.rule('js') */
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader'
          }
        },

        /* config.module.rule('less') */
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
                modules: false
              }
            },
            'postcss-loader',
            'less-loader'
          ]
        },

        /* config.module.rule('image') */
        {
          test: /\.(png|jpe?g|gif|webp)(\?.*)?$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 4096,
                fallback: {
                  loader: 'file-loader',
                  options: {
                    publicPath: '../../',
                    name: 'static/img/[name].[hash:8].[ext]'
                  }
                }
              }
            }
          ]
        },

        /* config.module.rule('fonts') */
        {
          test: /\.(woff2?|eot|ttf|svg|otf)(\?.*)?$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 4096,
                fallback: {
                  loader: 'file-loader',
                  options: {
                    publicPath: '../../',
                    name: 'static/fonts/[name].[hash:8].[ext]'
                  }
                }
              }
            }
          ]
        }
      ]
    },

    plugins: [
      new CleanWebpackPlugin(),
      
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),

      new MiniCssExtractPlugin({
        filename: 'static/css/[name].chunk.css',
        chunkFilename: 'static/css/[name].chunk.css'
      }),

      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
        // chunks: ['app'],
        inject: false,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          collapseBooleanAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        },
        'meta': {
          'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
          // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        }
      }),

      // ! 必须在 htmlWebpackPlugin 后面
      new ScriptExtHtmlWebpackPlugin({
        inline: /runtime\..*\.js$/
      })
    ],

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
          'lodash': {
            name: 'chunk-lodash', // 单独抽取指定的模块，应该权限最高
            test: /[\\/]node_modules[\\/]_?lodash(.*)/,
            priority: 20
          },
          'async': {
            name: 'chunk-async',
            chunks: 'async', // 异步的 require,ensure or import() 后者比较好
            minChunks: 2 // 单页面的包 由于都是一次，所以不抽取出来
          },
          'async-libs': {
            name: 'chunk-async-lib',
            chunks: 'async',
            priority: 10, // 在 async 这类里面的权重
            minSize: 0, // chunk 的大小至少为 minSize 指定的值，才能被 split
            test: /[\\/]node_modules[\\/]/
          },
          'lib': {
            name: 'chunk-lib',
            automaticNamePrefix: 'node-prefix', // name 存在的时候不起作用
            test: /[\\/]node_modules[\\/]/,
            priority: 10, // 在 initial 这类里面的权重
            chunks: 'initial'
          },
          'default': {
            minChunks: 3,
            name: 'common', // 基础公共代码
            reuseExistingChunk: true // 真不知道有什么用
          }
        },
      },
    },

    devtool: 'none' || 'cheap-module-source-map',
    mode: 'production'
  }
}