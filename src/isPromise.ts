'use strict'

import { isFunction } from './isFunction.js'

/**
 * Determine whether the given `promise` is a Promise.
 *
 * @example
 * isPromise('no') // false
 * isPromise(new Promise(() => {})) // true
 */
export function isPromise<T = any> (promise: any): promise is Promise<T> {
  return promise != null && isFunction(promise.then)
}
