<template>
  <div class="content">
    <HeaderContent
      v-on:openForm="openForm"
      v-on:openFormDelete="openDeletePopup"
    />
    <ContentUtil @refreshData="refreshData" @filterTable="filterTable" />
    <Table
      ref="Table"
      :customData="employeeTable"
      @openForm="openForm"
      @afterDelete="closeDeletePopup"
    />
    <!-- <Paging /> -->
    <Form ref="Form" @refreshData="refreshData" />
    <Popup ref="Popup" @deleteData="deleteData" :customData="deletePopup" />
  </div>
</template>

<script>
import HeaderContent from "./HeaderContent.vue";
import ContentUtil from "./ContentUtil";
import Table from "../common/Table.vue";
import Form from "./Form.vue";
// import Paging from "./Paging.vue";
import Popup from "../common/Popup.vue";

export default {
  name: "Employee",
  components: {
    HeaderContent,
    ContentUtil,
    Table,
    // Paging,
    Form,
    Popup,
  },
  data() {
    return {
      employeeTable: {
        column: [
          {
            columnName: "Mã nhân viên",
            fieldName: "EmployeeCode",
          },
          {
            columnName: "Họ và tên",
            fieldName: "FullName",
          },
          {
            columnName: "Giới tính",
            fieldName: "Gender",
            dataType: "Enum",
            enumName: "Gender",
          },
          {
            columnName: "Ngày sinh",
            fieldName: "DateOfBirth",
            dataType: "Date",
          },
          {
            columnName: "Điện thoại",
            fieldName: "PhoneNumber",
          },
          {
            columnName: "Email",
            fieldName: "Email",
          },
          {
            columnName: "Chức vụ",
            fieldName: "PositionName",
          },
          {
            columnName: "Phòng ban",
            fieldName: "DepartmentName",
          },
          {
            columnName: "Mức lương",
            fieldName: "Salary",
            dataType: "Number",
          },
          {
            columnName: "Trạng thái làm việc",
            fieldName: "WorkStatus",
            dataType: "Enum",
            enumName: "WorkStatus",
          },
        ],
        getDataUrl: "http://cukcuk.manhnv.net/v1/Employees",
        deleteDataUrl: "http://cukcuk.manhnv.net/v1/Employees/",
        pageSize: 4
      },

      deletePopup: {},
    };
  },
  created() {},
  methods: {
    /**
     * Hàm mở form
     * NVTOAN 14/06/2021
     */
    openForm(employee) {
      if (employee) {
        this.$refs.Form.openForm(employee.EmployeeId);
      } else {
        this.$refs.Form.openForm("");
      }
    },

    /**
     * Hàm open form Delete
     * NVTOAN 17/06/2021
     */
    openDeletePopup() {
      let numberOfItem = this.$refs.Table.getNumberSelectedItem();

      this.$refs.Popup.open(numberOfItem);
    },

    /**
     * Hàm gọi delete popup để xóa
     * NVTOAN 18/06/2021
     */
    closeDeletePopup() {
      this.$refs.Popup.close();
    },

    /**
     * Hàm gọi table reload lại dữ liệu
     * NVTOAN 18/06/2021
     */
    refreshData() {
      this.$refs.Table.getDataServer();
    },

    /**
     * Hàm gọi table xóa dữ liệu đang được chọn
     * NVTOAN 18/06/2021
     */
    deleteData() {
      this.$refs.Table.deleteItems();
    },

    /**
     * Hàm gọi table để hiển thị dữ liệu filter
     * NVTOAN 18/06/2021
     */
    filterTable(filterValue) {
        this.$refs.Table.filterData(filterValue);
    }
  },
};
</script>

<style scoped>
@import url("../../assets/css/view/employee.css");
</style>