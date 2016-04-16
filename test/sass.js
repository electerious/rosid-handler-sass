'use strict'

let assert = require('chai').assert
let sass   = require('./../src/sass')

describe('sass()', function() {

	it('should return an empty string when called without parameters', function(done) {

		sass(null, null, null, (err, result) => {

			assert.isNull(err)
			assert.strictEqual(result, '')

			done()

		})

	})

	it('should return an error when called with incorrect SASS', function(done) {

		let input = `test`

		sass(null, input, null, (err, result) => {

			assert.isNotNull(err)

			done()

		})

	})

	it('should return CSS with a source map when called with valid SASS', function(done) {

		let input = `.test { color: black; }`

		sass(null, input, null, (err, result) => {

			assert.isNull(err)
			assert.isString(result)
			assert.include(result, 'sourceMappingURL')

			done()

		})

	})

	it('should return CSS without a source map when called with valid SASS and optimization enabled', function(done) {

		let input = `.test { color: black; }`
		let opts  = { optimize: true }

		sass(null, input, opts, (err, result) => {

			assert.isNull(err)
			assert.isString(result)
			assert.notInclude(result, 'sourceMappingURL')

			done()

		})

	})

})