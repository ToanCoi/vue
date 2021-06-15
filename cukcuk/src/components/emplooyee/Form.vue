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
            <FieldInputLabel class="form-item" :customData="employeeCodeInput"/>
            <FieldInputLabel class="form-item" :customData="employeeNameInput"/>
          </div>
          <div class="form-row">
            <FieldInputLabel class="form-item" :customData="dateOfBirthInput"/>
            <div class="form-item">
              <label class="text-label">Giới tính</label>
              <Dropdown :customData="genderDropdown"/>
            </div>
          </div>
          <div class="form-row">
            <FieldInputLabel class="form-item" :customData="identityNumberInput"/>
            <FieldInputLabel class="form-item" :customData="identityDateInput"/>
          </div>
          <div class="form-row">
            <FieldInputLabel class="form-item" :customData="identityPlaceInput"/>
          </div>
          <div class="form-row">
            <FieldInputLabel class="form-item" :customData="emailInput"/>
            <FieldInputLabel class="form-item" :customData="phoneNumberInput"/>
          </div>
        </div>
        <div class="form__group">
          <span class="form__group-title text-uppercase"
            >B. Thông tin công việc</span
          >
          <div class="form-row">
            <div class="form-item">
              <label class="text-label">Vị trí</label>
              <Dropdown :customData="positionDropdown" />
            </div>
            <div class="form-item">
              <label class="text-label">Phòng ban</label>
              <Dropdown :customData="departmentDropdown" />
            </div>
          </div>
          <div class="form-row">
            <FieldInputLabel class="form-item" :customData="taxCodeInput"/>
            <FieldInputLabel class="form-item" :customData="salaryInput"/>
          </div>
          <div class="form-row">
            <FieldInputLabel class="form-item" :customData="joinDateInput"/>
            <div class="form-item">
              <label class="text-label">Tình trạng công việc</label>
              <Dropdown :customData="workStatusDropdown" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="form__footer">
      <div class="btn btn-default form__btn" @click="closeForm">Hủy</div>
      <div class="btn btn-primary btn-icon form__btn" FormBtn="Save">
        <i class="far fa-save btn__icon-save"></i>
        <span class="btn__name">Lưu</span>
      </div>
    </div>
  </div>
</template>

<script>
import Employee from '../../model/EmployeeModel'

/**
 * Hàm khởi tạo giá trị cho form
 * NVTOAN 14/06/2021
 */
function initState() {
    return {
      showForm: false,

      //input
      employeeCodeInput: {
        inputId: "inputEmployeeCode",
        labelText: "Mã nhân viên",
        isRequired: true,
        inputType: "text",
      },

      employeeNameInput: {
        inputId: "inputFullname",
        labelText: "Họ và tên",
        isRequired: true,
        inputType: "text",
        dataType: "Name"
      },
      
      dateOfBirthInput: {
        inputId: "inputDateOfBirth",
        labelText: "Ngày sinh",
        inputType: "date",
        dataType: "DateForm"
      },

      identityNumberInput: {
        inputId: "inputIdentityNumber",
        labelText: "Số CMTND/ Căn cước",
        isRequired: true,
        inputType: "text"
      },

      identityDateInput: {
        inputId: "inputIdentityDate",
        labelText: "Ngày cấp",
        inputType: "date",
        dataType: "DateForm"
      },

      identityPlaceInput: {
        inputId: "inputIdentityPlace",
        labelText: "Nơi cấp",
        inputType: "text"
      },

      emailInput: {
        inputId: "inputEmail",
        labelText: "Email",
        isRequired: true,
        inputType: "text",
        dataType: "Email"
      },

      phoneNumberInput: {
        inputId: "inputPhoneNumber",
        labelText: "Số điện thoại",
        isRequired: true,
        inputType: "text",
      },

      taxCodeInput: {
        inputId: "inputTaxCode",
        labelText: "Mã số thuế cá nhân",
        inputType: "text",
      },

      salaryInput: {
        inputId: "inputSalary",
        labelText: "Mức lương cơ bản",
        inputType: "text",
        dataType: "Number"
      },

      joinDateInput: {
        inputId: "inputJoinDate",
        labelText: "Ngày gia nhập công ty",
        inputType: "date",
        dataType: "DateForm"
      },

      //dropdown
      genderDropdown: {
        defaultValue: "",
        items: ["Nam", "Nữ", "Khác"],
        width: "3 + 16px",
        select: null
      },

      departmentDropdown: {
        defaultValue: "",
        items: ["Phòng nhân sự", "Phòng kế toán", "Phòng kinh doanh"],
        width: "3 + 16px",
        select: null
      },

      positionDropdown: {
        defaultValue: "",
        items: ["Nhân viên", "Giám đốc", "Trưởng phòng"],
        width: "3 + 16px",
        select: null
      },

      workStatusDropdown: {
        defaultValue: "",
        items: ["Đang làm việc", "Đang thử việc", "Đã nghỉ việc"],
        width: "3 + 16px",
        select: null
      },

      employee: new Employee().initData(),
      originData: null
    };
  }
