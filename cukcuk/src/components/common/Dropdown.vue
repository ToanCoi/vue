<template>
  <div class="dropdown" :style="{ width: customWidth }">
    <div
      class="dropdown__btn"
      :class="{ 'dropdown__btn-focus': isShow }"
      @click="isShow = !isShow"
    >
      <div class="dropdown__btn-left">
        <div class="dropdown__content">
          <span class="dropdown__text">{{ selectedValue }}</span>
        </div>
        <div
          class="dropdown__icon-unselect"
          v-show="selectedValue != customData.defaultValue"
          @click="unselectItem"
          @click.stop="!isShow"
        >
          <i class="fas fa-times fa-xs"></i>
        </div>
      </div>
      <div class="dropdown__icon-arrow" :class="{ 'rotate-180': isShow }">
        <i class="fas fa-chevron-down fa-xs"></i>
      </div>
    </div>
    <div class="dropdown__list" v-show="isShow">
      <div
        class="dropdown__list-item"
        :class="{ 'dropdown__item-selected': currentSelectedItem == index }"
        v-for="(item, index) in customData.items"
        :key="index"
        @mouseenter="hover"
        @mouseleave="unhover"
        @click="click(index)"
      >
        <div
          class="dropdown__item-icon"
          :class="{ 'opacity-1': currentSelectedItem == index }"
        >
          <i class="fas fa-check fa-xs"></i>
        </div>
        <span class="dropdown__item-name">{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    customData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isShow: false,
      customWidth: "",
      currentSelectedItem: null,
      selectedValue: ""
    };
  },
  created() {
    this.selectedValue = this.customData.defaultValue;

    //Nếu khởi tạo chọn 1 item nào đó thì chọn
    if(this.customData.select) {
      this.click(this.customData.select);
    }

    this.customWidth =
      "calc(var(--column-width) * " + this.customData.width + " )";
  },
  methods: {
    /**
     * Hàm xử lý khi hover chuột vào một item
     * NVTOAN 12/06/2021
     */
    hover(e) {
      e.target.classList.add("dropdown__item-hover");
    },
    
    /**
     * Hàm xử lý khi bỏ hover chuột vào một item
     * NVTOAN 12/06/2021
     */
    unhover(e) {
      e.target.classList.remove("dropdown__item-hover");
    },

    /**
     * Hàm xử lý khi click chuột vào một item
     * NVTOAN 12/06/2021
     */
    click(index) {
      this.selectedValue = this.customData.items[index];
      this.currentSelectedItem = index;
      this.isShow = false;
    },

    /**
     * Hàm xử lý khi bỏ chọn item
     * NVTOAN 12/06/2021
     */
    unselectItem() {
      this.selectedValue = this.customData.defaultValue;
      this.currentSelectedItem = null;
    },
  },
};
</script>

<style scoped>
@import url("../../assets/css/common/dropdown.css");
</style>