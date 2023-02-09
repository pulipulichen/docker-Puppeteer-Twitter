const NodeCacheSqlite = require('../lib/node-cache-sqlite.js');

const execAsync = require('../lib/execAsync.js');
const JSON5 = require('json5')

module.exports = async function (filepath) {
  return await NodeCacheSqlite.get('meme-ocr', filepath, async function () {
    let result = []
    try {
      result = await execAsync(`/meme-ocr/main.py  ${filepath}`)
      // eval(`result = ${result}`)
      result = JSON5.parse(result)
    } catch (e) {
      console.error(e)
    }
    return result
  });
}