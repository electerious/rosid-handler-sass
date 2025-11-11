# rosid-handler-sass

[![Test](https://github.com/electerious/rosid-handler-sass/actions/workflows/test.yml/badge.svg)](https://github.com/electerious/rosid-handler-sass/actions/workflows/test.yml)

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
  "name": "SASS",
  "path": "[^_]*.{css,sass}*",
  "handler": "rosid-handler-sass"
}
```

```sass
/* main.sass */
.class
	color: white;
```

```css
/* main.css (output) */
.class {
  color: white;
}
```

## Parameters

- `filePath` `{string}` Absolute path to file.
- `options` `{?object}` Options.
  - `optimize` `{?boolean}` - Optimize output. Defaults to `false`.

## Returns

- `{Promise<string>}` The transformed file content.
