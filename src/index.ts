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
export function tap<T> (value: Promise<T>, callback?: (value: T) => Promise<any>): Promise<T>
export function tap<T> (value: Promise<T>, callback?: (value: T) => any): Promise<T>
export function tap<T> (value: T, callback?: (value: T) => Promise<any>): Promise<T>
export function tap<T> (value: T, callback?: (value: T) => any): T
export function tap<T> (value: T, callback?: (value: T) => any): T {
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
export function upon<T, R> (value: Promise<T>, callback?: (value: T) => Promise<any>): Promise<R>
export function upon<T, R> (value: Promise<T>, callback?: (value: T) => R): Promise<R>
export function upon<T, R> (value: T, callback?: (value: T) => Promise<R>): Promise<R>
export function upon<T, R> (value: T, callback?: (value: T) => R): R
export function upon<T, R> (value: T, callback?: (value: T) => R): R {
  return new Goodie().upon(value, callback)
}

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
export function isFunction (input?: any): Boolean {
  return new Goodie().isFunction(input)
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

/**
 * Runs the given `callback` if the `predicate` is `null` or `undefined`.
 *
 * @param {Boolean} predicate
 * @param {Function} callback
 *
 * @returns {*}
 */
export function ifNullish<R> (input: boolean, callback: () => Promise<R>): undefined | Promise<R>
export function ifNullish<R> (input: boolean, callback: () => R): undefined | R | Promise<R> {
  return new Goodie().ifNullish<R>(input, callback)
}

/**
 * Returns the resolved ESM default exports and CommonJS (module) exports.
 *
 * @param {*} input
 *
 * @returns {*}
 */
export function esmResolve (input: any): any {
  return new Goodie().esmResolve(input)
}
