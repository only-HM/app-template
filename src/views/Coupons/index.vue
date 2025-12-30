<template>
  <div class="coupons-container">
    <div class="bg-1 bg">
      <div class="float-img">
        <img src="./image/rule.png" @click="controlPopup('rule', true)">
        <img src="./image/coupons.png" @click="controlPopup('myCoupons', true)">
      </div>
    </div>
    <div class="bg-2 bg">
      <div class="phone-modules flex-center">
        <span>参与号码：</span>
        <span>185****4571</span>
        <button>更换</button>
      </div>
    </div>

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
          <img class="rob" src="./image/rob.png" @click="controlPopup('coupons', true)">
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
          <img class="rob small-rob" :src="s.progress === 100 ? robedImg : robImg" @click="controlPopup(s.progress === 100 ?  'lose' : 'coupons', true)">
        </div>
      </div>
    </div>

    <div class="bg-5 bg"></div>

    <!-- 登录 -->
    <van-popup :show="show.login" class="my-popup">
      <div class="login-popup bg">
        <div class="content">
          <div class="input">
            <input type="text" placeholder="请输入手机号">
          </div>
          <div class="input code">
            <input type="text" placeholder="请输入校验码">
            <img src="https://shopnew.sz189.cn/wx/xcxBinding/canvasCreate" >
          </div>
          <div class="input code">
            <input type="text" placeholder="请输入验证码">
            <button>获取验证码</button>
          </div>
          <img class="sure-img" src="./image/sure.png" @click="controlPopup('login', true, login())">
        </div>
      </div>
      <div class="text-center mt-1"><van-icon name="close" color="#fff" size="2.4rem" @click="controlPopup('login', false)"/></div>
    </van-popup>

    <!-- 活动规则 -->
    <van-popup :show="show.rule" class="my-popup">
      <div class="rule-popup bg">
        <ul class="content">
          <li>1、活动期间，每个用户（同一微信号、同一手机号均视为同一用户）仅可参与一次活动；</li>
          <li>2、每周三上午10:00开启，截止到当周所有优惠券领取完毕或自然周结束；</li>
          <li>3、用户进入活动页面，点击对应券种的“立即领取” 按钮参与；</li>
          <li>4、每人每周限参与一次，每次限领一张券，同一用户不得重复参与;5、优惠券为限量发放，数量有限，先到先得，领完即止。</li>
        </ul>
      </div>
      <div class="text-center mt-1"><van-icon name="close" color="#fff" size="2.4rem" @click="controlPopup('rule', false)"/></div>
    </van-popup>

    <!-- 我的券 -->
    <van-popup :show="show.myCoupons" class="my-popup">
      <div class="mycoupons-popup bg">
        <div class="mycoupons-list">
          <div class="card bg" v-for="(m, m_i) in data.myCoupons" :key="m_i">
            <div class="produce">
              <img :src="m.iconPaht" >
              <div class="name">
                <span>{{ m.name }}</span>
                <span>{{ m.money }}元</span>
              </div>
            </div>
            <button class="check" @click="controlPopup('use', true, editDate('use', m))">查看</button>
          </div>
        </div>
        <h3 class="tips">*&nbsp;仅展示近3个月的优惠券</h3>
        <div class="back" @click="controlPopup('myCoupons', false)">返回</div>
      </div>
    </van-popup>

    <!-- 中奖 -->
    <van-popup :show="show.coupons" class="my-popup">
      <div class="coupons-popup bg">
        <div class="prize-box">
          <div class="cash">
            <h2>{{ data.coupons.money }}</h2>
            <span>元</span>
          </div>
          <div class="tips">{{ data.coupons.name }}</div>
        </div>
        <div class="sure" @click="controlPopup('coupons', false)">收下</div>
      </div>
    </van-popup>

    <!-- 很遗憾 -->
    <van-popup :show="show.lose" class="my-popup">
      <div class="lose-popup bg"></div>
      <div class="text-center mt-1"><van-icon name="close" color="#fff" size="2.4rem" @click="controlPopup('lose', false)"/></div>
    </van-popup>

    <!-- 身份错误 -->
    <van-popup :show="show.iderr" class="my-popup">
      <div class="iderr-popup bg">
        <div class="go-login" @click="controlPopup('login', true, controlPopup('iderr', false))">去登录</div>
      </div>
      <div class="iderr-close"><van-icon name="close" color="#fff" size="2.4rem" @click="controlPopup('iderr', false)"/></div>
    </van-popup>

    <!-- 已领取 -->
    <van-popup :show="show.already" class="my-popup">
      <div class="already-popup bg">
        <div class="check" @click="controlPopup('already', false, controlPopup('myCoupons', true))">查看</div>
      </div>
    </van-popup>

    <!-- 使用说明 -->
    <van-popup :show="show.use" class="my-popup">
      <div class="use-popup bg">
        <div class="content">
          <div class="label">
            <label for="">奖品名称：</label>
            <h4>{{ data.use.name }}</h4>
          </div>
          <div class="label">
            <label for="">中奖号码：</label>
            <h4>{{ data.use.phone }}</h4>
          </div>
          <div class="label">
            <label for="">中奖时间：</label>
            <h4>{{ data.use.time }}</h4>
          </div>
        </div>
        <div class="known" @click="controlPopup('use', false)">知道了</div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { showToast, showLoadingToast } from 'vant';
import robImg from './image/rob.png';
import robedImg from './image/robed.png';

const show = ref({
  login: false,
  rule: false,
  myCoupons: false,
  coupons: false,
  lose: false,
  iderr: false,
  already: false,
  use: false,
});

const data = ref({
  myCoupons: [
    {iconPaht: new URL(`./image/icon_shyh.png`, import.meta.url).href, name: '生活优惠券', money: Math.ceil(Math.random() * 100) },
    {iconPaht: new URL(`./image/icon_kfc.png`, import.meta.url).href, name: '肯德基点餐券', money: Math.ceil(Math.random() * 100) },
    {iconPaht: new URL(`./image/icon_mdl.png`, import.meta.url).href, name: '麦当劳券', money: Math.ceil(Math.random() * 100) },
  ],
  coupons: {
    name: '美团外卖代金券',
    money: '100',
  },
  use: {
    name: '生活优惠券100元',
    phone: '185****4571',
    time: '2025-12-1',
  },
});

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

/**
 * 控制弹窗
 * @param type 弹窗类型
 * @param val T or F
 * @param callback 回调
 */
const controlPopup = (type, val = true, callback = void 0) => {
  // 弹窗顺序如下
  // 登录，规则，我的券，中奖，很遗憾，身份错误，已领取
  // 定义的名字必须跟弹窗的名字一一对应
  const _type = ['login', 'rule', 'myCoupons', 'coupons', 'lose', 'iderr', 'already', 'use'];
  if(_type.indexOf(type) === -1) throw('检查弹窗类型是否填写正确？');
  show.value[type] = val;
  callback && typeof callback === 'function' && callback();
};

/**
 * 更改数据
 * @param type 
 * @param row 
 */
const editDate = (type, row) => {
  data.value[type] = Object.assign({}, data.value[type], row);
};

const login = () => {
  const loading= showLoadingToast({
    message: '登录中...',
    forbidClick: true,
    duration: 0,
  });
  setTimeout(() => {
    loading.close();
    controlPopup('login', false);
    showToast('登录成功');
  }, 2000);
};

onMounted(()=>{
  controlPopup('login', true);
  // showToast('请确保登录账号与生活优惠账号一致');
  // showToast('活动暂未开始');
});
</script>

<style scoped lang="scss">
@import url(./css/common.scss);
@import url(./css/index.scss);
</style>