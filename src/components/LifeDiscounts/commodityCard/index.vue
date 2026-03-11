<template>
  <div class="commodity-card-container" @click="handleClick">
    <div class="img-box">
      <img class="fit" :src="commodityUrl" >
    </div>
    <h3 class="name mtpx-6">{{ name }}</h3>
    <div class="money-box mtpx-6">
      <div class="l">&yen;{{ currentPrice }}</div>
      <div class="r mlpx-6">&yen;{{ originalPrice }}</div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['click']);
const props = defineProps({
  width: {
    type: String,
    default: '30vw',
  },
  name: {
    type: String,
    default: '未知',
  },
  commodityUrl: {
    type: String,
    default: '',
  },
  currentPrice: {
    type: String,
    default: '0.00',
  },
  originalPrice: {
    type: String,
    default: '0.00',
  },
  info: {
    type: Object,
    default: {},
    required: true,
  },
});

const handleClick = () => {
  emit('click', props.info);
};
</script>

<style lang="scss" scoped>
@import url('@/styles/common.scss');

.commodity-card-container{
  width: v-bind(width);

  .img-box {
    width: v-bind(width);
    height: calc(186 / 216 * v-bind(width));
    border-radius: .6rem;
    overflow: hidden;
  }

  h3.name {
    color: #333;
    height: 2.6rem;
    font-size: .8rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .money-box {
    display: flex;
    align-items: flex-end;

    .l {
      font-size: 1rem;
      font-weight: bold;
      color: #ee0a24;
    }

    .r {
      font-size: .8rem;
      color: #9a9a99;
      text-decoration: line-through;
    }
  }
}
</style>