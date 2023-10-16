'use strict'

import { expect } from 'expect'
import { test } from 'node:test'
import {
  tap, upon, isPromise, isFunction, isAsyncFunction,
  ifNullish, isNullish, isNotNullish, resolveDefaultImport
} from '../dist/index.js'

test('tap', async () => {
  expect(tap(1)).toEqual(1)

  expect(
    tap(new User('Marcus'), (user) => {
      user.setName('Goodie')
    })
  ).toEqual(new User('Goodie'))

  expect(
    tap([1, 2, 3], (items) => items.map(item => item * 2))
  ).toEqual([1, 2, 3])

  expect(
    tap(await Promise.resolve([1, 2, 3]), (items) => {
      items.sort((a, b) => b - a)
    })).toEqual([3, 2, 1])

  // resolves a promise before passing it down to the callback
  expect(
    await tap(Promise.resolve(new User('Marcus')), (user) => user.setName('Goodie'))
  ).toEqual(new User('Goodie'))

  expect(
    await tap([1, 2, 3], async () => {
      await Promise.resolve()
    })
  ).toEqual([1, 2, 3])

  expect(
    await tap(Promise.resolve([1, 2, 3]))
  ).toEqual([1, 2, 3])
})

test('tap - handles second non-function arguments', async () => {
  expect(tap(1, new User())).toBe(1)

  expect(
    await tap(Promise.resolve('Supercharge'), 1234)
  ).toEqual('Supercharge')
})

test('upon', async () => {
  // upon async
  expect(await upon(1, async () => { })).toEqual(undefined)
  expect(await upon(Promise.resolve(1), new User())).toEqual(1)

  // resolves a promise before passing it down to the callback
  expect(
    await upon(Promise.resolve(new User('Marcus')), (user) => {
      return user.getName()
    })).toEqual('Marcus')

  expect(
    await upon(Promise.resolve(new User('Marcus')))
  ).toEqual(
    new User('Marcus')
  )

  // upon sync
  expect(upon(1)).toEqual(1)
  expect(upon(1, new User())).toEqual(1)

  expect(
    upon(new User('Marcus'), (user) => {
      return user.getName()
    })
  ).toEqual('Marcus')
})

test('isPromise', () => {
  expect(isPromise()).toEqual(false)
  expect(isPromise(1)).toEqual(false)
  expect(isPromise('no')).toEqual(false)

  async function asyncFn () {
    await new Promise(resolve => setTimeout(resolve, 1))
  }

  expect(isPromise(asyncFn())).toEqual(true)
  expect(isPromise(new Promise(() => {}))).toEqual(true)
})

test('isAsyncFunction', () => {
  expect(isAsyncFunction(1)).toEqual(false)
  expect(isAsyncFunction('no')).toEqual(false)
  expect(isAsyncFunction(null)).toEqual(false)
  expect(isAsyncFunction(undefined)).toEqual(false)
  expect(isAsyncFunction(() => {})).toEqual(false)
  expect(isAsyncFunction(new Promise(() => {}))).toEqual(false)

  expect(isAsyncFunction(async () => {})).toEqual(true)
  expect(isAsyncFunction(async function () {})).toEqual(true)
})

test('isFunction', () => {
  expect(isFunction(1)).toEqual(false)
  expect(isFunction('no')).toEqual(false)
  expect(isFunction(null)).toEqual(false)
  expect(isFunction(undefined)).toEqual(false)
  expect(isFunction(new Promise(() => {}))).toEqual(false)

  expect(isFunction(() => { })).toEqual(true)
  expect(isFunction(function () { })).toEqual(true)
  expect(isFunction(async function () {})).toEqual(true)
})

test('ifNullish', async () => {
  expect(
    ifNullish(null, () => {
      return 'is-null'
    })
  ).toEqual('is-null')

  expect(
    ifNullish(undefined, () => {
      return 'is-undefined'
    })
  ).toEqual('is-undefined')

  expect(
    ifNullish(0, () => {
      return 'zero'
    })
  ).toBeUndefined()

  expect(
    ifNullish('', () => {
      return 'empty-string'
    })
  ).toBeUndefined()

  expect(
    await ifNullish(null, async () => {
      return 'Promise'
    })
  ).toEqual('Promise')
})

test('isNullish', () => {
  expect(isNullish()).toBe(true)
  expect(isNullish(null)).toBe(true)
  expect(isNullish(undefined)).toBe(true)

  expect(isNullish(0)).toBe(false)
  expect(isNullish('')).toBe(false)
  expect(isNullish('no')).toBe(false)
  expect(isNullish(() => {})).toBe(false)
})

test('isNotNullish', () => {
  expect(isNotNullish(0)).toBe(true)
  expect(isNotNullish('')).toBe(true)
  expect(isNotNullish('no')).toBe(true)
  expect(isNotNullish(() => {})).toBe(true)

  expect(isNotNullish()).toBe(false)
  expect(isNotNullish(null)).toBe(false)
  expect(isNotNullish(undefined)).toBe(false)
})

test('resolveDefaultImport', async () => {
  await expect(resolveDefaultImport()).rejects.toThrow('"resolveDefaultImport" requires a file path to a module')
  await expect(resolveDefaultImport('')).rejects.toThrow('"resolveDefaultImport" requires a file path to a module')
  await expect(resolveDefaultImport(null)).rejects.toThrow('"resolveDefaultImport" requires a file path to a module')

  const pathToFileWithDefaultExport = import.meta.resolve('./fixtures/with-default-export.js')
  const imports = await resolveDefaultImport(pathToFileWithDefaultExport)
  expect(imports).toEqual('default Supercharge')

  const pathToFileWithoutDefaultExport = import.meta.resolve('./fixtures/without-default-export.js')
  await expect(resolveDefaultImport(pathToFileWithoutDefaultExport)).rejects.toThrow('Missing "export default" in module')
})

// test('esmResolve', async () => {
//   expect(esmResolve()).toBe(undefined)
//   expect(esmResolve(null)).toBe(null)
//   expect(esmResolve(undefined)).toBe(undefined)

//   expect(esmResolve({ name: 'Marcus ' })).toEqual({ name: 'Marcus ' })
//   expect(esmResolve({ default: { name: 'Marcus ' } })).toEqual({ name: 'Marcus ' })
// })

// test('esmRequire', async () => {
//   expect(
//     esmRequire(Path.resolve(__dirname, 'fixtures/esm-require'))
//   ).toEqual('Marcus')

//   expect(
//     esmRequire(Path.resolve(__dirname, 'fixtures/esm-require-default'))
//   ).toEqual('default Marcus')
// })

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
