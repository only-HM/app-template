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
  </div>
</template>

<script setup>
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
</script>
