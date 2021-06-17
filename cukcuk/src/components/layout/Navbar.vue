<template>
  <div class="nav-wrapper">
    <nav class="nav-bar" nav-type="big" id="nav-bar">
      <div class="nav__header">
        <div class="toggle-icon" @click="toggleNav"></div>
        <div class="logo"></div>
      </div>
      <div class="nav__list">
        <!-- <router-link
          v-for="(item, index) in customData"
          :key="index"
          :to="getRouter(item.routerLink)"
          class="nav__list-item text-label"
        >
          <div class="nav__item-icon">
            <div class="item__icon" :class="item.iconClass"></div>
            <span class="nav__item-name">{{item.itemName}}</span>
          </div>
        </router-link> -->
        <router-link
          to="/"

          class="nav__list-item text-label nav__item-selected"
        >
          <div class="nav__item-icon">
            <div class="item__icon icon-dashboard"></div>
          </div>
          <span class="nav__item-name">Tổng quan</span>
        </router-link>
        <div
         
          class="nav__list-item text-label"
        >
          <div class="nav__item-icon">
            <div class="item__icon icon-report"></div>
          </div>
          <span class="nav__item-name">Báo cáo</span>
        </div>
        <div
         
          class="nav__list-item text-label"
        >
          <div class="nav__item-icon">
            <div class="item__icon icon-dashboard"></div>
          </div>
          <span class="nav__item-name">Mua hàng</span>
        </div>
        <router-link
          to="/Employee"
         
          class="nav__list-item text-label"
        >
          <div class="nav__item-icon">
            <div class="item__icon icon-dic-employee"></div>
          </div>
          <span class="nav__item-name">Danh mục nhân viên</span>
        </router-link>
        <div
         
          class="nav__list-item text-label"
        >
          <div class="nav__item-icon">
            <div class="item__icon icon-dic-employee"></div>
          </div>
          <span class="nav__item-name">Danh mục nhân viên</span>
        </div>
        <div
         
          class="nav__list-item text-label"
        >
          <div class="nav__item-icon">
            <div class="item__icon icon-setting"></div>
          </div>
          <span class="nav__item-name">Thiết lập hệ thống</span>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    customData: {
    type: Array,
    required: true,
    },
  },
  data() {
    return {
      smallNav: false,
    };
  },
  created() {
      console.log(this.customData);
  },
  methods: {
    toggleNav() {
      this.$emit("toggleNav");
    },

    /**
     * Hàm lấy link router
     * NVTOAN 17/06/2021
     */
    // getRouter(link) {
    //     return link + '';
    // }

    /**
     * Click nav-item
     * NVTOAN 17/06/2021
     */
    click() {},
  },
};
</script>

<style scoped>
@import url("../../assets/css/common/navbar.css");
</style>