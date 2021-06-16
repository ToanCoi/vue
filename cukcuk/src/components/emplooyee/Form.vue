<template>
  <div class="form" v-if="showForm">
    <div class="form__title">
      <span class="form__title-text text-title text-uppercase"
        >Thông tin nhân viên</span
      >
      <div class="btn form__title-cancel" @click="closeForm">
        <div class="form__cancel-icon"></div>
      </div>
    </div>
    <div class="form__content d-flex">
      <div class="form__component">
        <div class="form__avatar"></div>
        <div class="form__avater-des text-label">
          (Vui lòng chọn ảnh có định dạng .jpg .jpeg .png .gif)
        </div>
      </div>
      <div class="form__component">
        <div class="form__group">
          <span class="form__group-title text-uppercase"
            >A. Thông tin chung</span
          >
          <div class="form-row">
            <FieldInputLabel
              v-on:updateValueInput="updateValueInput"
              @invalidData="invalidData"
              class="form-item"
              :model="employee.EmployeeCode"
              :customData="employeeCodeInput"
              :saveValidate="saveValidate"
            />
            <FieldInputLabel
              v-on:updateValueInput="updateValueInput"
              @invalidData="invalidData"
              class="form-item"
              :model="employee.FullName"
              :customData="employeeNameInput"
              :saveValidate="saveValidate"
            />
          </div>
          <div class="form-row">
            <FieldInputLabel
              v-on:updateValueInput="updateValueInput"
              @invalidData="invalidData"
              class="form-item"
              :model="employee.DateOfBirth"
              :customData="dateOfBirthInput"
              :saveValidate="saveValidate"
            />
            <div class="form-item">
              <label class="text-label">Giới tính</label>
              <Dropdown
                v-on:updateValueInput="updateValueInput"
                :model="employee.Gender"
                :customData="genderDropdown"
              />
            </div>
          </div>
          <div class="form-row">
            <FieldInputLabel
              v-on:updateValueInput="updateValueInput"
              @invalidData="invalidData"
              class="form-item"
              :model="employee.IdentityNumber"
              :customData="identityNumberInput"
              :saveValidate="saveValidate"
            />
            <FieldInputLabel
              v-on:updateValueInput="updateValueInput"
              @invalidData="invalidData"
              class="form-item"
              :model="employee.IdentityDate"
              :customData="identityDateInput"
              :saveValidate="saveValidate"
            />
          </div>
          <div class="form-row">
            <FieldInputLabel
              v-on:updateValueInput="updateValueInput"
              @invalidData="invalidData"
              class="form-item"
              :model="employee.IdentityPlace"
              :customData="identityPlaceInput"
              :saveValidate="saveValidate"
            />
          </div>
          <div class="form-row">
            <FieldInputLabel
              v-on:updateValueInput="updateValueInput"
              @invalidData="invalidData"
              class="form-item"
              :model="employee.Email"
              :customData="emailInput"
              :saveValidate="saveValidate"
            />
            <FieldInputLabel
              v-on:updateValueInput="updateValueInput"
              @invalidData="invalidData"
              class="form-item"
              :model="employee.PhoneNumber"
              :customData="phoneNumberInput"
              :saveValidate="saveValidate"
            />
          </div>
        </div>
        <div class="form__group">
          <span class="form__group-title text-uppercase"
            >B. Thông tin công việc</span
          >
          <div class="form-row">
            <div class="form-item">
              <label class="text-label">Vị trí</label>
              <Dropdown
                v-on:updateValueInput="updateValueInput"
                :model="employee.PositionName"
                :customData="positionDropdown"
              />
            </div>
            <div class="form-item">
              <label class="text-label">Phòng ban</label>
              <Dropdown
                v-on:updateValueInput="updateValueInput"
                :model="employee.DepartmentName"
                :customData="departmentDropdown"
              />
            </div>
          </div>
          <div class="form-row">
            <FieldInputLabel
              v-on:updateValueInput="updateValueInput"
              @invalidData="invalidData"
              class="form-item"
              :model="employee.PersonalTaxCode"
              :customData="taxCodeInput"
              :saveValidate="saveValidate"
            />
            <FieldInputLabel
              v-on:updateValueInput="updateValueInput"
              @invalidData="invalidData"
              class="form-item"
              :model="employee.Salary"
              :customData="salaryInput"
              :saveValidate="saveValidate"
            />
          </div>
          <div class="form-row">
            <FieldInputLabel
              v-on:updateValueInput="updateValueInput"
              @invalidData="invalidData"
              class="form-item"
              :model="employee.JoinDate"
              :customData="joinDateInput"
              :saveValidate="saveValidate"
            />
            <div class="form-item">
              <label class="text-label">Tình trạng công việc</label>
              <Dropdown
                v-on:updateValueInput="updateValueInput"
                :model="employee.WorkStatus"
                :customData="workStatusDropdown"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="form__footer">
      <div class="btn btn-default form__btn" @click="closeForm">Hủy</div>
      <div class="btn btn-primary btn-icon form__btn" @click="saveData">
        <i class="far fa-save btn__icon-save"></i>
        <span class="btn__name">Lưu</span>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Hàm khởi tạo giá trị cho form
 * NVTOAN 14/06/2021
 */
