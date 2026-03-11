<template>
  <div class="container">
    <van-swipe class="banner" :autoplay="3000" indicator-color="white">
      <van-swipe-item class="self bg" v-for="(b, b_i) in banners" :key="b_i" @click="openBanner(b)">
        <img class="fit" :src="b.banner">
      </van-swipe-item>
    </van-swipe>

    <van-row class="navs">
      <van-col span="6" class="self flex-center flex-column" v-for="(n, n_i) in navs" :key="n_i">
        <van-icon :name="n.icon" size="2.6rem"/>
        <i class="mt-dot-5">{{ n.name }}</i>
      </van-col>
    </van-row>

    <div class="announcement">
      <van-notice-bar left-icon="volume-o" :scrollable="false" background="rgb(254, 134, 44)" color="#fff">
        <template #right-icon>
          <i class="announcement-icon">&gt;</i>
        </template>
        <van-swipe
          vertical
          class="notice-swipe"
          :autoplay="3000"
          :touchable="false"
          :show-indicators="false"
        >
          <van-swipe-item>公告：中国电信个人信息保护政策</van-swipe-item>
          <van-swipe-item>仙人抚我顶，结发受长生。</van-swipe-item>
          <van-swipe-item>今人不见古时月，今月曾经照古人。</van-swipe-item>
        </van-swipe>
      </van-notice-bar>
    </div>

    <div class="modules first-modules">
      <div class="title">
        <div>
          <h2>{{ data.shyh.title }}</h2>
        </div>
        <i class="more">更多推荐&nbsp;&gt;</i>
      </div>
      <div class="cards">
        <div class="self" v-for="(l, l_i) in data.shyh.list" :key="l_i">
          <div class="goods flex-center">
            <img :src="l.goods">
          </div>
          <h4 class="name">{{ l.name }}</h4>
          <div class="money-box">
            <div class="l">
              <span>￥</span>
              <span>{{ l.preferentialPrice }}</span>
            </div>
            <div class="r">
              <span>￥</span>
              <span>{{ l.originalPrice }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modules">
      <div class="title">
        <div>
          <h2>{{ data.cxqy.title }}</h2>
        </div>
        <i class="more">更多推荐&nbsp;&gt;</i>
      </div>
      <div class="cards">
        <div class="self" v-for="(l, l_i) in data.cxqy.list" :key="l_i">
          <div class="goods flex-center">
            <img :src="l.goods">
          </div>
          <h4 class="name">{{ l.name }}</h4>
          <h4 class="name tip">{{ l.tip }}</h4>
          <div class="money-box">
            <div class="l">
              <span>￥</span>
              <span>{{ l.preferentialPrice }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modules integral">
      <div class="title">
        <div>
          <h2>{{ data.jfsc.title }}</h2>
        </div>
        <i class="more">更多推荐&nbsp;&gt;</i>
      </div>
      <div class="cards">
        <div class="self" v-for="(l, l_i) in data.jfsc.list" :key="l_i">
          <div class="goods flex-center">
            <img :src="l.goods">
          </div>
          <h4 class="name">{{ l.name }}</h4>
          <h4 class="name gray jf"><em>积分</em><span>{{ l.integral }}</span></h4>
        </div>
      </div>
    </div>

    <div class="modules cjxqs">
      <div class="title">
        <div>
          <h2>{{ data.cjxqs.title }}</h2>
        </div>
      </div>
      <div class="img-box bg">
        <img class="go" src="./image/new/go.png" >
      </div>
    </div>
  </div>
</template>

<script setup>
import { showToast } from 'vant';

const banners = [
  { banner: new URL('./image/new/banner.png', import.meta.url).href, target: 'https://www.baidu.com/' },
  { banner: new URL('./image/new/banner.png', import.meta.url).href, target: 'https://www.baidu.com/' },
  { banner: new URL('./image/new/banner.png', import.meta.url).href, target: 'https://www.baidu.com/' },
];

const navs = [
  { icon: new URL('./image/new/icon_shyh.png', import.meta.url).href, name: '生活优惠' },
  { icon: new URL('./image/new/icon_cxqy.png', import.meta.url).href, name: '畅享权益' },
  { icon: new URL('./image/new/icon_jfsc.png', import.meta.url).href, name: '积分商城' },
  { icon: new URL('./image/new/icon_cjxqs.png', import.meta.url).href, name: '超级星期三' },
];

const data = {
  shyh: {
    icon: new URL('./image/icon_rubber.png', import.meta.url).href,
    title: '生活优惠',
    list: [
      { goods: new URL('./image/new/tmcs.png', import.meta.url).href, name: '50元天猫超市享淘卡', preferentialPrice: '49.00', originalPrice: '50.00' },
      { goods: new URL('./image/new/dd.png', import.meta.url).href, name: '10元滴滴快车代金券', preferentialPrice: '9.5', originalPrice: '10.00' },
      { goods: new URL('./image/new/mt.png', import.meta.url).href, name: '10元美团外卖红包', preferentialPrice: '7.9', originalPrice: '10.00' },
    ], 
  },
  cxqy: {
    icon: new URL('./image/icon_star.png', import.meta.url).href,
    title: '畅享权益',
    list: [
      { goods: new URL('./image/new/dhq.png', import.meta.url).href, name: '5GB+茶饮零食权益', preferentialPrice: '20.00', tip: '上新！最高领40元券' },
      { goods: new URL('./image/new/tyzl.png', import.meta.url).href, name: '5GB+视频彩铃+热门会员', preferentialPrice: '25.9', tip: '买一享三' },
      { goods: new URL('./image/new/hyll.png', import.meta.url).href, name: '会员任选+10GB流量', preferentialPrice: '9.9', tip: '宠粉 | 周三限时抢' },
    ], 
  },
  jfsc: {
    icon: new URL('./image/icon_shop.png', import.meta.url).href,
    title: '积分商场',
    list: [
      { goods: new URL('./image/new/dyq.png', import.meta.url).href, name: '院线通电影券', integral: '5000' },
      { goods: new URL('./image/new/mgyk.png', import.meta.url).href, name: '芒果TV会员月卡', integral: '3000' },
      { goods: new URL('./image/new/llb.png', import.meta.url).href, name: '5GB流量(月包)', integral: '2000' },
    ], 
  },
  cjxqs: {
    icon: new URL('./image/icon_gift.png', import.meta.url).href,
    title: '超级星期三',
  },
};

const openBanner = (row) => {
  showToast(row.target);
};
</script>

<style scoped lang="scss">
@import url(./css/common.scss);
@import url(./css/index2.scss);
</style>