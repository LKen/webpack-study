module.exports = {
  ident: 'postcss',
  sourceMap: false,
  plugins: {
    'autoprefixer': {},
    // 'cssnano': {},
    'postcss-preset-env': {
      autoprefixer: true
    } // better
  }
}