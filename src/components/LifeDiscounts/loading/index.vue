<template>
  <van-overlay :show="loading" @click="show = false" :style="{ 'z-index': isFull && 99999 }">
    <van-loading :type="iconType" :color="color" :size="size"/>
  </van-overlay>
</template>

<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  isFull: {
    type: Boolean,
    default: true,
  },
  iconType: {
    type: String,
    default: 'spinner',
  },
  color: {
    type: String,
    default: '#c8e5ff',
  },
  size: {
    type: String,
    default: '50px',
  },
});
</script>

<style scoped lang="scss">
.van-overlay {
  background: rgb(0, 0, 0, .3);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>