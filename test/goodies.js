'use strict'

const Lab = require('@hapi/lab')
const { expect } = require('@hapi/code')
const { tap } = require('../src/goodies')

const { describe, it } = (exports.lab = Lab.script())

describe('Goodies', () => {
  it('tap', async () => {
    expect(await tap(1)).to.equal(1)

    expect(
      await tap([1, 2, 3], (items) => {
        items.map(item => item * 2)
      })
    ).to.equal([1, 2, 3])

    expect(
      await tap(await Promise.resolve([1, 2, 3]), async (items) => {
        Array.from(items).reverse()
      })
    ).to.equal([1, 2, 3])
  })
})
