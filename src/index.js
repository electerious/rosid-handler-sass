'use strict'

const path      = require('path')
const fs        = require('fs')
const denodeify = require('denodeify')
const sass      = require('./sass')
const postcss   = require('./postcss')

/*
 * Load SCSS and transform to CSS, add vendor prefixes and minify.
 * @public
 * @param {String} filePath - Absolute path to file.
 * @param {?Object} opts - Options.
 * @returns {Promise} Returns the following properties if resolved: {String}.
 */
module.exports = function(filePath, opts) {

	let folderPath = null

	return Promise.resolve().then(() => {

		if (typeof filePath!=='string')           throw new Error(`'filePath' must be a string`)
		if (typeof opts!=='object' && opts!=null) throw new Error(`'opts' must be undefined, null or an object`)

	}).then(() => {

		// Prepare file paths
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

		// Return data
		return str

	})

}

/**
 * Tell Rosid with which file extension it should load the file.
 * @public
 * @param {?Object} opts - Options.
 */
module.exports.in = function(opts) {

	return (opts!=null && opts.in!=null) ? opts.in : 'scss'

}

/**
 * Tell Rosid with which file extension it should save the file.
 * @public
 * @param {?Object} opts - Options.
 */
module.exports.out = function(opts) {

	return (opts!=null && opts.out!=null) ? opts.out : 'css'

}

/**
 * Attach an array to the function, which contains a list of
 * extensions used by the handler. The array will be used by Rosid for caching purposes.
 */
module.exports.cache = [
	'.scss',
	'.sass'
]