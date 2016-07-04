'use strict'

const assert = require('chai').assert
const temp   = require('temp').track()
const index  = require('./../src/index')

let file = null

describe('index()', function() {

	before(function() {

		file = temp.openSync({
			suffix: '.scss'
		})

	})

	it('should return an error when called with an invalid filePath', function() {

		return index(null, '/src', '/dist', null).then(({ data, savePath }) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)

		})

	})

	it('should return an error when called with a fictive filePath', function() {

		return index('test.scss', '/src', '/dist', null).then(({ data, savePath }) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)

		})

	})

	it('should load SCSS and transform it to CSS, add vendor prefixes and minify when distPath specified', function() {

		return index(file.path, '/src', '/dist', null).then(({ data, savePath }) => {

			assert.isString(savePath)
			assert.strictEqual(data, '')
			assert.strictEqual(savePath.substr(-4), '.css')

		})

	})

	it('should load SCSS, transform it to CSS and add vendor prefixes when distPath not specified', function() {

		return index(file.path, '/src', null, null).then(({ data, savePath }) => {

			assert.isString(savePath)
			assert.strictEqual(data, '')
			assert.strictEqual(savePath.substr(-4), '.css')

		})

	})

	describe('.cache', function() {

		it('should be an array', function() {

			assert.isArray(index.cache)

		})

	})

})