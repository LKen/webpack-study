const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path');
const webpack = require('webpack');
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
      ),

      new webpack.NamedChunksPlugin(chunk => {
        if (chunk.name) {
          return chunk.name
        }

        const hash = require('hash-sum')
        const joinedHash = hash(
          Array.from(chunk.modulesIterable, m => m.id).join('_')
        )
        return `chunk-` + joinedHash
      }),
    ],
  
    module: {
      rules: [
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
                  mode: 'global',
                  auto: /\.module\.\w+$/i,
                  localIdentName: '[path][name]__[local]--[hash:base64:5]'
                }
              }
            },
            // {
            //   loader: 'postcss-loader',
            //   options: {
            //     postcssOptions: {
            //       plugins: [
            //         [
            //           'autoprefixer',
            //           {
            //             // Options
            //           },
            //         ],
            //       ]
            //     }
            //   }
            // },
            'postcss-loader',
            'less-loader'
            // 'file-loader'
          ]
        }
      ]
    },
  
    optimization: {
      minimizer: [new OptimizeCSSAssetsPlugin({})],
      moduleIds: 'hashed',
      // chunkIds: 'named',
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        minChunks: 1,
        cacheGroups: {
          // styles: {
          //   name: 'styles',
          //   test: /\.less$/,
          //   /* test: (module, chunks) => {
          //     const resource = module.matchResource || module.resource
          //     if (!resource) return false
          //     const p = /\.less$/
          //     let bool
          //     const idx = resource.indexOf("?")
          //     if (idx >= 0) bool = p.test(resource.substr(0, idx))
          //     else bool = p.test(resource)
          //     if (bool) {
          //       console.log(resource)
          //       return true
          //     }
          //     return false
              
          //     // if (module.resource && module.resource.endsWith('.less')) {
          //     //   console.log(module.resource)
          //     //   return true
          //     // }
          //     // return false
          //   }, */
          //   minSize: 0,
          //   enforce: true,
          // },
        },
      },
    },
  
    devtool: 'none' || 'cheap-module-source-map',
    mode: 'production'
  }
}