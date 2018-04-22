'use strict'

const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

/**
 * Add vendor prefixes and minify CSS.
 * @public
 * @param {?String} folderPath - Path to the folder containing the SASS file.
 * @param {?String} str - CSS.
 * @param {?Object} opts - Optional options for the task.
 * @returns {Promise<String>} Vendor prefixed and minified CSS.
 */
module.exports = async function(folderPath, str, opts) {

	if (str == null || str === '') return ''

	// Dismiss sourceMap when output should be optimized
	const sourceMap = opts == null || (opts != null && opts.optimize !== true)

	// PostCSS only accepts undefined or a string for `from` and `to`
	folderPath = (typeof folderPath === 'string' ? folderPath : undefined)

	const result = await postcss([

		autoprefixer({ remove: false }),
		cssnano({ safe: true })

	]).process(str, {

		from: folderPath,
		to: folderPath,
		map: sourceMap

	})

	return result.css

}