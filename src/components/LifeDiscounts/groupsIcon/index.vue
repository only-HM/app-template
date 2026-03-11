<template>
  <div class="groups-icon-container">
    <h3 v-if="title" class="title" :style="{ color: titleColor }">{{ title }}</h3>
    <div class="icons" :class="{ 'icons-3': lineCount === 3, 'icons-4': lineCount === 4, 'icons-5': lineCount === 5 }">
      <template v-if="lineCount === 3">
        <OwnIcon class="icon-line-3" v-for="(i, i_i) in icons" :key="i_i" :icon="i.icon" :badge="i.mark" size="20vw" :sizeSC=".6" :name="i.name" :info="i" @click="clickOwnIconResult" />
      </template>
      <template v-if="lineCount === 4">
        <OwnIcon v-for="(i, i_i) in icons" :key="i_i" :icon="i.icon" size="20vw" :sizeSC=".6" :name="i.name" :info="i" @click="clickOwnIconResult" />
      </template>
      <template v-if="lineCount === 5">
        <OwnIcon class="icon-line-5" v-for="(i, i_i) in icons" :key="i_i" :icon="i.icon" :badge="i.mark" size="16vw" :sizeSC=".6" :name="i.name" :info="i" @click="clickOwnIconResult" />
      </template>
    </div>
    <PlaceBoxs v-if="isDivider" type="line" />
  </div>
</template>

<script setup>
import OwnIcon from '@/components/LifeDiscounts/ownIcon/index.vue';
import PlaceBoxs from '@/components/LifeDiscounts/placeBoxs/index.vue';

const emit = defineEmits(['click']);
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  titleColor: {
    type: String,
    default: '#1c5230',
  },
  icons: {
    type: Array,
    default: [],
    required: true,
  },
  lineCount: {
    type: Number,
    default: 4,
  },
  isDivider: {
    type: Boolean,
    default: false,
  },
});

const clickOwnIconResult = (info) => {
  emit('click', info);
};
</script>

<style lang="scss" scoped>
@import url('@/styles/common.scss');

h3.title {
  margin-bottom: calc(var(--gap) * 2);
  font-size: .9rem;
  font-weight: normal;
}

.icons {
  display: flex;
  flex-wrap: wrap;

  &.icons-3 .icon-line-3 {
    margin-right: 9%;

    &:nth-child(3n) {
      margin-right: 0;
    }

    &:nth-child(n+3) {
      margin-top: calc(var(--gap) * 2);
    }
  }

  &.icons-4 {
    justify-content: space-around;
  }

  &.icons-5 .icon-line-5 {
    margin-right: 3%;

    &:nth-child(5n) {
      margin-right: 0;
    }

    &:nth-child(n+6) {
      margin-top: calc(var(--gap) * 2);
    }
  }
}
</style>