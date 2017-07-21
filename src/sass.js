'use strict'

const sass = require('node-sass')
const pify = require('pify')

/**
 * Transform SASS to CSS.
 * @public
 * @param {?String} folderPath - Path to the folder containing the SASS file.
 * @param {?String} str - SASS.
 * @param {?Object} opts - Optional options for the task.
 * @returns {Promise} Returns the following properties if resolved: {String}.
 */
module.exports = async function(folderPath, str, opts) {

	if (str==null || str==='') return ''

	// Dismiss sourceMap when output should be optimized
	const sourceMap = (opts!=null && opts.optimize===true ? false : true)

	const result = await pify(sass.render)({
		data: str,
		includePaths: [ folderPath ],
		sourceMap: sourceMap,
		sourceMapEmbed: sourceMap,
		sourceMapContents: sourceMap
	})

	return result.css.toString()

}