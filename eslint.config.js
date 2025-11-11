const config = require('@electerious/eslint-config').default
const { defineConfig } = require('eslint/config')

module.exports = defineConfig([
  ...config,
  {
    rules: {
      'no-undef': 0,
      'unicorn/no-anonymous-default-export': 0,
      'import-x/unambiguous': 0,
      'import-x/no-commonjs': 0,
    },
  },
])
