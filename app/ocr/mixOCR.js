const NodeCacheSqlite = require('../lib/node-cache-sqlite.js');

const memeOCRText = require('./memeOCRText.js');
const textFromImage = require('./textFromImage.js');
const nodeTesseract = require('./node-tesseract.js');

module.exports = async function (filepath) {
  return await NodeCacheSqlite.get('mix-ocr', filepath, async function () {
    
    let bestResult = false
    let bestScore = 0

    let engines = [
      memeOCRText,
      // textFromImage
      nodeTesseract
    ]

    for (let i = 0; i < engines.length; i++) {
      let result = await engines[i](filepath)
      
      if (!result) {
        continue
      }

      let score = 0
      result.split(' ').filter(w => w.length > 1).forEach(w => {
        w = w.replace(/[^\w\s\']|_/g, "")
          .replace(/\s+/g, "");
        
        let len = w.length
        if (len < 2) {
          return false
        }

        score = score + (len*len)
      })

      if (score > bestScore) {
        bestScore = score
        bestResult = result
      }

      // console.log(i, score, result)
    }

    return bestResult
  });
}