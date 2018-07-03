<template>
  <transition enter-active-class="slideInLeft" leave-active-class='slideOutRight'>
    <div style="margin-top:60px" class="animated">
      <div class="container">
        <div class="row" v-cloak>
          <div class="col col-md-3" style="text-align:center">
            <img :src="article.img" class="imgSize">
            <h4>作者:{{article.name}}</h4>
            <p>{{article.time}}</p>
          </div>
          <div class="col col-md-9" style="text-align:center">
            <h3>{{article.title}}</h3>
            <div v-html="article.content" style="text-align:left"></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/javascript">
  import {oneArticle} from '@/api'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        article: {
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531198642&di=3068c6af8824e61d5dbc80c71aa7d7eb&imgtype=jpg&er=1&src=http%3A%2F%2Fwenwen.soso.com%2Fp%2F20110624%2F20110624193649-294056186.jpg',
          name: '',
          time: '',
          title: '',
          content: ''
        },
        id: this.$route.params.id
      }
    },
    mounted() {
      this.getOne()  //本地获取
      this.getApiOne()  //数据库获取
    },
    computed: {
      ...mapGetters([
        'jsonData'
      ])
    },
    methods: {
      getOne() {
        if (!(Object.keys(this.jsonData).length)) { //检测vuex 是否有数据
          this.article=JSON.parse(localStorage.getItem('jsonDataArr'))//重新刷新就获取localStroge
        } else {
          this.article=this.jsonData[this.id] //路由跳转才有数据
          localStorage.setItem('jsonDataArr',JSON.stringify(this.article))  //设置
        }
    },
    async getApiOne() {
      let res = await oneArticle(this.id)
      if (res) {
        this.article = res
      }
      return
    },
//    saveLocalStorage (){
//      if(!(Object.keys(this.jsonData).length)){
//        this.article = JSON.parse(localStorage.getItem('jsonDataArr'))
//        console.log(JSON.parse(localStorage.getItem('jsonDataArr')))
//      }else{
//        localStorage.setItem('jsonDataArr',this.article)
//      }
//    }
  }
  }

</script>
<style scoped>
  .imgSize{
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
</style>
