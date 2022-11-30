#Specify the version of nodejs.
FROM zenato/puppeteer-renderer
#FROM dayyass/muse_as_service:1.1.2

RUN apt-get update

# RUN cat /etc/os-release

RUN apt-get install -y \
    fonts-noto-cjk

RUN locale-gen zh_TW.UTF-8  
ENV LC_ALL=zh_TW.UTF-8

RUN mkdir -p /app/

CMD ["node", "/app/index.js"]