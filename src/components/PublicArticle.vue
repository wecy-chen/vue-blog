<template>
    <div style="margin-top:60px" class="animated">
      <div class="container">
        <div class="row" v-cloak>
          <div class="col col-md-3" style="text-align:center">
              <img :src="img">
              <h4>作者:{{name}}</h4>
              <p>{{time}}</p>
          </div>
          <div class="col col-md-9" style="text-align:center">
            <h3><input v-model="title" style="text-align:center" placeholder="题目"></h3>
            <div style="text-align:center"><textarea placeholder="内容" rows="20" style="width:100%" v-model="content"></textarea></div>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".public" @click='public'>发表</button>
          </div>
        </div>
      </div>
      <div class="modal fade public" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="row loginMagin">
            <div class="col-md-10 col-md-offset-2">{{msg}}</div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click='publicOK'>确定</button>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>
<script>
  import {publicArticle} from '@/api'
  export default{
    data () {
      return {
        name: '',
        title: '',
        time: '',
        content: '',
        article: {},
        img: './static/avatar/avatar1.jpg',
        msg: '请稍后....',
        ok: 0
      }
    },
    mounted () {
      if (localStorage.getItem('username')) {
        this.name = localStorage.getItem('username')
        this.article.name = localStorage.getItem('username')
        this.getTime()
        setInterval(this.getTime, 1000)
      }
    },
    methods: {
      async public () {
        this.article.time = this.time
        this.article.title = this.title
        this.article.img = this.img
        this.article.content = this.content
        let res = await publicArticle(this.article)
        console.log(res)
        if (res) {
          this.msg = res.msg
          if (res.ok === 1) {
            this.ok = 1
          }
          return
        }
        this.msg = '发表失败,后台服务器没开'
      },
      getTime () {
        var oDate = new Date()
        var y = oDate.getFullYear()
        var m = oDate.getMonth() + 1
        var d = oDate.getDate()
        var h = oDate.getHours()
        var mm = oDate.getMinutes()
        var s = oDate.getSeconds()
        this.time = y + '/' + this.getTwo(m) + '/' + this.getTwo(d) + ' ' + this.getTwo(h) + ':' + this.getTwo(mm) + ':' + this.getTwo(s)
      },
      getTwo (t) {
        return t < 10 ? '0' + t : t + ''
      },
      publicOK () {
        if (this.ok === 1) {
          this.$router.replace({ path: 'home' })
        }
      }
    }
  }
</script>
<style>
  .loginMagin{
    margin: 10px 5px
  }
</style>
