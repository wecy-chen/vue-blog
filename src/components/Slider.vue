<template>
  <div id="myCarousel" class="carousel slide">
    <ol class="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
      <li data-target="#myCarousel" data-slide-to="1"></li>
      <li data-target="#myCarousel" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner" v-if="imgs.length">
      <div class="item active" style="background:#DE2A2D">
        <img :src="imgs[0]" alt="第一张">
      </div>
      <div class="item" style="background:#F5E4DC;">
        <img :src="imgs[1]" alt="第二张">
      </div>
      <div class="item" style="background:#0000c6;">
        <img :src="imgs[2]" alt="第三张">
      </div>
    </div>
    <a href="#myCarousel" data-slide="prev" class="carousel-control left">
      <span class="glyphicon glyphicon-chevron-left"></span>
    </a>
    <a href="#myCarousel" data-slide="next" class="carousel-control right">
      <span class="glyphicon glyphicon-chevron-right"></span>
    </a>
  </div>
</template>
<script type='text/ecmascript-6'>
  import $ from 'jquery'
  export default {
    props:{
      imgs: { //滑动速度的监听
        type: Array,
        default: ['http://placehold.it/960x440','http://placehold.it/960x440','http://placehold.it/960x440']
      }
    },
    data() {
      return {}
    },
    mounted(){
      this.slide()   //滑动轮播
    },
    methods: {
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
    },
    computed: {},
    components: {}
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
</style>
