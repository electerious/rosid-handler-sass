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

	// Dismiss sourceMap when output should be optimized
	let map = (opts.optimize===true ? false : true)

	sass.render({

		data              : str,
		includePaths      : [ folderPath ],
		sourceMap         : map,
		sourceMapEmbed    : true,
		sourceMapContents : true

	}, (err, result) => {

		if (err!=null) {
			next(err, null)
			return false
		}

		next(null, result.css.toString())

	})

}