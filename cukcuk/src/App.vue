<template>
  <div class="wrapper" id="app" :class="{'nav-small': smallNav}">
    <Navbar v-on:toggleNav="toggleNav" :customData="navbarData"/>
    <Main/>
    <div class="overlay" v-show="overlayShow"></div>
    <div class="loader" v-show="loaderShow">
        <div class="loader__icon"></div>
    </div>
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
      overlayShow: false,
      loaderShow: false,
      navbarData: [
        {
          iconClass: 'icon-dashboard',
          itemName: 'Tổng quan',
          routerLink: '/'
        },
        {
          iconClass: 'icon-report',
          itemName: 'Báo cáo',
          routerLink: ''
        },
        {
          iconClass: 'icon-setting',
          itemName: 'Mua hàng',
          routerLink: ''
        },
        {
          iconClass: 'icon-dic-employee',
          itemName: 'Danh mục nhân viên',
          routerLink: '/employee'
        },
        {
          iconClass: 'icon-setting',
          itemName: 'Thiết lập hệ thống',
          routerLink: ''
        },
      ]
    }
  },
  created() {
    /**
     * Đóng mở ovelay
     * NVTOAN 13/06/2021
     */
    this.$bus.on('overlay', value => {
      this.overlayShow = value;
    });

    /**
     * Đóng mở loader
     * NVTOAN 16/06/2021
     */
    this.$bus.on('loader', value => {
      this.loaderShow = value;
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
