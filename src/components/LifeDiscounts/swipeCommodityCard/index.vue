<template>
  <div class="swipe-commodity-card-container">
    <van-swipe class="swipe-card-box" :autoplay="200000" indicator-color="#fb6866">
      <van-swipe-item v-for="(c, c_i) in commoditys" :key="c_i">
        <div class="commodity-card-page flex">
          <CommodityCard class="alone-card" v-for="(u, u_i) in c" :key="u_i" :info="u" :name="u.name" :currentPrice="u.currentPrice" :originalPrice="u.originalPrice" :commodityUrl="u.commodityUrl" @click="clickCommodityCardResult" />
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup>
import CommodityCard from '@/components/LifeDiscounts/commodityCard/index.vue';

const emit = defineEmits(['click']);
const props = defineProps({
  commoditys: {
    type: Array,
    default: [],
  },
});

const clickCommodityCardResult = (info) => {
  emit('click', info);
};
</script>

<style lang="scss" scoped>
@import url('@/styles/common.scss');

.swipe-card-box {
  height: 13rem;

  :deep(.van-swipe__indicator) {
    background-color: rgb(251, 104, 102);
  }
}

.commodity-card-page {
  flex-wrap: wrap;

  .alone-card {
    margin-right: 1.7vw;

    &.alone-card:last-child {
      margin-right: 0;
    }
  }
}
</style>