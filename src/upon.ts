'use strict'

import { isPromise } from './isPromise.js'
import { isFunction } from './isFunction.js'
import { isAsyncFunction } from './isAsyncFunction.js'

/**
 * Calls the given `callback` function with the given `value` and returns
 * the result of the callback. It resolves the `value` before passing
 * it to the callback in case it is a Promise.
 *
 * @example
 * const email = await upon(User.findById(1), async user => {
 *   return user.email
 * })
 */
export function upon<T, R> (value: Promise<T>, callback: (value: T) => Promise<R>): Promise<R>
export function upon<T, R> (value: Promise<T>, callback: (value: T) => R): Promise<R>
export function upon<T, R> (value: T, callback: (value: T) => Promise<R>): Promise<R>
export function upon<T, R> (value: T, callback: (value: T) => R): R
export function upon<T, R = T> (value: T, callback: (value: T) => R): any {
  if (isPromise(value)) {
    return uponAsync(value, callback)
  }

  if (isAsyncFunction(callback)) {
    return uponAsync(value, callback)
  }

  return uponSync(value, callback)
}

/**
 * Synchronous handling of `upon`.
 */
function uponSync (value: any, callback?: Function): any {
  if (!callback) {
    return value
  }

  return isFunction(callback)
    ? callback(value)
    : value
}

/**
 * Asynchronous handling of `upon`.
 */
async function uponAsync<T, R> (value: T, callback: Function): Promise<R> {
  if (isPromise(value)) {
    value = await value
  }

  return isFunction(callback)
    ? callback(value)
    : value
}
