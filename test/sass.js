'use strict'

const assert = require('chai').assert
const sass = require('./../src/sass')

describe('sass()', function() {

	it('should return an empty string when called without parameters', async function() {

		const result = await sass(null, null, null)

		assert.strictEqual(result, '')

	})

	it('should return an empty string when called with an empty SASS string', async function() {

		const input = ''
		const result = await sass(null, input, null)

		assert.strictEqual(result, input)

	})

	it('should return an error when called with incorrect SASS', async function() {

		const input = 'test'

		return sass(null, input, null).then(() => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)
			assert.isDefined(err)

		})

	})

	it('should return CSS with a source map when called with valid SASS', async function() {

		const input = '.test { color: black; }'
		const result = await sass(null, input, null)

		assert.isString(result)
		assert.include(result, 'sourceMappingURL')

	})

	it('should return CSS without a source map when called with valid SASS and optimization enabled', async function() {

		const input = '.test { color: black; }'
		const result = await sass(null, input, { optimize: true })

		assert.isString(result)
		assert.notInclude(result, 'sourceMappingURL')

	})

})