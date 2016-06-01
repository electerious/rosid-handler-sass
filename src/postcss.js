'use strict'

const postcss      = require('postcss')
const autoprefixer = require('autoprefixer')
const cssnano      = require('cssnano')

/*
 * Add vendor prefixes and minify CSS.
 * @public
 * @param {?String} folderPath - Path to the folder containing the SASS file.
 * @param {?String} str - CSS.
 * @param {?Object} opts - Optional options for the task.
 */
module.exports = function(folderPath, str, opts) {

	// Do nothing when called with an empty string
	if (str==null || str==='') return Promise.resolve('')

	// Dismiss sourceMap when output should be optimized
	const sourceMap = (opts!=null && opts.optimize===true ? false : true)

	return postcss([

		cssnano
		autoprefixer({ remove: false }),

	]).process(str, {

		from : folderPath,
		to   : folderPath,
		map  : sourceMap

	}).then((result) => {

		return result.css

	})

}