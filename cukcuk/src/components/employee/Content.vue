<template>
  <div class="content">
    <HeaderContent @openForm="openForm" @openFormDelete="openDeletePopup" />
    <ContentUtil @refreshData="refreshData" @filterTable="filterTable" />
    <Table
      ref="Table"
      :customData="employeeTable"
      @openForm="openForm"
      @clickPageNum="getDataServer"
      @changePageSize="changePageSize"
    />
    <!-- <Paging /> -->
    <Form
      ref="Form"
      @refreshData="refreshData"
      @openConfirmCancelPopup="openConfirmCancelPopup"
    />
    <CautionPopup
      ref="DeletePopup"
      :customData="deletePopup"
      @confirmPopup="deleteSelectedEmployees"
    >
      <template scope="props">
        <span>
          Bạn có chắc muốn xóa <b>{{ props.emphasizeText }}</b> bản ghi không?
        </span>
      </template>
    </CautionPopup>
    <CautionPopup
      ref="CancelEditPopup"
      :customData="cancelEditPopup"
      @confirmPopup="cancelEditEmployees"
    >
      <template>
        <span>
          Thông tin nhân viên bạn đang sửa chưa được lưu, bạn có chắc muốn đóng
          form không?
        </span>
      </template>
    </CautionPopup>
    <CautionPopup
      ref="CancelAddPopup"
      :customData="cancelAddPopup"
      @confirmPopup="cancelAddEmployees"
    >
      <template>
        <span>
          Bạn chưa lưu thông tin nhân viên, bạn có chắc muốn đóng form không?
        </span>
      </template>
    </CautionPopup>
  </div>
</template>

<script>
import HeaderContent from "./HeaderContent.vue";
import ContentUtil from "./ContentUtil";
import Table from "../common/Table.vue";
import Form from "./Form.vue";
import CautionPopup from "../common/popup/CautionPopup.vue";
import EmployeesAPI from "../../api/components/employees/EmployeesAPI";
import Resource from "../../js/common/Resource";

export default {
  name: "Employee",
  components: {
    HeaderContent,
    ContentUtil,
    Table,
    Form,
    CautionPopup,
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
        idFieldName: "EmployeeId",
        pageSize: 5,
        sumPageNum: 1,
        maxPageNumDisplay: 4,
        sumRecord: 0,
        filterValue: 'n'
      },

      deletePopup: {
        title: "Xóa nhân viên",
        iconColorClass: "icon-danger",
        cancelBtnClass: "btn-default",
        cancelBtnText: "Hủy",
        confirmBtnClass: "btn-danger",
        confirmBtnText: "Xóa",
        emphasizeText: "",
      },
      cancelEditPopup: {
        title: "Đóng Form sửa nhân viên",
        iconColorClass: "icon-warning",
        cancelBtnClass: "btn-default",
        cancelBtnText: "Tiếp tục sửa",
        confirmBtnClass: "btn-primary",
        confirmBtnText: "Đóng",
      },
      cancelAddPopup: {
        title: "Đóng Form thêm nhân viên",
        iconColorClass: "icon-warning",
        cancelBtnClass: "btn-default",
        cancelBtnText: "Tiếp tục nhập",
        confirmBtnClass: "btn-primary",
        confirmBtnText: "Đóng",
      },
    };
  },
  async created() {
    await this.getDataServer(1);
  },
  methods: {
    /**
     * Hàm lấy dữ liệu trên server, truyền vào page number
     * NVTOAN 16/06/2021
     */
    async getDataServer(index) {
      this.$bus.emit("loader", true);

      await EmployeesAPI.employeeFilter(
        this.employeeTable.pageSize,
        index - 1,
        this.employeeTable.filterValue
      ).then((response) => {
        this.employeeTable.gridData = response.data.Data;
        this.employeeTable.sumRecord = response.data.TotalRecord;
        this.employeeTable.sumPageNum = response.data.TotalPage;
      });

      this.$bus.emit("loader", false);
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

      this.deletePopup.emphasizeText = numberOfItem;
      this.$refs.DeletePopup.open();
    },

    /**
     * Hàm gọi delete popup để xóa
     * NVTOAN 18/06/2021
     */
    closeDeletePopup() {
      this.$refs.DeletePopup.close();
    },

    /**
     * Hàm mở form confirm cancel tương ứng
     * NVTOAN 20/06/2021
     */
    openConfirmCancelPopup(formType) {
      if (formType == Resource.FormType.Add) {
        this.$refs.CancelAddPopup.open();
      } else if (formType == Resource.FormType.Edit) {
        this.$refs.CancelEditPopup.open();
      }
    },

    /**
     * Hàm xử lý khi xác nhận đóng form sửa
     * NVTOAN 20/06/2021
     */
    cancelEditEmployees() {
      this.$refs.CancelEditPopup.close();
      this.$refs.Form.confirmCloseForm();
    },

    /**
     * Hàm xử lý khi xác nhận đóng form thêm
     * NVTOAN 20/06/2021
     */
    cancelAddEmployees() {
      this.$refs.CancelAddPopup.close();
      this.$refs.Form.confirmCloseForm();
    },

    /**
     * Hàm gọi table reload lại dữ liệu
     * NVTOAN 18/06/2021
     */
    refreshData() {
      this.getDataServer(1);
      this.$refs.Table.refreshData();
    },

    /**
     * Hàm gọi table xóa dữ liệu đang được chọn
     * NVTOAN 18/06/2021
     */
    async deleteSelectedEmployees() {
      //Lấy id của tất cả nhân viên đang được chọn
      let listId = this.$refs.Table.getListIdSelectedItem();

      this.$bus.emit("loader", true);

      for (let i = 0; i < listId.length; i++) {
        await EmployeesAPI.delete(listId[i]).catch(() => {
          this.$bus.emit("toast", {
            toastType: "danger",
            toastMessage: "Có lỗi xảy ra, vui lòng liên hệ MISA",
          });
        });
      }

      this.$refs.DeletePopup.close();

      this.$bus.emit("loader", false);

      this.$bus.emit("toast", {
        toastType: "success",
        toastMessage: "Xóa dữ liệu thành công",
      });

      this.refreshData();
    },

    /**
     * Hàm filter dữ liệu
     * NVTOAN 18/06/2021
     */
    async filterTable(filterValue) {
      if(filterValue) {
        this.employeeTable.filterValue = filterValue;
      } else {
        this.employeeTable.filterValue = "n";
      }
      
      this.refreshData();
    },

    /**
     * Hàm thay đổi page size
     * NVTOAN 23/06/2021
     */
    changePageSize(number) {
      this.employeeTable.pageSize = number;
      this.refreshData();
    }
  },
};
</script>

<style scoped>
@import url("../../assets/css/view/employee.css");
</style>