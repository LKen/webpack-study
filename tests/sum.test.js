import axios from 'axios';
import { timerGame, infiniteTimerGame } from './src/tool'

// jest.mock('axios');

// const sum = require('./src/utils');

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });

// test('object assignment', () => {
//   const data = {one: 1};
//   data['two'] = 2;
//   expect(data).toEqual({one: 1, two: 2});
// });

// test('null', () => {
//   const n = null;
//   expect(n).toBeNull();
//   expect(n).toBeDefined();
//   expect(n).not.toBeUndefined();
//   expect(n).not.toBeTruthy();
//   expect(n).toBeFalsy();
// });

// test('zero', () => {
//   const z = 0;
//   expect(z).not.toBeNull();
//   expect(z).toBeDefined();
//   expect(z).not.toBeUndefined();
//   expect(z).not.toBeTruthy();
//   expect(z).toBeFalsy();
// });

// test('two plus two', () => {
//   const value = 2 + 2;
//   expect(value).toBeGreaterThan(3);
//   expect(value).toBeGreaterThanOrEqual(3.5);
//   expect(value).toBeLessThan(5);
//   expect(value).toBeLessThanOrEqual(4.5);

//   // toBe and toEqual are equivalent for numbers
//   expect(value).toBe(4);
//   expect(value).toEqual(4);
// });

// test('两个浮点数字相加', () => {
//   const value = 0.1 + 0.2;
//   // expect(value).toBe(0.3);       //    这句会报错，因为浮点数有舍入误差
//   expect(value).toBeCloseTo(0.3); // 这句可以运行
// });

// function compileAndroidCode() {
//   throw new Error('you are using the wrong JDK');
// }

// test('compiling android goes as expected', () => {
//   expect(() => compileAndroidCode()).toThrow();
//   expect(() => compileAndroidCode()).toThrow(Error);

//   // You can also use the exact error message or a regexp
//   expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
//   expect(() => compileAndroidCode()).toThrow(/JDK/);
// });

// function fetchData() {
//   return new Promise((resolves, rejects) => {
//     setTimeout(() => {
//       rejects('error')
//     }, 100)
//   })
// }

// test('the data is peanut butter', () => {
//   function fetchData() {
//     return new Promise((resolves, rejects) => {
//       setTimeout(() => {
//         resolves('peanut butter')
//       }, 100)
//     })
//   }
//   return expect(fetchData()).resolves.toBe('peanut butter');
// });

// test('the fetch fails with an error', () => {
//   return expect(fetchData()).rejects.toMatch('error');
// });

// test('ForEach', () => {
//   function forEach(items, callback) {
//     for (let index = 0; index < items.length; index++) {
//       callback(items[index]);
//     }
//   }

//   const mockCallback = jest.fn(x => 42 + x);
//   forEach([0, 1], mockCallback);

//   // 此 mock 函数被调用了两次
//   expect(mockCallback.mock.calls.length).toBe(2);

//   // 第一次调用函数时的第一个参数是 0
//   expect(mockCallback.mock.calls[0][0]).toBe(0);

//   // 第二次调用函数时的第一个参数是 1
//   expect(mockCallback.mock.calls[1][0]).toBe(1);

//   // 第一次函数调用的返回值是 42
//   expect(mockCallback.mock.results[0].value).toBe(42);
// })

// class Users {
//   static all() {
//     return axios.get('/users.json').then(resp => resp.data);
//   }
// }

// test('should fetch users', () => {
//   const users = [{name: 'Bob'}];
//   const resp = {data: users};
//   axios.get.mockResolvedValue(resp);

//   // or you could use the following depending on your use case:
//   // axios.get.mockImplementation(() => Promise.resolve(resp))

//   return Users.all().then(data => expect(data).toEqual(users));
// });

// jest.useFakeTimers();

// it('waits 1 second before ending the game', () => {
//   const fn = jest.fn()
//   timerGame(fn);

//   // 在这个时间点，定时器的回调不应该被执行
//   expect(fn).not.toBeCalled();

//   // “快进”时间使得所有定时器回调被执行
//   jest.runAllTimers();

//   expect(fn).toBeCalled();
//   expect(fn).toHaveBeenCalledTimes(1);
//   // expect(setTimeout).lastCalledWith(expect.any(Function), 1);
// });


// __tests__/infiniteTimerGame-test.js

jest.useFakeTimers();

describe('infiniteTimerGame', () => {
  it('calls the callback after 1 second via advanceTimersByTime', () => {
    const callback = jest.fn();

    timerGame(callback);

    // 在这个时间点，回调函数不应该被执行
    expect(callback).not.toBeCalled();

    // “快进”时间，使得所有定时器回调都被执行
    jest.advanceTimersByTime(1000);

    // 到这里，所有的定时器回调都应该被执行了！
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
