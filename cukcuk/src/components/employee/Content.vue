<template>
  <div class="content">
    <HeaderContent
      @openForm="openForm"
      @openFormDelete="openDeletePopup"
    />
    <ContentUtil @refreshData="refreshData" @filterTable="filterTable" />
    <Table
      ref="Table"
      :customData="employeeTable"
      @openForm="openForm"
      @afterDelete="closeDeletePopup"
      @clickPageNum="clickPageNum"
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
import Popup from "../common/Popup.vue";
import EmployeesAPI from '../../api/components/employees/EmployeesAPI'

export default {
  name: "Employee",
  components: {
    HeaderContent,
    ContentUtil,
    Table,
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
        gridData: null,
        pageSize: 4,
        sumPageNum: 1,
        sumRecord: 0,
      },

      deletePopup: {},
    };
  },
  async created() {
    await this.getDataServer();
  },
  methods: {
    
    /**
     * Hàm lấy dữ liệu trên server
     * NVTOAN 16/06/2021
     */
    async getDataServer() {
        this.$bus.emit('loader', true);

        await EmployeesAPI.getAll().then((response) => {
          this.employeeTable.sumRecord = response.data.length;

          //tìm tổng số trang / pageSize
          this.employeeTable.sumPageNum = Math.ceil(this.employeeTable.sumRecord / this.employeeTable.pageSize);
        });

        await EmployeesAPI.filter(this.employeeTable.pageSize, 1, 'n')
        .then((response) => {
            this.employeeTable.gridData = response.data.Data; 

        });

        this.$bus.emit('loader', false);
    },

    /**
     * Hàm chuyển trang theo click người dùng
     * NVTOAN 20/06/2021
     */
    async clickPageNum(index) {
        let realPageSize = this.employeeTable.pageSize;
        
        this.$bus.emit('loader', true);

        await EmployeesAPI.getAll().then((response) => {
          this.employeeTable.sumRecord = response.data.length;

          //tìm tổng số trang / pageSize
          this.employeeTable.sumPageNum = Math.ceil(this.employeeTable.sumRecord / this.employeeTable.pageSize);
        });

        await EmployeesAPI.filter(realPageSize, index, 'n')
        .then((response) => {
            this.employeeTable.gridData = response.data.Data; 

        });

        this.$bus.emit('loader', false);
    },

    /**
     * Hàm mở form thêm sửa
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