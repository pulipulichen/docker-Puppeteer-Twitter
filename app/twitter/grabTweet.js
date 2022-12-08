const getMetadataOfPost = require('./getMetadataOfPost.js')
const buildFolderFromMetadata = require('./buildFolderFromMetadata.js')
const writeTweetText = require('./writeTweetText.js')
const downloadImage = require('./../lib/downloadImage.js')

// const memeOCRText = require('./../ocr/memeOCRText.js')
// const textFromImage = require('./../ocr/textFromImage.js')
const mixOCR = require('./../ocr/mixOCR.js')

const path = require('path')

module.exports = async function (page, baseDir, url) {
  let metadata = await getMetadataOfPost(page, url)
  // console.log(metadata)
  let outputFolder = buildFolderFromMetadata(baseDir, metadata)
  writeTweetText(outputFolder, 'tweet.txt', metadata.text)
  writeTweetText(outputFolder, 'url.txt', url)

  let images = metadata.images
  for (let i = 0; i < images.length; i++) {
    let {src, alt} = images[i]

    let imagePath = path.join(outputFolder, i + '.jpg')
    await downloadImage(src, imagePath)
    writeTweetText(outputFolder, i + '.alt.txt', alt)
    let ocr = await mixOCR(imagePath)
    if (ocr) {
      writeTweetText(outputFolder, i + '.ocr.txt', ocr)
    }
  }
}