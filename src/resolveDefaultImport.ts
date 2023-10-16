'use strict'

/**
 * Returns the resolved ESM `default` export from module found at `filePath` without the wrapping `{ default: … }`.
 */
export async function resolveDefaultImport<T extends object> (filePath: string): Promise<T extends { default: infer A } ? A : never> {
  if (!filePath) {
    throw new Error('"resolveDefaultImport" requires a file path to a module as the first argument')
  }

  const moduleExports = await import(filePath)

  if ('default' in moduleExports) {
    return moduleExports.default
  }

  throw new Error(`Missing "export default" in module "${filePath}"`, {
    cause: {
      source: filePath,
    },
  })
}
