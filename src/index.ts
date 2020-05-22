'use strict'

import { Goodies as Goodie } from './goodies'

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
export function tap<T> (value: T, callback?: (value: T) => any|Promise<any>): T | Promise<T> {
  return new Goodie().tap(value, callback)
}

/**
 * Calls the given `callback` function with the given `value` and returns
 * the result of the callback. It resolves the `value` before passing
 * it to the callback in case it is a Promise.
 *
 * @param {*} value
 * @param {Function} callback
 *
 * @returns {*} value
 *
 * @example
 * const email = await upon(User.findById(1), async user => {
 *   return user.email
 * })
 */
export function upon (value: any, callback: Function): any|Promise<any> {
  return new Goodie().upon(value, callback)
}

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
export function isPromise (promise?: any): Boolean {
  return new Goodie().isPromise(promise)
}

/**
 * Determine whether the given `input` is an async function.
 *
 * @param {*} input
 *
 * @returns {Boolean}
 */
export function isAsyncFunction (input: any): Boolean {
  return new Goodie().isAsyncFunction(input)
}
