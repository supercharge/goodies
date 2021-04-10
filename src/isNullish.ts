'use strict'

/**
 * Runs the given `callback` if the `predicate` is `null` or `undefined`.
 *
 * @param {Boolean} predicate
 * @param {Function} callback
 *
 * @returns {*}
 */
export function isNullish (input: any): boolean {
  return input === undefined || input === null
}
