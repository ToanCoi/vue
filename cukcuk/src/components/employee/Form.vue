<template>
  <form action="" v-if="showForm">
    <div class="form">
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
        <div class="form__component" ref="FormData">
          <div class="form__group">
            <span class="form__group-title text-uppercase"
              >A. Thông tin chung</span
            >
            <div class="form-row">
              <FieldInputLabel
                MustValidate="true"
                v-on:updateValueInput="updateValueInput"
                @invalidData="invalidData"
                class="form-item"
                :model="employee.EmployeeCode"
                :originData="originData.EmployeeCode"
                @getOriginData="getOriginData"
                :customData="employeeCodeInput"
              />
              <FieldInputLabel
                MustValidate="true"
                v-on:updateValueInput="updateValueInput"
                @invalidData="invalidData"
                class="form-item"
                :model="employee.FullName"
                :originData="originData.FullName"
                @getOriginData="getOriginData"
                :customData="employeeNameInput"
              />
            </div>
            <div class="form-row">
              <FieldInputLabel
               
                v-on:updateValueInput="updateValueInput"
                @invalidData="invalidData"
                class="form-item"
                :model="employee.DateOfBirth"
                :originData="originData.DateOfBirth"
                @getOriginData="getOriginData"
                :customData="dateOfBirthInput"
              />
              <div class="form-item">
                <label class="text-label">Giới tính</label>
                <DxComboBox
                  v-on:updateValueInput="updateValueInput"
                  :model="employee.Gender"
                  :originData="originData.Gender"
                  @getOriginData="getOriginData"
                  :customData="genderComboBox"
                />
              </div>
            </div>
            <div class="form-row">
              <FieldInputLabel
                MustValidate="true"
                v-on:updateValueInput="updateValueInput"
                @invalidData="invalidData"
                class="form-item"
                :model="employee.IdentityNumber"
                :originData="originData.IdentityNumber"
                @getOriginData="getOriginData"
                :customData="identityNumberInput"
              />
              <FieldInputLabel
                
                v-on:updateValueInput="updateValueInput"
                @invalidData="invalidData"
                class="form-item"
                :model="employee.IdentityDate"
                :originData="originData.IdentityDate"
                @getOriginData="getOriginData"
                :customData="identityDateInput"
              />
            </div>
            <div class="form-row">
              <FieldInputLabel
                MustValidate="true"
                v-on:updateValueInput="updateValueInput"
                @invalidData="invalidData"
                class="form-item"
                :model="employee.IdentityPlace"
                :originData="originData.IdentityPlace"
                @getOriginData="getOriginData"
                :customData="identityPlaceInput"
              />
            </div>
            <div class="form-row">
              <FieldInputLabel
                MustValidate="true"
                v-on:updateValueInput="updateValueInput"
                @invalidData="invalidData"
                class="form-item"
                :model="employee.Email"
                :originData="originData.Email"
                @getOriginData="getOriginData"
                :customData="emailInput"
              />
              <FieldInputLabel
                MustValidate="true"
                v-on:updateValueInput="updateValueInput"
                @invalidData="invalidData"
                class="form-item"
                :model="employee.PhoneNumber"
                :originData="originData.PhoneNumber"
                @getOriginData="getOriginData"
                :customData="phoneNumberInput"
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
                <DxComboBox
                  v-on:updateValueInput="updateValueInput"
                  :model="employee.PositionName"
                  :originData="originData.PositionName"
                  @getOriginData="getOriginData"
                  :customData="positionComboBox"
                />
              </div>
              <div class="form-item">
                <label class="text-label">Phòng ban</label>
                <DxComboBox
                  v-on:updateValueInput="updateValueInput"
                  :model="employee.DepartmentName"
                  :originData="originData.DepartmentName"
                  @getOriginData="getOriginData"
                  :customData="departmentComboBox"
                />
              </div>
            </div>
            <div class="form-row">
              <FieldInputLabel
                MustValidate="true"
                v-on:updateValueInput="updateValueInput"
                @invalidData="invalidData"
                class="form-item"
                :model="employee.PersonalTaxCode"
                :originData="originData.PersonalTaxCode"
                @getOriginData="getOriginData"
                :customData="taxCodeInput"
              />
              <FieldInputLabel
                MustValidate="true"
                v-on:updateValueInput="updateValueInput"
                @invalidData="invalidData"
                class="form-item"
                :model="employee.Salary"
                :originData="originData.Salary"
                @getOriginData="getOriginData"
                :customData="salaryInput"
              />
            </div>
            <div class="form-row">
              <FieldInputLabel
               
                v-on:updateValueInput="updateValueInput"
                @invalidData="invalidData"
                class="form-item"
                :model="employee.JoinDate"
                :originData="originData.JoinDate"
                @getOriginData="getOriginData"
                :customData="joinDateInput"
              />
              <div class="form-item">
                <label class="text-label">Tình trạng công việc</label>
                <DxComboBox
                  v-on:updateValueInput="updateValueInput"
                  :model="employee.WorkStatus"
                  :originData="originData.WorkStatus"
                  @getOriginData="getOriginData"
                  :customData="workStatusComboBox"
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
  </form>
</template>

