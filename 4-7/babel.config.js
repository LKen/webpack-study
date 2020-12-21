module.exports = {
  plugins: [
    'lodash',
    [
      '@babel/transform-runtime', {
        "absoluteRuntime": false,
        "corejs": false,
        "helpers": false,
        "regenerator": true,
        "useESModules": false,
        "version": '7.11.2'
      }
    ]
  ],
  presets: [
    ['@babel/preset-env', {
      modules: false
    }]
  ]
}