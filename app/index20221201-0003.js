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

/*
const request = require("request");
var gm = require('gm').subClass({ imageMagick: true });
var smartcrop = require('smartcrop-gm');

var kill = require('tree-kill');

var cv = require('opencv');

function applySmartCrop(src, dest, width, height) {
  request(src, { encoding: null }, function process(error, response, body) {
    if (error) return console.error(error);
    smartcrop.crop(body, { width: width, height: height }).then(function(result) {
      var crop = result.topCrop;
      gm(body)
        .crop(crop.width, crop.height, crop.x, crop.y)
        .resize(width, height)
        .write(dest, function(error) {
          if (error) return console.error(error);

          kill(1);
        });
    });
  });
}

function faceDetect(input, options) {
  return new Promise(function(resolve, reject) {
    if (!argv.faceDetection) return resolve(false);
    cv.readImage(input, function(err, image) {
      if (err) return reject(err);
      image.detectObject(cv.FACE_CASCADE, {}, function(err, faces) {
        if (err) return reject(err);
        options.boost = faces.map(function(face) {
          return {
            x: face.x,
            y: face.y,
            width: face.width,
            height: face.height,
            weight: 1.0
          };
        });
        resolve(true);
      });
    });
  });
}

let main = async function () {
  let result = await faceDetect()
}

// var src = 'https://raw.githubusercontent.com/jwagner/smartcrop-gm/master/test/flower.jpg';
var src = 'https://qph.cf2.quoracdn.net/main-qimg-0fc663f4542aa4564a2cd49e3b8fbdcf-lq';

// applySmartCrop(src, '/2.output/flower-square.jpg', 128,128);
// applySmartCrop(src, '/2.output/flower-square.jpg');

main()
*/

const FC = require('face-crop');
const Path = require('path');
 
FC({
    src: Path.resolve("/1.input/girl.png"),
    dst: {
        path: Path.resolve("/2.output/1.png"),
        width: 200,
        height: 200
    },
    scale: 3
}).then(path => {
    //foo
}).catch(e => {
    //bar
});