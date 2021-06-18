<template>
  <transition name="slide">
    <div class="toast" :class="customData.toastType" v-if="isShow">
      <div class="toast__icon">
        <i
          :class="{
            'fas fa-check-circle fa-lg': customData.toastType == 'success',
            'fas fa-exclamation-circle fa-lg':
              customData.toastType == 'warning',
            'fas fa-exclamation-triangle fa-lg':
              customData.toastType == 'danger',
            'fas fa-info-circle fa-lg': customData.toastType == 'info',
          }"
        ></i>
      </div>
      <div class="toast__content">{{ customData.toastMessage }}</div>
      <div class="toast__cancel" @click="isShow = false">
        <i class="fas fa-times fa-lg"></i>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    customData: {
      type: Object,
      required: true,
    },
  },
  data() {
      return {
          isShow: false
      }
  },
  methods: {
      /**
       * Hàm hiện toast messenger
       * NVTOAN 18/06/2021
       */
      showToast() {
          var me = this;

          this.isShow = true;
          setTimeout(function() {
              me.isShow = false;
          }, 3000);
      }
  }
};
</script>

<style scoped>
.toast {
  height: 48px;
  background-color: #fff;
  position: fixed;
  bottom: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  padding: 0 16px;
  width: 250px;
  z-index: 10;
}

.toast__content {
  color: #000;
  font-size: 13px;
  padding-left: 16px;
  padding-right: 16px;
}

.toast__cancel {
  cursor: pointer;
  position: absolute;
  right: 16px;
}

.toast__cancel:hover {
  opacity: 0.6;
}

.toast__cancel:active {
  opacity: 1;
}

.success {
  color: #01b075;
}

.info {
  color: #4388d9;
}

.warning {
  color: #f1c04e;
}

.danger {
  color: #eb5757;
}

.slide-leave-active,
.slide-enter-active {
  transition: all 0.3s;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>