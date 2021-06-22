<template>
  <DxSelectBox
    :height="customData.height"
    :width="`calc(var(--column-width) * ${customData.width})`"
    :searchEnabled="true"
    :placeholder="customData.defaultValue"
    noDataText="Không có dữ liệu hợp lệ"
    :dataSource="customData.items"
    :showClearButton="true"
    :searchTimeout="0"
    class="dxCombobox"
    v-model="currentValue"
  />
</template>

<script>
import DxSelectBox from "devextreme-vue/select-box";

export default {
  components: {
    DxSelectBox,
  },
  props: {
    customData: {
      type: Object,
      required: true,
    },
    model: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      currentValue: "",
    };
  },
  watch: {
    currentValue: function (val) {
      this.$emit(
        "updateValueInput",
        this.customData.inputId,
        this.customData.items.indexOf(val)
      );
    },
    model: function (val) {
        this.currentValue = this.customData.items[val];
    }
  },
  methods: {},
};
</script>

<style>
/* chỉnh nút mũi tên */
.dxCombobox .dx-button-content {
  border-left: 1px solid #bbb;
}

.dxCombobox .dx-button-content:hover {
  background-color: #e9ebee !important;
  border-radius: 0 4px 0 0;
}
.dxCombobox .dx-dropdowneditor-icon {
  border: none;
  width: 100%;
  font-size: 0;
  background: url("../../assets/icon/chevron-down-solid.svg") no-repeat;
  background-size: 11px;
  background-position: center;
  border-radius: 0 4px 0 0;
  transition: 0.2s;
}

.dxCombobox
  .dx-button-normal.dx-button-mode-contained.dx-widget.dx-dropdowneditor-button {
  padding: 0 !important;
  width: 40px;
}

/* trạng thái hover của nút mũi tên*/
.dxCombobox.dx-dropdowneditor-button.dx-state-active .dx-button-content,
.dxCombobox.dx-dropdowneditor.dx-dropdowneditor-active .dx-button-content {
  background-color: #e9ebee;
}

.dxCombobox.dx-dropdowneditor.dx-state-active .dx-button-content,
.dxCombobox.dx-dropdowneditor.dx-state-hover:not(.dx-custom-button-hovered)
  .dx-button-content {
  background-color: #e9ebee;
}

.dxCombobox.dx-dropdowneditor.dx-state-active .dx-dropdowneditor-icon,
.dxCombobox.dx-dropdowneditor.dx-state-hover:not(.dx-custom-button-hovered)
  .dx-dropdowneditor-icon {
  background-color: unset;
}

.dxCombobox.dx-dropdowneditor-button.dx-state-active .dx-dropdowneditor-icon,
.dxCombobox.dx-dropdowneditor.dx-dropdowneditor-active .dx-dropdowneditor-icon {
  background-color: unset;
  transform: rotate(180deg);
}

/* input */
.dxCombobox input.dx-texteditor-input {
  font-family: "GoogleSans-regular", sans-serif;
  font-size: 13px;
}

/* unselect button */
span.dx-clear-button-area {
  width: 30px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dxCombobox span.dx-icon.dx-icon-clear {
  background: url("../../assets/icon/x.svg") no-repeat;
  background-size: 12px;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  padding: 0;
  width: 16px;
  height: 16px;
  position: relative;
  top: 0;
  margin-top: 0;
  opacity: 0.3;
}

.dxCombobox span.dx-icon.dx-icon-clear:hover {
  opacity: 0.7;
}

.dxCombobox .dx-icon-clear::before {
  content: "";
}

/* dropdown list */
.dx-selectbox-popup-wrapper .dx-overlay-content.dx-popup-normal.dx-resizable {
  border: none;
  transition: 0s !important;
  padding: 3px 0;
}

.dx-selectbox-popup-wrapper div#dx-0197ce52-6971-19a9-7268-0c8e9a7dad7b {
  padding: 0;
}

.dx-selectbox-popup-wrapper div#dx-59836626-75a5-d123-be24-66a9356cf2d1 {
  padding: 0;
}

.dx-selectbox-popup-wrapper .dx-scrollable-content {
  font-family: "GoogleSans-regular", sans-serif !important;
  font-size: 13px !important;
  max-height: 160px !important;
}

.dx-selectbox-popup-wrapper .dx-item.dx-list-item {
  height: 40px;
  transition: 0s !important;
}

.dx-selectbox-popup-wrapper .dx-item.dx-list-item:hover {
  background-color: #e9ebee;
}

.dx-selectbox-popup-wrapper .dx-item-content.dx-list-item-content {
  line-height: 40px;
  padding: 0 !important;
}

.dx-selectbox-popup-wrapper .dx-list-item-selected {
  background-color: #019160 !important;
  color: #fff !important;
}

.dx-selectbox-popup-wrapper .dx-state-active {
  background-color: #019160 !important;
  color: #fff !important;
  height: 40px !important;
  width: 100% !important;
}

.dx-selectbox-popup-wrapper .dx-state-focused {
  background-color: #e9ebee !important;
  color: #000 !important;
  border: none !important;
}

.dx-selectbox-popup-wrapper .dx-item.dx-list-item {
  background: url("../../assets/icon/check-solid.svg") no-repeat;
  background-size: 0px;
  background-position-y: center;
  background-position-x: 10px;
  padding-left: 32px;
  height: 40px !important;
}

.dx-selectbox-popup-wrapper .dx-item.dx-list-item.dx-list-item-selected {
  background-size: 12px !important;
}
</style>