'use strict'

const { describe, it } = require('node:test')
const assert = require('node:assert/strict')
const sass = require('./../src/sass.js')

describe('sass()', function () {
  it('should return an empty string when called with an empty SASS string', async function () {
    const input = ''
    const result = await sass('.', input, { optimize: false })

    assert.strictEqual(result, input)
  })

  it('should return an error when called with incorrect SASS', async function () {
    const input = 'test'

    await assert.rejects(sass('.', input, { optimize: false }))
  })

  it('should return CSS with a source map when called with valid SASS', async function () {
    const input = '.test { color: black; }'
    const result = await sass('.', input, { optimize: false })

    assert.strictEqual(typeof result, 'string')
    assert.match(result, /sourceMappingURL/)
  })

  it('should return CSS without a source map when called with valid SASS and optimization enabled', async function () {
    const input = '.test { color: black; }'
    const result = await sass('.', input, { optimize: true })

    assert.strictEqual(typeof result, 'string')
    assert.doesNotMatch(result, /sourceMappingURL/)
  })
})
