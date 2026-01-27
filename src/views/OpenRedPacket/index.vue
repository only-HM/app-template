<template>
  <div class="container">
    <div class="bg-1 bg">
      <div class="float">
        <img src="./images/rule.png" @click="handleOverlay('rule', true)">
        <img src="./images/prize.png" @click="getPrize">
      </div>
    </div>
    <div class="bg-2 bg">
      <div class="phone-modules">
        <span>参与号码：{{ phone }}</span>
        <button>切换</button>
      </div>
    </div>
    <div class="bg-3 bg"></div>
    <div class="bg-4 bg">
      <img class="open" src="./images/open.png" @click="openRed">
    </div>

    <van-popup v-model:show="show.rule" class="my-popup">
      <div class="content">
        <div class="popup-bg bg">
          <h3 class="title">活动规则</h3>
          <ul class="tips">
            <li><em>1、活动时间：</em>即日起至红包抢完即止。</li>
            <li class="mt-dot-1"><em>2、参与条件：</em>仅限深圳电信手机用户参与(同一微信号、同一手机号均视为同一用户)，每人限参与1次。</li>
            <li class="mt-dot-1"><em>3、违规处理：</em>参与者若存在异常操作行为，则取消其中奖资格。</li>
            <li class="mt-dot-1"><em>4、奖品说明：</em>奖品为随机金额现金红包，总量10000份，先到先得；中奖红包将通过“深圳电信”公众号或微信“服务通知”发放，请于发放后24小时内完成领取，逾期未领视为自动放弃，不予补发。</li>
          </ul>
        </div>
        <div class="animation">
          <img class="gold g-1" src="./images/g_1.png" >
          <img class="gold g-2" src="./images/g_2.png" >
          <img class="gold g-3" src="./images/g_3.png" >
          <img class="gold g-4" src="./images/g_4.png" >
        </div>
        <van-icon name="close" color="white" size="2.4rem" class="my-close" @click="handleOverlay('rule', false)"/>
      </div>
    </van-popup>
    
    <van-popup v-model:show="show.myPrize" class="my-popup">
      <div class="content">
        <div class="popup-bg bg">
          <h3 class="title">恭喜获得</h3>
          <div class="prize-moduels">
            <div class="packet bg" v-if="isEmptyCode === '1'">
              <h3 class="prize-info"><i>{{ prizeInfo }}</i>元</h3>
            </div>
            <h4 v-if="isEmptyCode === '1'">参与号码：{{ phone }}</h4>
            <h4 v-if="isEmptyCode === '1'">参与时间：{{ participationTime }}</h4>
            <h4 v-if="isEmptyCode === '1'" style="color: red;font-weight: normal;margin-top: .4rem;">请前往“深圳电信”公众号领取</h4>

            <img v-if="isEmptyCode === '0'" class="empty" src="./images/empty.png" >
            <h4 v-if="isEmptyCode === '0'">还未获得奖品~</h4>
          </div>
        </div>
        <div class="animation">
          <img class="gold g-1" src="./images/g_1.png" >
          <img class="gold g-2" src="./images/g_2.png" >
          <img class="gold g-3" src="./images/g_3.png" >
          <img class="gold g-4" src="./images/g_4.png" >
        </div>
        <van-icon name="close" color="white" size="2.4rem" class="my-close" @click="handleOverlay('myPrize', false)"/>
      </div>
    </van-popup>
    
    <van-popup v-model:show="show.end" class="my-popup">
      <div class="content">
        <div class="popup-bg popup-bg-2 bg">
          <div class="end-modules">
            <h3>奖品领完啦</h3>
            <h3>下次早点来哦~</h3>
            <img class="empty-img" src="./images/empty.png">
          </div>
        </div>
        <van-icon name="close" color="white" size="2.4rem" class="my-close" @click="handleOverlay('end', false)"/>
      </div>
    </van-popup>

    <van-popup v-model:show="show.finish" class="my-popup">
      <div class="content">
        <div class="popup-bg popup-bg-2 bg">
          <div class="end-modules">
            <h3>您已经领过啦</h3>
            <h3>把机会留给其他人吧~</h3>
            <img class="check-img" src="./images/check.png" @click="handleOverlay('myPrize', true, getPrize)">
          </div>
        </div>
        <van-icon name="close" color="white" size="2.4rem" class="my-close" @click="handleOverlay('finish', false)"/>
      </div>
    </van-popup>

    <van-popup v-model:show="show.err" class="my-popup">
      <div class="content">
        <div class="popup-bg popup-bg-2 bg">
          <div class="end-modules">
            <h3>很抱歉</h3>
            <h3>您不符合本次活动参与条件哦~</h3>
            <!-- <img class="login-img" src="./images/login.png" @click="goLogin"> -->
          </div>
        </div>
        <van-icon name="close" color="white" size="2.4rem" class="my-close" @click="handleOverlay('err', false)"/>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { showLoadingToast } from 'vant';

const phone = ref('185****4571');
const participationTime = ref('2026-1-06 12:56');
const prizeInfo = ref('');
const isEmptyCode = ref('2'); // 0：空, 1：奖品, 2：未确定 defalut
const show = ref({
  rule: false,
  myPrize: false,
  end: false,
  finish: false,
  err: false,
});

const handleOverlay = (type, b = true, fn = void 0) => {
  if(!type) return console.error('是否传入type？');
  const types = ['rule', 'myPrize', 'end', 'finish', 'err'];
  const isExist = types.indexOf(type) > -1;
  if(!isExist) return console.error('检查type是否正确？');
  show.value[type] = b;
  fn && typeof fn === 'function' && fn();
};

const getPrize = () => {
  handleOverlay('myPrize', true);
  dataInit();
  const r = Math.random();
  let Toast = showLoadingToast({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  let T1 = setTimeout(()=>{
    if (r > .5) {
      // 有奖品
      prizeInfo.value = '0.38';
      isEmptyCode.value = '1';
      console.log('触发：有奖品');
    } else {
      // 没奖品
      console.log('触发：没奖品');
      isEmptyCode.value = '0';
    };
    Toast.close();
    T1 = null;
    clearTimeout(T1);
  }, 2000);
};

const dataInit = () => {
  prizeInfo.value = '';
  isEmptyCode.value = '2';
};

const goLogin = () => {
  window.location.href = 'https://www.baidu.com/';
};

const openRed = () => {
  const _list = ['end', 'finish', 'err'];
  const r = Math.floor(Math.random() * 3);
  console.log('触发：', _list[r]);
  handleOverlay(_list[r], true);
};
</script>

<style scoped lang="scss">
@import url(./css/common.scss);
@import url(./css/index.scss);
</style>