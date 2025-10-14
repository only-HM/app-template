<template>
  <div class="super-wednesday-home">
    <div class="bg-1 bg">
      <div class="float">
        <img src="./images/rule.png">
        <!-- <img src="./images/ranking.png"> -->
      </div>
    </div>
    <div class="bg-2 bg">
      <img class="lucky" src="./images/lucky.png" @click="openPage('ndj')">
    </div>
    <div class="bg-3 bg">
      <div class="game-btn">
        <img src="./images/build.png" @click="openPage('dgl')">
        <img src="./images/jump.png" @click="openPage('tyt')">
      </div>
    </div>
    <div class="bg-4 bg">
      <div class="cash-btn">
        <img src="./images/save.png" @click="showSave = true">
        <img src="./images/shop.png" @click="openPage('shop')">
      </div>
    </div>

    <van-popup class="sign-container" v-model:show="showSave" position="bottom" :style="{ maxHeight: '100%' }">
      <div class="bg-5 bg">
        <img class="sign-close" src="./images/close.png" @click="showSave = false">
        <div class="grade-boxs">
          <i class="grade">{{ grade }}</i>
          <img class="prize-btn" src="./images/prize.png">
        </div>
        <div class="sign-content">
          <div class="sign-tips">
            <div class="text">
              <h2>已连续签到<i>1</i>天</h2>
              <h4>连续签到7天可额外获得<i>6</i>个星愿值</h4>
            </div>
            <img class="sign-btn" src="./images/sign.png">
          </div>
          <div class="sign-steps">
            <div v-for="(sign, s_i) in signDay" :key="s_i" class="step" :class="{'first': s_i === 0, 'last': s_i === (signDay.length - 1), 'finish':  sign.isSign}">
              <img v-if="!sign.isSign" src="./images/star.png">
              <img v-else src="./images/star_gray.png">
              <div class="line-dot">
                <i class="dots"></i>
              </div>
              <span class="text">{{ sign.isSign ? '已领' : sign.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const showSave = ref(false);
const grade = ref(37);
const signDay = ref([
  { name: '第1天', isSign: true },
  { name: '第2天', isSign: true },
  { name: '第3天', isSign: true },
  { name: '第4天', isSign: true },
  { name: '第5天', isSign: false },
  { name: '第6天', isSign: false },
  { name: '第7天', isSign: false },
]);

const openPage = (page) => {
  debugger
  let pageName = '';
  switch(page) {
    case 'dgl':
      pageName = 'Dgl';
      break;
    case 'tyt':
      pageName = 'Tyt';
      break;
    case 'ndj':
      pageName = 'Ndj';
      break;
    case 'shop':
      pageName = 'Shop';
      break;
  };
  router.push({
    name: pageName,
    query: { id: 9999 },
  });
};
</script>

<style scoped lang="scss">
@import url(./css/common.scss);
@import url(./css/index.scss);
</style>