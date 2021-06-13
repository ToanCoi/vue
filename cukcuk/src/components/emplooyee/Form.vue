<template>
  <form class="form" v-if="showForm">
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
          (Vui lòng chọn ảnh có định dạng .jpg .jpeg .png .gìf)
        </div>
      </div>
      <div class="form__component">
        <div class="form__group">
          <span class="form__group-title text-uppercase"
            >A. Thông tin chung</span
          >
          <div class="form-row">
            <div class="form-item">
              <label for="inputEmployeeCode" class="text-label"
                >Mã nhân viên (<span style="color: red">*</span>)</label
              >
              <input
                type="text"
                class="field-input"
                placeholder=""
                id="inputEmployeeCode"
                FieldName="EmployeeCode"
                Required="true"
                v-model="this.employee.EmployeeCode"
              />
            </div>
            <div class="form-item">
              <label for="inputFullName" class="text-label"
                >Họ và tên (<span style="color: red">*</span>)</label
              >
              <input
                type="text"
                class="field-input"
                placeholder=""
                id="inputFullName"
                FieldName="FullName"
                Required="true"
                v-model="this.employee.Fullname"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-item">
              <label
                for="inputDateOfBirth"
                class="text-label"
                FieldName="DateOfBirth"
                DataType="Date"
                >Ngày sinh</label
              >
              <input
                type="date"
                class="field-input"
                placeholder=""
                id="inputDateOfBirth"
                v-model="this.employee.DateOfBirth"
              />
            </div>
            <div class="form-item">
              <label class="text-label">Giới tính</label>
              <Dropdown :customData="genderDropdown" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-item">
              <label for="inputIdentityNumber" class="text-label"
                >Số CMTND/Căn cước (<span style="color: red">*</span>)</label
              >
              <input
                type="text"
                class="field-input"
                placeholder=""
                id="inputIdentityNumber"
                FieldName="IdentityNumber"
                Required="true"
                v-model="this.employee.IdentityNumber"
              />
            </div>
            <div class="form-item">
              <label for="IdentityDate" class="text-label">Ngày cấp</label>
              <input
                type="date"
                class="field-input"
                placeholder=""
                id="IdentityDate"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-item">
              <label for="inputIdentityPlace" class="text-label">Nơi cấp</label>
              <input
                type="text"
                class="field-input"
                placeholder=""
                id="inputIdentityPlace"
                v-model="this.employee.IdentityPlace"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-item">
              <label for="inputEmail" class="text-label">Email</label>
              <input
                type="email"
                class="field-input"
                placeholder=""
                id="inputEmail"
                FieldName="Email"
                DataType="Email"
                v-model="this.employee.Email"
              />
            </div>
            <div class="form-item">
              <label for="inputPhoneNumer" class="text-label"
                >Số điện thoại</label
              >
              <input
                type="text"
                class="field-input"
                placeholder=""
                id="inputPhoneNumer"
                FieldName="PhoneNumber"
                v-model="this.employee.PhoneNumber"
              />
            </div>
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
            <div class="form-item">
              <label for="inputTaxCode" class="text-label"
                >Mã số thuế cá nhân</label
              >
              <input
                type="text"
                class="field-input"
                placeholder=""
                id="inputTaxCode"
              />
            </div>
            <div class="form-item">
              <label for="inputSalary" class="text-label"
                >Mức lương cơ bản</label
              >
              <input
                type="text"
                class="field-input"
                placeholder=""
                id="inputSalary"
                FieldName="Salary"
                DataType="Number"
                v-model="this.employee.Salary"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-item">
              <label for="inputJoinDate" class="text-label"
                >Ngày gia nhập công ty</label
              >
              <input
                type="date"
                class="field-input"
                placeholder=""
                id="inputJoinDate"
              />
            </div>
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
  </form>
</template>

<script>
import Employee from '../../model/EmployeeModel'

export default {
  data() {
      
    return {
      showForm: false,

      genderDropdown: {
        defaultValue: "",
        items: ["Nam", "Nữ", "Khác"],
        width: "3 + 16px",
      },

      departmentDropdown: {
        defaultValue: "",
        items: ["Phòng nhân sự", "Phòng kế toán", "Phòng kinh doanh"],
        width: "3 + 16px",
      },

      positionDropdown: {
        defaultValue: "",
        items: ["Nhân viên", "Giám đốc", "Trưởng phòng"],
        width: "3 + 16px",
      },

      workStatusDropdown: {
        defaultValue: "",
        items: ["Đang làm việc", "Đang thử việc", "Đã nghỉ việc"],
        width: "3 + 16px",
      },

      employee: new Employee().initData(),
    };
  },
  methods: {
    /**
     * Hàm mở form
     * NVTOAN 13/06/2021
     */
    openForm(employeeId) {
        if(employeeId.length > 0) {
            this.employee = this.getEmployeeById(employeeId);
            this.genderDropdown.select = this.genderDropdown.items.indexOf(this.employee.GenderName);
            this.departmentDropdown.select = this.departmentDropdown.items.indexOf(this.employee.DepartmentName);
            this.positionDropdown.select = this.positionDropdown.items.indexOf(this.employee.PositionName);
            this.workStatusDropdown.select = this.workStatusDropdown.items.indexOf(this.employee.WorkStatusName);
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
                "FullName": "313231323",
                "Gender": 0,
                "DateOfBirth": "2021-06-09T00:00:00",
                "PhoneNumber": "12323132",
                "Email": "55@gmail.com",
                "Address": "2",
                "IdentityNumber": "7777",
                "IdentityDate": "1970-01-01T00:00:00",
                "IdentityPlace": "ádasd",
                "JoinDate": null,
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
                "DepartmentName": "Phòng nhân sự",
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