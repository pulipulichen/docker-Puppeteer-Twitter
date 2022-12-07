const tesseract = require("node-tesseract-ocr")
const ReadText = require('text-from-image');

const config = {
  lang: "eng",
  oem: 1,
  psm: 3,
}
/*
tesseract
  .recognize("1.input/s.png", config)
  .then((text) => {
    console.log("Result:", text)
  })
  .catch((error) => {
    console.log(error.message)
  })
*/
let main = async () => {
  // let imagePath = '1.input/s.png'
  let imagePath = '1.input/YzMXGdQ.png'
  // console.log(await (tesseract.recognize("1.input/s.png", config)))
  console.log(await ReadText(imagePath));
}

main()