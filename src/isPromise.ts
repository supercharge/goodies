'use strict'

import { isFunction } from './isFunction'

/**
 * Determine whether the given `promise` is a Promise.
 *
 * @param {*} promise
 *
 * @returns {Boolean}
 *
 * @example
 * isPromise('no') // false
 * isPromise(new Promise(() => {})) // true
 */
export function isPromise (promise?: any): boolean {
  return !!promise && isFunction(promise.then)
}
