module.exports = {
  presets: [
    ['@babel/preset-env', {
      // useBuiltIns: "entry",
      // corejs: 3,
      modules: 'auto',
      targets: {
        node: "current"
        // "chrome": "73",
        // "ie": "9"
      }
    }]
  ],
  // jest 的时候，不适合打开，因为它会引入一堆 require 语法，导致出错
  plugins: [
    [
      '@babel/transform-runtime', {
        "absoluteRuntime": false,
        "corejs": 3,
        "helpers": true,
        "regenerator": true,  // ? IE 下一定要打开，因为IE 根本不支持generator 需要这个支持，或者手动引入 regenerator-runtime/runtime  Toggles whether or not generator functions are transformed to use a regenerator runtime that does not pollute the global scope
        "useESModules": true,
        "version": '7.11.2'
      }
    ]
  ]
}