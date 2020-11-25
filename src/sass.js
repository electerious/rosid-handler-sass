'use strict'

const sass = require('sass')

/**
 * Transform SASS to CSS.
 * @public
 * @param {String} folderPath - Path to the folder containing the SASS file.
 * @param {String} str - SASS.
 * @param {Object} opts - Optional options for the task.
 * @returns {Promise<String>} CSS.
 */
module.exports = async function(folderPath, str, opts) {

	// SASS can't handle empty files
	if (str === '') return str

	// Dismiss sourceMap when output should be optimized
	const sourceMap = opts.optimize !== true

	const result = sass.renderSync({
		data: str,
		includePaths: [ folderPath ],
		sourceMap: sourceMap ? '' : false,
		sourceMapEmbed: sourceMap,
		sourceMapContents: sourceMap
	})

	return result.css.toString()

}