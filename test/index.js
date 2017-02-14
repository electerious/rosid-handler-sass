'use strict'

const assert = require('chai').assert
const temp   = require('temp').track()
const index  = require('./../src/index')

const newFile = function(suffix) {

	return temp.openSync({ suffix }).path

}

describe('index()', function() {

	it('should return an error when called without a filePath', function() {

		return index().then((data) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)
			assert.isDefined(err)

		})

	})

	it('should return an error when called with invalid options', function() {

		const file = newFile('.scss')

		return index(file, '').then((data) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)
			assert.isDefined(err)

		})

	})

	it('should return an error when called with a fictive filePath', function() {

		return index('test.scss').then((data) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)
			assert.isDefined(err)

		})

	})

	it('should load SCSS and transform it to CSS', function() {

		const file = newFile('.scss')

		return index(file).then((data) => {

			assert.strictEqual(data, '')

		})

	})

	it('should load SCSS and transform it to optimized CSS when optimization enabled', function() {

		const file = newFile('.scss')

		return index(file, { optimize: true }).then((data) => {

			assert.strictEqual(data, '')

		})

	})

	describe('.in()', function() {

		it('should be a function', function() {

			assert.isFunction(index.in)

		})

		it('should return a default extension', function() {

			assert.strictEqual(index.in(), 'scss')

		})

		it('should return a default extension when called with invalid options', function() {

			assert.strictEqual(index.in(''), 'scss')

		})

		it('should return a custom extension when called with options', function() {

			assert.strictEqual(index.in({ in: 'css' }), 'css')

		})

	})

	describe('.out()', function() {

		it('should be a function', function() {

			assert.isFunction(index.in)

		})

		it('should return a default extension', function() {

			assert.strictEqual(index.out(), 'css')

		})

		it('should return a default extension when called with invalid options', function() {

			assert.strictEqual(index.out(''), 'css')

		})

		it('should return a custom extension when called with options', function() {

			assert.strictEqual(index.out({ out: 'less' }), 'less')

		})

	})

	describe('.cache', function() {

		it('should be an array', function() {

			assert.isArray(index.cache)

		})

	})

})