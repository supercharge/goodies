'use strict'

const test = require('ava')
const Path = require('path')
const {
  tap, upon, isPromise, isFunction, isAsyncFunction,
  ifNullish, isNullish, isNotNullish, esmResolve, esmRequire
} = require('../dist')

test('tap', async t => {
  t.is(
    tap(1), 1
  )

  t.deepEqual(
    tap(new User('Marcus'), (user) => {
      user.setName('Goodie')
    }),
    new User('Goodie')
  )

  t.deepEqual(
    tap([1, 2, 3], (items) => items.map(item => item * 2)),
    [1, 2, 3]
  )

  t.deepEqual(
    tap(await Promise.resolve([1, 2, 3]), (items) => {
      items.sort((a, b) => b - a)
    }),
    [3, 2, 1]
  )

  // resolves a promise before passing it down to the callback
  t.deepEqual(
    await tap(Promise.resolve(new User('Marcus')), (user) => user.setName('Goodie')),
    new User('Goodie')
  )

  t.deepEqual(
    await tap([1, 2, 3], async () => {
      await Promise.resolve()
    }),
    [1, 2, 3]
  )

  t.deepEqual(
    await tap(Promise.resolve([1, 2, 3])),
    [1, 2, 3]
  )
})

test('tap - handles second non-function arguments', async t => {
  t.is(tap(1, new User()), 1)

  t.deepEqual(
    await tap(Promise.resolve('Supercharge'), 1234),
    'Supercharge'
  )
})

test('upon', async t => {
  // upon async
  t.deepEqual(await upon(1, async () => { }), undefined)
  t.deepEqual(await upon(Promise.resolve(1), new User()), 1)

  // resolves a promise before passing it down to the callback
  t.deepEqual(
    await upon(Promise.resolve(new User('Marcus')), (user) => {
      return user.getName()
    }),
    'Marcus'
  )

  t.deepEqual(
    await upon(Promise.resolve(new User('Marcus'))),
    new User('Marcus')
  )

  // upon sync
  t.is(upon(1), 1)
  t.is(upon(1, new User()), 1)

  t.deepEqual(
    upon(new User('Marcus'), (user) => {
      return user.getName()
    }),
    'Marcus'
  )
})

test('isPromise', t => {
  t.is(isPromise(), false)
  t.is(isPromise(1), false)
  t.is(isPromise('no'), false)

  async function asyncFn () {
    await new Promise(resolve => setTimeout(resolve, 1))
  }

  t.is(isPromise(asyncFn()), true)
  t.is(isPromise(new Promise(() => {})), true)
})

test('isAsyncFunction', t => {
  t.is(isAsyncFunction(1), false)
  t.is(isAsyncFunction('no'), false)
  t.is(isAsyncFunction(null), false)
  t.is(isAsyncFunction(undefined), false)
  t.is(isAsyncFunction(function () { }), false)
  t.is(isAsyncFunction(new Promise(() => {})), false)

  t.is(isAsyncFunction(async function () {}), true)
})

test('isFunction', t => {
  t.is(isFunction(1), false)
  t.is(isFunction('no'), false)
  t.is(isFunction(null), false)
  t.is(isFunction(undefined), false)
  t.is(isFunction(new Promise(() => {})), false)

  t.is(isFunction(() => { }), true)
  t.is(isFunction(function () { }), true)
  t.is(isFunction(async function () {}), true)
})

test('ifNullish', async t => {
  t.deepEqual(
    ifNullish(null, () => {
      return 'is-null'
    }),
    'is-null'
  )

  t.deepEqual(
    ifNullish(undefined, () => {
      return 'is-undefined'
    }),
    'is-undefined'
  )

  t.deepEqual(
    ifNullish(0, () => {
      return 'zero'
    }),
    undefined
  )

  t.deepEqual(
    ifNullish('', () => {
      return 'empty-string'
    }),
    undefined
  )

  t.deepEqual(
    await ifNullish(null, async () => {
      return 'Promise'
    }),
    'Promise'
  )
})

test('isNullish', t => {
  t.is(isNullish(), true)
  t.is(isNullish(null), true)
  t.is(isNullish(undefined), true)

  t.is(isNullish(0), false)
  t.is(isNullish(''), false)
  t.is(isNullish('no'), false)
  t.is(isNullish(() => {}), false)
})

test('isNotNullish', t => {
  t.is(isNotNullish(0), true)
  t.is(isNotNullish(''), true)
  t.is(isNotNullish('no'), true)
  t.is(isNotNullish(() => {}), true)

  t.is(isNotNullish(), false)
  t.is(isNotNullish(null), false)
  t.is(isNotNullish(undefined), false)
})

test('esmResolve', async t => {
  t.is(esmResolve(), undefined)
  t.is(esmResolve(null), null)
  t.is(esmResolve(undefined), undefined)

  t.deepEqual(esmResolve({ name: 'Marcus ' }), { name: 'Marcus ' })
  t.deepEqual(esmResolve({ default: { name: 'Marcus ' } }), { name: 'Marcus ' })
})

test('esmRequire', async t => {
  // t.throws(() => {
  //   return esmRequire(Path.resolve(__dirname, 'not-existent'))
  // }, { message: 'Cannot find module' }
  // )

  t.is(
    esmRequire(Path.resolve(__dirname, 'fixtures/esm-require')),
    'Marcus'
  )

  t.is(
    esmRequire(Path.resolve(__dirname, 'fixtures/esm-require-default')),
    'default Marcus'
  )
})

class User {
  constructor (name) {
    this.name = name
  }

  getName () {
    return this.name
  }

  setName (name) {
    this.name = name
  }
}
