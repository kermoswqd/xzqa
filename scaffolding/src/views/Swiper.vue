<template>
  <div class="swipe">
    <mt-swipe :auto="2000">
      <mt-swipe-item
        ><img src="../assets/images/1 (1).jpg" alt=""
      /></mt-swipe-item>
      <mt-swipe-item
        ><img src="../assets/images/1 (2).jpg" alt=""
      /></mt-swipe-item>
      <mt-swipe-item
        ><img src="../assets/images/1 (3).jpg" alt=""
      /></mt-swipe-item>
      <mt-swipe-item
        ><img src="../assets/images/1 (4).jpg" alt=""
      /></mt-swipe-item>
      <mt-swipe-item
        ><img src="../assets/images/1 (5).jpg" alt=""
      /></mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {};
</script>

<style>
.swipe {
  height: 200px;
}
</style>