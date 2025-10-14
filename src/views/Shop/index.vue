<template>
  <div class="shop-container">
    <img class="w-100 absolute bg-1" src="./images/bg_1.png">
    <img class="w-100 absolute bg-2" src="./images/bg_2.png">
    <img class="w-100 absolute bg-3" src="./images/bg_3.png">
    <img class="w-100 absolute bg-4" src="./images/bg_4.png">

    <div class="content">
      <div class="info">
        <h2 class="title">星乐园</h2>
        <div class="star">
          <h4>星愿值</h4>
          <h2>680</h2>
          <button class="record" @click="openPopup('record')">兑换记录&nbsp;&nbsp;&gt;&gt;</button>
        </div>
        <div class="float">
          <img src="./images/prize.png" @click="openPopup('coinSuccess')">
          <img src="./images/rule.png" @click="openPopup('rule')">
        </div>
      </div>

      <div class="data">
        <div class="boxs">
          <h4>热门活动</h4>
          <div class="full">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
              <van-swipe-item v-for="(banner, b_i) in 5" :key="b_i">
                <img class="fit" src="./images/banner.png">
              </van-swipe-item>
            </van-swipe>
          </div>
        </div>

        <div class="boxs">
          <h4>星愿兑好礼</h4>
          <div class="full cards">
            <div class="card" v-for="(c, c_i) in list" :key="c_i">
              <div class="show">
                <h3>{{ c.name }}</h3>
                <div class="prize-img">
                  <img :src="c.imgPath">
                </div>
              </div>
              <div class="coin">
                <h3 class="t">{{ c.title }}</h3>
                <div class="b">
                  <span><i>{{ c.starVal }}</i>星愿值</span>
                  <button class="exist" v-if="c.isExist" @click="handleCoin(c)">兑换&nbsp;&nbsp;&gt;</button>
                  <button v-else @click="handleCoin(c)">已兑完</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 规则 -->
    <van-popup class="rule-popup my-popup" v-model:show="showRule">
      <div class="bg-popup bg">
        <van-icon name="close" color="#ffffff" size="2rem" @click="handleClose"></van-icon>
        <ul>
          <li class="text-bold">一、星值兑换礼品</li>
          <li class="mt-2">(1)用户账户内的星值可用于在星乐园直接兑换相应礼品，包括优惠券、实物商品等。</li>
          <li class="mt-2">(2)星乐园将不定期更新提供更多礼品商品，兑完为止。</li>
          <li class="text-bold mt-4">二、星值使用规则:</li>
          <li class="mt-2">(1)兑换过程中不找零、不兑现、不开发票、不可转移至其他账户。</li>
          <li class="mt-2">(2)使用星星进行兑换，兑换申请一经提交，一律不能取消。</li>
          <li class="mt-2">(3)兑换的商品不支持退货退款以及返还星愿值，兑换时请务必仔细确认商品。</li>
        </ul>
      </div>
    </van-popup>

    <!-- 兑换记录 -->
    <van-popup class="record-popup my-popup" v-model:show="showRecord" position="bottom" :style="{ height: '100vh', background: 'linear-gradient(to right, rgb(138, 202, 249), rgb(110, 189, 251), rgb(138, 202, 249))' }">
      <img class="w-100" src="./images/record-popup.png">
      <button class="record-bakc" @click="handleClose">返回</button>
      <div class="record-content">
        <div class="every" v-for="(e, e_i) in 20" :key="e_i">
          <div class="l">
            <h4>兑换爱奇艺视频会员</h4>
            <span>有效期至：2024.12.30</span>
          </div>
          <div class="r">
            <span>-150</span>
            <img class="gold" src="./images/gold.png">
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 二维码 -->
    <van-popup class="qrcode-popup my-popup" v-model:show="showQrcode">
      <div class="bg-popup bg">
        <div class="content-popup">
          <h2>长按识别</h2>
          <h2>成为<i>深圳电信粉丝</i></h2>
          <img class="qrcode" src="./images/qrcode.png">
          <button class="orange" @click="handleClose">返回</button>
        </div>
      </div>
    </van-popup>

    <!-- 兑换 -->
    <van-popup class="coin-popup my-popup" v-model:show="showCoin">
      <div class="bg-popup bg">
        <div class="content-popup">
          <h2>确认消耗<i>1500</i>星星值</h2>
          <h2>兑换下方礼品吗？</h2>
          <div class="icon">
            <img class="w-100" src="./images/prize_txsp.png">
          </div>
          <h2 class="text-black">腾讯视频会员周卡</h2>
          <div class="btns">
            <button class="orange" @click="handleClose">再想想</button>
            <button class="blue" @click="openPopup('coinSuccess')">确认</button>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 兑换成功 -->
    <van-popup class="coin-popup my-popup" v-model:show="showCoinSuccess">
      <div class="bg-popup bg">
        <div class="content-popup">
          <h2 class="success-tip">兑换成功</h2>
          <div class="icon">
            <img class="w-100" src="./images/prize_txsp.png">
          </div>
          <h2 class="text-black">本次兑换权益为</h2>
          <h2 class="text-orange">腾讯视频会员周卡</h2>
          <div class="btns">
            <button class="orange" @click="handleClose">返回</button>
            <button class="blue" @click="handleClose">前往查看</button>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 兑换失败 -->
    <van-popup class="coin-popup my-popup" v-model:show="showCoinFail">
      <div class="bg-popup bg">
        <div class="content-popup">
          <h2 class="fail-tip">
            <img src="./images/star.png">
            <span>不够了</span>
          </h2>
          <h2 class="text-orange place-tips-1">去玩游戏、</h2>
          <h2 class="text-orange place-tips-2">做任务赚星愿值吧</h2>
          <div class="btns">
            <button class="orange" @click="handleClose">返回</button>
            <button class="blue" @click="handleClose">前往查看</button>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import { showToast } from 'vant';

const showRule = ref(false);
const showRecord = ref(false);
const showQrcode = ref(false);
const showCoin = ref(false);
const showCoinSuccess = ref(false);
const showCoinFail = ref(false);

const list = ref([
  { name: '《三只小猪》剧场票', imgPath: new URL("./images/prize_szxz.png", import.meta.url).href, title: '《三只小猪》剧场票', starVal: Math.ceil(Math.random() * 2000), isExist: true },
  { name: '爱奇艺视频', imgPath: new URL("./images/prize_aqy.png", import.meta.url).href, title: '爱奇艺会员月卡', starVal: Math.ceil(Math.random() * 2000), isExist: true },
  { name: '腾讯视频', imgPath: new URL("./images/prize_txsp.png", import.meta.url).href, title: '腾讯视频周卡', starVal: Math.ceil(Math.random() * 2000), isExist: false },
]);

const handleClose = () => {
  showRule.value = false;
  showRecord.value = false;
  showQrcode.value = false;
  showCoin.value = false;
  showCoinSuccess.value = false;
  showCoinFail.value = false;
};

const openPopup = (val) => {
  handleClose();
  switch(val) {
    case 'rule':
      showRule.value = true;
      break;
    case 'record':
      showRecord.value = true;
      break;
    case 'qrcode':
      showQrcode.value = true;
      break;
    case 'coin':
      showCoin.value = true;
      break;
    case 'coinSuccess':
      showCoinSuccess.value = true;
      break;
    case 'coinFail':
      showCoinFail.value = true;
      break;
  };
};

const handleCoin = (row) => {
  if(!row.isExist) return showToast('好礼已兑完~');
  openPopup('coin');
};
</script>

<style scoped lang="scss">
@import url(./css/common.scss);
@import url(./css/index.scss);
</style>