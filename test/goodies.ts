'use strict'

import * as Lab from '@hapi/lab'
import { expect } from '@hapi/code'
import { tap, upon, isPromise } from '../src'

const lab = Lab.script()
const { describe, it } = lab
export { lab }

describe('Goodies', () => {
  it('tap', async () => {
    expect(await tap(1)).to.equal(1)
    expect(
      await tap(new User('Marcus'), (user: User) => {
        user.setName('Goodie')
      })
    ).to.equal({ name: 'Goodie' })

    expect(
      await tap([1, 2, 3], (items: any[]) => {
        items.map(item => item * 2)
      })
    ).to.equal([1, 2, 3])

    expect(
      await tap(await Promise.resolve([1, 2, 3]), (items: any[]) => {
        items.sort((a, b) => b - a)
      })
    ).to.equal([3, 2, 1])

    // resolves a promise before passing it down to the callback
    expect(
      await tap(Promise.resolve(new User('Marcus')), (user: User) => {
        user.setName('Goodie')
      })
    ).to.equal({ name: 'Goodie' })
  })

  it('upon', async () => {
    expect(await upon(1)).to.equal(1)
    expect(await upon(1, async () => { })).to.be.undefined()

    expect(
      await upon(new User('Marcus'), (user: User) => {
        return user.getName()
      })
    ).to.equal('Marcus')

    // resolves a promise before passing it down to the callback
    expect(
      await upon(Promise.resolve(new User('Marcus')), (user: User) => {
        return user.getName()
      })
    ).to.equal('Marcus')
  })

  it('isPromise', () => {
    expect(isPromise()).to.be.false()
    expect(isPromise(1)).to.be.false()
    expect(isPromise('no')).to.be.false()

    async function asyncFn (): Promise<void> {
      await new Promise(resolve => setTimeout(resolve, 1))
    }

    expect(isPromise(asyncFn())).to.be.true()
    expect(isPromise(new Promise(() => {}))).to.be.true()
  })
})

class User {
  private name: string

  constructor (name: string) {
    this.name = name
  }

  getName (): string {
    return this.name
  }

  setName (name: string): void {
    this.name = name
  }
}
