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
      <DxComboBox :customData="departmentComboBox" />
      <DxComboBox :customData="positionComboBox" />
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
import DxComboBox from "../common/DxComboBox.vue";

export default {
  components: {
    DxComboBox,
  },
  data() {
    return {
      departmentComboBox: {
        defaultValue: "Tất cả phòng ban",
        items: [
          "Phòng nhân sự",
          "Phòng kế toán",
          "Phòng kinh doanh",
          "SuperPlasma 50",
          "SuperLED 50",
          "SuperLED 42",
          "SuperLCD 55",
          "SuperLCD 42",
          "SuperPlasma 65",
          "SuperLCD 70",
          "Projector Plus",
          "Projector PlusHT",
          "ExcelRemote IR",
          "ExcelRemote BT",
          "ExcelRemote IP",
        ],
        width: 2.8,
        height: "42px",
      },
      positionComboBox: {
        defaultValue: "Tất cả vị trí",
        items: [
          "Nhân viên",
          "Giám đốc",
          "Trưởng phòng",
          "SuperPlasma 50",
          "SuperLED 50",
          "SuperLED 42",
          "SuperLCD 55",
          "SuperLCD 42",
          "SuperPlasma 65",
          "SuperLCD 70",
          "Projector Plus",
          "Projector PlusHT",
          "ExcelRemote IR",
          "ExcelRemote BT",
          "ExcelRemote IP",
        ],
        width: 2.8,
        height: "42px",
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
      this.$emit("filterTable", val);
    },
  },
};
</script>

<style scoped>
.dxCombobox {
  margin-left: 16px;
}
</style>