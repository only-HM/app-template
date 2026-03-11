<template>
  <div class="place-boxs-container">
    <van-divider v-if="type === 'line'" class="my-divider" />
    <van-divider v-if="type === 'pacle'" class="my-divider my-placeholder" />
    <img v-if="type === 'img'" class="place-img" :src="imgPath || defaultImgPath" :style="{ width: width }"/>
  </div>
</template>

<script setup>
const defaultImgPath = new URL(`@/assets/LifeDiscounts/recommend.png`, import.meta.url).href;

const props = defineProps({
  type: {
    type: String,
    default: 'line',
  },
  width: {
    type: String,
    default: '80%',
  },
  imgPath: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
@import url('@/styles/common.scss');

.my-divider {
  height: 1px;
  margin-top: calc(var(--gap) * 2);
  margin-bottom: calc(var(--gap) * 2);
  background-color: #e9e9e9;

  &.my-placeholder {
    margin-top: var(--gap);
    margin-bottom: var(--gap);
    background-color: transparent;
  }
}

.place-img {
  margin: calc(var(--gap) * 3) auto;
}
</style>