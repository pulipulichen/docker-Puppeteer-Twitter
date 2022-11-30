const puppeteer = require('puppeteer');

const ReadText = require('text-from-image');

/*
(async () => {
  // console.log('ok')
  // return false
  const browser = await puppeteer.launch({
    //headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=800,600'],
    ignoreHTTPSErrors: true,

  });
  const page = await browser.newPage();
  // await page.goto("https://blog.pulipuli.info/");
  // https://wiki.debian.org/ChangeLanguage
  await page.goto("https://wiki.debian.org/ChangeLanguage");

  let imagePath = '/2.output/example.png'
  await page.screenshot({ path: imagePath });

  // 可行 20221130-2307 
  console.log(await ReadText(imagePath));

  await browser.close();
})();
*/

// smartcrop.crop(image, options)

