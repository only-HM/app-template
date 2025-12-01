<template>
  <div class="coupons-container">
    <div class="bg-1 bg">
      <div class="float-img">
        <img src="./image/rule.png">
        <img src="./image/coupons.png">
      </div>
    </div>
    <div class="bg-2 bg"></div>

    <div class="bg-3 bg">
      <div class="bg3-box boxs">
        <div class="bg3-card bg" v-for="(b, b_i) in bigDatas" :key="b_i">
          <div class="icon-box">
            <img :src="b.icon">
            <span>{{ b.name }}</span>
          </div>
          <div class="money-box">
            <i>￥</i>
            <h2>{{ b.money }}</h2>
          </div>
          <div class="progress-box">
            <i>已抢</i>
            <div class="progress">
              <i :style="{width: b.progress + '%'}"></i>
            </div>
            <i>{{ b.progress }}%</i>
          </div>
          <img class="rob" src="./image/rob.png">
        </div>
      </div>
    </div>

    <div class="bg-4 bg">
      <div class="bg4-box boxs">
        <div class="bg4-card bg" v-for="(s, s_i) in smallDatas" :key="s_i">
          <div class="icon-box">
            <img :src="s.icon">
            <span>{{ s.name }}</span>
          </div>
          <div class="money-box">
            <i>￥</i>
            <h2>{{ s.money }}</h2>
          </div>
          <div class="progress-box">
            <i>已抢</i>
            <div class="progress">
              <i :style="{width: s.progress + '%'}"></i>
            </div>
            <i>{{ s.progress }}%</i>
          </div>
          <img class="rob small-rob" :src="s.progress == 100 ? robedImg : robImg">
        </div>
      </div>
    </div>

    <div class="bg-5 bg"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import robImg from './image/rob.png';
import robedImg from './image/robed.png';

const bigDatas = ref([
  { name: '生活优惠券', icon: new URL(`./image/icon_shyh.png`, import.meta.url).href, money: '100', progress: Math.floor(Math.random() * 100) },
  { name: '生活优惠券', icon: new URL(`./image/icon_shyh.png`, import.meta.url).href, money: '50', progress: Math.floor(Math.random() * 100) },
]);
const smallDatas = ref([
  { name: '生活优惠券', icon: new URL(`./image/icon_shyh.png`, import.meta.url).href, money: '20', progress: Math.floor(Math.random() * 100) },
  { name: '生活优惠券', icon: new URL(`./image/icon_shyh.png`, import.meta.url).href, money: '5', progress: Math.floor(Math.random() * 100) },
  { name: '麦当劳点餐券', icon: new URL(`./image/icon_mdl.png`, import.meta.url).href, money: '5', progress: Math.floor(Math.random() * 100) },
  { name: '肯德基点餐券', icon: new URL(`./image/icon_kfc.png`, import.meta.url).href, money: '5', progress: Math.floor(Math.random() * 100) },
  { name: '电影订票', icon: new URL(`./image/icon_film.png`, import.meta.url).href, money: '5', progress: Math.floor(Math.random() * 100) },
  { name: '美团外卖', icon: new URL(`./image/icon_mt.png`, import.meta.url).href, money: '5', progress: 100 },
]);
</script>

<style scoped lang="scss">
@import url(./css/common.scss);
@import url(./css/index.scss);
</style>