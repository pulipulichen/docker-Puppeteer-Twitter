const puppeteer = require('puppeteer');
const request = require("request");
const fs = require('fs');

const memeOCRText = require('./ocr/memeOCRText.js');
const getTypeOfPost = require('./twitter/getTypeOfPost.js');

(async () => {
  // console.log('ok')
  // return false
  const browser = await puppeteer.launch({
    //headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=800,600'],
    ignoreHTTPSErrors: true,

  });
  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36'
  )
  // await page.goto("https://blog.pulipuli.info/");
  // https://wiki.debian.org/ChangeLanguage

  // await grabOneImage(page, 'https://twitter.com/WholesomeMeme/status/1599561491207933952?s=20&t=Bmt2URhjX4NjBXJ4xk18bQ')
  // await download('https://i.imgur.com/YzMXGdQ.jpg', '/2.output/y.jpg')
  // await grabOneImage(page, 'https://twitter.com/introvertsmemes/status/1599599710675034113?s=20&t=Bmt2URhjX4NjBXJ4xk18bQ')
  // await grabOneImage(page, 'https://twitter.com/skelinor_/status/1598741240501374977?s=20&t=-N1h2xrHjyWC20UlJDUXQg')
  
  // console.log(await memeOCRText('/2.output/image.jpg'))
  // console.log(await memeOCR('/2.output/YzMXGdQ.png'))
  await getTypeOfPost()

  // let imagePath = '/2.output/example.png'
  // await page.screenshot({ path: imagePath });

  // 可行 20221130-2307 
  // console.log(await ReadText(imagePath));

  await browser.close();
})();



//  This is main download function which takes the url of your image
function download(uri, filename) {
  return new Promise((resolve, reject) => {
    request.head(uri, function (err, res, body) {
      request(uri).pipe(fs.createWriteStream(filename)).on('close', resolve);
    });
  });
}

let grabOneImage = async (page, url) => {
  await page.goto(url, {waitUntil: 'networkidle0'});

  await page.waitForSelector('article')

  // const textContent = await page.evaluate(() => {
  //   // return document.querySelector('.price');
  //   return document.querySelector('article .css-1dbjc4n .css-1dbjc4n.r-1ssbvtb.r-1s2bzr4 img[src^="https://pbs.twimg.com/media/"][src$="&name=small"]').src
  // });
  // // article
  // console.log(textContent)

  // const IMAGE_SELECTOR = '#tsf > div:nth-child(2) > div > div.logo > a > img';
  let imageHref = await page.evaluate((sel) => {
    return document.querySelector('article .css-1dbjc4n .css-1dbjc4n.r-1ssbvtb.r-1s2bzr4 img[src^="https://pbs.twimg.com/media/"][src$="&name=small"]').src
  });
  await download(imageHref, '/2.output/image.jpg');
  // console.log('y')


  let imagePath = '/2.output/example.png'
  await page.screenshot({ path: imagePath });
}