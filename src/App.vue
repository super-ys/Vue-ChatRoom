<script setup>

import Login from './views/login.vue';
import Register from './views/register.vue';
import Home from './views/home.vue';
import Content from './components/Content.vue';
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import store from './store'
import {provide} from 'vue'

// console.log('sddf')
// provide('abc', '123')
// provide('store', store)



</script>

<template>
  <!-- <Content/> -->

  <router-view></router-view>
</template>

<style scoped>

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
