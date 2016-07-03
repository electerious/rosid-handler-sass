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
 * @param {String} filePath - Absolute path to the requested file.
 * @param {String} srcPath - Absolute path to the source folder.
 * @param {String} distPath - Absolute path to the export folder.
 * @param {Object} route - The route which matched the request URL.
 * @returns {Promise} Returns the following properties if resolved: {Object}.
 */
module.exports = function(filePath, srcPath, distPath, route) {

	let folderPath = null
	let savePath   = null

	const optimize = (distPath==null ? false : true)
	const opts     = { optimize }

	return Promise.resolve().then(() => {

		// Prepare file paths

		filePath   = rename(filePath, 'scss')
		savePath   = rename(filePath.replace(srcPath, distPath), 'css')
		folderPath = path.dirname(filePath)

	}).then(() => {

		// Get the contents of the file

		return denodeify(fs.readFile)(filePath, 'utf8')

	}).then((str) => {

		// Process data with sass

		return sass(folderPath, str, opts)

	}).then((str) => {

		// Process data with postcss

		return postcss(folderPath, str, opts)

	}).then((str) => {

		return {
			data     : str,
			savePath : savePath
		}

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