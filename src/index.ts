'use strict'

import { Goodies } from './goodies'

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
export async function tap (value: any, callback?: Function): Promise<any> {
  return new Goodies().tap(value, callback)
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
export async function upon (value: any, callback?: Function): Promise<any> {
  return new Goodies().upon(value, callback)
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
  return new Goodies().isPromise(promise)
}
