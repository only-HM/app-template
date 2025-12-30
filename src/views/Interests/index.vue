<template>
  <div class="container">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(b, b_i) in banners" :key="b_i" @click="goUrl(b)">
        <img :src="b.imgUrl">
      </van-swipe-item>
    </van-swipe>

    <div class="modules">
      <img class="title" src="./image/title_1.png">

      <div class="cards">
        <div class="card" v-for="(c, c_i) in cards" :key="c_i" @click="handleCard(c)">
          <div class="img">
            <img :src="c.imgUrl">
          </div>
          <h4>{{ c.name }}</h4>
          <div class="tips">{{ c.tips }}</div>
          <div class="money">￥<i>{{ c.money }}</i>/月</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { showToast } from 'vant';
const banners = ref([
  { id: Math.random().toString().split('.')[1].replace(/^0+/,''), imgUrl: new URL('./image/banner_1.png', import.meta.url).href },
  { id: Math.random().toString().split('.')[1].replace(/^0+/,''), imgUrl: new URL('./image/banner_1.png', import.meta.url).href },
  { id: Math.random().toString().split('.')[1].replace(/^0+/,''), imgUrl: new URL('./image/banner_1.png', import.meta.url).href },
]);

const cards = ref([
  { id: Math.random().toString().split('.')[1].replace(/^0+/,''), imgUrl: new URL('./image/card_1.png', import.meta.url).href, name: '5GB+茶饮零食权益', tips: '上新！最高领40元券', money: '20.00' },
  { id: Math.random().toString().split('.')[1].replace(/^0+/,''), imgUrl: new URL('./image/card_2.png', import.meta.url).href, name: '5GB+30元车主券', tips: '流量出行畅享无忧', money: '19.9' },
  { id: Math.random().toString().split('.')[1].replace(/^0+/,''), imgUrl: new URL('./image/card_3.png', import.meta.url).href, name: '20元商超消费券', tips: '新品！生活券包随心领', money: '9.9' },
  { id: Math.random().toString().split('.')[1].replace(/^0+/,''), imgUrl: new URL('./image/card_4.png', import.meta.url).href, name: '1.9元抵10元券', tips: '热销权益第2名', money: '1.9' },
]);

const goUrl = (row) => {
  showToast(row.id);
};

const handleCard = (row) => {
  showToast(row.name);
};
</script>

<style scoped lang="scss">
@import url(./css/common.scss);
@import url(./css/index.scss);
</style>