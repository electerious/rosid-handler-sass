'use strict'

let assert = require('chai').assert
let temp   = require('temp').track()
let index  = require('./../src/index')
let file   = null

describe('index()', function() {

	before(function() {

		file = temp.openSync({
			suffix: '.scss'
		})

	})

	it('should return an error when called with an invalid filePath', function(done) {

		index(null, '/src', '/dist', null, (err, str, savePath) => {

			assert.isNotNull(err)

			done()

		})

	})

	it('should return an error when called with an fictive filePath', function(done) {

		index('test.scss', '/src', '/dist', null, (err, str, savePath) => {

			assert.isNotNull(err)

			done()

		})

	})

	it('should load SCSS and transform it to CSS, add vendor prefixes and minify when dist specified', function(done) {

		index(file.path, '/src', '/dist', null, (err, str, savePath) => {

			assert.isNull(err)
			assert.isString(savePath)
			assert.strictEqual(str, '')
			assert.strictEqual(savePath.substr(-4), '.css')

			done()

		})

	})

	it('should load SCSS, transform it to CSS and add vendor prefixes when distPath not specified', function(done) {

		index(file.path, '/src', null, null, (err, str, savePath) => {

			assert.isNull(err)
			assert.isString(savePath)
			assert.strictEqual(str, '')
			assert.strictEqual(savePath.substr(-4), '.css')

			done()

		})

	})

	describe('.cache', function() {

		it('should be an array', function() {

			assert.isArray(index.cache)

		})

	})

})