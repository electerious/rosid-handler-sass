'use strict'

const assert  = require('chai').assert
const postcss = require('./../src/postcss')

describe('postcss()', function() {

	it('should return an empty string when called without parameters', function() {

		return postcss(null, null, null).then((result) => {

			assert.strictEqual(result, '')

		})

	})

	it('should return an empty string when called with an empty CSS string', function() {

		const input = ``

		return postcss(null, input, null).then((result) => {

			assert.strictEqual(result, '')

		})

	})

	it('should return an error when called with incorrect CSS', function() {

		const input = `test`

		return postcss(null, input, null).then((result) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)

		})

	})

	it('should return CSS with a source map when called with valid CSS', function() {

		const input = `.test { color: black; }`

		return postcss(null, input, null).then((result) => {

			assert.isString(result)
			assert.include(result, 'sourceMappingURL')

		})

	})

	it('should return CSS without a source map when called with valid SASS and optimization enabled', function() {

		const input = `.test { color: black; }`
		const opts  = { optimize: true }

		return postcss(null, input, opts).then((result) => {

			assert.isString(result)
			assert.notInclude(result, 'sourceMappingURL')

		})

	})

})