'use strict'

const path = require('node:path')
const fs = require('node:fs').promises
const sass = require('./sass.js')
const postcss = require('./postcss.js')

/**
 * Load SASS and transform to CSS, add vendor prefixes and minify.
 * @public
 * @param {String} filePath - Absolute path to file.
 * @param {?Object} options - Options.
 * @returns {Promise<String>} CSS.
 */
module.exports = async function (filePath, options = {}) {
  if (typeof filePath !== 'string') throw new Error(`'filePath' must be a string`)
  if (typeof options !== 'object') throw new Error(`'opts' must be undefined or an object`)

  const folderPath = path.dirname(filePath)

  options = Object.assign(
    {
      optimize: false,
    },
    options,
  )

  let output = null

  output = await fs.readFile(filePath, 'utf8')
  output = await sass(folderPath, output, options)
  output = await postcss(filePath, output, options)

  return output
}

/**
 * Tell Rosid with which file extension it should load the file.
 * @public
 * @param {?Object} options - Options.
 * @returns {String} File extension.
 */
module.exports.in = function (options) {
  return options != null && options.in != null ? options.in : '.sass'
}

/**
 * Tell Rosid with which file extension it should save the file.
 * @public
 * @param {?Object} options - Options.
 * @returns {String} File extension.
 */
module.exports.out = function (options) {
  return options != null && options.out != null ? options.out : '.css'
}

/**
 * Attach an array to the function, which contains a list of
 * file patterns used by the handler. The array will be used by Rosid for caching purposes.
 * @public
 */
module.exports.cache = ['**/*.sass', '**/*.scss', '**/*.css']
