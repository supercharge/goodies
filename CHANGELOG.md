# Changelog


## [2.0.0](https://github.com/supercharge/goodies/compare/v1.11.0...v2.0.0) - 2022-10-17

### Added
- `resolveDefaultImport` method: returns the resolved `default` export from module found at `filePath` without the wrapping `{ default: … }`

### Removed
- `esmRequire`: not needed anymore because this package moved to ESM and `esmRequire` used CommonJS. Use `resolveDefaultImport` instead
- `esmResolve`: not needed anymore because this method is now part of `resolveDefaultImport`

### Updated
- bump dependencies
- moving from Japa to the native Node.js test runner

### Breaking changes
- require Node.js v20 (or later)
- moving this package from CommonJS to ESM


## [1.11.1](https://github.com/supercharge/goodies/compare/v1.11.0...v1.11.1) - 2022-08-19

### Added
- export `AsyncFunction` type

### Fixed
- fix return type of `isAsyncFunction`


## [1.11.0](https://github.com/supercharge/goodies/compare/v1.10.1...v1.11.0) - 2022-08-19

### Updated
- bump dependencies
- move testing from AVA to Japa
- refine return type for `isAsyncFunction`


## [1.10.1](https://github.com/supercharge/goodies/compare/v1.10.0...v1.10.1) - 2022-04-04

### Updated
- bump dependencies
- change main export in `package.json` to `dist/index.js`


## [1.10.0](https://github.com/supercharge/goodies/compare/v1.9.0...v1.10.0) - 2021-08-19

### Added
- `isNotNullish(input)` method determining whether the given `input` **is not** `null` or `undefined`

### Updated
- bump dependencies
- refined types for `isNullish`, `isPromise`, `isFunction`


## [1.9.0](https://github.com/supercharge/goodies/compare/v1.8.0...v1.9.0) - 2021-04-11

### Updated
- bump dependencies
- refactored the `Goodies` class to individual methods
- this package now exports individual methods making the package tree-shakable and usable in bundled environments
- move test runner from `jest` to `AVA` (avoiding globals and using explicit methods instead)


## [1.8.0](https://github.com/supercharge/goodies/compare/v1.7.0...v1.8.0) - 2021-01-05

### Added
- `esmRequire(input)` method requires and returns the resolved export of `input` from ESM and CommonJS

### Updated
- bump dependencies


## [1.7.0](https://github.com/supercharge/goodies/compare/v1.6.2...v1.7.0) - 2020-12-15

### Added
- `isNullish(input)` method to determine whether the given `input` is `null` or `undefined`

### Updated
- bump dependencies


## [1.6.2](https://github.com/supercharge/goodies/compare/v1.6.1...v1.6.2) - 2020-12-10

### Fixed
- fixed `Boolean` method return types to `boolean`


## [1.6.1](https://github.com/supercharge/goodies/compare/v1.6.0...v1.6.1) - 2020-12-10

### Fixed
- fixed overloaded method typings for `tap` and `upon`


## [1.6.0](https://github.com/supercharge/goodies/compare/v1.5.1...v1.6.0) - 2020-12-10

### Added
- `isFunction(input)` method determines whether the given `input` is a function
- `esmResolve(input)` method returns the resolved export of `input` from ESM and CommonJS

### Updated
- bump dependencies
- change `main` entrypoint in `package.json` to `dist` folder
- move test runner from `@hapi/lab` to `jest`
- move assertions from `@hapi/code` to `jest`


## [1.5.1](https://github.com/supercharge/goodies/compare/v1.5.0...v1.5.1) - 2020-07-21

### Fixed
- fixed the GitHub Action workflow to successfully publish the package in the GitHub Package Registry


## [1.5.0](https://github.com/supercharge/goodies/compare/v1.4.0...v1.5.0) - 2020-07-21

### Added
- `ifNullish(predicate, callback)` method running the `callback` function if the given `predicate` is `undefined` or `null`

### Updated
- bump dependencies
- improved type definitions on `upon` for returned values allowing IntelliSense to kick in


## [1.4.0](https://github.com/supercharge/goodies/compare/v1.3.0...v1.4.0) - 2020-05-23

### Added
- refined typings for async and sync functions


## [1.3.0](https://github.com/supercharge/goodies/compare/v1.2.0...v1.3.0) - 2020-05-22

### Added
- typed `tap` function keeping the argument’s type as the return type


## [1.2.0](https://github.com/supercharge/goodies/compare/v1.1.0...v1.2.0) - 2020-05-12

### Added
- `isAsyncFunction(input)` method determining whether the given `input` is an async function
- testing against Node.js v14

### Updated
- bump dependencies
- move tests back to JavaScript
- `tap(value, callback)` now only returns a Promise when the value is a promise or the callback is an async function. Otherwise, tap behaves synchronously
- `upon(value, callback)` now only returns a Promise when the value is a promise or the callback is an async function. Otherwise, upon behaves synchronously

### Removed
- testing against Node.js v13


## [1.1.0](https://github.com/supercharge/goodies/compare/v1.0.0...v1.1.0) - 2020-04-15

### Added
- `upon(value, callback)` method: `upon` calls the given `callback` function with the `value` and returns the result of the callback
- `tap` the value when a promise as the first argument before passing it to the callback
- `isPromise(input)` method: determine whether the given `input` is a promise

### Updated
- move code base to TypeScript to ship this package with typings
- add API section in Readme outlining available methods


## 1.0.0 - 2020-01-16

### Added
- `1.0.0` release 🚀 🎉
