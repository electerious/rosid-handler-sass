'use strict'

const assert = require('chai').assert
const sass   = require('./../src/sass')

describe('sass()', function() {

	it('should return an empty string when called without parameters', function() {

		return sass(null, null, null).then((result) => {

			assert.strictEqual(result, '')

		})

	})

	it('should return an empty string when called with an empty SASS string', function() {

		const input = ``

		return sass(null, input, null).then((result) => {

			assert.strictEqual(result, '')

		})

	})

	it('should return an error when called with incorrect SASS', function() {

		const input = `test`

		return sass(null, input, null).then((result) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)
			assert.isDefined(err)

		})

	})

	it('should return CSS with a source map when called with valid SASS', function() {

		const input = `.test { color: black; }`

		return sass(null, input, null).then((result) => {

			assert.isString(result)
			assert.include(result, 'sourceMappingURL')

		})

	})

	it('should return CSS without a source map when called with valid SASS and optimization enabled', function() {

		const input = `.test { color: black; }`
		const opts  = { optimize: true }

		return sass(null, input, opts).then((result) => {

			assert.isString(result)
			assert.notInclude(result, 'sourceMappingURL')

		})

	})

})