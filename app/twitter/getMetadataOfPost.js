const NodeCacheSqlite = require('../lib/node-cache-sqlite.js');

module.exports = async function (page, url) {
  return NodeCacheSqlite.get('tweet-metadata', url, async function () {
    // await page.goto(url, {waitUntil: 'networkidle0'})
    await page.goto(url, {waitUntil: 'domcontentloaded'})

    // console.log('gogog')
    let metadata = await page.evaluate(async function () {

      let sleep = function (ms = 500) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

      // let type = 'text'
      // let isReply = false
      let articleNode = document.querySelector('article')
      while (!articleNode) {
        await sleep()
        articleNode = document.querySelector('article')
      }
      
      // if (document.querySelectorAll('article .css-1dbjc4n .css-901oao.r-14j79pv.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-qvutc0 a[href]:not([href*="/status/"])') !== null) {
      
      // 垂直線
      let replyMark = articleNode.querySelectorAll('.css-1dbjc4n.r-1awozwy.r-1hwvwag.r-18kxxzh.r-1b7u577 .css-1dbjc4n.r-1bimlpy.r-16y2uox.r-1jgb5lz.r-14gqq1x.r-m5arl1')
      // return [(replyMark === undefined), (replyMark === null), typeof(replyMark), replyMark.length]
      if (replyMark.length > 0) {
        // isReply = true
        articleNode = document.querySelectorAll('article')[1]
      }

      // ------------
      
      let userNode = document.querySelector('div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1wbh5a2.r-dnmrzs > div > a.css-4rbku5.css-18t94o4.css-1dbjc4n.r-1loqt21.r-1wbh5a2.r-dnmrzs.r-1ny4l3l')
      if (!userNode) {
        throw new Error('Page is adult only: ' + location.href)
        // // userNode = document.querySelector('div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1wbh5a2.r-dnmrzs > div > a.css-4rbku5.css-18t94o4.css-1dbjc4n.r-1loqt21.r-1wbh5a2.r-dnmrzs.r-1ny4l3l')
        // articleNode = document
        // userNode = articleNode.querySelector('div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1wbh5a2.r-dnmrzs > div > a.css-4rbku5.css-18t94o4.css-1dbjc4n.r-1loqt21.r-1wbh5a2.r-dnmrzs.r-1ny4l3l')
      }

      // if (!userNode) {
      //   throw new Error('User node is not found.')
      // }

      let user = ''
      if (userNode) {
        user = userNode.href
        if (user.startsWith('/')) {
          user = user.slice(1)
        }
        else if (user.indexOf('/') > -1) {
          user = user.slice(user.lastIndexOf('/') + 1)
        }
      }
        
      let time = articleNode.querySelector("time").dateTime
      time = time.slice(0, time.lastIndexOf('.'))
      time = time.replace(/[\-:]/g, '')

      let text = ''
      let textNode = articleNode.querySelector('[data-testid="tweetText"]')
      if (textNode) {
        text = articleNode.querySelector('[data-testid="tweetText"]').innerText
      }
        

      // ------------
      let images = []

      let imagesNode = articleNode.querySelectorAll('img[src*="/media/"]')
      if (imagesNode) {
        for (let i = 0; i < imagesNode.length; i++) {
          let node = imagesNode[i]

          let item = {
            src: node.src
          }

          if (node.alt !== '圖片') {
            item.alt = node.alt
          }

          images.push(item)
        }
      }
      
      // ------------

      return {
        user,
        time,
        text,
        images
      }
    });

    // console.log(metadata)
    return metadata
  })
}

