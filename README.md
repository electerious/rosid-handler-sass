# rosid-handler-sass

[![Travis Build Status](https://travis-ci.org/electerious/rosid-handler-sass.svg?branch=master)](https://travis-ci.org/electerious/rosid-handler-sass) [![Coverage Status](https://coveralls.io/repos/github/electerious/rosid-handler-sass/badge.svg?branch=master)](https://coveralls.io/github/electerious/rosid-handler-sass?branch=master) [![Dependencies](https://david-dm.org/electerious/rosid-handler-sass.svg)](https://david-dm.org/electerious/rosid-handler-sass#info=dependencies) [![Greenkeeper badge](https://badges.greenkeeper.io/electerious/rosid-handler-sass.svg)](https://greenkeeper.io/)

A function that loads a SASS file, transforms it to CSS, adds vendor prefixes and minifies the output.

## Install

```
npm install rosid-handler-sass
```

## Usage

### API

```js
const handler = require('rosid-handler-sass')

handler('main.sass').then((data) => {})
handler('main.css', { optimize: true }).then((data) => {})
```

### Rosid

Add the following object to your `rosidfile.json`, `rosidfile.js` or [routes array](https://github.com/electerious/Rosid/blob/master/docs/Routes.md). `rosid-handler-sass` will transform all matching SASS files in your source folder to CSS.

```json
{
  "name"    : "SASS",
  "path"    : "[^_]*.{css,sass}*",
  "handler" : "rosid-handler-sass"
}
```

```sass
/* main.sass */
.class
	color: white;
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

- `{Promise<String|Buffer>}` The transformed file content.