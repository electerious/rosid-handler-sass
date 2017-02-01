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

scss('/src/main.scss').then((data) => {})
scss('/src/main.css', { optimize: true }).then((data) => {})
```

## Rosid

Add the following object to your `rosidfile.json`, `rosidfile.js` or [routes array](https://github.com/electerious/Rosid#routes). `rosid-handler-scss` will transform all matching SCSS files in your source folder to CSS.

```json
{
  "name"    : "SCSS",
  "path"    : "[^_]*.{css,scss}*",
  "handler" : "rosid-handler-scss"
}
```

```scss
/* main.scss */
.class { color: white; }
```

```css
/* main.css (output) */
.class { color: white; }
```

## Parameters

- `filePath` `{String}` Absolute path to file.
- `opts` `{?Object}` Options.
	- `optimize` `{?Boolean}` - Optimize output. Defaults to `false`.

## Returns

- `{Promise}({String|Buffer})` The transformed file content.