'use strict'

const os = require('os')
const assert = require('chai').assert
const uuid = require('uuid').v4
const postcss = require('./../src/postcss')

const fsify = require('fsify')({
	cwd: os.tmpdir()
})

describe('postcss()', function() {

	it('should return an error when called with incorrect CSS', async function() {

		const structure = await fsify([
			{
				type: fsify.FILE,
				name: `${ uuid() }.css`,
				contents: 'test'
			}
		])

		return postcss(structure[0].name, structure[0].contents, { optimize: false }).then(() => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.isNotNull(err)
			assert.isDefined(err)

		})

	})

	it('should return CSS with a source map when called with valid CSS', async function() {

		const structure = await fsify([
			{
				type: fsify.FILE,
				name: `${ uuid() }.css`,
				contents: '.test { color: black; }'
			}
		])

		const result = await postcss(structure[0].name, structure[0].contents, { optimize: false })

		assert.isString(result)
		assert.include(result, 'sourceMappingURL')

	})

	it('should return CSS without a source map when called with valid SASS and optimization enabled', async function() {

		const structure = await fsify([
			{
				type: fsify.FILE,
				name: `${ uuid() }.css`,
				contents: '.test { color: black; }'
			}
		])

		const result = await postcss(structure[0].name, structure[0].contents, { optimize: true })

		assert.isString(result)
		assert.notInclude(result, 'sourceMappingURL')

	})

})