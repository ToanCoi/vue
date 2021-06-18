<template>
  <div class="content__util">
    <div class="util__left">
      <div class="field-input">
        <div class="field-input__icon search-box__icon"></div>
        <input
          type="text"
          class="field-input__input"
          placeholder="Tìm theo Mã, Tên hoặc Số điện thoại"
          v-debounce:400ms="filterTableData"
        />
      </div>
      <ComboBox :customData="departmentComboBox" />
      <ComboBox :customData="positionComboBox" />
    </div>
    <div
      class="util__right btn btn-default"
      @click="refreshData"
      title="Làm mới"
    >
      <div class="btn-refresh"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      departmentComboBox: {
        defaultValue: "Tất cả phòng ban",
        items: ["Phòng nhân sự", "Phòng kế toán", "Phòng kinh doanh"],
        width: 2.8,
      },
      positionComboBox: {
        defaultValue: "Tất cả vị trí",
        items: ["Nhân viên", "Giám đốc", "Trưởng phòng"],
        width: 2.8,
      },
    };
  },
  methods: {
    /**
     * Hàm refresh dữ liệu
     * NVTOAN 18/06/2021
     */
    refreshData() {
      this.$emit("refreshData");
    },

    /**
     * Hàm filter dữ liệu trên bảng
     * NVTOAN 18/06/2021
     */
    filterTableData(val) {

        this.$emit('filterTable', val);
    },
  },
};
</script>

<style scoped>
.comboBox {
  margin-left: 16px;
}
</style>