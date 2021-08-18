<template>
  <div>
    <swiper :options="swiperOptions">
      <swiper-slide>
        <img class="w-100" src="../assets/images/swiper1.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/swiper2.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/swiper3.jpeg" alt />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right" slot="pagination"></div>
    </swiper>
    <div class="nav-icons bg-white mt-3 d-flex flex-wrap text-center pt-3 text-grey-1">
      <div class="nav-item mb-3" v-for="(n,index) in items " :key="index">
        <i class="sprite sprite-news"></i>
        <div>{{n}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.pagination-home',
        },
      },
      items: [
        '爆料站',
        '故事站',
        '周边商城',
        '体验服',
        '新人专区',
        '荣耀传承',
        '同人社区',
        '王者营地',
        '公众号',
        '版本介绍',
      ],
    }
  },
}
</script>

<style lang="scss">
.nav-icons {
  display: flex;
  flex-wrap: wrap;
  .nav-item {
    width: 25%;
  }
}
</style>