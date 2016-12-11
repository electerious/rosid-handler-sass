'use strict'

const assert = require('chai').assert
const temp   = require('temp').track()
const index  = require('./../src/index')

const newFile = function(suffix) {

	return temp.openSync({ suffix })

}

describe('index()', function() {

	it('should return an error when called with an invalid filePath', function() {

		return index(null, '/src', '/dist', {}).then(({ data, savePath }) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)

		})

	})

	it('should return an error when called with a fictive filePath', function() {

		return index('test.scss', '/src', '/dist', {}).then(({ data, savePath }) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)

		})

	})

	it('should load SCSS and transform it to CSS, add vendor prefixes and minify when distPath specified', function() {

		const file = newFile('.scss')

		return index(file.path, '/src', '/dist', {}).then(({ data, savePath }) => {

			assert.isString(savePath)
			assert.strictEqual(data, '')
			assert.strictEqual(savePath.substr(-4), '.css')

		})

	})

	it('should load SCSS, transform it to CSS and add vendor prefixes when distPath not specified', function() {

		const file = newFile('.scss')

		return index(file.path, '/src', null, {}).then(({ data, savePath }) => {

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