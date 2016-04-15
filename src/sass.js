'use strict'

let sass = require('node-sass')

/*
 * Transform SASS to CSS.
 * @public
 * @param {string} folderPath - Path to the folder containing the SASS file.
 * @param {string} str - SASS.
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
	let sourceMap = (opts.optimize===true ? false : true)

	sass.render({

		data              : str,
		includePaths      : [ folderPath ],
		sourceMap         : sourceMap,
		sourceMapEmbed    : sourceMap,
		sourceMapContents : sourceMap

	}, (err, result) => {

		if (err!=null) {
			next(err, null)
			return false
		}

		next(null, result.css.toString())

	})

}