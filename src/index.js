'use strict'

const path      = require('path')
const fs        = require('fs')
const denodeify = require('denodeify')
const rename    = require('rename-extension')
const sass      = require('./sass')
const postcss   = require('./postcss')

/*
 * Load SCSS and transform to CSS, add vendor prefixes and minify.
 * @public
 * @param {string} filePath - Absolute path to the requested file.
 * @param {string} srcPath - Absolute path to the source folder.
 * @param {string} distPath - Absolute path to the export folder.
 * @param {Object} route - The route which matched the request URL.
 * @param {function} next - The callback that handles the response. Receives the following properties: err, result, savePath.
 */
module.exports = function(filePath, srcPath, distPath, route, next) {

	let folderPath = null
	let savePath   = null

	const optimize = (distPath==null ? false : true)
	const opts     = { optimize }

	Promise.resolve()

	// Prepare file paths
	.then(() => {

		filePath   = rename(filePath, 'scss')
		savePath   = rename(filePath.replace(srcPath, distPath), 'css')
		folderPath = path.dirname(filePath)

	})

	// Get the contents of the file
	.then(() => denodeify(fs.readFile)(filePath, 'utf8'))

	// Process data
	.then((str) => sass(folderPath, str, opts))
	.then((str) => postcss(folderPath, str, opts))

	// Return processed data and catch errors
	// Avoid .catch as we don't want to catch errors of the callback
	.then(
		(str) => next(null, str, savePath),
		(err) => next(err, null, null)
	)

}

/**
 * Attach an array to the function, which contains a list of
 * extensions used by the handler. The array will be used by Rosid for caching purposes.
 */
module.exports.cache = [
	'.scss',
	'.sass'
]