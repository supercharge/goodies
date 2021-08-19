'use strict'

/**
 * Returns the resolved ESM default exports and CommonJS (module) exports.
 *
 * @param {*} input
 *
 * @returns {T}
 */
export function esmResolve<T> (input: any): T {
  return input?.default
    ? input.default
    : input
}
