<template>
  <div class="container">
    <div class="bg-1 bg">
      <div class="phone-modules">
        <span>参与号码：</span>
        <span>{{ phone }}</span>
        <button>更换</button>
      </div>

      <div class="float">
        <img src="./image/float_1.png" @click="openMyPrize">
        <img src="./image/float_2.png" @click="handleOverlay('rule', true)">
      </div>
    </div>
    <div class="bg-2 bg"></div>
    <div class="bg-3 bg">
      <img class="draw" src="./image/draw.png" @click="preDraw">
    </div>
    <div class="bg-4 bg"></div>

    <van-popup :show="show.rule" class="my-popup">
      <div class="rule-modules bg">
        <ul class="content">
          <li class="text-bold">一、活动时间</li>
          <li>即日起，至奖品派完即止；（活动限每周三开放）</li>
          <li class="text-bold">二、活动对象</li>
          <li>仅限每周三完成积分兑换的用户方可参与。点击活动页面“幸运抽奖”按钮，即可参与；</li>
          <li class="text-bold">三、资格说明</li>
          <li>(1)深圳电信手机用户（同一微信号、同一手机号均视为同一用户）仅限参与一次，不可重复参与；</li>
          <li>(2)如发现参与者存在违规行为，将取消领取红包资格。</li>
          <li class="text-bold">四、奖品说明</li>
          <li>(1)奖品数量有限，限时抽奖派发，先到先得，派完即止；</li>
          <li>(2)活动奖品类型:现金红包，红包金额随机；</li>
          <li>(3)红包通过“深圳电信”公众号或微信“服务通知”发放，请在发送后24小时内领取，过期视为放弃领奖，不做补送。</li>
        </ul>
        <button @click="handleOverlay('rule', false)">知道了</button>
      </div>
    </van-popup>

    <van-popup :show="show.myPrize" class="my-popup">
      <div class="myPrize-modules bg">
        <div class="prizes-box">
          <div class="list">
            <div v-for="(p, p_i) in prizeData" :key="p_i" class="card bg" :class="{'thank-card': p.isThank}">
              <div class="content">
                <div class="t">
                  <div class="l">
                    <template v-if="!p.isThank">
                      <i>{{ p.money }}</i><i>元</i>
                    </template>
                    <template v-else>
                      <i>谢谢参与</i>
                    </template>
                  </div>
                  <div class="r" v-if="!p.isThank">现金红包</div>
                </div>
                <div class="b">参与时间：{{ p.time }}</div>
              </div>
            </div>
          </div>
          <h3>仅展示最近三个月</h3>
          <h3>参与号码：{{ phone }}</h3>
        </div>
        <button @click="handleOverlay('myPrize', false, () => prizeData = [])">返回</button>
      </div>
    </van-popup>

    <van-overlay :show="show.dynamic">
      <div class="dynamic-modules overlay-modules">
        <Rotate ref="rotateRef" @get="rotateGet"/>
      </div>
    </van-overlay>

    <van-overlay :show="show.tips">
      <div class="tips-modules overlay-modules">
        <img v-if="!tipsImg.includes('p_exchange')" :src="tipsImg" >
        <div v-else class="exchange bg">
          <button @click="toExchange">前往积分商场</button>
        </div>
        <van-icon name="close" color="#ffffff" size="2.2rem" @click="handleOverlay('tips', false, () => tipsImg = '')"/>
      </div>
    </van-overlay>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { showLoadingToast, closeToast, showToast } from 'vant';
import Rotate from '@/views/LuckyDraw/rotate.vue';

const rotateRef = ref(null);
const tipsImg = ref('');
const phone = ref('185****4571');
const show = ref({
  rule: false,
  myPrize: false,
  dynamic: false,
  tips: false,
});
const prizeData = ref([]);

/**
 * 准备抽奖
 */
const preDraw = () => {
  showLoadingToast({
    message: '准备中...',
    forbidClick: true,
    duration: 0,
  });

  // 模拟fetch，2s后返回
  let T = setTimeout(() => {
    clearTimeout(T);
    T = null;
    closeToast();
    // 以下为可执行的 弹窗 或者 动效
    const list = ['p_88', 'p_68', 'p_8', 'p_1d08', 'p_d88', 'p_d38', 'p_thank', 'p_exchange', 'p_finish', 'p_notBegin'];
    const r = Math.floor(Math.random() * list.length);
    console.log('随机抽取弹窗或动效：', list[r]);
    handleOverlay('dynamic', true, handleRotate(list[r]));
    // handleOverlay('dynamic', true, handleRotate('p_exchange')); // *积分兑换
    // handleOverlay('dynamic', true, handleRotate('p_thank')); // *谢谢参与
  }, 2000);
};

/**
 * 控制遮罩层弹窗
 * @param type 弹窗类型 
 * @param b 展开 or 关闭
 * @param fn 回调
 */
const handleOverlay = (type = '', b = true, fn = void 0) => {
  if(!type) return console.error('是否传入type？');
  const types = ['rule', 'myPrize', 'dynamic', 'tips'];
  const isExist = types.indexOf(type) > -1;
  if(!isExist) return console.error('检查type是否正确？');
  if(fn && typeof fn === 'string') {
    tipsImg.value = new URL(`./image/${fn}.png`, import.meta.url).href;
    handleOverlay('tips', true);
    return;
  };
  show.value[type] = b;
  fn && typeof fn === 'function' && fn();
};

const handleRotate = (wn = '') => {
  // 返回字符串阻挡遮罩层继续工作
  // ['谢谢参与', '积分兑换', '已经参与过了', '抱歉，活动未开始']
  const exclude = ['p_thank', 'p_exchange', 'p_finish', 'p_notBegin']; 
  const i = exclude.indexOf(wn);
  if(i >= 0){
    return wn;
  };
  new Promise(resolve => resolve(wn)).then((res)=>{
    rotateRef.value && rotateRef.value.move(res);
  });
};

const rotateGet = (b) => {
  if(!b) return;
  showLoadingToast({
    message: '领取中...',
    forbidClick: true,
    duration: 0,
  });

  // 模拟fetch，2s后返回
  let T = setTimeout(() => {
    clearTimeout(T);
    T = null;
    closeToast();
    rotateRef.value && rotateRef.value.init(); // 调完接口初始化一下特效页面
    handleOverlay('dynamic', false);
    showToast('领取成功！');
  }, 2000);
};

const openMyPrize = () => {
  handleOverlay('myPrize', true);
  showLoadingToast({
    message: '获取数据中...',
    forbidClick: true,
    duration: 0,
  });
  // 模拟fetch, 1s后加入奖品数据
  let T = setTimeout(() => {
    clearTimeout(T);
    T = null;
    closeToast();
    const data = [
      { money: Math.ceil(Math.random() * 100), time: '2025-12-25 14:00:00', isThank: false },
      { money: Math.ceil(Math.random() * 100), time: '2025-12-25 14:00:00', isThank: false },
      { money: Math.ceil(Math.random() * 100), time: '2025-12-25 14:00:00', isThank: false },
      { money: 0.38, time: '2025-12-25 14:00:00', isThank: false },
      { money: 0, time: '2025-12-25 14:00:00', isThank: true },
    ];
    prizeData.value = [...data];
  }, 1000);
};

const toExchange = () => {
  window.location.href = 'https://shop.sz189.cn/jfsc/shop/menu?menuType=0';
};
</script>

<style scoped lang="scss">
@import url(./css/common.scss);
@import url(./css/index.scss);
</style>