function initState() {
  return {
    showForm: false,
    //input
    employeeCodeInput: {
      inputId: "EmployeeCode",
      labelText: "Mã nhân viên",
      isRequired: true,
      inputType: "text",
    },
    employeeNameInput: {
      inputId: "Fullname",
      labelText: "Họ và tên",
      isRequired: true,
      inputType: "text",
      dataType: "Name",
    },

    dateOfBirthInput: {
      inputId: "DateOfBirth",
      labelText: "Ngày sinh",
      inputType: "date",
      dataType: "Date",
    },
    identityNumberInput: {
      inputId: "IdentityNumber",
      labelText: "Số CMTND/ Căn cước",
      isRequired: true,
      inputType: "text",
    },
    identityDateInput: {
      inputId: "IdentityDate",
      labelText: "Ngày cấp",
      inputType: "date",
      dataType: "Date",
    },
    identityPlaceInput: {
      inputId: "IdentityPlace",
      labelText: "Nơi cấp",
      inputType: "text",
    },
    emailInput: {
      inputId: "Email",
      labelText: "Email",
      isRequired: true,
      inputType: "text",
      dataType: "Email",
    },
    phoneNumberInput: {
      inputId: "PhoneNumber",
      labelText: "Số điện thoại",
      isRequired: true,
      inputType: "text",
    },
    taxCodeInput: {
      inputId: "PersonalTaxCode",
      labelText: "Mã số thuế cá nhân",
      inputType: "text",
    },
    salaryInput: {
      inputId: "Salary",
      labelText: "Mức lương cơ bản",
      inputType: "text",
      dataType: "Number",
    },
    joinDateInput: {
      inputId: "JoinDate",
      labelText: "Ngày gia nhập công ty",
      inputType: "date",
      dataType: "Date",
    },
    //dropdown
    genderDropdown: {
      inputId: "Gender",
      defaultValue: "Chọn giới tính",
      items: ["Nữ", "Nam", "Khác"],
      width: "3 + 16px",
      dataType: "Enum",
      EnumName: "Gender",
    },
    departmentDropdown: {
      inputId: "DepartmentName",
      defaultValue: "Chọn phòng ban",
      items: ["Phòng nhân sự", "Phòng kế toán", "Phòng kinh doanh"],
      width: "3 + 16px",
    },
    positionDropdown: {
      inputId: "PositionName",
      defaultValue: "Chọn vị trí",
      items: ["Nhân viên", "Giám đốc", "Trưởng phòng"],
      width: "3 + 16px",
    },
    workStatusDropdown: {
      inputId: "WorkStatus",
      defaultValue: "Chọn trạng thái làm việc",
      items: ["Đang làm việc", "Đang thử việc", "Đã nghỉ việc"],
      width: "3 + 16px",
      dataType: "Enum",
      EnumName: "WorkStatus",
    },

    employee: {},
    id: null,
    saveValidate: false,
    allInputValid: true,
    
  };
}
export default {
  data() {
    return initState();
  },
  created() {},
  methods: {
    /**
     * Hàm mở form
     * NVTOAN 13/06/2021
     */
    openForm(employeeId) {
      //Gán lại giá trị của form
      Object.assign(this.$data, initState());
      //Nếu là form sửa
      if (employeeId.length > 0) {
        this.getEmployeeById(employeeId);
        this.id = employeeId;
      }
      this.showForm = true;
    },

    /**
     * Hàm lấy employee theo Id
     * NVTOAN 13/06/2021
     */
    getEmployeeById(employeeId) {
      console.log(employeeId);
      this.axios
        .get("http://cukcuk.manhnv.net/v1/Employees/" + employeeId)
        .then((response) => {
          this.employee = response.data;
        });
    },

    updateValueInput(key, value) {
      this.employee[key] = value;
    },

    /**
     * Hàm đóng form
     * NVTOAN 13/06/2021
     */
    closeForm() {
      this.showForm = false;
      this.$bus.emit("overlay", false);
    },

    /**
     * Nếu tất cả các trường dữ liệu chưa đúng
     * NVTOAN 16/06/2021
     */
    invalidData() {
      this.allInputValid = false;console.log('asfs')
    },
    /**
     * Hàm lưu dữ liệu
     * NVTOAN 16/06/2021
     */
    async saveData() {console.log('df')
      //Validate tất cả dữ liệu trước khi lưu
      this.saveValidate = true;
  
      if (this.allInputValid) {
        if (!this.id) {
          await this.axios
            .post("http://cukcuk.manhnv.net/v1/Employees/", this.employee)
            .then((response) => {
              console.log(response);
            });
        } else {
          await this.axios
            .put(
              "http://cukcuk.manhnv.net/v1/Employees/" + this.id,
              this.employee
            )
            .then((response) => {
              console.log(response);
            });
        }
        this.closeForm();

        this.$emit("refreshData");
      }

      //reset giá trị để nếu ấn lại thì kiểm tra lại
      this.allInputValid = true;
    },
  },
};
</script>

<style scoped>
@import url("../../assets/css/common/form.css");
</style>