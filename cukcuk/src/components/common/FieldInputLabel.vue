<template>
  <div
    class="tooltip"
    :style="{ '--scale': scaleTooltip, '--tooltip-message': errorMessage }"
  >
    <label :for="customData.inputId" class="text-label"
      >{{ customData.labelText }}
      <span v-if="customData.isRequired">
        (<span style="color: red">*</span>)
      </span>
    </label>
    <input
      :type="customData.inputType"
      class="field-input"
      :class="{ invalidInput: invalidInput }"
      :placeholder="customData.placeholder"
      :id="customData.inputId"
      @focus="focus"
      @blur="blur"
      ref="input"
      v-model="cloneModel"
      :v-money="{ money: customData.dataType == 'Number' }"
    />
  </div>
</template>

<script>
import Resource from "../../js/common/Resource";
import moment from "moment";
// import DateBox from "devextreme-vue/date_box";

// You can create the DateBox widget using the following code.
// Read more at https://js.devexpress.com/Documentation/Guide/Widgets/Common/Advanced/3rd-Party_Frameworks_Integration_API/#Create_and_Configure_a_Widget.

// new DateBox(this, {
//     "dateOutOfRangeMessage": "Ngày nhập không hợp lệ",
//     "displayFormat": "dd/MM/yyyy",
//     "height": "40px",
//     "hint": "",
//     "invalidDateMessage": "Ngày nhập không hợp lệ",
//     "opened": true,
//     "placeholder": "dd/mm/yyyy",
//     "useMaskBehavior": true
// });


export default {
  // components: {
  //   DateBox
  // },
  props: {
    customData: {
      type: Object,
      require: true,
    },
    model: {
      default: null,
    },
  },
  data() {
    return {
      errorMessage: "",
      scaleTooltip: 0,
      invalidInput: false,
      money: {
        decimal: ",",
        thousands: ",",
        precision: 3,
        masked: true,
      },
      cloneModel: "",
      originData: null,
    };
  },
  created() {
    this.cloneModel = this.model;
  },
  watch: {
    cloneModel: function (val) {
      this.$emit("updateValueInput", this.customData.inputId, val);
    },
    model: function (val) {
      this.cloneModel = JSON.parse(JSON.stringify(val));
      if (this.customData.dataType == "Date" && this.cloneModel) {
        this.cloneModel = moment(this.cloneModel).format("YYYY-MM-DD");
      }
    },
    saveValidate: function (val) {
      if (val) {
        this.validate();
      }
    },
  },
  methods: {
    /**
     * Hàm xử lý sự kiện focus
     * NVTOAN 14/06/2021
     */
    focus() {
      this.originData = this.cloneModel;
      this.scaleTooltip = 0;
      this.invalidInput = false;
    },
    /**
     * Hàm xử lý sự kiện khi không focus vào input nữa (check validate)
     * NVTOAN 14/06/2021
     */
    blur() {
      //Nếu người dùng đã thay dổi dữ liệu,  thông báo cho component cha phòng trường hợp người dùng cancel
      if(this.originData != this.cloneModel) {
        this.$emit('dataChanged');
      }
      this.validate();
    },

    /**
     * Hàm validate dữ liệu
     * NVTOAN 14/06/2021
     */
    validate() {
      let value = this.cloneModel;

      if (this.validateRequired(value)) {
        if (!this.validateDataType(value)) {
          this.errorMessage =
            "'" + this.customData.labelText + " không hợp lệ" + "'";
          this.invalidInput = true;
          this.scaleTooltip = 1;

          //Dữ liệu chưa hợp lệ
          this.$emit("invalidData");
        }
      } else {
        this.errorMessage =
          "'" + this.customData.labelText + " không được để trống" + "'";
        this.invalidInput = true;
        this.scaleTooltip = 1;

        this.$emit("invalidData");
      }
    },

    /**
     * Hàm validate required
     * NVTOAN 14/06/2021
     */
    validateRequired(value) {
      if (this.customData.isRequired) {
        if (!value || value.length <= 0) return false;
      }

      return true;
    },

    /**
     * Hàm validate theo kiểu dữ liệu
     * NVTOAN 14/06/2021
     */
    validateDataType(value) {
      let res = true;

      switch (this.customData.dataType) {
        case Resource.DataTypeColumn.Number:
          res = !isNaN(value);
          break;
        case Resource.DataTypeColumn.Email:
          res = this.validateEmail(value);
          break;
        case Resource.DataTypeColumn.Date:
          res = this.validateDate(value);
          break;
      }

      return res;
    },

    /**
     * Validate Email
     * NVTOAN 14/06/2021
     */
    validateEmail(value) {
      let regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      return regex.test(value);
    },

    /**
     * Hàm validate ngày tháng
     * NVTOAN 14/06/2021
     */
    validateDate(value) {console.log(value)
      let regex = /^[0-3]?[0-9]-[0-3]?[0-9]-(?:[0-9]{2})?[0-9]{2}$/;console.log('r ' + regex.test(value))
     
      return true;
    },
  },
};
</script>

<style scoped>
input {
  width: calc(var(--column-width) * 3);
  height: 40px;
  font-size: 13px;
  padding-left: 16px;
  margin-top: 4px;
}

input:focus {
  border: 1px solid #019160;
  outline: none;
}

.invalidInput {
  border: 1px solid #ff4747;
  outline: none;
}

.tooltip {
  position: relative;
  --scale: 0;
  --arrow-size: 10px;
  --tooltip-color: #ff4747;
  --tooltip-message: "";
}

.tooltip::before,
.tooltip::after {
  position: absolute;
  top: 32px;
  left: 50%;
  transform: translateX(-50%) translateY(var(--translate-y, 0))
    scale(var(--scale));
  transition: 150ms transform;
  transform-origin: bottom center;
  font-size: 12px;
}

.tooltip::before {
  --translate-y: calc(-100% - var(--arrow-size));

  content: var(--tooltip-message);
  color: #fff;
  padding: 0.5rem;
  border-radius: 0.3rem;
  text-align: center;
  width: max-content;
  max-width: 50%;
  background-color: var(--tooltip-color);
}

.tooltip::after {
  --translate-y: calc(-1 * var(--arrow-size) - 1px);

  content: "";
  border: 10px solid transparent;
  border-top-color: var(--tooltip-color);
  transform-origin: top center;
}
</style>