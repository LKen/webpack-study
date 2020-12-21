// import $ from 'jquery'
import { chunk } from 'lodash-es'
import './css/base.less'

document.getElementById('app').innerHTML = `<div class="bg"></div><div class="bg2"></div>`

import { a, isNull1 } from './common/utils.js'

$('div').addClass('global')

console.log(a())
console.log(isNull1(null))

console.log(chunk([2,4,5,6,2], 2))