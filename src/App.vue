<template>
  <div>
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">login</router-link>
    </nav> -->
    <router-view class="router-view"/>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
@use '@/styles/_variables' as *;
@use '@/styles/_mixins' as *;

.router-view {
  width:100vw;
  height: 100vh;
}
</style>
