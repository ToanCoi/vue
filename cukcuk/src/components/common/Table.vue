<template>
  <table>
    <thead>
      <tr>
        <td v-for="(item, index) in customData.column" :key="index">
          {{ item.columnName }}
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in customData.data"
        :key="index"
        :class="{ 'tr-selected': currentSelectedRow == index }"
        @mouseenter="rowHover"
        @mouseleave="rowUnhover"
        @click="rowClick(index)"
        @dblclick="editItem(item)"
      >
        <td v-for="(col, index) in customData.column" :key="index">
          {{ getDisplayValue(item[col.fieldName], col.dataType, col) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import CommonFn from '../../js/common/CommonFn'
import Resource from '../../js/common/Resource'

export default {
  props: {
    customData: {
      type: Object,
      required: true,
    },
  },
  data() {
      return {
        currentSelectedRow: null,
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
        this.currentSelectedRow = index;
    },

    /**
     * Gọi cha để mở form sửa
     * NVTOAN 13/06/2021
     */
    editItem(item) {
        this.$emit('openForm', item);
        this.$bus.emit("showOverlay", true);
    },

    /**
     * Hàm chuyển đổi dữ liệu để hiển thị lên bảng
     * NVTOAN 13/06/2021
     */
    getDisplayValue(data, dataType, column) {
        let temp = data;
        if(typeof data == 'object' && data) {
            temp = {...data};
        }

        switch(dataType) {
            case Resource.DataTypeColumn.Number:
                temp = CommonFn.formatNumber(temp);
                break;
            case Resource.DataTypeColumn.Date:
                temp = CommonFn.formatDate(temp);
                break;
            case Resource.DataTypeColumn.Enum:
                temp = CommonFn.getEnumValue(temp, column.enumName);
                break;
        }
        
        return temp;
    }
  },
};
</script>

<style scoped>
@import url("../../assets/css/common/table.css");
</style>