import { chunk } from 'lodash-es'
import base from './css/base.less'

document.getElementById('app').innerHTML = `<div class="${base.globalA}">123123</div>`

import { a, isNull1 } from './common/utils.js'

console.log(a())
console.log(isNull1(null))

console.log(chunk([2,4,5,6,2], 2))