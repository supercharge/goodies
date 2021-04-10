'use strict'

/**
 * Returns the resolved ESM default exports and CommonJS (module) exports.
 *
 * @param {*} input
 *
 * @returns {*}
 */
export function esmResolve (input: any): any {
  return input?.default
    ? input.default
    : input
}
