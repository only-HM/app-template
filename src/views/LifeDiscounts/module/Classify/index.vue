<template>
  <div class="classify-container">
    <div class="content flex">
      <van-sidebar v-model="sidebarIndex" @change="handleChangeSidebar">
        <van-sidebar-item class="flex flex-center" v-for="(c, c_i) in FETCH_DATA.CLASSIFYCOMMODITY" :key="c_i" :title="c.title" />
      </van-sidebar>

      <div class="exhibition">
        <GroupsIcon :title="cur_data.title" :icons="cur_data.icons" :lineCount="3" @click="clickGroupsIconResult" />
      </div>
    </div>

    <Loading :loading="loading" :isFull="false" />
    <van-back-top right="1vw" bottom="10vh" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { showToast } from 'vant';
import { getJSON } from '@/api/lifeDiscounts.js';

import GroupsIcon from '@/components/LifeDiscounts/groupsIcon/index.vue';
import Loading from '@/components/LifeDiscounts/loading/index.vue';

const loading = ref(false);
const sidebarIndex = ref(0);
const FETCH_JSON = ref({});
const FETCH_DATA = ref({
  CLASSIFYCOMMODITY: [],
});
const cur_data = ref({});

const fetchJSON = async () => {
  loading.value = true;
  try {
    const { code, msg, data } = await getJSON('CLASSIFY');
    if(code !== 0) return showToast('请求失败!');
    FETCH_JSON.value = data || {};
    init();
  } catch (err) {
    const { msg } = err;
    FETCH_JSON.value = {};
    showToast(msg || err);
  };
  loading.value = false;
};

const init = () => {
  const { classifyCommodityType } = FETCH_JSON.value;
  setFetchData('CLASSIFYCOMMODITY', classifyCommodityType);
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

const setFetchData = (module = '', list = []) => {
  if(!module) throw 'module isn\'t null';
  if(!Array.isArray(list)) throw 'list must be Array';
  if(list.length === 0) return;
  FETCH_DATA.value[module] = [];
  let _list = [];
  switch(module) {
    case 'CLASSIFYCOMMODITY':
      _list = setClassifyCommodityType(list);
      break;
  };
  FETCH_DATA.value[module] = [..._list];
  if(module === 'CLASSIFYCOMMODITY') {
    cur_data.value = FETCH_DATA.value[module][0];
  };
};

const handleChangeSidebar = (i) => {
  cur_data.value = FETCH_DATA.value.CLASSIFYCOMMODITY[i];
};

const clickGroupsIconResult = (info) => {
  console.log("点击图标反馈：", info);
};

onMounted(() => {
  fetchJSON();
});
</script>

<style lang="scss" scoped>
@import url('@/styles/common.scss');
@import url('./css/index.scss');
</style>