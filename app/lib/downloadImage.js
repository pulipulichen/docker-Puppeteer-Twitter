const fs = require('fs')
const request = require("request");

module.exports = async function (uri, filename) {
  if (fs.existsSync(filename)) {
    return false
  }

  return new Promise((resolve, reject) => {
    request.head(uri, function (err, res, body) {
      request(uri).pipe(fs.createWriteStream(filename)).on('close', () => {
        resolve(true)
      });
    });
  });
}