# rosid-handler-scss

[![Travis Build Status](https://travis-ci.org/electerious/rosid-handler-scss.svg?branch=master)](https://travis-ci.org/electerious/rosid-handler-scss) [![Coverage Status](https://coveralls.io/repos/github/electerious/rosid-handler-scss/badge.svg?branch=master)](https://coveralls.io/github/electerious/rosid-handler-scss?branch=master) [![Dependencies](https://david-dm.org/electerious/rosid-handler-scss.svg)](https://david-dm.org/electerious/rosid-handler-scss#info=dependencies)

A function that loads a SCSS file, transforms it to CSS, adds vendor prefixes and minifies the output.

## Install

```
npm install rosid-handler-scss
```

## Usage

```js
const scss = require('rosid-handler-scss')

scss('/src/main. scss', '/src', '/dist', {}).then(({ data, savePath }) => {})
scss('/src/main.css', '/src', '/dist', {}).then(({ data, savePath }) => {})
```

## Parameters

- `filePath` `{String}` Absolute path to the requested file.
- `srcPath` `{String}` Absolute path to the source folder.
- `distPath` `{?String}` Absolute path to the export folder.
- `route` `{Object}` The route which matched the request URL.

## Returns

- `{Promise}({Object})`
	- `data` `{String | Buffer}` The transformed file content.
	- `savePath` `{?String}` Where to save the file when compiling.