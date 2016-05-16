'use strict'

const sass      = require('node-sass')
const denodeify = require('denodeify')

/*
 * Transform SASS to CSS.
 * @public
 * @param {?string} folderPath - Path to the folder containing the SASS file.
 * @param {?string} str - SASS.
 * @param {?Object} opts - Optional options for the task.
 */
module.exports = function(folderPath, str, opts) {

	// Do nothing when called with an empty string
	if (str==null || str==='') return Promise.resolve('')

	// Dismiss sourceMap when output should be optimized
	const sourceMap = (opts!=null && opts.optimize===true ? false : true)

	return denodeify(sass.render)({

		data              : str,
		includePaths      : [ folderPath ],
		sourceMap         : sourceMap,
		sourceMapEmbed    : sourceMap,
		sourceMapContents : sourceMap

	}).then((result) => {

		return result.css.toString()

	})

}