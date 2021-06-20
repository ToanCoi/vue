<template>
  <BasePopup v-if="isShow">
    <template #header>
      <div class="header-title text-title2">{{ customData.title }}</div>
      <div class="header-cancel" @click="isShow = false">
        <div class="cancel-icon"></div>
      </div>
    </template>
    <template #content>
      <div class="content-icon">
        <i
          class="fas fa-exclamation-triangle"
          :class="customData.iconColorClass"
        ></i>
      </div>
      <div class="content-text text-label">
        <slot :emphasizeText="emphasizeText"></slot>
      </div>
    </template>
    <template #footer>
      <div
        class="btn"
        :class="customData.cancelBtnClass"
        @click="isShow = false"
      >
        {{ customData.cancelBtnText }}
      </div>
      <div class="btn" :class="customData.confirmBtnClass" @click="confirm">
        {{ customData.confirmBtnText }}
      </div>
    </template>
  </BasePopup>
</template>

<script>
import BasePopup from "./BasePopup.vue";
export default {
  components: {
    BasePopup,
  },
  props: {
    customData: {
      type: Object,
      required: true,
    },
  },
  data() {
      return {
          isShow: false,
          emphasizeText: "",
      }
  },
  watch: {
      customData: {
          deep: true,
          handler() {
              this.emphasizeText = this.customData.emphasizeText
          }
      }
  },
  methods: {
    /**
     * Hàm mở popup
     * NVTOAN 20/06/2021 
     */
    open() {
        this.isShow = true;
    },

    /**
     * Hàm đóng popup
     * NVTOAN 20/06/2021
     */
    close() {
        this.isShow = false;
    },

    /**
     * Hàm gọi cha nếu người dùng ấn xác nhận
     * NVTOAN 20/06/2021
     */
    confirm() {
      this.$emit("confirmPopup");
    },
  },
};
</script>

<style scoped>

.header-title {
    padding-top: 24px;
    padding-left: 24px;
}

.header-cancel {
    position: absolute;
    right: 0;
    top: 0;
    height: 35px;
    width: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0 0 0 4px;
    cursor: pointer;
}

.header-cancel:hover {
    background-color: #e5e5e5;
}

.cancel-icon {
    width: 24px;
    height: 24px;
    background: url('../../../assets/icon/x.svg');
    opacity: 0.6;
}

.content-icon {
    margin-right: 10px;
    min-width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #f4f4f4;
    display: flex;
    align-items: center;
    justify-content: center;
}

.content-text{ 
    display: flex;
    align-items: center;
}

.text-label {
    color: #000;
}

.btn {
    margin-left: 16px;
}

.icon-danger {
    color: #f65454;
}

.icon-warning {
    color: #f1c04e;
}
</style>