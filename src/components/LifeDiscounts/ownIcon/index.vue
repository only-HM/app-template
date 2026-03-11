<template>
  <div class="own-icon-container" :style="{width: size}" @click="handleClick" >
    <van-badge :content="badge">
      <van-icon :name="icon" :size="setIconSize(size, sizeSC)" />
    </van-badge>
    <em>{{ name }}</em>
  </div>
</template>

<script setup>
const emit = defineEmits(['click']);
const props = defineProps({
  badge: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: '50px',
  },
  sizeSC: {
    type: Number,
    default: .6,
  },
  icon: {
    type: String,
    default: '',
    required: true,
  },
  name: {
    type: String,
    default: '未知',
    required: true,
  },
  info: {
    type: Object,
    default: {},
    required: true,
  },
});

const setIconSize = (size = '', sc = .8) => {
  return `calc(${size} * ${sc})`;
};

const handleClick = () => {
  emit('click', props.info);
};
</script>

<style lang="scss" scoped>
@import url('@/styles/common.scss');

.own-icon-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  em {
    width: 100%;
    margin-top: var(--gap);
    font-size: .8rem;
    font-style: normal;
    white-space: nowrap;

    text-align: center;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :deep(.van-badge--top-right) {
    width: max-content;
  }
}
</style>