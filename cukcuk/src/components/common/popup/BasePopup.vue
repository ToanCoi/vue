<template>
    <div class="popup__wrapper">
    <div class="popup">
      <div class="popup__header">
        <slot name="header"></slot>
      </div>
      <div class="popup__content">
        <slot name="content"></slot>
      </div>
      <div class="popup__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.popup__wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
}

.popup {
    width: calc(var(--nav-width) * 2);
    background-color: #fff;
    border-radius: 4px;
}

.popup__header {
    position: relative;
}

.popup__content {
    padding: 24px;
    display: flex;
}

.popup__footer {
    display: flex;
    justify-content: flex-end;
    padding: 10px 24px;
    background-color: #f4f4f4;
}
</style>