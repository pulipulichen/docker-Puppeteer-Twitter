# docker-Puppeteer-Twitter
Extract data from Twitter

# Installation

1. Install the requirement environment.
  - git https://git-scm.com/downloads
  - Docker Desktop https://www.docker.com/products/docker-desktop/
  - Node.js (LTS) https://nodejs.org/en/
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
docker-compose up
````
5. Wait for the end of the job.
6. You can get the result in the folder `/2.output/` .
  