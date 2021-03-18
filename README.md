[npm]: https://img.shields.io/npm/v/@ian-sun/rollup-plugin-string
[npm-url]: https://www.npmjs.com/package/@ian-sun/rollup-plugin-string
[size]: https://packagephobia.now.sh/badge?p=@ian-sun/rollup-plugin-string
[size-url]: https://packagephobia.now.sh/result?p=@ian-sun/rollup-plugin-string

[![npm][npm]][npm-url]
[![size][size]][size-url]

# @ian-sun/rollup-plugin-string

A Rollup plugin which imports files as string.

## Install

Using npm:

```console
npm install --save-dev @ian-sun/rollup-plugin-string
```

## Usage

Create a `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) and import the plugin:

```js
// rollup.config.js
import string from '@ian-sun/rollup-plugin-string';

export default {
  input: 'input.js',
  output: {
    dir: 'output',
  },
  plugins: [string()],
};
```

Then call `rollup` either via the [CLI](https://www.rollupjs.org/guide/en/#command-line-reference) or the [API](https://www.rollupjs.org/guide/en/#javascript-api).

## Options

### `exclude`

Type: `string` | `Array<string>`<br>
Default: `null`

A [minimatch pattern](https://github.com/isaacs/minimatch), or array of patterns, which specifies the files in the build the plugin should _ignore_. By default no files are ignored.

### `include`

Type: `string` | `Array<string>`<br>
Default: `null`

A [minimatch pattern](https://github.com/isaacs/minimatch), or array of patterns, which specifies the files in the build the plugin should operate on. By default all files are targeted.

## License

[LICENSE (MIT)](/LICENSE)
