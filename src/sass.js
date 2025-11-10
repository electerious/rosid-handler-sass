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

	// Use modern SASS API (compileString)
	const result = sass.compileString(str, {
		loadPaths: [ folderPath ],
		sourceMap: sourceMap,
		sourceMapIncludeSources: sourceMap
	})

	// Embed source map if enabled
	if (sourceMap && result.sourceMap) {
		const sourceMapBase64 = Buffer.from(JSON.stringify(result.sourceMap)).toString('base64')
		return result.css + `\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,${sourceMapBase64} */`
	}

	return result.css

}