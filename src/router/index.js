import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Article from '@/components/Article'
import PublicArticle from '@/components/PublicArticle'

Vue.use(Router)

export default new Router({
  // mode: 'history', // build 要去掉
  saveScrollPosition: true,
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '*',
    component: Home
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/public',
    component: PublicArticle
  },
  {
    path: '/oneArticle/:id',
    component: Article,
    name: 'article'
  }]
})
