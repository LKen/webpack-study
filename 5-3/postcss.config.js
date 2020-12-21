module.exports = {
  ident: 'postcss',
  sourceMap: true,
  plugins: {
    'autoprefixer': {},
    // 'cssnano': {},
    'postcss-preset-env': {
      autoprefixer: true
    } // better
  }
}
