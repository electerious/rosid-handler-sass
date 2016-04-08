'use strict'

let postcss      = require('postcss')
let autoprefixer = require('autoprefixer')
let cssnano      = require('cssnano')

/*
 * Add vendor prefixes and minify CSS.
 * @public
 * @param {string} folderPath - Path to the folder containing the SASS file.
 * @param {string} str - CSS.
 * @param {Object} opts - Options for the task.
 * @param {function} next - The callback that handles the response. Receives the following properties: err, css.
 */
module.exports = function(folderPath, str, opts, next) {

	// Dismiss sourceMap when output should be optimized
	let sourceMap = (opts!=null && opts.optimize===true ? false : true)

	postcss([

		autoprefixer,
		cssnano

	]).process(str, {

		from : folderPath,
		to   : folderPath,
		map  : sourceMap

	}).then((result) => {

		next(null, result.css)

	}).catch((err) => {

		next(err, null)

	})

}