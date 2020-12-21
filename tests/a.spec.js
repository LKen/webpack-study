import diff from 'jest-diff'
jest.mock('./src/request');
import * as user from './src/user';


describe('test', () => {
  test('A', () => {
    jest.mock('./src/utils'); // this happens automatically with automocking
    const foo = require('./src/utils');

    // foo is a mock function
    foo.mockImplementation(() => 42);
    console.log(foo())
  })

  test('B', () => {
    const myMockFn = jest
      .fn()
      .mockImplementationOnce(cb => cb(null, true))
      .mockImplementationOnce(cb => cb(null, false));

    myMockFn((err, val) => console.log(val));
    // > true

    myMockFn((err, val) => console.log(val));
    // > false
  })

  test('C1', () => {
    var obj = {
      m: jest.fn().mockReturnThis().mockName('C11')
    }

    const myMockFn = jest
      .fn()
      .mockReturnValue('default')
      .mockImplementation(scalar => console.log(42 + scalar)) // 优先于 mockReturnValue
      .mockName('add42');

    // console.log(myMockFn())
    myMockFn(11);
    myMockFn(131);
    myMockFn(1);
    myMockFn(12);
    console.log(myMockFn())

    expect(obj.m()).toBe(obj)
  })

  it('D1', () => {
    const a = { a: { b: { c: 5 } } };
    const b = { a: { b: { c: 6 } } };

    const result = diff(a, b);

    // print diff
    console.log(result);

    const getType = require('jest-get-type');

    const array = [1, 2, 3];
    const nullValue = null;
    const undefinedValue = undefined;

    // prints 'array'
    console.log(getType(array));
    // prints 'null'
    console.log(getType(nullValue));
    // prints 'undefined'
    console.log(getType(undefinedValue));
    const prettyFormat = require('pretty-format');

    const val = { object: {} };
    val.circularReference = val;
    val[Symbol('foo')] = 'foo';
    val.map = new Map([['prop', 'value']]);
    val.array = [-0, Infinity, NaN];

    console.log(prettyFormat(val));
  })


  it('E-async', () => {
    //断言必须返回一个primose
    expect.assertions(1);
    return user.getUserName(4).then(data => {
      console.log(data)
      expect(data).toEqual('Mark')
    });
  })
})