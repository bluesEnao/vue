<template>
  <div id="app">
   <!--<router-view/>-->
   <transition :name="direction" mode="out-in"> <!--动态获得transition 的name值-->
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      direction : 'slide-left'
    }
  },
  watch: {
    '$route' (to, from) {
      const list = ['login', 'page1', 'page2','page3']// 将需要切换效果的路由名称组成一个数组
      const toName = to.name    // 即将进入的路由名字
      const fromName = from.name    // 即将离开的路由名字
      const toIndex = list.indexOf(toName)    // 进入下标
      const fromIndex = list.indexOf(fromName)   // 离开下标
      if (toIndex > -1 && fromIndex > -1) {   // 如果下标都存在
        if (toIndex < fromIndex) {          // 如果进入的下标小于离开的下标，那么是左滑
          this.direction = 'slide-left'
        } else {
          this.direction = 'slide-right'        // 如果进入的下标大于离开的下标，那么是右滑
        }
      }
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  font-family: "SF Pro SC","SF Pro Display","SF Pro Icons","PingFang SC","Helvetica Neue","Helvetica","Arial",sans-serifsans-serif;
  font-size: 28px;
  line-height: 1.6;
  background-color: #fff;
  position: relative;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.child-view {
  /*position: absolute;*/
  transition: all .5s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(300px, 0);
  transform: translate(300px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-500px, 0);
  transform: translate(-500px, 0);
}
</style>
