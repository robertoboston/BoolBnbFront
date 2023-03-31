<script>

import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<template>
  <AppHeader></AppHeader>
  <router-view></router-view>
  <AppFooter></AppFooter>
</template>

<style lang="scss" scoped>
@use './styles/app.scss' as *;

* {
  font-family: 'Poppins', sans-serif;
}

body {
  min-height: 100vh;
  position: relative;
  overflow-y: scroll;

  main {
    padding-top: 76px; //spazio corrispondente all'altezza dell'header
    min-height: calc(100vh - 72px); // altezza minima = 100vh - altezza footer
  }
}
</style>
