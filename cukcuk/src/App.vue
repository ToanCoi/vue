<template>
  <div class="wrapper" id="app" :class="{ 'nav-small': smallNav }">
    <Navbar v-on:toggleNav="toggleNav" :customData="navbarData" />
    <Main />
    <ToastMessenger ref="ToastMessenger" :customData="customToast"/>
    <div class="overlay" v-show="overlayShow"></div>
    <div class="loader" v-show="loaderShow">
      <div class="loader__icon"></div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/layout/TheNavbar.vue";
import Main from "./components/layout/TheMain.vue";
import ToastMessenger from './components/common/ToastMessenger'

export default {
  name: "App",
  components: {
    Navbar,
    Main,
    ToastMessenger
  },
  data() {
    return {
      smallNav: false,
      overlayShow: false,
      loaderShow: false,
      navbarData: [
        {
          iconClass: "icon-dashboard",
          itemName: "Tổng quan",
          routerLink: "/",
        },
        {
          iconClass: "icon-report",
          itemName: "Báo cáo",
          routerLink: "",
        },
        {
          iconClass: "icon-setting",
          itemName: "Mua hàng",
          routerLink: "",
        },
        {
          iconClass: "icon-dic-employee",
          itemName: "Danh mục nhân viên",
          routerLink: "/employee",
        },
        {
          iconClass: "icon-setting",
          itemName: "Thiết lập hệ thống",
          routerLink: "",
        },
      ],
      customToast: {},
      
    };
  },
  created() {
    /**
     * Đóng mở ovelay
     * NVTOAN 13/06/2021
     */
    this.$bus.on("overlay", (value) => {
      this.overlayShow = value;
    });

    /**
     * Đóng mở loader
     * NVTOAN 16/06/2021
     */
    this.$bus.on("loader", (value) => {
      this.loaderShow = value;
    });

    /**
     * Mở toast messenger
     * NVTOAN 18/06/2021
     */
    this.$bus.on('toast', (customToast) => {
      Object.assign(this.customToast, customToast);
      this.$refs.ToastMessenger.showToast();
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
};
</script>

<style>
@import url("./assets/css/common/reset.css");
@import url("./assets/css/common/global.css");
</style>
