const fs = require('fs');
const path = require('path');

module.exports = function(baseDir, metadata) {
  let outputFolder = path.join(baseDir, metadata.user + '_' + metadata.time)

  if (fs.existsSync(outputFolder) === false) {
    fs.mkdirSync(outputFolder, {recursive: true});
  }

  return outputFolder;
}