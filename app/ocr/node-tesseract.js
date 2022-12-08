// var tesseract = require('node-tesseract');
const execAsync = require('./../lib/execAsync')
const NodeCacheSqlite = require('../lib/node-cache-sqlite.js');
const fs = require('fs');

module.exports = async function (filepath) {
  return await NodeCacheSqlite.get('node-tesseract', filepath, async function () {
    let tmpFile = `/tmp/tesseract.txt`

    if (fs.existsSync(tmpFile)) {
      fs.unlinkSync(tmpFile);
    }

    // console.log(`tesseract ${filepath} ${tmpFile} -l eng`)
    await execAsync(`tesseract ${filepath} ${tmpFile.slice(0, tmpFile.lastIndexOf('.'))} -l eng`)
    
    if (fs.existsSync(tmpFile) === false) {
      return false
    }

    let content = fs.readFileSync(tmpFile, 'utf8')
    content = content.trim()
    content = content.replace(/\n\n/g, '\n')
    return content
  });
}