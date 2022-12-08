
const { exec } = require('child_process');

module.exports = function (cmd) {
  return new Promise(function (resolve, reject) {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
          console.error(`error: ${error}`);
          reject(error);
          return;
      }
      // console.log(`stdout: ${stdout}`);
      // console.error(`stderr: ${stderr}`);
      resolve(stdout.trim())
    });
  })
}