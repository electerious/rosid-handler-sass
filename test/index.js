'use strict'

const os = require('os')
const assert = require('chai').assert
const uuid = require('uuid/v4')
const index = require('./../src/index')

const fsify = require('fsify')({
	cwd: os.tmpdir()
})

describe('index()', function() {

	it('should return an error when called without a filePath', async function() {

		return index().then(() => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.strictEqual(err.message, `'filePath' must be a string`)

		})

	})

	it('should return an error when called with invalid options', async function() {

		const structure = await fsify([
			{
				type: fsify.FILE,
				name: `${ uuid() }.sass`
			}
		])

		return index(structure[0].name, '').then(() => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.strictEqual(err.message, `'opts' must be undefined or an object`)

		})

	})

	it('should return an error when called with a fictive filePath', async function() {

		return index(`${ uuid() }.sass`).then(() => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)
			assert.isDefined(err)

		})

	})

	it('should load SASS and transform it to CSS', async function() {

		const structure = await fsify([
			{
				type: fsify.FILE,
				name: `${ uuid() }.sass`,
				contents: ''
			}
		])

		const result = await index(structure[0].name)

		assert.strictEqual(result, '')

	})

	it('should load SASS and transform it to optimized CSS when optimization enabled', async function() {

		const structure = await fsify([
			{
				type: fsify.FILE,
				name: `${ uuid() }.sass`,
				contents: ''
			}
		])

		const result = await index(structure[0].name, { optimize: true })

		assert.strictEqual(result, '')

	})

	describe('.in()', function() {

		it('should be a function', function() {

			assert.isFunction(index.in)

		})

		it('should return a default extension', function() {

			assert.strictEqual(index.in(), '.sass')

		})

		it('should return a default extension when called with invalid options', function() {

			assert.strictEqual(index.in(''), '.sass')

		})

		it('should return a custom extension when called with options', function() {

			assert.strictEqual(index.in({ in: '.css' }), '.css')

		})

	})

	describe('.out()', function() {

		it('should be a function', function() {

			assert.isFunction(index.in)

		})

		it('should return a default extension', function() {

			assert.strictEqual(index.out(), '.css')

		})

		it('should return a default extension when called with invalid options', function() {

			assert.strictEqual(index.out(''), '.css')

		})

		it('should return a custom extension when called with options', function() {

			assert.strictEqual(index.out({ out: '.less' }), '.less')

		})

	})

	describe('.cache', function() {

		it('should be an array', function() {

			assert.isArray(index.cache)

		})

	})

})