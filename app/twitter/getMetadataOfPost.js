const NodeCacheSqlite = require('../lib/node-cache-sqlite.js');

module.exports = async function (page, url) {
  return NodeCacheSqlite.get('tweet-metadata', url, async function () {
    await page.goto(url, {waitUntil: 'networkidle0'})

    // console.log('gogog')
    let metadata = await page.evaluate(function () {

      // let type = 'text'
      // let isReply = false
      let articleNode = document.querySelector('article')
      
      // if (document.querySelectorAll('article .css-1dbjc4n .css-901oao.r-14j79pv.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-qvutc0 a[href]:not([href*="/status/"])') !== null) {
      
      // 垂直線
      let replyMark = articleNode.querySelectorAll('.css-1dbjc4n.r-1awozwy.r-1hwvwag.r-18kxxzh.r-1b7u577 .css-1dbjc4n.r-1bimlpy.r-16y2uox.r-1jgb5lz.r-14gqq1x.r-m5arl1')
      // return [(replyMark === undefined), (replyMark === null), typeof(replyMark), replyMark.length]
      if (replyMark.length > 0) {
        // isReply = true
        articleNode = document.querySelectorAll('article')[1]
      }

      // ------------
      
      let user = articleNode.querySelector('div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1wbh5a2.r-dnmrzs > div > a.css-4rbku5.css-18t94o4.css-1dbjc4n.r-1loqt21.r-1wbh5a2.r-dnmrzs.r-1ny4l3l').href
      if (user.startsWith('/')) {
        user = user.slice(1)
      }
      else if (user.indexOf('/') > -1) {
        user = user.slice(user.lastIndexOf('/') + 1)
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
      /*
      // #id__e6b7jesaxk > div > div > div > div > div > a > div > div.r-1p0dtai.r-1pi2tsx.r-1d2f490.r-u8s1d.r-ipm5af.r-13qz1uu > div > img
      let imageNode = articleNode.querySelector('.css-1dbjc4n.r-1ssbvtb.r-1s2bzr4 > div > div > div > div > div > a > div > div.r-1p0dtai.r-1pi2tsx.r-1d2f490.r-u8s1d.r-ipm5af.r-13qz1uu > div > img')
      if (imageNode) {
        let alt = ''
        if (imageNode.alt !== '圖片') {
          alt = imageNode.alt
        }

        images.push({
          src: imageNode.src,
          alt
        })
      }

      // ----------------------------------------------------------------

      let albumNode = articleNode.querySelector('.css-1dbjc4n.r-1ssbvtb.r-1s2bzr4 > div > div > div > div > div.r-1p0dtai.r-1pi2tsx.r-1d2f490.r-u8s1d.r-ipm5af.r-13qz1uu > div')
      if (albumNode) {
        let imagesNode = albumNode.querySelectorAll('img')
        for (let i = 0; i < imagesNode.length; i++) {
          let node = imagesNode[i]
          let alt = ''
          if (node.alt !== '圖片') {
            alt = node.alt
          }

          images.push({
            src: node.src,
            alt
          })
        }
      }

      // ----------------------------------------------------------------

      let forwardNode = articleNode.querySelector('.css-1dbjc4n.r-1ssbvtb.r-1s2bzr4 > div > div > div > div > div.r-1p0dtai.r-1pi2tsx.r-1d2f490.r-u8s1d.r-ipm5af.r-13qz1uu > div')
      if (albumNode) {
        let imagesNode = albumNode.querySelectorAll('img')
        for (let i = 0; i < imagesNode.length; i++) {
          let node = imagesNode[i]
          let alt = ''
          if (node.alt !== '圖片') {
            alt = node.alt
          }

          images.push({
            src: node.src,
            alt
          })
        }
      }
      */

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

