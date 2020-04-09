'use strict'

const Lab = require('@hapi/lab')
const { expect } = require('@hapi/code')
const { tap, isPromise } = require('..')

const { describe, it } = (exports.lab = Lab.script())

describe('Goodies', () => {
  it('tap', async () => {
    expect(await tap(1)).to.equal(1)
    expect(
      await tap(new User('Marcus'), user => {
        user.name = 'Goodie'
      })
    ).to.equal({ name: 'Goodie' })

    expect(
      await tap([1, 2, 3], items => {
        items.map(item => item * 2)
      })
    ).to.equal([1, 2, 3])

    expect(
      await tap(await Promise.resolve([1, 2, 3]), async (items) => {
        items.sort((a, b) => b - a)
      })
    ).to.equal([3, 2, 1])

    // resolves a promise before passing it down to the callback
    expect(
      await tap(Promise.resolve(new User('Marcus')), user => {
        user.name = 'Goodie'
      })
    ).to.equal({ name: 'Goodie' })
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
})

class User {
  constructor (name) {
    this.name = name
  }
}
