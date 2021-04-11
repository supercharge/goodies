'use strict'

import { isPromise } from './isPromise'
import { isFunction } from './isFunction'
import { isAsyncFunction } from './isAsyncFunction'

/**
 * Calls the given `callback` function with the given `value`
 * and returns `value`. It resolves the `value` before
 * passing it to the callback in case it is a Promise.
 *
 * @param {*} value
 * @param {Function} callback
 *
 * @returns {*} value
 *
 * @example
 * const user = await tap(new User({ name: 'Supercharge' }), async user => {
 *   await user.save()
 *   await user.subscribeToNewsletter()
 * })
 */
export function tap<T> (value: Promise<T>, callback?: (value: T) => Promise<any>): Promise<T>
export function tap<T> (value: Promise<T>, callback?: (value: T) => any): Promise<T>
export function tap<T> (value: T, callback?: (value: T) => Promise<any>): Promise<T>
export function tap<T> (value: T, callback?: (value: T) => any): T
export function tap<T> (value: T, callback?: (value: T) => any): any {
  if (isPromise(value)) {
    return tapAsync(value, callback)
  }

  if (isAsyncFunction(callback)) {
    return tapAsync(value, callback)
  }

  return tapSync(value, callback)
}

/**
 * Synchronous handling of `tap`.
 *
 * @param {*} value
 * @param {Function} callback
 *
 * @returns {*}
 */
function tapSync (value: any, callback?: Function): any {
  if (!callback) {
    return value
  }

  if (isFunction(callback)) {
    callback(value)
  }

  return value
}

/**
 * Asynchronous handling of `tap`.
 *
 * @param {*} value
 * @param {Function} callback
 *
 * @returns {*}
 */
async function tapAsync<T> (value: T, callback?: (value: T) => any): Promise<any> {
  if (!callback) {
    return value
  }

  if (isPromise(value)) {
    value = await value
  }

  if (isFunction(callback)) {
    await callback(value)
  }

  return value
}