<script>
import EmployeesAPI from '../../api/components/employees/EmployeesAPI'
import Resource from '../../js/common/Resource'
import DxComboBox from '../common/DxComboBox.vue'
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
    //ComboBox
    genderComboBox: {
      inputId: "Gender",
      defaultValue: "Chọn giới tính",
      items: ["Nữ", "Nam", "Khác"],
      width: "3 + 18px",
      height: "42px",
      dataType: "Enum",
      EnumName: "Gender",
    },
    departmentComboBox: {
      inputId: "DepartmentName",
      defaultValue: "Chọn phòng ban",
      items: ["Phòng nhân sự", "Phòng kế toán", "Phòng kinh doanh"],
      width: "3 + 18px",
      height: "42px",
    },
    positionComboBox: {
      inputId: "PositionName",
      defaultValue: "Chọn vị trí",
      items: ["Nhân viên", "Giám đốc", "Trưởng phòng"],
      width: "3 + 18px",
      height: "42px",
    },
    workStatusComboBox: {
      inputId: "WorkStatus",
      defaultValue: "Chọn trạng thái làm việc",
      items: ["Đang làm việc", "Đang thử việc", "Đã nghỉ việc"],
      width: "3 + 18px",
      height: "42px",
      dataType: "Enum",
      EnumName: "WorkStatus",
    },

    employee: {},
    originData: {},
    id: null,
    saveValidate: false,
    allInputValid: true,
    formType: null,
  };
}
export default {
  components: {
    DxComboBox
  },
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
    async openForm(employeeId) {

      //Gán lại giá trị của form
      await Object.assign(this.$data, initState());

      //Nếu là form sửa
      if (employeeId.length > 0) {
        //gán form type để nếu người dùng tắt khi đang nhập thì mở popup tương ứng
        this.formType = Resource.FormType.Edit;

        this.getEmployeeById(employeeId);
        this.id = employeeId;

      } else {
        //gán form type để nếu người dùng tắt khi đang nhập thì mở popup tương ứng
        this.formType = Resource.FormType.Add;

        await EmployeesAPI.getNewEmployeeCode()
          .then((response) => {
              this.employee.EmployeeCode = response.data;
              JSON.parse(JSON.stringify(this.originData, this.employee));
          })
          .catch(() => {

            this.$bus.emit("toast", {
              toastType: "danger",
              toastMessage: "Có lỗi khi lấy mã nhân viên mới, vui lòng liên hệ MISA",
            });
          });
      }


      this.showForm = true;
    },

    /**
     * Hàm lấy employee theo Id
     * NVTOAN 13/06/2021
     */
    getEmployeeById(employeeId) {
      console.log(employeeId);


      EmployeesAPI.getById(employeeId).then((response) => {
        this.employee = response.data;
        JSON.parse(JSON.stringify(this.originData, this.employee));
      })
      .catch(() => {

        this.$bus.emit("toast", {
          toastType: "danger",
          toastMessage: "Không thể sửa dữ liệu, vui lòng liên hệ MISA",
        });
      });
    },

    /**
     * Hàm đưa dữ liệu từ component input vào employee
     * NVTOAN 20/06/2021
     */
    updateValueInput(key, value) {
      this.employee[key] = value;
    },

    /**
     * Hàm đưa dữ liệu từ component input vào employee
     * NVTOAN 20/06/2021
     */
    getOriginData(key, value) {
      this.originData[key] = value;
    },

    /**
     * Hàm đánh dấu người dùng đã thay đổi dữ liệu trên form
     * NVTOAN 20/06/2021
     */
    dataChanged() {
      // this.userEdit = false;
      for(let prop in this.originData) {
        if(this.employee[prop] != this.originData[prop]) {
          return true;
        }
      }

      return false;
    },

    /**
     * Hàm đóng form
     * NVTOAN 13/06/2021
     */
    closeForm() {
      //Nếu người dùng đã nhập/sửa dữ liệu, hỏi lại có muốn đóng không
      if(this.dataChanged()) {
        this.$emit('openConfirmCancelPopup', this.formType);
      } else {
        this.showForm = false;
      }
    },

    /**
     * Hàm đóng form khi đã xác nhận
     * NVTOAN 20/06/2021
     */
    confirmCloseForm() {
      this.showForm = false;
    },

    /**
     * Nếu tất cả các trường dữ liệu chưa đúng
     * NVTOAN 16/06/2021
     */
    invalidData() {
      this.allInputValid = false;
    },
    /**
     * Hàm lưu dữ liệu
     * NVTOAN 16/06/2021
     */
    async saveData() {
      //Lấy ra tất cả trường input để validate
      var elValidate = this.$refs.FormData.querySelectorAll("[MustValidate]"),
        me = this;

      for (let i = 0; i < elValidate.length; i++) {
        await elValidate[i].querySelector(".field-input").focus();
        await elValidate[i].querySelector(".field-input").blur();
      }

      if (me.allInputValid) {
        //Thêm dữ liệu
        if (!me.id) {
          await EmployeesAPI.insert(me.employee).then(() => {
              
              me.$bus.emit("toast", {
                toastType: "success",
                toastMessage: "Thêm dữ liệu thành công",
              });
            })
            .catch(() => {console.log(me.employee)

              me.showForm = false;
              me.$bus.emit("toast", {
                toastType: "danger",
                toastMessage: "Không thể thêm, vui lòng liên hệ MISA",
              });
            });
        } 
        //Sửa dữ liệu
        else 
        {
          await EmployeesAPI.update(me.id, me.employee).then(() => {

            me.$bus.emit("toast", {
                toastType: "success",
                toastMessage: "Sửa dữ liệu thành công",
              });
          })
            .catch(() => {
              me.showForm = false;

              me.$bus.emit("toast", {
                toastType: "danger",
                toastMessage: "Không thể sửa dữ liệu, vui lòng liên hệ MISA",
              });

            });
        }
        await me.confirmCloseForm();

        await me.$emit("refreshData");
      }

      //reset giá trị để nếu ấn lại thì kiểm tra lại
      me.allInputValid = true;
    },
  },
};
</script>

<style scoped>
@import url("../../assets/css/common/form.css");
.dxCombobox {
  margin-top: 4px;
}
</style>