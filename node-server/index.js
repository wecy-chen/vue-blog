let http = require('http')
// let fs = require('fs')
let url = require('url')

// 访问根地址:http://localhost:3000
// 获取本地数据
// let articleData = require('./Data.json')
var article = {}
// 设置数据库表
let User = require('./user.js')
let Article = require('./article.js')
// 插入数据
// var article1 = new Article({
//   "_id": "59dd62bc3e601b09786e6e29",
//   "name": "爱的越深，伤的越狠",
//   "img": "./static/avatar/avatar0.jpg",
//   "title": "你那一笑倾国倾城",
//   "content": "出自汉代李延年（汉武帝的李夫人的哥哥）北方有佳人。绝世而独立。一顾倾人城。再顾倾人国。宁不知倾城与倾国。佳人难再得。",
//   "time": 2018/6/28 22:29:38,
//   "__v": 0
// })
// article1.save()
http.createServer((req, res) => {
  // 设置请求头(打包不用设置)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
  res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.setHeader('X-Powered-By', '3.2.1')
  if (req.method === 'OPTIONS') return res.end()  // 让options请求快速返回

  let {pathname, query} = url.parse(req.url, true) // true把query转化成对象
  res.setHeader('Content-Type', 'application/json;charset=utf8') // 返回json 数据
  // 创建(create) 读取(get) 更新(update) 删除(delete)
  // 获取文章
  if (pathname === '/article') { // 文章在首页显示
    // 降序
    Article.find({}).sort({ '_id': -1 }).exec((err, data) => {
      if (err) {
        console.log(err)
        console.log('读取失败')
      } else {
        article = data
        return res.end(JSON.stringify(data))
      }
    })
  }
  // 获取一篇文章
  if (pathname === '/oneArticle') {
    if (!isNaN(query.id)) {
      let id = parseInt(query.id)
      res.end(JSON.stringify(article[id]))
    }
  }
  // 注册功能
  if (pathname === '/register') {
    if (req.method === 'POST') {
      let str = ''  // 注册的数据
      req.on('data', chunk => {
        str += chunk
      })
      req.on('end', () => {
        let obj = JSON.parse(str)
        if (obj.username == null) { // 用户名为空
          return res.end(JSON.stringify({ 'msg': '请输入的用户名', 'ok': 0 }))
        } else if (!((/^[a-zA-Z0-9_]{3,16}$/g).test(obj.username))) {
          return res.end(JSON.stringify({ 'msg': '账号最少3位,最多12位,只含英文,数字,下划线', 'ok': 0 }))
        } if (obj.userpwd == null) { // 密码
          return res.end(JSON.stringify({ 'msg': '请输入的密码', 'ok': 0 }))
        }
        // 存储数据库
        User.find({ username: obj.username }, (err, data) => {
          if (err) {
            console.log(err)
          } else {
            if (data.length == 0) { // 判断是否存在账号 ,没有就注册成功
              var user = new User({
                username: obj.username, // 用户账号
                userpwd: obj.userpwd, // 密码
                usersex: obj.usersex, // 性别
                userage: parseInt(obj.userage) // 年龄
              })
              user.save(function (err, data) {
                if (err) {
                  console.log('Error:' + err)
                } else {
                  res.end(JSON.stringify({ 'msg': '恭喜您注册成功,请登录!', 'ok': 1 }))
                }
              })
            } else {
              res.end(JSON.stringify({'msg': '账号已存在!请重新注册', 'ok': 0}))
            }
          }
        })
      })
    }
  }
  // 登录
  if (pathname === '/login') {
    let str = ''
    req.on('data', chunk => {
      str += chunk
    })
    req.on('end', () => {
      let obj = JSON.parse(str)
      // 用户检测
      User.find({username: obj.username}, (err, data) => {
        if (err) {
          console.log(err)
        } else {
          if (data.length === 0) {
            res.end(JSON.stringify({'msg': '用户不存在', 'loginOK': 0}))
          } else {
            if (data[0].userpwd !== obj.password) {
              res.end(JSON.stringify({'msg': '密码错误', 'loginOK': 0}))
            } else {
              res.end(JSON.stringify({'msg': '欢迎您,' + obj.username, 'loginOK': 1, 'username': obj.username}))
            }
          }
        }
      })
    })
  }
  // 发表文章
  if (pathname === '/public') {
    let str = ''
    req.on('data', chunk => {
      str += chunk
    })
    req.on('end', () => {
      let obj = JSON.parse(str)
      if (!obj.content || (!obj.title)) {
        res.end(JSON.stringify({'msg': '内容或题目不能为空', 'ok': 0}))
      } else {
        var article = new Article({
          name: obj.name,
          img: obj.img,
          title: obj.title,
          content: obj.content,
          time: obj.time
        })
        article.save(function (err, data) {
          if (err) {
            console.log('Error:' + err)
          } else {
            res.end(JSON.stringify({ 'msg': '恭喜您发表成功!', 'ok': 1 }))
          }
        })
      }
    })
  }

  // 读取本地html放在服务器中
  // fs.stat('.' + pathname, function (err, stats) { // 读取一个路径 /
  //   if (err) {
  //     fs.createReadStream('index.html').pipe(res);
  //   } else {
  //     if (stats.isDirectory()) {
  //       let p = require('path').join('.' + pathname, './index.html')
  //       fs.createReadStream(p).pipe(res)
  //     } else {
  //       fs.createReadStream('.' + pathname).pipe(res)
  //     }
  //   }
  // })
}).listen(3000, function () {
  console.log('http://localhost:3000')
})

