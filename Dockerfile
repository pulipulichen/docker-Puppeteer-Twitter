#Specify the version of nodejs.
# FROM zenato/puppeteer-renderer
#FROM dayyass/muse_as_service:1.1.2
FROM buildkite/puppeteer

RUN rm /etc/apt/sources.list.d/google.list
RUN apt-get update

# RUN cat /etc/os-release

RUN apt-get install -y \
    fonts-noto-cjk locales

RUN locale-gen zh_TW.UTF-8  
ENV LC_ALL=zh_TW.UTF-8

RUN mkdir -p /app/
RUN mkdir -p /1.input/
RUN mkdir -p /2.output/

RUN npm install text-from-image@1.1.1
RUN npm install smartcrop@2.0.5
RUN npm install smartcrop-gm@2.0.2
RUN npm install gm@1.25.0

# COPY package.json /

# WORKDIR /app
# RUN npm i

CMD ["node", "/app/index.js"]