const fs = require('fs')
const path = require('path')

module.exports = function (outputFolder, filename, text) {
  if (!text) {
    return false
  }

  let target = path.join(outputFolder, filename)

  if (fs.existsSync(target)) {
    return false
  }

  fs.writeFileSync(target, text, 'utf8')
}