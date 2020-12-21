import './style/a.less'
import b from './style/b.module.less'

document.getElementById('chu').innerHTML = `<div class="${b.moduleClass}"></div>`

import(/* webpackChunkName: "bar" */ './components/bar/index')
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })


import('./components/foot/index')
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
// let bool = false
// a.use()

// setInterval(() => {
//   if (bool) {
//     b.use()
//   } else {
//     b.unuse()
//   }

//   bool = !bool
// }, 5000)