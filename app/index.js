const fg = require('@pulipuli.chen/fast-glob')

const puppeteer = require('puppeteer');

const fs = require('fs');
const path = require('path');

// const memeOCRText = require('./ocr/memeOCRText.js');
// const getMetadataOfPost = require('./twitter/getMetadataOfPost.js');

const grabTweet = require('./twitter/grabTweet.js');

const kill = require('tree-kill');

let baseDir = '/2.output/'
let main = async () => {


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

  // ------------

  const entries = await fg(['/1.input/*.txt'], {dot: true})

  for (let i = 0; i < entries.length; i++) {
    // console.log(entries[i])
    let filename = path.basename(entries[i])
    let filenameNoExt = filename.slice(0, filename.lastIndexOf('.'))
    let content = fs.readFileSync(entries[i], 'utf8')
    let urls = content.trim().split('\n')

    for (let j = 0; j < urls.length; j++) {
      console.log(`${filenameNoExt}: ${(j+1)}/${urls.length} (${Math.floor((j/urls.length)*100)}%) ${urls[j]}`)
      await grabTweet(page, path.join(baseDir, filenameNoExt), urls[j])
      // console.log('ok')
    }
  }

  // ------------

  await browser.close();
  // console.log('ok')
  
  kill(1, 'SIGKILL');
}

main()
