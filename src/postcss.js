const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

/**
 * Add vendor prefixes and minify CSS.
 *
 * @public
 * @param {string} filePath - Absolute path to file.
 * @param {string} str - CSS.
 * @param {object} options - Optional options for the task.
 * @returns {Promise<string>} Vendor prefixed and minified CSS.
 */
module.exports = async function (filePath, str, options) {
  // Dismiss sourceMap when output should be optimized
  const sourceMap = options.optimize !== true

  const result = await postcss([autoprefixer({ remove: false }), cssnano({ safe: true })]).process(str, {
    from: filePath,
    to: filePath,
    map: sourceMap,
  })

  return result.css
}
