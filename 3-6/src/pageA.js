import * as $ from 'jquery'

const bool = true

if (bool) {
  Promise.all([
    import(/* webpackChunkName: "subPageA" */ './subPageA'),
    import(/* webpackChunkName: "moduleX" */ './moduleX')
  ]).then(([A, { default: CHU }]) => {
    console.log(`Async loaded A: ${A}`)
    const chu = new CHU('test')
    console.log(chu)
  })
} else {
  import(/* webpackChunkName: "subPageB" */ './subPageB').then(B => {
    console.log(`Async loaded B: ${B}`)
  })
}
//  
const _ = import('lodash')
  .then(_ => {
    console.log(_.chunk([1, 2, 4, 5], 2))
  })