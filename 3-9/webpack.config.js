const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path');
const { join } = require('path');
module.exports = (env) => {
  return {
    entry: {
      app: './src/app.js'
    },
    output: {
      path: path.join(__dirname, './dist'),
      publicPath: './dist/',
      filename: '[name].bundle.js',
      chunkFilename: '[name].chunk.js'
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

    // externals: {
    //   jquery: 'jQuery'
    // },

    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].chunk.css',
        chunkFilename: 'static/css/[name].chunk.css'
      })
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
        // {
        //   test: /\.css$/i,
        //   exclude: /(node_modules|bower_components)/,
        //   use: [
        //     env.production
        //       ? {
        //         loader: MiniCssExtractPlugin.loader,
        //         options: {
        //           hmr: false
        //         }
        //       }
        //       : {
        //         loader: 'style-loader',
        //         options: { injectType: 'styleTag', attributes: { class: 'chu' }, esModule: true }
        //       },

        //     {
        //       loader: 'css-loader',
        //       options: {
        //         sourceMap: false,
        //         importLoaders: 1,
        //         esModule: true,
        //         modules: false
        //       }
        //     },
        //     'postcss-loader',
        //   ]
        // },
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
        },
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