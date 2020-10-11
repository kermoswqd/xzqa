<template>
  <div>
    <div style="position:fixed;left:0;right:0;top:0;z-index:5">
      <mt-header title="顶部导航"></mt-header>
      <mt-navbar v-model="active">
          <mt-tab-item id="1">
              HTML5
              <img src="../../assets/images/html5.png" slot="icon">
          </mt-tab-item>
          <mt-tab-item id="2">
            CSS3
            <img src="../../assets/images/css3.png" slot="icon">
          </mt-tab-item>
          <mt-tab-item id="3">
            JavaScript
             <img src="../../assets/images/javascript.png" slot="icon">
          </mt-tab-item>
          <mt-tab-item id="4">
            jQuery
            <img src="../../assets/images/jquery.png" slot="icon">
          </mt-tab-item>
      </mt-navbar>
    </div>
    <div class="main">
      <mt-tab-container v-model="selected" swipeable>
          <mt-tab-container-item id="aa">
              <p v-for="(v,k) of 100" :key="k">{{v}}</p>
          </mt-tab-container-item>
          <mt-tab-container-item id="bb">222</mt-tab-container-item>
          <mt-tab-container-item id="cc">333</mt-tab-container-item>
          <mt-tab-container-item id="dd">444</mt-tab-container-item>
      </mt-tab-container>
    </div>
    <mt-tabbar v-model="tabbar" fixed>
        <mt-tab-item id="index">
            首页
            <img src="../../assets/images/index_enabled.png" slot="icon" v-if="tabbar == 'index'">
            <img src="../../assets/images/index_disabled.png" slot="icon" v-else>
        </mt-tab-item>
        <mt-tab-item id="cart">
          购物车
           <img src="../../assets/images/cart_enabled.png" slot="icon" v-if="tabbar=='cart'">
           <img src="../../assets/images/cart_disabled.png" slot="icon" v-else>
        </mt-tab-item>
        <mt-tab-item id="me">
          我的
           <img src="../../assets/images/me_enabled.png" slot="icon" v-if="tabbar=='me'">
           <img src="../../assets/images/me_disabled.png" slot="icon" v-else>
        </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<style>
html,body{
  touch-action: none;
  -webkit-touch-action:none;
}
</style>
<style scoped>
.main{
  margin-top:115px;
  margin-bottom: 55px;
}
</style>
<script>
export default {
  data(){
    return {
      active:'1',
      selected:'aa',
      tabbar:'index'
    }
  },
  watch:{
    //监听active变量的值
    active(){
      switch(this.active){
        case '1':
          this.selected  = 'aa';
          break;
        case '2':
          this.selected  = 'bb';
          break;
        case '3':
          this.selected  = 'cc';
          break;
        case '4':
          this.selected  = 'dd';
          break;
      }
      // if(this.active ==  1){
      //   this.selected = 'aa';
      // } else if(this.active == 2){
      //   this.selected = 'bb';
      // } else if(this.active == 3){
      //   this.selected = 'cc';
      // } else if(this.active == 4) {
      //   this.selected = 'dd';
      // }
    }
  }
}
</script>