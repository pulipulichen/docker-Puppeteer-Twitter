const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    //headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=800,600'],
    ignoreHTTPSErrors: true,

  });
  const page = await browser.newPage();
  await page.goto("https://blog.pulipuli.info/");
  await page.screenshot({ path: '/app/output/example.png' });

  await browser.close();
})();
