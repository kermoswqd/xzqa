<template>
  <!--现在的含义是：距离底部小于等于20个像素时，触发loadMore的函数  -->
  <div infinite-scroll-distance="20"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="busy">
    <p v-for="(v,k) of i " :key="k">{{v}}</p>
  </div>
</template>
<script>
export default {
  data(){
    return {
      i:30,
      busy:false,
      page:1
    }
  },
  methods:{
    loadMore(){
      this.page++;
      //此时的真正作用是：现在已经触发了滚动方法,既使现在再次进行
      //滚动范围也不再触发滚动方法了      
      this.busy = true;
      //假设现在服务器运行速度非常慢,10秒钟才完成请求信息
      window.setTimeout(()=>{
        console.log('现在要从服务器获取第' + this.page + '页的数据了');
        this.i += 30;
        //真正的作用是：上一次的请求已经处理完成了
        //如果现在再次进行滚动范围，则仍然要触发滚动方法
        this.busy = false;
      },10000);
      
    }
  }
}
</script>

