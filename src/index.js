'use strict'

const path    = require('path')
const fs      = require('fs')
const async   = require('async')
const rename  = require('rename-extension')
const sass    = require('./sass')
const postcss = require('./postcss')

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

	try {

		// Ensure that the filePath always ends with scss
		filePath = rename(filePath, 'scss')

		folderPath = path.dirname(filePath)
		savePath   = rename(filePath.replace(srcPath, distPath), 'css')

	} catch (err) {

		next(err, null, null)
		return false

	}

	const optimize = (distPath==null ? false : true)
	const opts     = { optimize }

	async.waterfall([

		(next)      => fs.readFile(filePath, 'utf8', next),
		(str, next) => sass(folderPath, str, opts, next),
		(str, next) => postcss(folderPath, str, opts, next)

	], (err, str) => {

		if (err!=null) {
			next(err, null, null)
			return false
		}

		next(null, str, savePath)

	})

}

/**
 * Attach an array to the function, which contains a list of
 * extensions used by the handler. The array will be used by Rosid for caching purposes.
 */
module.exports.cache = [
	'.scss',
	'.sass'
]