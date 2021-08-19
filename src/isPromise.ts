'use strict'

import { isFunction } from './isFunction'

/**
 * Determine whether the given `promise` is a Promise.
 *
 * @param {T} promise
 *
 * @returns {Boolean}
 *
 * @example
 * isPromise('no') // false
 * isPromise(new Promise(() => {})) // true
 */
export function isPromise<T = any> (promise: any): promise is Promise<T> {
  return !!promise && isFunction(promise.then)
}
