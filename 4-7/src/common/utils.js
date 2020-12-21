import { isNull, isNumber } from 'lodash-es'

export function a() {
 return 'this is a'
}

export function b() {
 return 'this is b'
}

export function c() {
 return 'this is c'
}

export function d() {
 return 'this is d'
}

export function e() {
 return 'this is e'
}

export function f() {
 return 'this is f'
}

export function isNull1(...args) {
  console.log('----isNull1')
  return isNull(...args);
}