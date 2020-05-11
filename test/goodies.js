'use strict'

const Lab = require('@hapi/lab')
const { expect } = require('@hapi/code')
const { tap, upon, isPromise, isAsyncFunction } = require('..')

const { describe, it } = exports.lab = Lab.script()

describe('Goodies', () => {
  it('tap', async () => {
    expect(tap(1)).to.equal(1)
    expect(
      tap(new User('Marcus'), (user) => user.setName('Goodie'))
    ).to.equal({ name: 'Goodie' })

    expect(
      tap([1, 2, 3], (items) => items.map(item => item * 2))
    ).to.equal([1, 2, 3])

    expect(
      tap(await Promise.resolve([1, 2, 3]), (items) => {
        items.sort((a, b) => b - a)
      })
    ).to.equal([3, 2, 1])

    // resolves a promise before passing it down to the callback
    expect(
      await tap(Promise.resolve(new User('Marcus')), (user) => user.setName('Goodie'))
    ).to.equal({ name: 'Goodie' })

    expect(
      await tap([1, 2, 3], async () => {
        await Promise.resolve()
      })
    ).to.equal([1, 2, 3])

    expect(
      await tap(Promise.resolve([1, 2, 3]))
    ).to.equal([1, 2, 3])
  })

  it('upon', async () => {
    // upon async
    expect(await upon(1, async () => { })).to.be.undefined()

    // resolves a promise before passing it down to the callback
    expect(
      await upon(Promise.resolve(new User('Marcus')), (user) => {
        return user.getName()
      })
    ).to.equal('Marcus')

    expect(
      await upon(Promise.resolve(new User('Marcus')))
    ).to.equal(new User('Marcus'))

    // upon sync
    expect(upon(1)).to.equal(1)
    expect(
      upon(new User('Marcus'), (user) => {
        return user.getName()
      })
    ).to.equal('Marcus')
  })

  it('isPromise', () => {
    expect(isPromise()).to.be.false()
    expect(isPromise(1)).to.be.false()
    expect(isPromise('no')).to.be.false()

    async function asyncFn () {
      await new Promise(resolve => setTimeout(resolve, 1))
    }

    expect(isPromise(asyncFn())).to.be.true()
    expect(isPromise(new Promise(() => {}))).to.be.true()
  })

  it('isAsyncFunction', () => {
    expect(isAsyncFunction(1)).to.be.false()
    expect(isAsyncFunction('no')).to.be.false()
    expect(isAsyncFunction(null)).to.be.false()
    expect(isAsyncFunction(undefined)).to.be.false()
    expect(isAsyncFunction(function () { })).to.be.false()
    expect(isAsyncFunction(new Promise(() => {}))).to.be.false()

    expect(isAsyncFunction(async function () {})).to.be.true()
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
