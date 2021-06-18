<template>
  <div class="paging" id="EmployeePaging">
    <div class="paging__left">
      <span class="left__text">{{
        "Hiển thị 1-" +
        pageSize +
        "/" +
        sumRecord +
        "nhân viên"
      }}</span>
    </div>
    <div class="paging__center">
      <div class="paging-item page-direction">
        <div class="paging-icon first-page__icon"></div>
      </div>
      <div class="paging-item page-direction">
        <div class="paging-icon pre-page__icon"></div>
      </div>
      <div
        class="paging-item page__num"
        v-for="(item, index) in pageNum"
        :key="index"
      >
        <span>{{ index + 1 }}</span>
      </div>
      <div class="paging-item page-direction">
        <div class="paging-icon next-page__icon"></div>
      </div>
      <div class="paging-item page-direction">
        <div class="paging-icon last-page__icon"></div>
      </div>
    </div>
    <div class="paging__right">
      <span class="rigt__text">{{ pageSize }} nhân viên/trang</span>
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
          pageSize: 0,
          pageNum: 1,
          sumRecord: 0
      }
  },
  created() {
    this.pageSize = this.customData.pageSize;
    this.pageNum = this.customData.pageNum;
    this.sumRecord = this.customData.sumRecord;
  },
  watch: {
      customData: function(val){
          this.pageSize = val.pageSize;
          this.pageNum = val.pageNum;
          this.sumRecord = val.sumRecord;
      }
  }
};
</script>

<style scoped>
@import url("../../assets/css/common/paging.css");
</style>