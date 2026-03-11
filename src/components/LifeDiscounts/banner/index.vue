<template>
  <div class="banner-container">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(b, b_i) in banners" :key="b_i" @click="clik_b(b)">
        <div class='bammer-img'>
          <img class="fit" :src="b.b_url" >
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup>
const emit = defineEmits(['click']);
const props = defineProps({
  banners: {
    type: Array,
    default: [],
    required: true,
  },
});

const clik_b = (b) => {
  emit('click', b);
};
</script>

<style scoped lang="scss">
@import url('@/styles/common.scss');

.banner-container {
  --banner-width: 100%;
  --banner-height: calc(260 / 750 * var(--life-discounts-box-width));

  width: var(--banner-width);
  margin: 0 auto;

  .my-swipe .van-swipe-item {

    .bammer-img {
      width: var(--banner-width);
      height: var(--banner-height);
      border-radius: var(--border-radius);
      overflow: hidden;
    }
  }
}
</style>