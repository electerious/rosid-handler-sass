'use strict'

const postcss      = require('postcss')
const autoprefixer = require('autoprefixer')
const cssnano      = require('cssnano')

/**
 * Add vendor prefixes and minify CSS.
 * @public
 * @param {?String} folderPath - Path to the folder containing the SASS file.
 * @param {?String} str - CSS.
 * @param {?Object} opts - Optional options for the task.
 * @returns {Promise} Returns the following properties if resolved: {String}.
 */
module.exports = function(folderPath, str, opts) {

	return Promise.resolve().then(() => {

		// Do nothing when called with an empty string
		if (str==null || str==='') return ''

		// Dismiss sourceMap when output should be optimized
		const sourceMap = (opts!=null && opts.optimize===true ? false : true)

		// PostCSS only accepts undefined or a string for `from` and `to`
		folderPath = (typeof folderPath==='string' ? folderPath : undefined)

		return postcss([

			autoprefixer({ remove: false }),
			cssnano({ safe: true })

		]).process(str, {

			from : folderPath,
			to   : folderPath,
			map  : sourceMap

		}).then((result) => {

			return result.css

		})

	})

}