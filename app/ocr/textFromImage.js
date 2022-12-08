const ReadText = require('text-from-image')
const NodeCacheSqlite = require('../lib/node-cache-sqlite.js');

module.exports = async function (filepath) {
  return await NodeCacheSqlite.get('text-from-image', filepath, async function () {
    try {
      let result = await ReadText(filepath)
      return result
    }
    catch (e) {
      console.error(e)
    }
    return false
  });
}