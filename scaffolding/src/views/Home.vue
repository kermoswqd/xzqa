<template>
  <div>
   <!-- 顶部导航开始 -->
   <div>
     <mt-header title="学前端,到学问">
       <div slot="right" class="shortcut">
         <router-link to="/register">注册</router-link>
         <router-link to="/login">登录</router-link>
       </div>
     </mt-header>
   </div>
   <!-- 顶部导航结束 -->
   <!-- 顶部选项卡开始 -->
   <div>
     <mt-navbar v-model="active">
        <mt-tab-item 
          :id="item.id.toString()" 
          v-for="(item,index) of category"
          :key="index">
          {{item.category_name}}
        </mt-tab-item>    
     </mt-navbar>
   </div>
   <!-- 顶部选项卡结束 -->
   <!-- 面板开始 -->
   <div 
      class="main"
      infinite-scroll-distance="20"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-immediate-check="true">
     <mt-tab-container v-model="active">
        <mt-tab-container-item :id="active.toString()">
          <!-- 单一文章信息开始 -->
          <div 
            class="article"
            v-for="(article,index) of articles"
            :key="index">
            <router-link :to="`/article/${article.id}`">
              <!-- 标题链接开始 -->
              <div class="article-subject">
                {{article.subject}}
              </div>
              <!-- 标题链接结束 -->
              <!-- 缩略图及简介开始 -->
              <div class="article-wrapper">
                <div class="article-image" v-if="article.image != null">
                  <img v-lazy="article.image" alt="">
                </div>
                <div class="article-desc">
                  {{article.description}}         
                </div>
              </div>
              <!-- 缩略图及简介结束 -->
            </router-link>
          </div>
          <!-- 单一文章信息结束 -->

        </mt-tab-container-item>
     </mt-tab-container>
     <!-- 如果到底最后页则显示相关的提示信息 -->
     <div class="tips" v-if="page >= pagecount">我是底线</div>
   </div>
   <!-- 面板结束 -->
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
<style scoped>
.shortcut a{ 
  display:inline-block;
  margin-left:10px;
  text-decoration: none;  
  color:#fff;
}
.main{
  margin-bottom:55px;
}
/* 文章容器 */
.article{
	padding-bottom:10px;
	border-bottom:1px solid #999;
	margin:10px;
}
.article a{
  text-decoration: none;
}
/* 文章标题 */
.article-subject{
	font-size:16px;
	line-height:22px;
	font-weight:bold;
	font-family:'Microsoft Yahei';
	color:#1a1a1a;
  margin-bottom: 10px;
}
/* 缩略图及简介容器 */
.article-wrapper{
	display:flex;
	align-items:center;
}
/* 缩略图容器 */
.article-image{
  margin-right: 15px;
}
.article-image img{
  width:112px;
  border-radius: 5px;
}
/* 文章简介容器 */
.article-desc{
	font-size:15px;
	font-weight:400;
	line-height:21px;
	height:63px;
  overflow: hidden;
  color:#999;
}
.tips{
  padding:15px;
  text-align: center;
  background-color:#f5f5f5;
  color:#333;
}
</style>
<script>
export default {
  data(){
    return {
      //默认被选定的顶部选项卡及面板的ID
      active:'1',
      //默认被选定的顶部选项卡的ID
      tabbar:'index',
      //存储服务器返回的文章分类信息
      category:[],
      //存储服务器返回的文章信息
      articles:[],
      //用于标识当前服务器在正在空闲，可以处理用户滚动行为所触发的滚动方法
      busy:false,
      //标识页码的初始值
      page:1,
      //存储某一分类下文章总页数 
      pagecount:0
    }
  },
  methods:{
    /**
     * 加载数据的自定义函数,会被mounted、active及loadMore分别进行调用    
     * 
     * @param cid  number,表示文章分类的ID
     * @param page number,表示页码
     * 
     * @return void
     * */
    loadData(cid,page){

      //显示加载提示框
      this.$indicator.open({
        text:'加载中...',
        spinnerType:'double-bounce'
      });

      //此时的真正作用是：现在已经触发了滚动方法,既使现在再次进行
      //滚动范围也不再触发滚动方法了    
      this.busy = true;
      //向服务器发送请求，以获取当前分类下的第几页的数据
      this.axios.get('/lists?cid=' + cid + '&page=' + page).then(res=>{
        let data = res.data.results;    
        //将服务器返回的总页数赋值给pagecount变量
        this.pagecount = res.data.pagecount;    
        data.forEach(item=>{
          if(item.image != null){
            item.image = require('../assets/articles/' + item.image);
          }
          this.articles.push(item);
        })
        //真正的作用是：上一次的请求已经处理完成了
        //如果现在再次进行滚动范围，则仍然要触发滚动方法
        this.busy = false;
        //关闭加载提示框
        this.$indicator.close();
      });
    },
    //滚动到指定距离范围内时加载更多的服务器数据
    loadMore(){
        //页码进行累加
        this.page++;
        if(this.page<=this.pagecount){
          this.loadData(this.active,this.page);
        }
    }
  },
  watch:{
    //监听顶部选项卡
    active(){
      //清除之前可保存的文章数据
      this.articles= [];
      //保证切换选项卡后要显示当前分类的第1页的数据
      this.page = 1;
      this.loadData(this.active,this.page);
    },
    //监听底部选项卡,可以带有两个参数,参数1代表新值,参数2代表旧值
    tabbar(value){
      if(value == 'index'){
        this.$router.push('/').catch(e=>{});
      }
      if(value == 'me'){
        this.$router.push('/me').catch(e=>{});
      }
    }
  },
  mounted(){
    // 获取文章分类信息
    this.axios.get('/category').then(res=>{
       //接收服务器返回数据并且赋值给属性category
       this.category = res.data.results;
    });
    // 获取默认文章分类下的文章数据,本次调用有且只有一次
    this.loadData(this.active,this.page);
  }
}
</script>