'use strict'

import { esmResolve } from './esmResolve'

/**
 * `require`s with the given `path` and returns the resolved
 * ESM default exports and CommonJS (module) exports.
 *
 * @param {String} path
 *
 * @returns {*}
 */
export function esmRequire<T = any> (path: string): T {
  return esmResolve(
    require(path)
  )
}
