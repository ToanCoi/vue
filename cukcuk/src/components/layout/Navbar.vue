<template>
  <div class="nav-wrapper">
    <nav class="nav-bar" nav-type="big" id="nav-bar">
      <div class="nav__header">
        <div class="toggle-icon" @click="toggleNav"></div>
        <div class="logo"></div>
      </div>
      <div class="nav__list">
        <router-link
          v-for="(item, index) in customData"
          :key="index"
          :to="getRouter(item.routerLink)"
          class="nav__list-item text-label"
          :class="{
            'nav__item-selected': currentSelectedMenu == index,
            'nav__item-hover':
              currentHoverMenu != currentSelectedMenu &&
              index == currentHoverMenu,
          }"
          @click.native="selectMenuItem(index)"
          @mouseenter.native="hoverMenuItem(index)"
          @mouseleave.native="unhoverMenuItem"
        >
          <div class="nav__item-icon">
            <div class="item__icon" :class="item.iconClass"></div>
          </div>
          <span class="nav__item-name">{{ item.itemName }}</span>
        </router-link>
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
      currentSelectedMenu: null,
      currentHoverMenu: null,
    };
  },
  created() {},
  methods: {
    toggleNav() {
      this.$emit("toggleNav");
    },

    /**
     * Hàm lấy link router
     * NVTOAN 17/06/2021
     */
    getRouter(link) {
      return link + "";
    },

    /**
     * Hàm xử lý sự kiện click nav-item
     * NVTOAN 17/06/2021
     */
    selectMenuItem(index) {
      this.currentSelectedMenu = index;
    },

    /**
     * Hàm xử lý sự kiện hover chuột vào nav-item
     * NVTOAN 17/06/2021
     */
    hoverMenuItem(index) {
      debugger; // eslint-disable-line no-debugger
      this.currentHoverMenu = index;
    },

    /**
     * Hàm xử lý sự kiện hover chuột vào nav-item
     * NVTOAN 17/06/2021
     */
    unhoverMenuItem(e) {
      e.target.classList.remove("nav__item-hover");
    },
  },
};
</script>

<style scoped>
@import url("../../assets/css/common/navbar.css");
.nav__list-item {
    transition: .05s;
}
</style>