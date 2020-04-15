'use strict'

export class Goodies {
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
  async tap (value: any, callback?: Function): Promise<any> {
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
  async upon (value: any, callback?: Function): Promise<any> {
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
}
