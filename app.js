// import "core-js/es/set";
// import "core-js/es/map";
// import "core-js/es/symbol";

// import "core-js/fn/array/of";
// import "regenerator-runtime/runtime";
// import "core-js";
// import "@babel/polyfill"

import { createMap } from './c.js'
const func = () => {}

const NUM = 45
const arr = [123, 23, 3, 10]
const arr2 = arr.map(item => {
    return item * 2
})

const set = new Set([...arr])

function* toM() {
    yield 12
}

const ins = toM()
console.log(ins.next())
console.log(set)
console.log('set.has(123)', set.has(123))
const myMap = createMap()
console.log('Map', myMap.get('name'))
console.log('Map ', myMap.set('age', 123))
for (let [key, value] of myMap.entries()) {
  console.log(key, value);
}

// console.log(arr.includes(123)) // @babel/transform-runtime 不支持ES6 对象实例中的新API，但是@babel/runtime-corejs3 支持
// console.log('Array.from', Array.from(set)) // @babel/transform-runtime 不支持ES6 对象实例中的新API 但是@babel/runtime-corejs3 支持