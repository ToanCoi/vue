<template>
  <table>
    <thead>
      <tr>
        <td v-for="(item, index) in customData.column" :key="index">
          {{ item.columnName }}
        </td>
      </tr>
    </thead>
    <tbody ref="tbody">
      <tr
        v-for="(item, index) in customData.data"
        :EmployeeId="item.EmployeeId"
        :key="index"
        :class="{ 'tr-selected': selectRow(index) }"
        @mouseenter="rowHover"
        @mouseleave="rowUnhover"
        @click.exact="rowClick(index)"
        @dblclick="editItem(item)"
        v-on:click.ctrl="multipleSelect(index)"
      >
        <td v-for="(col, index) in customData.column" :key="index">
          {{ getDisplayValue(item[col.fieldName], col.dataType, col.enumName) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import CommonFn from '../../js/common/CommonFn'

export default {
  props: {
    customData: {
      type: Object,
      required: true,
    },
  },
  data() {
      return {
        currentSelectedRow: [],
      };
  },
  methods: {
    /**
     * Hàm xử lý hover chuột vào row
     * NVTOAN 13/06/2021
     */
    rowHover(e) {
        e.target.classList.add("tr-hover");
    },

    /**
     * Hàm xử lý bỏ hover chuột vào row
     * NVTOAN 13/06/2021
     */
    rowUnhover(e) {
        e.target.classList.remove("tr-hover");
    },

    /**
     * Hàm xử lý click chuột vào row
     * NVTOAN 13/06/2021
     */
    rowClick(index) {
        this.currentSelectedRow = [];
        this.currentSelectedRow.push(index);
    },

    /**
     * Hàm kiểm tra nếu ấn ctrl thì chọn nhiều
     * NVTOAN 17/06/2021
     */
    multipleSelect(index) {
      this.currentSelectedRow.push(index);
    },

    /**
     * Gọi cha để mở form sửa
     * NVTOAN 13/06/2021
     */
    editItem(item) {
        this.$emit('openForm', item);
    },

    /**
     * Hàm xử lý chọn nhiều phần tử
     * NVTOAN 17/06/2021
     */
    selectRow(index) {
      return this.currentSelectedRow.includes(index);
    },

    /**
     * Hàm chuyển đổi dữ liệu để hiển thị lên bảng
     * NVTOAN 13/06/2021
     */
    getDisplayValue(data, dataType, enumName) {
        return CommonFn.convertOriginData(data, dataType, enumName);
    },

    /**
     * Hàm lấy ra tất cả nhân viên đang được chọn
     * NVTOAN 17/06/2021
     */
    getSelectedEmployees() {
      let listId = [],
          rows = this.$refs.tbody.querySelectorAll(".tr-selected");

      for(let i = 0; i < rows.length; i++) {
        listId.push(rows[i].getAttribute('EmployeeId'));
      }

      return listId;
    }
  },
};
</script>

<style scoped>
@import url("../../assets/css/common/table.css");
</style>