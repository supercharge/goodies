'use strict'

/**
 * Determine whether the given `input` is a function.
 *
 * @param {*} input
 *
 * @returns {Boolean}
 *
 * @example
 * isFunction('no') // false
 * isFunction(() => {}) // true
 * isFunction(function () {}) // true
 */
export function isFunction (input?: any): boolean {
  return typeof input === 'function'
}
