'use strict'

import { isNullish } from './isNullish.js'

/**
 * Determine whether the given `input` is **not** `null` or `undefined`.
 *
 * @example
 * isNotNullish() // false
 * isNotNullish(null) // false
 * isNotNullish(undefined) // false
 *
 * isNotNullish(1) // true
 * isNotNullish('') // true
 * isNotNullish(false) // true
 */
export function isNotNullish<T> (input: T | undefined | null): input is T {
  return !isNullish(input)
}