export default {
  data() {
    return initState();
  },
  created() {
    
  },
  methods: {
    /**
     * Hàm mở form
     * NVTOAN 13/06/2021
     */
    openForm(employeeId) { 
      //Gán lại giá trị của form
      Object.assign(this.$data, initState());

        //Nếu là form sửa
        if(employeeId.length > 0) {
            this.originData = this.getEmployeeById(employeeId);

            for(var prop in this.employee) {
              this.employee[prop] = this.originData[prop];
            }

            //Set dropdown
            this.genderDropdown.select = this.genderDropdown.items.indexOf(this.employee.GenderName);
            this.departmentDropdown.select = this.departmentDropdown.items.indexOf(this.employee.DepartmentName);
            this.positionDropdown.select = this.positionDropdown.items.indexOf(this.employee.PositionName);
            this.workStatusDropdown.select = this.workStatusDropdown.items.indexOf(this.employee.WorkStatusName);

            //bind dữ liệu input
            this.employeeCodeInput.model = this.employee.EmployeeCode;
            this.employeeNameInput.model = this.employee.FullName;
            this.dateOfBirthInput.model = this.employee.DateOfBirth;
            this.identityNumberInput.model = this.employee.IdentityNumber;
            this.identityDateInput.model = this.employee.IdentityDate;
            this.identityPlaceInput.model = this.employee.IdentityPlace;
            this.emailInput.model = this.employee.Email;
            this.phoneNumberInput.model = this.employee.PhoneNumber;
            this.taxCodeInput.model = this.employee.PersonalTaxCode;
            this.salaryInput.model = this.employee.Salary;
            this.joinDateInput.model = this.employee.JoinDate;

        } 

        this.showForm = true;
    },

    /**
     * Hàm lấy employee theo Id
     * NVTOAN 13/06/2021
     */
    getEmployeeById(employeeId) {
        console.log(employeeId);

        return {
                "EmployeeId": "28901f40-c75c-11eb-b7d8-42010a8c0002",
                "EmployeeCode": "3123123",
                "FirstName": null,
                "LastName": null,
                "FullName": "asdf dsfd asdf",
                "Gender": 0,
                "DateOfBirth": "2021-06-09T00:00:00",
                "PhoneNumber": "12323132",
                "Email": "55@gmail.com",
                "Address": "2",
                "IdentityNumber": "7777",
                "IdentityDate": "1970-01-01T00:00:00",
                "IdentityPlace": "ádasd",
                "JoinDate": "2021-06-09T00:00:00",
                "MartialStatus": null,
                "EducationalBackground": null,
                "QualificationId": null,
                "DepartmentId": null,
                "PositionId": null,
                "WorkStatus": 1,
                "PersonalTaxCode": null,
                "Salary": 12331231231,
                "PositionCode": null,
                "PositionName": "Giám đốc",
                "DepartmentCode": null,
                "DepartmentName": "Phòng kinh doanh",
                "QualificationName": null,
                "GenderName": "Nữ",
                "EducationalBackgroundName": null,
                "MartialStatusName": null,
                "CreatedDate": "2021-06-07T06:46:59",
                "CreatedBy": null,
                "ModifiedDate": "2021-06-08T07:39:36",
                "ModifiedBy": null
            };
    },
    /**
     * Hàm đóng form
     * NVTOAN 13/06/2021
     */
    closeForm() {
        this.showForm = false;
        this.$bus.emit("hideOverlay", false);
    },
  },
};
</script>

<style scoped>
@import url("../../assets/css/common/form.css");
</style>