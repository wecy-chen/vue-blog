<template>
  <div class="nav">
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <router-link to="/"><span class="navbar-brand logo">My blog</span></router-link>
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse" id="navbar-collapse" style="overflow:hidden">
          <ul class="nav navbar-nav navbar-right">
            <li>
              <router-link to='/'><span class="glyphicon glyphicon-home"></span> 首页</router-link>
            </li>
            <li>
              <router-link to="/register"><span class="glyphicon glyphicon-fire"></span> 注册</router-link>
            </li>
            <!--登录-->
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <span class="glyphicon glyphicon-user"></span> {{loginNav}}
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu login" v-if="!loginS">
                  <li style="width: 180px;padding: 10px"><input style="padding: 5px;" type="text"placeholder="用户名" v-model='userLogin.username'></li>
                  <li style="width: 180px;padding: 5px 10px"><input style="padding: 5px" type="password" placeholder="密码" v-model='userLogin.password'></li>
                  <li style="padding: 5px 10px">
                    <!--登录模态框-->
                    <input style="padding: 5px" type="submit" class="btn btn-primary" value="登录" @click='readyLogin'
                           data-toggle="modal"
                           data-target=".sm"
                    >
                  </li>
              </ul>
              <ul class="dropdown-menu" style="min-width: 100%;background-color: #080808;" v-else>
                <li @click="logout" data-toggle="modal"
                    data-target=".sm">
                  <a href="#"><span class="loginColor">退出</span></a>
                </li>
                <li>
                  <router-link to="/public">
                  <span class="loginColor">发表文章</span>
                  </router-link>
                </li>
              </ul>
            </li>
            <li><a href="#"><span class="glyphicon glyphicon-question-sign"></span> 关于</a></li>
          </ul>
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
            <button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
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
      userLogin: {username:'admin',password:'123456'},
      msg: '请稍等.....',
      loginNav: '登录',
      loginS:false
    }
  },
  methods: {
    async readyLogin () {
      this.msg = '请稍等.....'
      let res = await login(this.userLogin)
      if (res) {
        this.msg = res.msg
        if (res.loginOK === 1) {
          this.loginNav = res.username
          // 存储本地
          localStorage.setItem('username', res.username)
        }
        return
      }
      // 如果没有服务器
      // 本地存储
      if (this.userLogin.username === 'admin' && this.userLogin.password === '123456') {
        localStorage.setItem('username', 'admin')
        this.msg = '登录成功'
        this.loginNav = 'admin'
        this.loginS = true
      } else {
        this.msg = '密码或账号错误'
      }
    },
    logout () {
      localStorage.removeItem('username')
      this.loginNav = '登录'
      this.msg = '退出成功'
      this.loginS=false
    }
  },
  mounted () {
    if (localStorage.getItem('username')) {
      this.loginNav = localStorage.getItem('username')
      this.loginS = true
    }
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

.login {
  background-color: transparent;
  width: 200px;
}

.loginMagin{
  margin:10px 5px;
}
.loginColor{
  color: #9d9d9d
}
.loginColor:hover{
  color: #000000;
}
</style>
