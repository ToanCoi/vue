<template>
  <div>
    <label :for="customData.inputId" class="text-label"
      >{{ customData.labelText }}
      <span v-if="customData.isRequired">
        (<span style="color: red">*</span>)
      </span>
    </label>
    <el-tooltip :popover-style="{background: '#ff4747'}" effect="dark" :content="errorMessage" placement="top">
      <input
      :type="customData.inputType"
      class="field-input"
      :placeholder="customData.placeholder"
      :id="customData.inputId"
      @blur="blur"
      v-model="customData.model"
    />
    </el-tooltip>
    
  </div>
</template>

<script>

export default {
  props: {
    customData: {
      type: Object,
      require: true,
    },
  },
  data() {
      return {
          errorMessage: null
      }
  },
  methods: {
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
          let value = this.customData.model;

          if(this.validateRequired(value)) {
              console.log("fasf");
          } else {
              this.errorMessage = this.customData.labelText + " không được để trống";
              console.log(this.errorMessage);
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
/* .el-tooltip__popper.is-dark {
    background: blue;
    color: -sharpfff;
} */

.el-tooltip__popper [x-placement ^=left] .popper__arrow ::after {
   border-left-color:#ff4747;
  }
.el-tooltip__popper [x-placement ^=left] .popper__arrow {
 border-left-color:#ff4747;
}

.draw_share_atooltip {
   background:#ff4747! important;
 }
</style>