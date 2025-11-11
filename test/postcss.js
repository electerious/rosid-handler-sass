'use strict'

const { describe, it } = require('node:test')
const assert = require('node:assert/strict')
const os = require('node:os')
const { randomUUID } = require('node:crypto')
const postcss = require('./../src/postcss.js')

const { FILE } = require('fsify')
const fsify = require('fsify').default({
  cwd: os.tmpdir(),
})

describe('postcss()', function () {
  it('should return an error when called with incorrect CSS', async function () {
    const structure = await fsify([
      {
        type: FILE,
        name: `${randomUUID()}.css`,
        contents: 'test',
      },
    ])

    await assert.rejects(postcss(structure[0].name, structure[0].contents, { optimize: false }))
  })

  it('should return CSS with a source map when called with valid CSS', async function () {
    const structure = await fsify([
      {
        type: FILE,
        name: `${randomUUID()}.css`,
        contents: '.test { color: black; }',
      },
    ])

    const result = await postcss(structure[0].name, structure[0].contents, { optimize: false })

    assert.strictEqual(typeof result, 'string')
    assert.match(result, /sourceMappingURL/)
  })

  it('should return CSS without a source map when called with valid SASS and optimization enabled', async function () {
    const structure = await fsify([
      {
        type: FILE,
        name: `${randomUUID()}.css`,
        contents: '.test { color: black; }',
      },
    ])

    const result = await postcss(structure[0].name, structure[0].contents, { optimize: true })

    assert.strictEqual(typeof result, 'string')
    assert.doesNotMatch(result, /sourceMappingURL/)
  })
})
