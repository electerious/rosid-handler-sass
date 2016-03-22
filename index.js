'use strict'

let path    = require('path')
let fs      = require('fs')
let async   = require('async')
let sass    = require('./lib/sass')
let postcss = require('./lib/postcss')

/*
 * Rename the extension of a file in a path.
 * @param {string} filePath - Path to a file.
 * @param {string} fileExt - New extension of the file.
 * @returns {string} filePath - Path ending with the new fileExt.
 */
const renameExtension = function(filePath, fileExt) {

	let parsedPath = path.parse(filePath)

	return parsedPath.dir + path.sep + parsedPath.name + '.' + fileExt

}

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

	filePath = renameExtension(filePath, 'scss')

	let folderPath = path.dirname(filePath)
	let savePath   = renameExtension(filePath.replace(srcPath, distPath), 'css')

	let optimize = (distPath==null ? false : true)
	let opts     = { optimize }

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