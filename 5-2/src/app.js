// import $ from 'jquery'
import { chunk } from 'lodash-es'
import { a, isNull1 } from './common/utils.js'
import { comA } from './components/a'
import './css/base.less'

document.getElementById('app').innerHTML = `<div class="bg">1</div><div class="bg2">1232</div>`

$('div').addClass('global')
const hot = document.getElementById('hot')
hot.appendChild(comA())

console.log(a())
console.log(isNull1(null))
console.log('test:hot')
console.log(chunk([2,4,5,6,2,4], 2))

// 自己处理 一般框架会帮我们去处理 比如，vue-loader
if (module.hot) {
  module.hot.accept('./components/a', () => {
    hot.innerHTML = ''
    const componentA = require('./components/a').comA
    hot.appendChild(componentA())
  })
}
