import * as _ from 'lodash'

console.log(_.chunk([1,2,3,4], 2))

interface Cat {
  name: string,
  age: number
}

function doCat(cat: Cat) {
  console.log(`miaomao: ${cat.name}`)
}

doCat({
  name: 'chu',
  age: 12
})