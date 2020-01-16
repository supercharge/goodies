'use strict'

class Goodies {
  /**
   * Call the given `callback` with the given `value` and return the `value`.
   *
   * @param {*} value
   * @param {Function} callback
   *
   * @returns {*}
   */
  static async tap (value, callback) {
    if (callback) {
      await callback(value)
    }

    return value
  }
}

module.exports = Goodies
