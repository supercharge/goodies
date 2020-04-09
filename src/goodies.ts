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
 * await tap(new User({ name: 'Supercharge' }), async user => {
 *   await user.save()
 *   await user.subscribeToNewsletter()
 * })
 */
export async function tap<T> (value: T, callback?: Function): Promise<T> {
  if (isPromise(value)) {
    value = await value
  }

  if (callback) {
    await callback(value)
  }

  return value
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
  return !!promise && typeof promise.then === 'function'
}
