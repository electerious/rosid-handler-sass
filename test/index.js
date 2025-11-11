'use strict'

const { describe, it } = require('node:test')
const assert = require('node:assert/strict')
const os = require('node:os')
const { randomUUID } = require('node:crypto')
const index = require('./../src/index.js')

const { FILE } = require('fsify')
const fsify = require('fsify').default({
  cwd: os.tmpdir(),
})

describe('index()', function () {
  it('should return an error when called without a filePath', async function () {
    await assert.rejects(index(), { message: `'filePath' must be a string` })
  })

  it('should return an error when called with invalid options', async function () {
    const structure = await fsify([
      {
        type: FILE,
        name: `${randomUUID()}.sass`,
      },
    ])

    await assert.rejects(index(structure[0].name, ''), { message: `'opts' must be undefined or an object` })
  })

  it('should return an error when called with a fictive filePath', async function () {
    await assert.rejects(index(`${randomUUID()}.sass`))
  })

  it('should load SASS and transform it to CSS', async function () {
    const structure = await fsify([
      {
        type: FILE,
        name: `${randomUUID()}.sass`,
        contents: '',
      },
    ])

    const result = await index(structure[0].name)

    assert.match(result, /sourceMappingURL/)
  })

  it('should load SASS and transform it to optimized CSS when optimization enabled', async function () {
    const structure = await fsify([
      {
        type: FILE,
        name: `${randomUUID()}.sass`,
        contents: '',
      },
    ])

    const result = await index(structure[0].name, { optimize: true })

    assert.strictEqual(result, '')
  })

  describe('.in()', function () {
    it('should be a function', function () {
      assert.strictEqual(typeof index.in, 'function')
    })

    it('should return a default extension', function () {
      assert.strictEqual(index.in(), '.sass')
    })

    it('should return a default extension when called with invalid options', function () {
      assert.strictEqual(index.in(''), '.sass')
    })

    it('should return a custom extension when called with options', function () {
      assert.strictEqual(index.in({ in: '.css' }), '.css')
    })
  })

  describe('.out()', function () {
    it('should be a function', function () {
      assert.strictEqual(typeof index.out, 'function')
    })

    it('should return a default extension', function () {
      assert.strictEqual(index.out(), '.css')
    })

    it('should return a default extension when called with invalid options', function () {
      assert.strictEqual(index.out(''), '.css')
    })

    it('should return a custom extension when called with options', function () {
      assert.strictEqual(index.out({ out: '.less' }), '.less')
    })
  })

  describe('.cache', function () {
    it('should be an array', function () {
      assert.ok(Array.isArray(index.cache))
    })
  })
})
