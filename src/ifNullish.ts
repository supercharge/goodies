'use strict'

import { isNullish } from './isNullish.js'

/**
 * Runs the given `callback` if the `predicate` is `null` or `undefined`.
 *
 * @returns {*}
 */
export function ifNullish<R> (input: boolean, callback: () => Promise<R>): undefined | Promise<R>
export function ifNullish<R> (input: boolean, callback: () => R): undefined | R | Promise<R> {
  if (isNullish(input)) {
    return callback()
  }

  return undefined
}
