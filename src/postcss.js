'use strict'

const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

/**
 * Add vendor prefixes and minify CSS.
 * @public
 * @param {String} filePath - Absolute path to file.
 * @param {String} str - CSS.
 * @param {Object} opts - Optional options for the task.
 * @returns {Promise<String>} Vendor prefixed and minified CSS.
 */
module.exports = async function(filePath, str, opts) {

	// Dismiss sourceMap when output should be optimized
	const sourceMap = opts.optimize !== true

	const result = await postcss([

		autoprefixer({ remove: false }),
		cssnano({ safe: true })

	]).process(str, {

		from: filePath,
		to: filePath,
		map: sourceMap

	})

	return result.css

}