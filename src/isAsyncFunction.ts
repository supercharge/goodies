'use strict'

import { isFunction } from './isFunction'

/**
 * Determine whether the given `input` is an async function.
 *
 * @param {*} input
 *
 * @returns {Boolean}
 */
export function isAsyncFunction (input: any): boolean {
  return isFunction(input) && input.constructor.name === 'AsyncFunction'
}
