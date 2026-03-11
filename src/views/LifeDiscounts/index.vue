<template>
  <div class="life-discounts-container">
    <div class="app-enter">
      <Home v-if="tabbarItem === 0" />
      <Classify v-if="tabbarItem === 1"/>
      <Mine v-if="tabbarItem === 3" />
    </div>

    <van-tabbar v-model="tabbarItem" placeholder class="my-tabbar" inactive-color="#333" active-color="#ed3b3b" @change="handleTabbarChange">
      <van-tabbar-item icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item icon="service-o">客服</van-tabbar-item>
      <van-tabbar-item icon="contact-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { showLoadingToast } from 'vant';

import Home from '@/views/LifeDiscounts/module/Home/index.vue';
import Classify from '@/views/LifeDiscounts/module/Classify/index.vue';
import Mine from '@/views/LifeDiscounts/module/Mine/index.vue';

const tabbarItem = ref(0);
const handleTabbarChange = (val) => {
  if(val === 2) {
    showLoadingToast({
      message: '跳转中...',
      forbidClick: true,
      onClose: function() {
        console.log('执行跳转');
      },
    });
    return;
  };
};
</script>

<style scoped lang="scss">
@import url('@/styles/common.scss');
@import url('./css/index.scss');
</style>