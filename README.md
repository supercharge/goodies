<div align="center">
  <a href="https://superchargejs.com">
    <img width="471" style="max-width:100%;" src="https://superchargejs.com/images/supercharge-text.svg" />
  </a>
  <br/>
  <br/>
  <p>
    <h3>Goodies</h3>
  </p>
  <p>
    Helper and utility functions for Node.js.
  </p>
  <br/>
  <p>
    <a href="#installation"><strong>Installation</strong></a> ·
    <a href="#docs"><strong>Docs</strong></a> ·
    <a href="#api"><strong>API</strong></a>
  </p>
  <br/>
  <br/>
  <p>
    <a href="https://www.npmjs.com/package/@supercharge/goodies"><img src="https://img.shields.io/npm/v/@supercharge/goodies.svg" alt="Latest Version"></a>
    <a href="https://www.npmjs.com/package/@supercharge/goodies"><img src="https://img.shields.io/npm/dm/@supercharge/goodies.svg" alt="Monthly downloads"></a>
  </p>
  <p>
    <em>Follow <a href="http://twitter.com/marcuspoehls">@marcuspoehls</a> and <a href="http://twitter.com/superchargejs">@superchargejs</a> for updates!</em>
  </p>
</div>

---

## Introduction
The `@supercharge/goodies` package provides a handful of useful helper functions for Node.js and JavaScript, like an async `tap` function.


## Installation

```
npm i @supercharge/goodies
```


## Docs
Find all the [details for `@supercharge/goodies` in the extensive Supercharge docs](https://superchargejs.com/docs/goodies).


## API
Using `@supercharge/goodies` is pretty straightforward. The package exports a handful of methods that you can reach for when requiring the package:


#### tap(value, callback)
Returns the `value` after running the `callback`. The callback receives the value as an argument.

```js
const { tap } = require('@supercharge/goodies')

return tap(await User.find(1), async (user) => {
  await user.subscribeToNewsletter()
})

// returns the user with ID 1
```


#### upon(value, callback)
Returns the result of the callback. The callback receives the value as an argument.

```js
const { upon } = require('@supercharge/goodies')

return upon(await User.find(1), async (user) => {
  return user.email
})

// user@email.com
```


## Contributing
Do you miss a goodie function? We very much appreciate your contribution! Please send in a pull request 😊

1.  Create a fork
2.  Create your feature branch: `git checkout -b my-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request 🚀


## License
MIT © [Supercharge](https://superchargejs.com)

---

> [superchargejs.com](https://superchargejs.com) &nbsp;&middot;&nbsp;
> GitHub [@supercharge](https://github.com/supercharge/) &nbsp;&middot;&nbsp;
> Twitter [@superchargejs](https://twitter.com/superchargejs)
