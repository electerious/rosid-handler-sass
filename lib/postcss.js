'use strict'

let postcss      = require('postcss')
let autoprefixer = require('autoprefixer')
let cssnano      = require('cssnano')

/*
 * Add vendor prefixes and minify CSS.
 * @public
 * @param {string} folderPath - Path to the folder containing the SASS file.
 * @param {string} str - CSS.
 * @param {function} next - The callback that handles the response. Receives the following properties: err, css.
 */
module.exports = function(folderPath, str, next) {

	// Only add sourceMap when necessary
	let map = (process.env.OPTIMIZE==='true' ? false : true)

	postcss([

		autoprefixer,
		cssnano

	]).process(str, {

		from : folderPath,
		to   : folderPath,
		map  : map

	}).then((result) => {

		next(null, result.css)

	}).catch((err) => {

		next(err, null)

	})

}