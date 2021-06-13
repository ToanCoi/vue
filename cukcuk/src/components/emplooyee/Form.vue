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
    };
  },
  methods: {
    /**
     * Hàm mở form
     * NVTOAN 13/06/2021
     */
    openForm() {
      this.showForm = true;
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