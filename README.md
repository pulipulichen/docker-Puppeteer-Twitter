# docker-Puppeteer-Twitter
Crawl the text and images from Twitter.

# Installation

1. Install the requirement environment.
  - git https://git-scm.com/downloads
  - Docker Desktop https://www.docker.com/products/docker-desktop/
  - Node.js (LTS) https://nodejs.org/
2. Open the terminal (or PowerShell).
3. Move to your desktop.
4. Execute the following command:

````
git clone https://github.com/pulipulichen/docker-Puppeteer-Twitter.git
````

# Start the crawl job

1. Put your list in the `/1.input/` . You can refer to the example of `/1.input/example.txt`.
2. Open the terminal (or PowerShell).
3. Move to the folder `docker-Puppeteer-Twitter`.
4. Execute the following command:

````
npm run start
````

5. Wait for the end of the job.
6. You can get the result in the folder `/2.output/` .

# Output

- tweet.txt: The content of the tweet.
- 1.jpg: The image of the tweet.
- 1.crop.jpg: The cropped image of the original image.
- 1.alt.txt: The alt message of the original image.
- 1.ocr.txt: The OCR from the original image.

# Reference

## OCR
- meme-ocr: https://github.com/johnlinp/meme-ocr
- tesseract: https://github.com/tesseract-ocr/tesseract

## Crop
- Inpaint: https://raw.githubusercontent.com/bnsreenu/python_for_microscopists/master/Tips_Tricks_42_How%20to%20remove%20text%20from%20images.py
- Autocrop: https://pypi.org/project/autocrop/
- Smartcrop: https://pypi.org/project/smartcrop/
  * Algorithm Overview: https://github.com/jwagner/smartcrop.js#algorithm-overview