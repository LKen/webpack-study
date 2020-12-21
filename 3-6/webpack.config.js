const path = require('path')

module.exports = {
  entry: {
    pageA: './src/pageA.js',
    pageB: './src/pageB.js'
  },
  output: {
    path: path.join(__dirname, './dist'),
    publicPath: './dist/',
    filename: '[name].[hash:5].js',
    chunkFilename: '[name].[contenthash:8].js'
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 1000,
      maxSize: 0,
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
          chunks: 'initial',
          reuseExistingChunk: true // 真不知道有什么用
        },
        'default': {
          minChunks: 2,
          name: 'common' // 基础公共代码
        }
      }
    }
  },

  devtool: 'none' || 'cheap-module-source-map',
  mode: 'development'
}