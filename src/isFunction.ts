'use strict'

/**
 * Determine whether the given `input` is a function.
 *
 * @example
 * isFunction('no') // false
 *
 * isFunction(() => {}) // true
 * isFunction(function () {}) // true
 */
export function isFunction (input: any): input is Function {
  return typeof input === 'function'
}
