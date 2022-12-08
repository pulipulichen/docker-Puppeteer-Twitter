
const execAsync = require('../lib/execAsync.js');
const JSON5 = require('json5')

module.exports = async function (filepath) {
  let result = await execAsync(`/meme-ocr/main.py  ${filepath}`)
  try {
    // eval(`result = ${result}`)
    result = JSON5.parse(result)
  } catch (e) {
    console.error(e)
  }
  return result
}