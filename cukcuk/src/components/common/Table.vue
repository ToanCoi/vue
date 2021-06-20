<template>
  <div class="grid">
    <table>
      <thead>
        <tr>
          <td
            v-for="(item, index) in customData.column"
            :key="index"
            :title="item.columnName"
          >
            {{ item.columnName }}
          </td>
        </tr>
      </thead>
      <tbody ref="tbody">
        <tr
          v-for="(item, index) in customData.gridData"
          :EmployeeId="item.EmployeeId"
          :key="index"
          :class="{ 'tr-selected': selectRow(index) }"
          @mouseenter="rowHover"
          @mouseleave="rowUnhover"
          @click.exact="rowClick(index)"
          @dblclick="editItem(item)"
          v-on:click.ctrl="multipleSelect(index)"
        >
          <td
            v-for="(col, index) in customData.column"
            :key="index"
            :title="
              getDisplayValue(item[col.fieldName], col.dataType, col.enumName)
            "
          >
            {{
              getDisplayValue(item[col.fieldName], col.dataType, col.enumName)
            }}
          </td>
        </tr>
      </tbody>
    </table>
    <Paging :customData="paging" @clickPageNum="clickPageNum"/>
  </div>
</template>

<script>
import CommonFn from "../../js/common/CommonFn";
import Paging from "./Paging.vue";

export default {
  components: {
    Paging,
  },
  props: {
    customData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentSelectedRow: [],
      paging: {
        pageSize: this.customData.pageSize,
        sumRecord: this.customData.sumRecord,
        sumPageNum: this.customData.sumPageNum,
      },
    };
  },
  watch: {
    customData: {
      deep: true,
      handler(val) {
        this.paging.pageSize = val.pageSize;
        this.paging.sumRecord = val.sumRecord;
        this.paging.sumPageNum = val.sumPageNum;
      }
    },
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
      this.$emit("openForm", item);
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
     * Hàm lấy ra số lượng item đang được chọn để hiện lên thông báo
     * NVTOAN 17/06/2021
     */
    getNumberSelectedItem() {
      return this.currentSelectedRow.length;
    },

    /**
     * Hàm gọi cha để chuyển trang được click
     * NVTOAN 20/06/2021
     */
    clickPageNum(index) {
      this.$emit('clickPageNum', index);
    },

    /**
     * Hàm xóa tất cả bản ghi
     * NVTOAN 17/06/2021
     */
    async deleteItems() {
      let listId = [],
        rows = this.$refs.tbody.querySelectorAll(".tr-selected");

      //Lấy tất cả id của row đang được chọn
      for (let i = 0; i < rows.length; i++) {
        listId.push(rows[i].getAttribute("EmployeeId"));
      }

      this.$bus.emit("loader", true);

      for (let i = 0; i < listId.length; i++) {
        console.log(this.customData.deleteDataUrl);
        await this.axios
          .delete(this.customData.deleteDataUrl + listId[i])
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);

            this.$bus.emit("toast", {
              toastType: "danger",
              toastMessage: "Có lỗi xảy ra, vui lòng liên hệ MISA",
            });
          });
      }

      //Sau khi xóa xong thì gọi lại cha để xử lý
      this.$emit("afterDelete");

      //Reset đánh dấu select
      this.currentSelectedRow = [];

      //refresh dữ liệu
      await this.getDataServer();

      //gọi toast thông báo
      await this.$bus.emit("toast", {
        toastType: "success",
        toastMessage: "Xóa dữ liệu thành công",
      });
    },

    /**
     * Hàm filter data
     * NVTOAN 18/06/2021
     */
    // async filterData(filterValue) {
    //   if (filterValue) {
    //     await this.axios
    //       .get(
    //         "http://cukcuk.manhnv.net/v1/Employees/Filter?pageSize=" +
    //           10 +
    //           "&pageNumber=" +
    //           2 +
    //           "&fullName=" +
    //           filterValue
    //       )
    //       .then((response) => {

    //         if (!this.gridData) {
    //           this.$bus.emit("toast", {
    //             toastType: "warning",
    //             toastMessage: "Không có dữ liệu hợp lệ",
    //           });
    //         }
    //       });
    //   } else {
    //     this.getDataServer();
    //   }
    // },
  },
};
</script>

<style scoped>
@import url("../../assets/css/common/table.css");
</style>