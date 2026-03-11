<template>
  <div class="home-container">
    <Banner :banners="FETCH_DATA.BANNERS" @click="clickBannerResult" />
    <PlaceBoxs v-if="!loading" type="img" />
    <GroupsIcon :icons="FETCH_DATA.RECOMMEND" @click="clickGroupsIconResult" />
    <PlaceBoxs v-if="!loading" type="pacle" />
    <SwipeCommodityCard :commoditys="FETCH_DATA.COMMODITYRENDER" @click="clickSwipeCommodityResult" />

    <van-tabs v-model:active="tabsIndex" scrollspy sticky class="my-tabs">
      <van-tab v-for="(c, c_i) in FETCH_DATA.CLASSIFYCOMMODITY" :title="c.title">
        <GroupsIcon :title="c.title" :icons="c.icons" :lineCount="5" :isDivider="c_i !== FETCH_DATA.CLASSIFYCOMMODITY.length - 1" @click="clickGroupsIconResult" />
      </van-tab>
    </van-tabs>

    <Loading :loading="loading" :isFull="false" />
    <van-back-top right="1vw" bottom="10vh" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { showToast } from 'vant';
import { getJSON } from '@/api/lifeDiscounts.js';

import Banner from '@/components/LifeDiscounts/banner/index.vue';
import PlaceBoxs from '@/components/LifeDiscounts/placeBoxs/index.vue';
import GroupsIcon from '@/components/LifeDiscounts/groupsIcon/index.vue';
import SwipeCommodityCard from '@/components/LifeDiscounts/swipeCommodityCard/index.vue';
import Loading from '@/components/LifeDiscounts/loading/index.vue';

const loading = ref(false);
const tabsIndex = ref(0);
const FETCH_JSON = ref({});
const FETCH_DATA = ref({
  BANNERS: [],
  RECOMMEND: [],
  CLASSIFYCOMMODITY: [],
  COMMODITYRENDER: [],
});

const fetchJSON = async () => {
  loading.value = true;
  try {
    const { code, msg, data } = await getJSON('HOME');
    if(code !== 0) return showToast('请求失败!');
    FETCH_JSON.value = data || {};
    init();
  } catch (err) {
    const { msg } = err;
    FETCH_JSON.value = {};
    showToast(msg);
  };
  loading.value = false;
};

const init = () => {
  const { banners, recommendRender, classifyCommodityType, commodityRender } = FETCH_JSON.value;
  setFetchData('BANNERS', banners);
  setFetchData('RECOMMEND', recommendRender);
  setFetchData('CLASSIFYCOMMODITY', classifyCommodityType);
  setFetchData('COMMODITYRENDER', commodityRender);
};

const setBanner = (list = []) => {
  let _list = [];
  list.forEach(l => {
    _list.push(Object.assign({}, l, { b_url: `https://shop.sz189.cn/${l.img}` }));
  });
  return _list || [];
};

const setRecommend = (list = []) => {
  let _list = [];
  list.forEach(l => {
    _list.push(Object.assign({}, l, { icon: `https://shop.sz189.cn/${l.img}`, name: l.title }));
  });
  return _list || [];
};

const setClassifyCommodityType = (list = []) => {
  let _list = [];
  list.forEach(l => {
    const _d = {
      title: l.categoryName,
      icons: [],
    };
    l.typeList.forEach(t => {
      _d.icons.push(Object.assign({}, t, { icon: `https://shop.sz189.cn/${t.logo}`, name: t.typeName }));
    });
    _list.push(Object.assign({}, _d));
  });
  return _list || [];
};

const setCommodity = (list = []) => {
  let $list = [];
  let _list = [];
  let count = 0;
  while(count ++ < list.length) {
    const _o = Object.assign({}, list[count - 1], { 
      commodityUrl: `https://shop.sz189.cn/${list[count - 1].logo}`,
      currentPrice: list[count - 1].faceValue,
      originalPrice: list[count - 1].officialPrice,
      name: list[count - 1].title,
    });
    $list = [...$list, _o];
    if(count === list.length) {
      _list.push($list);
      break;
    };
    if(count % 3 === 0) {
      _list.push($list);
      $list = [];
    };
  };
  return _list || [];
};

const setFetchData = (module = '', list = []) => {
  if(!module) throw 'module isn\'t null';
  if(!Array.isArray(list)) throw 'list must be Array';
  if(list.length === 0) return;
  FETCH_DATA.value[module] = [];
  let _list = [];
  switch(module) {
    case 'BANNERS':
      _list = setBanner(list);
      break;
    case 'RECOMMEND':
      _list = setRecommend(list);
      break;
    case 'CLASSIFYCOMMODITY':
      _list = setClassifyCommodityType(list);
      break;
    case 'COMMODITYRENDER':
      _list = setCommodity(list);
      break;
  };
  FETCH_DATA.value[module] = [..._list];
};

const clickBannerResult = (info) => {
  console.log('点击banner反馈：', info);
};

const clickGroupsIconResult = (info) => {
  console.log("点击图标反馈：", info);
};

const clickSwipeCommodityResult = (info) => {
  console.log("点击商品卡片反馈：", info);
};

onMounted(() => {
  fetchJSON();
});
</script>

<style scoped lang="scss">
@import url('@/styles/common.scss');
@import url('./css/index.scss');
</style>