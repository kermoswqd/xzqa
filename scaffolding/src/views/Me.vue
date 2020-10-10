<template>
  <div>
      <!-- 顶部导航开始  -->
      <div>
        <mt-header title="学前端,到学问">
          <router-link to="/" slot="left">
            <mt-button type="primary" icon="back"></mt-button>
          </router-link>
        </mt-header>
      </div>
      <!-- 顶部导航结束  -->
      <!-- 底部选项卡开始 -->
      <div>
        <mt-tabbar v-model="tabbar" fixed>
          <mt-tab-item id="index">
            首页
            <img src="../assets/images/index_enabled.png" slot="icon" v-if="tabbar == 'index'">
            <img src="../assets/images/index_disabled.png" slot="icon" v-else>
            </mt-tab-item>
          <mt-tab-item id="me">
            我的
            <img src="../assets/images/me_enabled.png" slot="icon" v-if="tabbar == 'me'">
            <img src="../assets/images/me_disabled.png" slot="icon" v-else>
            </mt-tab-item>
        </mt-tabbar>
      </div>      
      <!-- 底部选项卡结束 -->
  </div>
</template>
<script>
export default {
  data(){
    return {
      tabbar:'me'
    }
  },
  watch:{
    //监听底部选项卡,可以带有两个参数,参数1代表新值,参数2代表旧值
    tabbar(value){
      if(value == 'index'){
        this.$router.push('/').catch(e=>{});
      }
      if(value == 'me'){
        this.$router.push('/me').catch(e=>{});
      }
    }
  }
}
</script>