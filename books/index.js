const request = require('request')
const cheerio = require('cheerio')
const async = require('async')
const fs = require('fs')

// // 取得中文暢銷排行榜
// const topBookList = function () {
//   request({
//     url: 'https://www.books.com.tw/web/sys_saletopb/books',
//     method: 'GET'
//   }, function (err, response, body) {
//     if (err || !body) {
//       console.log(err)
//       return
//     }
//     const $ = cheerio.load(body)
//     const result = []
//     const popList = $('.mod_a .item')

//     for (let i in popList) {
//       let bookLink = popList.eq(i).find('a').attr('href')
//       let title = popList.eq(i).find('.type02_bd-a h4').text()
//       if (title !== '') {
//         result.push(Object.assign({
//           bookLink,
//           title
//         }))
//       }
//     }
//     fs.writeFileSync('topBookList.json', JSON.stringify(result))
//   })
// }
// topBookList()


// // 讀取暢銷排行榜JSON
const topBoolListJson = JSON.parse(fs.readFileSync('./topBookList.json', 'utf8'))

// // 取得中文暢銷排行榜所有書籍的詳細資訊
const result = []
const getBookDetail = function ({
  bookLink,
  title
}) {
  request({
    url: bookLink
  }, function (err, response, body) {
    if (err || !body) {
      console.log(err)
      return
    }
    const $ = cheerio.load(body)
    // const breadcrumb = $('.type04_breadcrumb [itemprop=title]')
    // const content = $('.grid_19.alpha')
    const info = $('.main_column .type02_p01_wrap')
    const image = info.find('.alpha .cnt_prod_img001 img').attr('src')
    // const detail = info.find('.grid_10')
    const link = image.slice(image.indexOf('i=') + 2, image.indexOf('.jpg') + 4)
    downloadImg(link)

    // const category = breadcrumb.map((idx, vals) => {
    //   let val = vals.children[0].data
    //   if (val !== '博客來' && val !== '中文書' && val !== '商品介紹') {
    //     return val
    //   }
    // }).get().join('>') // 分類
    // const name = detail.find('h1[itemprop=name]').text() //書名
    // const author = detail.find('.type02_p003 [itemprop=author] a').eq(3).text() //作者
    // let original_author = ''  //原文作者
    // let translator = '' //譯者
    // if (detail.find('.type02_p003 a').length > 10) {
    //   original_author = detail.find('.type02_p003 a').eq(6).text()
    //   translator = detail.find('.type02_p003 a').eq(7).text()
    // }
    // const publisher = detail.find('.type02_p003 [itemprop=brand]').text() //出版社
    // const publication_date = detail.find('.type02_p003 li').eq(-2).text().slice(5) //出版日期
    // const language = detail.find('.type02_p003 li').last().text().slice(3).trim() //語言
    // const list_price = detail.find('.cnt_prod002 .price li em').text() //定價
    // const discount = detail.find('.cnt_prod002 .price li b').eq(0).text() //折扣
    // const best_offer = detail.find('.cnt_prod002 .price li b').eq(1).text() //優惠價
    // const discount_period = detail.find('.cnt_prod002 .price li').eq(2).text().slice(5, -1) //優惠期限
    // const activityList = [] //優惠活動
    // const activity = detail.find('.cnt_prod001 li')
    // for (let i in activity) {
    //   const type = activity.eq(i).find('em').text()
    //   const event = activity.eq(i).text().split(type)[1]
    //   if (type !== '') {
    //     activityList.push({
    //       type,
    //       event
    //     })
    //   }
    // }
    // const content_intro = content.find('.bd').eq(0).text().trim() //內容簡介
    // const author_intro = content.find('.bd').eq(1).text().trim() //作者介紹
    // const menu = content.find('.bd').eq(2).text().trim() //目錄
    // const preface = content.find('.bd').eq(3).text().trim() //書序
    // const detail_intro = [] //詳細資料
    // for (let i = 0; i < content.find('.bd').eq(4).find('li').length; i++) {
    //   const detail = content.find('.bd').eq(4).find('li').eq(i).text().replace(/ /g, '')
    //   detail_intro.push(detail)
    // }
    // result.push(Object.assign({
    //   name,//書名
    //   category,// 分類
    //   author,//作者
    //   original_author,//原文作者
    //   translator,//譯者
    //   publisher,//出版社
    //   publication_date,//出版日期
    //   language,//語言
    //   list_price,//定價
    //   discount,//折扣
    //   best_offer,//優惠價
    //   discount_period,//優惠期限
    //   activityList,//優惠活動
    //   // inventory,
    //   content_intro,//內容簡介
    //   author_intro,//作者介紹
    //   // menu,
    //   // preface,
    //   // detail_intro
    // }))
    // console.log('result', result.length)
    // request({
    //   url: `https://www.books.com.tw/product_show/getProdCartInfoAjax/${bookLink.slice(-10)}/M201105_032_view`
    // },function (err, response, body) {
    //   if (err || !body) {
    //     console.log(err)
    //     return
    //   }
    //   const $ = cheerio.load(body)
    //   const inventory = $('.inner li.no').text() //庫存

    //   result.push(Object.assign({
    //     name,
    //     category,
    //     author,
    //     original_author,
    //     translator,
    //     publisher,
    //     publication_date,
    //     language,
    //     list_price,
    //     discount,
    //     best_offer,
    //     discount_period,
    //     inventory,
    //     content_intro,
    //     author_intro,
    //     menu,
    //     preface,
    //     detail_intro
    //   }))
    // })
  })
}
// getBookDetail(topBoolListJson[0])
// getBookDetail(topBoolListJson[5])

for (let i = 0; i < topBoolListJson.length ; i++) {
  setTimeout(() => {
    console.log('json',i)
    getBookDetail(topBoolListJson[i])
  }, i * 1000 * 60)
}
// setTimeout(() => {
//   fs.writeFileSync('bookDetail2.json', JSON.stringify(result))
// }, 1000 * 60 * topBoolListJson.length + 10000)
let num = 1
function downloadImg(photo) {
  let filename = 'book_'
  console.log('正在下載 ' + num)
  request(photo).pipe(fs.createWriteStream(`./images/${filename}${num++}.jpg`)).on('close', function () {
    console.log('下載完成 ' + (num - 1))
  })
  // request({
  //   url: photo
  // }, function (err, response, body) {
  //   if (err || !body) {
  //     console.log(err)
  //     return
  //   }
  //   fs.createWriteStream(`./images/${filename}${num++}.jpg`)
  // })
}