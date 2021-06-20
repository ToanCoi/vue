<template>
  <div class="paging" id="EmployeePaging">
    <div class="paging__left">
      <span class="left__text">{{
        "Hiển thị 1-" +
        this.customData.pageSize +
        "/" +
        this.customData.sumRecord +
        " nhân viên"
      }}</span>
    </div>
    <div ref="Direction" class="paging__center">
      <div class="paging-item page-direction" @click="clickFirstPage">
        <div class="paging-icon first-page__icon"></div>
      </div>
      <div class="paging-item page-direction" @click="clickPreviousPage">
        <div class="paging-icon pre-page__icon"></div>
      </div>
      <div
        class="paging-item page__num"
        v-for="index in this.customData.sumPageNum"
        :key="index"
        :class="{
          'paging-item-selected': index == currentSelectedPageNum,
          'paging-item-hover':
            index != currentSelectedPageNum && index == currentHoverPageNum,
        }"
        @mouseenter="hoverPageNum(index)"
        @mouseleave="unhoverPageNum"
        @click="clickPageNum(index)"
      >
        <span>{{ index }}</span>
      </div>
      <div class="paging-item page-direction" @click="clickNextPage">
        <div class="paging-icon next-page__icon"></div>
      </div>
      <div class="paging-item page-direction" @click="clickLastPage">
        <div class="paging-icon last-page__icon"></div>
      </div>
    </div>
    <div class="paging__right">
      <span class="rigt__text"
        >{{ this.customData.pageSize }} nhân viên/trang</span
      >
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
      currentSelectedPageNum: 1,
      currentHoverPageNum: null,
    };
  },
  mounted() {
    this.handlerHover();
  },
  methods: {
    /**
     * Hàm xử lý sự kiên khi hover vào các nút định hướng trên paging
     * NVTOAN 20/06/2021
     */
    handlerHover() {

      this.$refs.Direction.getElementsByClassName("paging-item").forEach(
        (element) => {
          element.onmouseenter = () => {
            element.classList.add("paging-item-hover");
          };

          element.onmouseleave = () => {
            element.classList.remove("paging-item-hover");
          };
        }
      );
    },

    /**
     * Hàm khi hover và pageNum
     * NVTOAN 20/06/2021
     */
    hoverPageNum(index) {
      this.currentHoverPageNum = index;
    },

    /**
     * Hàm khi hover và pageNum
     * NVTOAN 20/06/2021
     */
    unhoverPageNum() {
      this.currentHoverPageNum = null;
    },

    /**
     * Hàm khi hover và pageNum
     * NVTOAN 20/06/2021
     */
    clickPageNum(index) {
      this.currentSelectedPageNum = index;
      this.$emit('clickPageNum', index);
    },

    /**
     * Hàm xử lý khi ấn first page
     * NVTOAN 20/06/2021
     */
    clickFirstPage() {
      if(this.currentSelectedPageNum != 1) {
        this.currentSelectedPageNum = 1;
        this.$emit('clickPageNum', 1);
      }
    },

    /**
     * Hàm xử lý khi ấn previous page
     * NVTOAN 20/06/2021
     */
    clickPreviousPage() {
      if(this.currentSelectedPageNum != 1) {

        this.currentSelectedPageNum--;
        this.$emit('clickPageNum', this.currentSelectedPageNum);
      }
    },

    /**
     * Hàm xử lý khi ấn next page
     * NVTOAN 20/06/2021
     */
    clickNextPage() {
      if(this.currentSelectedPageNum != this.customData.sumPageNum) {

        this.currentSelectedPageNum++;
        this.$emit('clickPageNum', this.currentSelectedPageNum);
      }
    },
    
    /**
     * Hàm xử lý khi ấn last page
     * NVTOAN 20/06/2021
     */
    clickLastPage() {
      if(this.currentSelectedPageNum != this.customData.sumPageNum) {

        this.currentSelectedPageNum = this.customData.sumPageNum;
        this.$emit('clickPageNum', this.currentSelectedPageNum);
      }
    }
  },
};
</script>

<style scoped>
@import url("../../assets/css/common/paging.css");

.paging-item {
  transition: 0.1s;
}
</style>