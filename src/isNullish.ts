'use strict'

/**
 * Determine whether the given `input` is `null` or `undefined`.
 *
 * @param {T} input
 *
 * @returns {Boolean}
 */
export function isNullish<T> (input: T | undefined | null): input is null | undefined {
  return input == null
}
