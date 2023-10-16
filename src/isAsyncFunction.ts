'use strict'

import { isFunction } from './isFunction.js'

export type AsyncFunction = (...args: any[]) => Promise<any>

/**
 * Determine whether the given `input` is an async function.
 */
export function isAsyncFunction (input: any): input is AsyncFunction {
  return isFunction(input) && input.constructor.name === 'AsyncFunction'
}
