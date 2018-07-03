import axios from 'axios'
// 增加默认的请求的路径
// 拦截器
axios.defaults.baseURL = 'http://localhost:3000'
axios.interceptors.response.use((res) => {
  return res.data // 在这里统一拦截结果 把结果处理成res.data
})
// 获取文章数据 , 返回的是一个promise对象
export let getArticle = () => {
  return axios.get('/article').then(res => res).catch(e => {
    console.log('后台服务器错误')
  })
}

// 获取一篇文章
export let oneArticle = (id) => {
  return axios.get(`/oneArticle?id=${id}`).then(res => res).catch(e => false)
}

// 注册
export let register = (data) => {
  return axios.post('/register', data).then(res => res).catch(e => false)
}

// 登录
export let login = (data) => {
  return axios.post('/login', data).then(res => res).catch(e => false)
}

// 发表文章
export let publicArticle = (data) => {
  return axios.post('/public', data).then(res => res).catch(e => false)
}

