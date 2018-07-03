<template>
  <div class="nav">
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <span class="navbar-brand logo">My blog</span>
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse" ref='btnNav'>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <button type="button" class="navbar-toggle glyphicon glyphicon-chevron-up" data-toggle="collapse" @click='toggle' v-if='show' style="color:white">
          </button>
        </div>
        <div class="collapse navbar-collapse" id="navbar-collapse" style="overflow:hidden">
          <ul class="nav navbar-nav navbar-right">
            <li @click='hideNav'>
              <router-link to='/'><span class="glyphicon glyphicon-home"></span> 首页</router-link>
            </li>
            <li @click='hideNav'>
              <router-link to="/register"><span class="glyphicon glyphicon-fire"></span> 注册</router-link>
            </li>
            <li @click="toggle"><a href="javascript:;"><span class="glyphicon glyphicon-user"></span> {{loginNav}}</a></li>
            <li @click='hideNav'><a href="#"><span class="glyphicon glyphicon-question-sign"></span> 关于</a></li>
          </ul>
        </div>
        <transition enter-active-class="zoomInLeft" leave-active-class="zoomOutRight">
          <div class="row login animated" v-if='show' v-show='loginShow'>
            <div class="col-md-12 col">
              <div class="media">
                <input style="margin-top: 5px" type="text" name="username" class="form-control" id="username" placeholder="用户名" v-model='userLogin.username'>
                <input style="margin-top: 5px" type="password" name="password" class="form-control" id="password" placeholder="密码" v-model='userLogin.password'>
                <button type="submit" class="btn btn-primary btnSubmit" @click='readyLogin' data-toggle="modal" data-target=".sm">登录</button>
              </div>
            </div>
          </div>
        </transition>
          <div class="row login animated" v-if='show' v-show='!loginShow'>
            <div class="col-md-12 col">
              <div class="media loginCSS">
                <ul class="list-group">
                  <router-link to='/home'><li class="list-group-item" @click='logout' data-toggle="modal" data-target=".sm"><a href="">退出</a></li></router-link>
                  <li class="list-group-item" @click='toggle'><a href="">修改资料</a></li>
                  <router-link to='/public'><li class="list-group-item" @click='toggle'><a href="">发表内容</a></li></router-link>
                </ul>
              </div>
            </div>
          </div>
      </div>
    </nav>
    <div class="modal fade sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="row loginMagin">
            <div class="col-md-10 col-md-offset-2">{{msg}}</div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click='reset'>确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {login} from '@/api'
export default {
  data () {
    return {
      show: false,
      loginShow: true,
      userLogin: {},
      msg: '请稍等.....',
      loginNav: '登录'
    }
  },
  methods: {
    toggle () {
      this.show = !this.show
    },
    hideNav () { // 移动端的适应
      this.$refs.btnNav.click()
    },
    async readyLogin () {
      this.msg = '请稍等.....'
      let res = await login(this.userLogin)
      if (res) {
        this.msg = res.msg
        if (res.loginOK === 1) {
          this.loginNav = res.username
          // 存储本地
          localStorage.setItem('username', res.username)
          this.loginShow = false
        }
        this.toggle()
        return
      }
      // 如果没有服务器
      // 本地存储
      if (this.userLogin.username === 'admin' && this.userLogin.password === '123456') {
        localStorage.setItem('username', 'admin')
        this.msg = '登录成功'
        this.loginNav = 'admin'
        this.loginShow = false
      } else {
        this.msg = '密码或账号错误'
      }
      this.toggle()
    },
    logout () {
      localStorage.removeItem('username')
      this.loginNav = '登录'
      this.loginShow = true
      this.show = false
      this.msg = '退出成功'
    },
    reset () {
      this.msg = ''
    }
  },
  mounted () {
    if (localStorage.getItem('username')) {
      this.loginNav = localStorage.getItem('username')
      this.loginShow = false
    }
    this.userLogin.username = 'admin'
    this.userLogin.password = '123456'
  }
}

</script>
<style scoped>
.nav {
  position: relative;
}

.logo {
  font-size: 20px;
  cursor: pointer;
}

.media {
  text-align: center
}

.login {
  position: absolute;
  top: 53px;
  right: 20px;
  z-index: 10;
  border-radius: 10px;
}

.btnSubmit {
  margin-top: 5px
}
.loginMagin{
  margin:10px 5px;
}
.loginCSS{
  margin-right: 100px;
}
</style>
