<template>
  <div class="home animated">
    <div>
      <div id="myCarousel" class="carousel slide">
        <ol class="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="item active" style="background:#DE2A2D">
            <img src="../assets/img/slide1.png" alt="第一张">
          </div>
          <div class="item" style="background:#F5E4DC;">
            <img src="../assets/img/slide2.png" alt="第二张">
          </div>
          <div class="item" style="background:#0000c6;">
            <img src="../assets/img/slide3.png" alt="第三张">
          </div>
        </div>
        <a href="#myCarousel" data-slide="prev" class="carousel-control left">
          <span class="glyphicon glyphicon-chevron-left"></span>
        </a>
        <a href="#myCarousel" data-slide="next" class="carousel-control right">
          <span class="glyphicon glyphicon-chevron-right"></span>
        </a>
      </div>
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
  import {getArticle} from '@/api'
  import {mapActions} from 'vuex'
  import $ from 'jquery'
  export default {
    name: 'home',
    data () {
      return {
        article: {},
        vuexData:{}
      }
    },
    mounted: function () {
      this.getData()  //本地数据
      this.slide()   //滑动轮播
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
      // 轮播图移动端滑动
      slide () {
        $(function () {
          // 获取手指在轮播图元素上的一个滑动方向（左右）

          // 获取界面上轮播图容器
          var $carousels = $('.carousel')
          var startX, endX
          // 在滑动的一定范围内，才切换图片
          var offset = $carousels.width() * 0.2
          // 注册滑动事件
          $carousels.on('touchstart', function (e) {
            // 手指触摸开始时记录一下手指所在的坐标x
            startX = e.originalEvent.touches[0].clientX
          })
          $carousels.on('touchmove', function (e) {
            // 目的是：记录手指离开屏幕一瞬间的位置 ，用move事件重复赋值
            endX = e.originalEvent.touches[0].clientX
          })
          $carousels.on('touchend', function (e) {
            // console.log(endX);
            // 结束触摸一瞬间记录手指最后所在坐标x的位置 endX
            // 比较endX与startX的大小，并获取每次运动的距离，当距离大于一定值时认为是有方向的变化
            var distance = Math.abs(startX - endX)
            if (distance > offset) {
              // 说明有方向的变化
              // 根据获得的方向 判断是上一张还是下一张出现
              $(this).carousel(startX > endX ? 'next' : 'prev')
            }
          })
        })
      },
      ...mapActions([
        'setArticle'
      ])
    },
    computed: {}
  }
</script>
<style scoped>
  #myCarousel {
    margin: 50px 0 0 0;
  }

  #navbar-collapse ul {
    margin-top: 0;
  }

  .carousel-indicators {
    bottom: -5px;
  }

  .carousel-inner img {
    margin: 0 auto;
  }

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
