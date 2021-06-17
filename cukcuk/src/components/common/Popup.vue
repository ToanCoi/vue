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
          <b>{{ listItem.length }}</b> bản ghi
          không?
        </div>
      </div>
      <div class="popup__footer">
        <div class="btn btn-default" @click="isShow = false">Hủy</div>
        <div class="btn btn-danger" @click="deleteItems">Xóa</div>
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
      listItem: null,
    };
  },
  methods: {
    /**
     * Hàm mở pop up
     */
    open(listId) {
      this.isShow = true;
      this.listItem = listId;
    },

    /**
     * Hàm xóa tất cả bản ghi
     */
    deleteItems() {
      this.$bus.emit("loader", true);
      for (let i = 0; i < this.listItem.length; i++) {
        this.axios
          .delete("http://cukcuk.manhnv.net/v1/Employees/" + this.listItem[i])
          .then((response) => {
            console.log(response);
          });
      }
      this.isShow = false;
      this.$emit("refreshData");
    },
  },
};
</script>

<style scoped>
@import url("../../assets/css/common/popup.css");
</style>