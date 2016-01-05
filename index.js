'use strict'

let path    = require('path'),
    fs      = require('fs'),
    async   = require('async'),
    sass    = require('./lib/sass'),
    postcss = require('./lib/postcss')

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

	let folderPath = path.dirname(filePath),
	    savePath   = renameExtension(filePath.replace(srcPath, distPath), 'css')

	async.waterfall([

		(next)      => fs.readFile(filePath, 'utf8', next),
		(str, next) => sass(folderPath, str, next),
		(str, next) => postcss(folderPath, str, next)

	], (err, str) => {

		if (err!=null) {
			next(err, null, null)
			return false
		}

		next(null, str, savePath)

	})

}