'use strict'

const { tap, upon, isPromise, isFunction, isAsyncFunction, ifNullish, isNullish, esmResolve } = require('../dist')

describe('Goodies', () => {
  it('tap', async () => {
    expect(tap(1)).toEqual(1)

    expect(
      tap(new User('Marcus'), (user) => {
        user.setName('Goodie')
      })
    ).toEqual({ name: 'Goodie' })

    expect(
      tap([1, 2, 3], (items) => items.map(item => item * 2))
    ).toEqual([1, 2, 3])

    expect(
      tap(await Promise.resolve([1, 2, 3]), (items) => {
        items.sort((a, b) => b - a)
      })
    ).toEqual([3, 2, 1])

    // resolves a promise before passing it down to the callback
    expect(
      await tap(Promise.resolve(new User('Marcus')), (user) => user.setName('Goodie'))
    ).toEqual({ name: 'Goodie' })

    expect(
      await tap([1, 2, 3], async () => {
        await Promise.resolve()
      })
    ).toEqual([1, 2, 3])

    expect(
      await tap(Promise.resolve([1, 2, 3]))
    ).toEqual([1, 2, 3])
  })

  it('tap - handles second non-function arguments', async () => {
    expect(tap(1, new User())).toEqual(1)

    expect(
      await tap(Promise.resolve('Supercharge'), 1234)
    ).toEqual('Supercharge')
  })

  it('upon', async () => {
    // upon async
    expect(await upon(1, async () => { })).toBeUndefined()
    expect(await upon(Promise.resolve(1), new User())).toEqual(1)

    // resolves a promise before passing it down to the callback
    expect(
      await upon(Promise.resolve(new User('Marcus')), (user) => {
        return user.getName()
      })
    ).toEqual('Marcus')

    expect(
      await upon(Promise.resolve(new User('Marcus')))
    ).toEqual(new User('Marcus'))

    // upon sync
    expect(upon(1)).toEqual(1)
    expect(upon(1, new User())).toEqual(1)

    expect(
      upon(new User('Marcus'), (user) => {
        return user.getName()
      })
    ).toEqual('Marcus')
  })

  it('isPromise', () => {
    expect(isPromise()).toBe(false)
    expect(isPromise(1)).toBe(false)
    expect(isPromise('no')).toBe(false)

    async function asyncFn () {
      await new Promise(resolve => setTimeout(resolve, 1))
    }

    expect(isPromise(asyncFn())).toBe(true)
    expect(isPromise(new Promise(() => {}))).toBe(true)
  })

  it('isAsyncFunction', () => {
    expect(isAsyncFunction(1)).toBe(false)
    expect(isAsyncFunction('no')).toBe(false)
    expect(isAsyncFunction(null)).toBe(false)
    expect(isAsyncFunction(undefined)).toBe(false)
    expect(isAsyncFunction(function () { })).toBe(false)
    expect(isAsyncFunction(new Promise(() => {}))).toBe(false)

    expect(isAsyncFunction(async function () {})).toBe(true)
  })

  it('isFunction', () => {
    expect(isFunction(1)).toBe(false)
    expect(isFunction('no')).toBe(false)
    expect(isFunction(null)).toBe(false)
    expect(isFunction(undefined)).toBe(false)
    expect(isFunction(new Promise(() => {}))).toBe(false)

    expect(isFunction(() => { })).toBe(true)
    expect(isFunction(function () { })).toBe(true)
    expect(isFunction(async function () {})).toBe(true)
  })

  it('ifNullish', async () => {
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

  it('isNullish', () => {
    expect(isNullish()).toBe(true)
    expect(isNullish(null)).toBe(true)
    expect(isNullish(undefined)).toBe(true)

    expect(isNullish(0)).toBe(false)
    expect(isNullish('')).toBe(false)
    expect(isNullish('no')).toBe(false)
    expect(isNullish(function () {})).toBe(false)
  })

  it('esmResolve', async () => {
    expect(esmResolve()).toEqual(undefined)
    expect(esmResolve(null)).toEqual(null)
    expect(esmResolve(undefined)).toEqual(undefined)

    expect(esmResolve({ name: 'Marcus ' })).toEqual({ name: 'Marcus ' })
    expect(esmResolve({ default: { name: 'Marcus ' } })).toEqual({ name: 'Marcus ' })
  })
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
