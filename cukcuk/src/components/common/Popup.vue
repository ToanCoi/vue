<template>
  <div class="popup__wrapper" v-if="isShow">
    <div class="popup">
      <div class="popup__header">
        <div class="header-title text-title2">Đóng form thông tin chung</div>
        <div class="header-cancel" @click="isShow = false">
          <div class="cancel-icon"></div>
        </div>
      </div>
      <div class="popup__content">
        <div class="content-icon">
          <i class="fas fa-exclamation-triangle warning-icon"></i>
        </div>
        <div class="content-text text-label">
          Bạn có chắc muốn xóa
          <b>{{ numberOfItem }}</b> bản ghi không?
        </div>
      </div>
      <div class="popup__footer">
        <div class="btn btn-default" @click="isShow = false">Hủy</div>
        <div class="btn btn-danger" @click="confirmDelete">Xóa</div>
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
      numberOfItem: null,
    };
  },
  methods: {
    /**
     * Hàm mở pop up
     * NVTOAN 17/06/2021
     */
    open(numberOfItem) {
      this.isShow = true;
      this.numberOfItem = numberOfItem;
    },

    /**
     * Đóng popup
     * NVTOAN 18/06/2021
     */
    close() {
      this.isShow = false;
    },

    /**
     * Xác nhận xóa
     * NVTOAN 18/06/2021
     */
    confirmDelete() {
      this.$emit('deleteData');
    }
  },
};
</script>

<style scoped>
@import url("../../assets/css/common/popup.css");
</style>