'use strict'

const postcss      = require('postcss')
const autoprefixer = require('autoprefixer')
const cssnano      = require('cssnano')

/*
 * Add vendor prefixes and minify CSS.
 * @public
 * @param {string} folderPath - Path to the folder containing the SASS file.
 * @param {string} str - CSS.
 * @param {Object} opts - Options for the task.
 * @param {function} next - The callback that handles the response. Receives the following properties: err, css.
 */
module.exports = function(folderPath, str, opts, next) {

	// Default parameters
	str  = str || ''
	opts = opts || {}

	// Do nothing when called with an empty string
	if (str==='') {
		next(null, str)
		return true
	}

	// Dismiss sourceMap when output should be optimized
	const sourceMap = (opts.optimize===true ? false : true)

	postcss([

		autoprefixer,
		cssnano

	]).process(str, {

		from : folderPath,
		to   : folderPath,
		map  : sourceMap

	}).then((result) => {

		next(null, result.css)

	}).catch((err) => {

		next(err, null)

	})

}