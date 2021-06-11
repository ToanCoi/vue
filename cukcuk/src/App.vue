<template>
  <div class="wrapper" id="app">
    <Navbar/>
    <Main/>
  </div>
</template>

<script>
import Navbar from './components/layout/Navbar.vue'
import Main from './components/layout/Main.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Main
  }
}
</script>

<style>
  @import url('./assets/css/common/reset.css');
  @import url('./assets/css/common/global.css');
</style>
