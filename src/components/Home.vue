<template>
  <div class="home animated">
    <div>
      <slider :imgs="imgs"></slider>
      <div class="tab1">
        <div class="container">
          <h2 class="tab-h2">&lt;这是一个简单的博客项目,可以适应移动端屏幕&gt;</h2>
          <p class="tab-p">以下为发表过的内容</p>
          <div class="row">
            <div class="col-md-6 col " v-for='(item,index) in article'>
              <router-link :to="{name:'article',params:{id:index}}">
                <div class="media">
                  <div class="media-left">
                    <a href="#"><img :src='item.img' class="media-object" alt="" style="border-radius:100px"></a>
                  </div>
                  <div class="media-body">
                    <p class="aName">{{item.name}}</p>
                    <span class="aTitle" v-html='item.title'></span>
                    <p class="aContent">{{item.content}}</p>
                    <span>{{item.time}}</span>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Slider from './Slider.vue'
  import {getArticle} from '@/api'
  import {mapActions} from 'vuex'
  export default {
    name: 'home',
    data () {
      return {
        imgs:[
          require('../assets/img/slide1.png'),
          require('../assets/img/slide2.png'),
          require('../assets/img/slide3.png')
        ],
        article: {},
        vuexData:{}
      }
    },
    mounted: function () {
      this.getData()  //本地数据
      this.getDBData()  //数据库数据
    },
    updated () {
      this.setArticle({data: this.vuexData}) // vuex 存储文章
    },
    methods: {
      getData(){
        // 获取本地的json数据
       let article = require('@/api/Data.json')
        this.vuexData=article
        this.article=this.formatData(article)
      },
      async getDBData () {
        let article = await getArticle()
        if (article) {
          this.vuexData=article
          this.article=this.formatData(article)
        }
      },
      // 处理数据
      formatData (data) {
        // 复制数组
        let sData=[]
        data.forEach((value,i)=>{
          if(typeof value ==='object'){
            sData[i]={}
            for(let k in value){
              sData[i][k]=value[k]
            }
          }
        })
        // 处理预览文章文字的长度 加省略号
        var reg = /<[^<]*>/gi  //去掉标签
        sData.map(function (value) {
          if (value.content.length > 18) { // 文字过长显示18个字
           value.content=value.content.replace(reg, '').substr(0, 18) + '•••'
          } else {
            value.content=value.content.replace(reg, '')
          }
        })
      return sData
      },
      ...mapActions([
        'setArticle'
      ])
    },
    components:{
      Slider
    }
  }
</script>
<style scoped>
  .tab-h2 {
    font-size: 20px;
    text-align: center;
    letter-spacing: 1px;
    color: #0059b2;
  }

  .tab-p {
    font-size: 15px;
    text-align: center;
    letter-spacing: 1px;
    color: #999;
    margin: 20px 0 40px 0;
  }

  .tab1 {
    margin: 30px 0;
    color: #666;
  }

  .tab1 .aName {
    color: #1b6d85;
  }

  .tab1 .aTitle {
    font-weight: 700;
  }

  .tab1 .aContent {
    color: #999999;
  }

  .tab1 .col {
    padding: 20px;
  }
  .media-object{
    width: 100px;
    height: 100px;
  }
  /*.aContent {*/
    /*max-width:150px;*/
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
    /*white-space: nowrap;  !*文本不换行，这样超出一行的部分被截取，显示...*!*/
  /*}*/
</style>
