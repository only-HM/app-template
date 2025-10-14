<template>
  <div>
    <div>
      id：{{ userStore.info.id }}<br />
      姓名：{{ userStore.info.name }}<br />
      邮箱：{{ userStore.info.email }}<br />
      年龄：{{ userStore.info.age }}<br />
    </div>
    <van-button :type="userStore.code === 200 ? 'success' : 'primary'" @click="handleLogin">{{ userStore.code === 200 ?
      '成功'
      : '登录' }}</van-button>
    <input @change="handleUploadChange" type="file">

    <van-tabs v-model:active="active">
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { uploadFile } from "@/api/uploadFile";
import { showSuccessToast, showFailToast } from "vant";
import { useUserStore } from "@/store/modules/user";
const userStore = useUserStore();

const handleLogin = async () => {
  if (userStore.code === 200) return showSuccessToast("已登录！");
  try {
    const res = await userStore.setlogin();
    console.log(res);
    res.code === 200 && showSuccessToast("登录成功");
  } catch (err) {
    showFailToast(err);
  };
};

const handleUploadChange = async (e) => {
  e.preventDefault();
  const files = e.target.files;
  console.log(files);
  if (files.length > 0) {
    const res = await uploadFile('http://localhost:8090/upload', files[0]);
    console.log(res);
  };
};

const active = ref(0);
</script>
