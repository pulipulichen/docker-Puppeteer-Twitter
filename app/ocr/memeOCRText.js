const NodeCacheSqlite = require('../lib/node-cache-sqlite.js');

const memeOCR = require('./memeOCR.js');
const path = require('path');
const fs = require('fs');

let punctuationRegex = /[.,\/#!$%\^&\*;:{}=\-_`~()]/

module.exports = async function (filepath) {
  return await NodeCacheSqlite.get('meme-ocr-text', filepath, async function () {
    let text = await memeOCR(filepath);
    
    // console.log(text)
    // console.log(typeof(text), Array.isArray(text))
    if (Array.isArray(text)) {
      let output = []
      for (let i = 0; i < text.length; i++) {
        let t = text[i].trim();
        // console.log(t)

        let last = t.slice(-1, 1)
        if (punctuationRegex.test(last) === false) {
          t = t + '.'
        }
        // console.log(t)
        output.push(t)
      }
      
      text = output.join(' ')
      // console.log(text)
    }

    text = text.trim()
    if (text === '') {
      return false
    }

    // let textPath = filepath.slice(0, filepath.lastIndexOf('.')) + '.txt'

    // fs.writeFileSync(textPath, text, 'utf8')
    return text
  })
}