<template>
  <div class="tooltip" :style="{'--scale': scaleTooltip, '--tooltip-message': errorMessage}">
    <label :for="customData.inputId" class="text-label"
      >{{ customData.labelText }}
      <span v-if="customData.isRequired">
        (<span style="color: red">*</span>)
      </span>
    </label>
    <input
      :type="customData.inputType"
      class="field-input"
      :class="{'invalidInput': invalidInput}"
      :placeholder="customData.placeholder"
      :id="customData.inputId"
      @focus="focus"
      @blur="blur"
      ref="input"
      v-model="cloneModel"
      :v-money="{'money': customData.dataType == 'Number'}"
    />
    
  </div>
</template>

<script>
import Resource from '../../js/common/Resource'
import moment from 'moment'

export default {
  props: {
    customData: {
      type: Object,
      require: true,
    },
    model: {
      default: ''
    }
  },
  data() {
      return {
          errorMessage: '',
          scaleTooltip: 0,
          invalidInput: false,
          money: {
            decimal: ",",
            thousands: ",",
            precision: 3,
            masked: true,
          },
          cloneModel: '',
      }
  },
  created() {
    
   },
  watch: {
    cloneModel: function(val) {
      this.$bus.emit('updateValueInput', this.customData.inputId, val);
    },
    model: function(val) {
      this.cloneModel = JSON.parse(JSON.stringify(val));
      if(this.customData.dataType == "Date") {
        this.cloneModel = moment(this.cloneModel).format("YYYY-MM-DD");
      } 
    }
  },
  methods: {
      /**
       * Hàm xử lý sự kiện focus
       * NVTOAN 14/06/2021
       */
      focus() {
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
          let value = this.model;

          if(typeof this.model == 'object') {
            value = JSON.stringify(this.model);
          }

          if(this.validateRequired(value)) {
              if(!this.validateDatType(value)) {
                this.errorMessage = "'" + this.customData.labelText + ' không hợp lệ' + "'";
                this.invalidInput = true;
                this.scaleTooltip = 1;
              }
          } else {
              this.errorMessage = "'" + this.customData.labelText + ' không được để trống' + "'";
              this.invalidInput = true;
              this.scaleTooltip = 1;
          }

      },

      /**
       * Hàm validate required
       * NVTOAN 14/06/2021
       */
      validateRequired(value) {
          if(this.customData.isRequired) {
              if(!value || value.length <= 0)
                return false;
          }

          return true;
      },

      /**
       * Hàm validate theo kiểu dữ liệu
       * NVTOAN 14/06/2021
       */
      validateDatType(value) {
        let res = true;

        switch(this.customData.dataType) {
          case Resource.DataTypeColumn.Number:
            res = this.validateMoney(value);
            break;
          case Resource.DataTypeColumn.Email:
            res = this.validateEmail(value);
            break;
          case Resource.DataTypeColumn.Date:
            res = this.validateDate(value); 
            break
        }

        return res;
      },

      /**
       * Validate Email
       * NVTOAN 14/06/2021
       */
      validateMoney(value) {
        let regex = /^\$?(([1-9]\d{0,2}(,\d{3})*)|0)?,\d{1,2}$/;

        return regex.test(value);
      },

      /**
       * Validate Email
       * NVTOAN 14/06/2021
       */
      validateEmail(value) {
        let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return regex.test(value);
      },

      /**
       * Hàm validate ngày tháng
       * NVTOAN 14/06/2021
       */
      validateDate(value) {
        let regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$|(?:(?:1[6-9]|[2-9]\d)?\d{2})(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\5(?:0?[1-9]|1\d|2[0-8])$|^(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(\/|-|\.)0?2\6(29)$|^(?:(?:1[6-9]|[2-9]\d)?\d{2})(?:(?:(\/|-|\.)(?:0?[1,3-9]|1[0-2])\8(?:29|30))|(?:(\/|-|\.)(?:0?[13578]|1[02])\9(?:31)))$/;
        
        return regex.test(value);
      }
  }
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
    --tooltip-message: '';
}

.tooltip::before,
.tooltip::after {
    position: absolute;
    top: 32px;
    left: 50%;
    transform: translateX(-50%) translateY(var(--translate-y, 0)) scale(var(--scale));
    transition: 150ms transform;
    transform-origin: bottom center;
    font-size: 12px;
}

.tooltip::before {
    --translate-y: calc(-100% - var(--arrow-size));

    content: var(--tooltip-message);
    color: #fff;
    padding: .5rem;
    border-radius: .3rem;
    text-align: center;
    width: max-content;
    max-width: 50%;
    background-color: var(--tooltip-color);
}

.tooltip::after {
    --translate-y: calc(-1 * var(--arrow-size) - 1px);

    content: '';
    border: 10px solid transparent;
    border-top-color: var(--tooltip-color);
    transform-origin: top center;
}
</style>