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
    <DxDateBox
      v-if="customData.dataType == 'Date'"
      v-model="cloneModel"
      displayFormat="dd/MM/yyyy"
      height="42px"
      placeholder="dd/mm/yyy"
      :useMaskBehavior="true"
      width="231px"
      class="dxDateBox"
    />
    <!-- <Money v-else-if="customData.dataType == 'Number'" v-model="cloneModel" va></Money> -->
    <input
      v-else-if="customData.dataType == 'Number'"
      :type="customData.inputType"
      class="field-input text-right"
      :class="{ invalidInput: invalidInput }"
      :placeholder="customData.placeholder"
      :id="customData.inputId"
      @focus="focus"
      @blur="blur"
      ref="input"
      v-model="cloneModel"
      v-money="money"
    />
    <input
      v-else
      :type="customData.inputType"
      class="field-input"
      :class="{ invalidInput: invalidInput }"
      :placeholder="customData.placeholder"
      :id="customData.inputId"
      @focus="focus"
      @blur="blur"
      ref="input"
      v-model="cloneModel"
    />
  </div>
</template>

<script>
import Resource from "../../js/common/Resource";
import moment from "moment";
import DxDateBox from "devextreme-vue/date-box";
import "devextreme/dist/css/dx.light.css";

export default {
  components: {
    DxDateBox,
    // Money,
  },
  props: {
    customData: {
      type: Object,
      require: true,
    },
    model: {
      default: null,
    },
    originData: {
      default: null,
    },
  },
  data() {
    return {
      errorMessage: "",
      scaleTooltip: 0,
      invalidInput: false,
      cloneModel: "",
      focused: false,
      valueUnique: true,
      money: {
        decimal: "",
        thousands: ".",
        prefix: "",
        suffix: " (VND) ",
        precision: 0,
        masked: false,
      },
    };
  },
  created() {
    this.cloneModel = this.model;
  },
  watch: {
    cloneModel: function (val) {
      if (this.customData.dataType == "Number") {
        val = val.toString().replace(/[^\d]/gi, "");
      }
      this.$emit("updateValueInput", this.customData.inputId, val);

      //Nếu người dùng chưa nhấn gì thì truyền ra dữ liệu gốc
      if (!this.focused) {
        this.$emit("getOriginData", this.customData.inputId, val);
      }
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
      this.focused = true;
      this.scaleTooltip = 0;
      this.invalidInput = false;
    },
    /**
     * Hàm xử lý sự kiện khi không focus vào input nữa (check validate)
     * NVTOAN 14/06/2021
     */
    blur() {
      this.validate();
    },

    /**
     * Hàm validate dữ liệu
     * NVTOAN 14/06/2021
     */
    validate() {
      let value = this.cloneModel,
        isValid = true;

      isValid = this.validateRequired(value);

      if (isValid) {
        isValid = this.validateUnique(value);
      }

      if (isValid && this.isUnique) {console.log('a')
        isValid = this.validateDataType(value);
      }
    },

    /**
     * Hàm validate required
     * NVTOAN 14/06/2021
     */
    validateRequired(value) {
      if (this.customData.isRequired) {
        if (!value || value.length <= 0) {
          //tooltip
          this.errorMessage =
            "'" + this.customData.labelText + " không được để trống" + "'";
          this.invalidInput = true;
          this.scaleTooltip = 1;

          //Dữ liệu chưa hợp lệ
          this.$emit("invalidData");

          return false;
        }
      }

      return true;
    },

    /**
     * Hàm gọi cha để validate unique
     * NVTOAN 23/06/2021
     */
    async validateUnique(value) {
      if (this.customData.isUnique) {
        //gọi cha truy vấn api xem có dữ liệu hay chưa
        await this.$emit("checkUnique", this.customData.inputId, value);

      }
      return true;
    },

    /**
     * Hàm đánh dấu giá trị nhập không unique
     * NVTOAN 23/06/2021
     */
    valueNotUnique() {
      this.valueUnique = false;

      //tooltip
      this.errorMessage = "'" + this.customData.labelText + " đã tồn tại" + "'";
      this.invalidInput = true;
      this.scaleTooltip = 1;

      //Dữ liệu chưa hợp lệ
      this.$emit("invalidData");
    },

    /**
     * Hàm validate theo kiểu dữ liệu
     * NVTOAN 14/06/2021
     */
    validateDataType(value) {
      let res = true;

      switch (this.customData.dataType) {
        case Resource.DataTypeColumn.Email:
          res = this.validateEmail(value);
          break;
        case Resource.DataTypeColumn.Date:
          res = this.validateDate(value);
          break;
      }

      if (!res) {
        this.errorMessage =
          "'" + this.customData.labelText + " không hợp lệ" + "'";
        this.invalidInput = true;
        this.scaleTooltip = 1;

        //Dữ liệu chưa hợp lệ
        this.$emit("invalidData");
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
    validateDate(value) {
      console.log(value);
      let regex = /^[0-3]?[0-9]-[0-3]?[0-9]-(?:[0-9]{2})?[0-9]{2}$/;
      console.log("r " + regex.test(value));

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

.v-money {
  width: calc(var(--column-width) * 3 - 2px);
}

.dxDateBox {
  margin-top: 4px !important;
}

/* tooltip */
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