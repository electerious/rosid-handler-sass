'use strict'

const os = require('os')
const assert = require('chai').assert
const uuid = require('uuid/v4')
const postcss = require('./../src/postcss')

const fsify = require('fsify')({
	cwd: os.tmpdir()
})

describe('postcss()', function() {

	it('should return an empty string when called without parameters', async function() {

		const result = await postcss(null, null, null)

		assert.strictEqual(result, '')

	})

	it('should return an empty string when called with an empty CSS string', async function() {

		const input = ''
		const result = await postcss(null, input, null)

		assert.strictEqual(result, input)

	})

	it('should return an error when called with incorrect CSS', async function() {

		const input = 'test'

		return postcss(null, input, null).then(() => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)
			assert.isDefined(err)

		})

	})

	it('should return CSS with a source map when called with valid CSS', async function() {

		const input = '.test { color: black; }'
		const result = await postcss(null, input, null)

		assert.isString(result)
		assert.include(result, 'sourceMappingURL')

	})

	it('should return CSS when called with valid CSS and a folderPath', async function() {

		const structure = await fsify([
			{
				type: fsify.DIRECTORY,
				name: `${ uuid() }`
			}
		])

		const input = '.test { color: black; }'
		const result = await postcss(structure[0].name, input, null)

		assert.isString(result)

	})

	it('should return CSS without a source map when called with valid SASS and optimization enabled', async function() {

		const input = '.test { color: black; }'
		const result = await postcss(null, input, { optimize: true })

		assert.isString(result)
		assert.notInclude(result, 'sourceMappingURL')

	})

})