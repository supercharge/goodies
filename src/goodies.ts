'use strict'

export class Goodies {
  /**
   * Handles the tap call and delegates it either to an async tap
   * handler or to a sync tap handler.
   *
   * @param {*} value
   * @param {Function} callback
   *
   * @returns {*} value
   */
  tap<T> (value: T, callback?: (value: T) => any | Promise<any>): T|Promise<T> {
    if (this.isPromise(value)) {
      return this.tapAsync(value, callback)
    }

    if (this.isAsyncFunction(callback)) {
      return this.tapAsync(value, callback)
    }

    return this.tapSync(value, callback)
  }

  /**
   * Calls the given `callback` function with the
   * given `value` and returns `value`.
   *
   * @param {*} value
   * @param {Function} callback
   *
   * @returns {*} value
   */
  tapSync (value: any, callback?: Function): any {
    if (!callback) {
      return value
    }

    if (this.isFunction(callback)) {
      callback(value)
    }

    return value
  }

  /**
  * Calls the given `callback` function with the given `value`
  * and returns `value`. It resolves the `value` before
  * passing it to the callback in case it is a Promise.
   *
   * @param {*} value
   * @param {Function} callback
   *
   * @returns {*} value
   */
  async tapAsync (value: any, callback?: (value: any) => Promise<any>): Promise<any> {
    if (!callback) {
      return value
    }

    if (this.isPromise(value)) {
      value = await value
    }

    if (this.isFunction(callback)) {
      await callback(value)
    }

    return value
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
   */
  upon (value: any, callback: Function): Promise<any>|any {
    if (this.isPromise(value)) {
      return this.uponAsync(value, callback)
    }

    if (this.isAsyncFunction(callback)) {
      return this.uponAsync(value, callback)
    }

    return this.uponSync(value, callback)
  }

  /**
   * Calls the given `callback` function with the given `value` and returns
   * the result of the callback.
   *
   * @param {*} value
   * @param {Function} callback
   *
   * @returns {*} value
   */
  uponSync (value: any, callback: Function): any {
    return this.isFunction(callback)
      ? callback(value)
      : value
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
   */

  async uponAsync (value: any, callback: Function): Promise<any> {
    if (this.isPromise(value)) {
      value = await value
    }

    return this.isFunction(callback)
      ? callback(value)
      : value
  }

  /**
   * Determine whether the given `promise` is a Promise.
   *
   * @param {*} promise
   *
   * @returns {Boolean}
   */
  isPromise (promise?: any): Boolean {
    return !!promise && this.isFunction(promise.then)
  }

  /**
   * Determine whether the given `input` is a function.
   *
   * @param {*} input
   *
   * @returns {Boolean}
   */
  isFunction (input: any): Boolean {
    return typeof input === 'function'
  }

  /**
   * Determine whether the given `func` is an async function.
   *
   * @param {*} input
   *
   * @returns {Boolean}
   */
  isAsyncFunction (input: any): Boolean {
    return this.isFunction(input) && input.constructor.name === 'AsyncFunction'
  }
}
