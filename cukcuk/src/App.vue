<template>
  <div class="wrapper" id="app" :class="{'nav-small': smallNav}">
    <Navbar v-on:toggleNav="toggleNav"/>
    <Main/>
    <div class="overlay" v-show="overlayShow"></div>
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
  },
  data() {
    return {
      smallNav: false,
      overlayShow: false
    }
  },
  created() {
    /**
     * Bắt sự kiện mở overlay
     * NVTOAN 13/06/2021
     */
    this.$bus.on('showOverlay', value => {
      this.overlayShow = value;
    });

    /**
     * Bắt sự kiện đóng overlay
     * NVTOAN 13/06/2021
     */
    this.$bus.on('hideOverlay', value => {
      this.overlayShow = value;
    })
  },
  methods: {
    /**
     * Hàm thực hiện to nhỏ nav
     * NVTOAN 13/06/2021
     */
    toggleNav() {
      this.smallNav = !this.smallNav;
    },
  }, 
}
</script>

<style>
  @import url('./assets/css/common/reset.css');
  @import url('./assets/css/common/global.css');
</style>
