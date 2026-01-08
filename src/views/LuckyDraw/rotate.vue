<template>
  <div class="rotate-container">
    <div v-if="!isPrizesAppear" class="scene-3d" :class="{'animation': !isRotate}">
      <div class="box">
        <div v-for="(c, c_i) in cards" :key="c_i" class="card" :style="{'--i': c_i}">
          {{ c_i }}
          <img :src="c.url" >
        </div>
      </div>
    </div>
    <div v-else class="animate-modules">
      <div class="my-animate animate__animated animate__zoomInDown">
        <div class="prize bg" :style="{'background-image': `url(${winImgUrl})`}">
          <button @click="handleGet">立即领取</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import 'animate.css';

const emit = defineEmits(['get']);

const winImgUrl = ref('');
const delay = '3s';
const isRotate = ref(false);
const isPrizesAppear = ref(false);
const cards = ref([
  { name: 'p_88', url: new URL("./image/c_88.png", import.meta.url).href, winUrk: ref(new URL("./image/p_88.png", import.meta.url).href) },
  { name: 'p_68', url: new URL("./image/c_68.png", import.meta.url).href, winUrk: ref(new URL("./image/p_68.png", import.meta.url).href) },
  { name: 'p_8', url: new URL("./image/c_8.png", import.meta.url).href, winUrk: ref(new URL("./image/p_8.png", import.meta.url).href) },
  { name: 'p_d88', url: new URL("./image/c_d88.png", import.meta.url).href, winUrk: ref(new URL("./image/p_d88.png", import.meta.url).href) },
  { name: 'p_d38', url: new URL("./image/c_d38.png", import.meta.url).href, winUrk: ref(new URL("./image/p_d38.png", import.meta.url).href) },
  { name: 'p_thank', url: new URL("./image/c_thank.png", import.meta.url).href, winUrk: ref(new URL("./image/p_thank.png", import.meta.url).href) },
]);
const sortCards = (wn = '') => {
  if(!wn) return console.error('是否填入了得奖信息？');
  const i = cards.value.findIndex(c => c.name === wn);
  if(i < 0) return console.error('请确保填入的得奖信息一一对应!');
  winImgUrl.value = cards.value[i].winUrk;
  const _f = cards.value.filter((c, c_i) => c_i !== i);
  const _s = cards.value.splice(i, 1);
  cards.value = [..._s, ..._f];
};

/**
 * @param wn 得奖的卡片 ['p_88', 'p_68', 'p_8', 'p_d88', 'p_d38']
 */
const move = (wn = '') => {
  const exam = ['p_88', 'p_68', 'p_8', 'p_d88', 'p_d38'];
  if(exam.indexOf(wn) < 0) return console.error('检查传入的得奖信息是否存在');
  sortCards(wn);
  let T1 = setTimeout(() => {
    isRotate.value = true;
    clearTimeout(T1);
    T1 = null;
    let T2 = setTimeout(() => {
      isPrizesAppear.value = true;
      clearTimeout(T2);
      T2 = null;
    }, delay.split('')[0] * 1000 + 50);
  }, 50)
};

const handleGet = () => {
  emit('get', true);
};

const init = () => {
  isRotate.value = false;
  isPrizesAppear.value = false;
  winImgUrl.value = '';
  cards.value = [
    { name: 'p_88', url: new URL("./image/c_88.png", import.meta.url).href, winUrk: ref(new URL("./image/p_88.png", import.meta.url).href) },
    { name: 'p_68', url: new URL("./image/c_68.png", import.meta.url).href, winUrk: ref(new URL("./image/p_68.png", import.meta.url).href) },
    { name: 'p_8', url: new URL("./image/c_8.png", import.meta.url).href, winUrk: ref(new URL("./image/p_8.png", import.meta.url).href) },
    { name: 'p_d88', url: new URL("./image/c_d88.png", import.meta.url).href, winUrk: ref(new URL("./image/p_d88.png", import.meta.url).href) },
    { name: 'p_d38', url: new URL("./image/c_d38.png", import.meta.url).href, winUrk: ref(new URL("./image/p_d38.png", import.meta.url).href) },
    { name: 'p_thank', url: new URL("./image/c_thank.png", import.meta.url).href, winUrk: ref(new URL("./image/p_thank.png", import.meta.url).href) },
  ];
};

defineExpose({
  move,
  init,
});
</script>

<style scoped lang="scss">
@import url(./css/common.scss);
$sceneW: 50vw;
$sceneH: calc($sceneW / 3);

.scene-3d {
  width: $sceneW;
  height: $sceneH;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  perspective: calc($sceneW  * 4);
}

.scene-3d .box {
  width: $sceneW;
  height: $sceneH;
  background-color: transparent;
  transition: all ease v-bind(delay);
  transform-style: preserve-3d;
}

.scene-3d.animation .box {
  transform: rotateY(calc(-360deg * 6));
}

.box .card {
  $cardW: calc($sceneW / 1.4);
  $cardH: calc($sceneW / 1.4);
  width: $cardW;
  height: $cardH;
  background-color: transparent;
  position: absolute;
  bottom: 0%;
  left: 50%;
  margin-left: calc($cardW / 2 * -1);
  transform: rotateY(calc(var(--i) * 60deg)) translateZ($sceneW);
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 0;
  box-sizing: border-box;

  img {
    width: 80%;
  }
}

.animate-modules {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .my-animate {
    border-radius: 12px;
    overflow: auto;

    .prize {
      $prizeW: 90vw;
      width: $prizeW;
      height: calc(726 / 725 * $prizeW);
      // background-image: url(./image/p_68.png);

      button {
        width: 42%;
        height: 16%;
        color: white;
        background-color: red;
        opacity: 0;
        position: absolute;
        bottom: 8%;
        left: 29%;
      }
    }
  }
}
</style>