'use strict'

import { isNullish } from './isNullish'

/**
 * Runs the given `callback` if the `predicate` is `null` or `undefined`.
 *
 * @param {Boolean} predicate
 * @param {Function} callback
 *
 * @returns {*}
 */
export function ifNullish<R> (input: boolean, callback: () => Promise<R>): undefined | Promise<R>
export function ifNullish<R> (input: boolean, callback: () => R): undefined | R | Promise<R> {
  if (isNullish(input)) {
    return callback()
  }
}
