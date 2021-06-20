<template>
  <div
    class="comboBox"
    :style="{ width: customWidth }"
    tabindex="0"
    @blur="hideListAndCheckChanged"
  >
    <div class="comboBox__btn" :class="{ 'comboBox__btn-focus': showList }">
      <div class="comboBox__btn-left">
        <div class="comboBox__content">
          <input
            type="text"
            :placeholder="customData.defaultValue"
            class="comboBox__text"
            @focus="showList = true"
            @blur="hideListAndCheckChanged"
            v-model="inputModel"
          />
        </div>
        <div
          class="comboBox__icon-unselect"
          v-if="inputModel"
          @click.stop="!showList"
          @click="unselectItem"
        >
          <i class="fas fa-times fa-xs"></i>
        </div>
      </div>
      <div
        class="comboBox__icon-arrow"
        :class="{ 'comboBox__icon-arrow-active': showList }"
        @click="showList = !showList"
      >
        <div
          class="arrow-icon"
          :class="{
            'rotate-180': showList,
          }"
        >
          <i class="fas fa-chevron-down fa-xs"></i>
        </div>
      </div>
    </div>
    <div class="comboBox__list" v-show="showList">
      <div
        class="comboBox__list-item"
        :class="{ 'comboBox__item-selected': currentSelectedItem == index }"
        v-for="(item, index) in listItem"
        :key="index"
        @mouseenter="hover"
        @mouseleave="unhover"
        @click="click(index)"
      >
        <div
          class="comboBox__item-icon"
          :class="{ 'opacity-1': currentSelectedItem == index }"
        >
          <i class="fas fa-check fa-xs"></i>
        </div>
        <span class="comboBox__item-name">{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      showList: false,
      customWidth: "",
      currentSelectedItem: null,
      cloneModel: "", //Đây là model từ dữ liệu gốc
      inputModel: "", //Model theo dõi input nhập vào để filter
      listItem: null,
      originData: -1,
      dataChanged: false,
    };
  },
  created() {
    this.inputModel = null;

    this.listItem = this.customData.items;

    this.customWidth =
      "calc(var(--column-width) * " + this.customData.width + " )";
  },
  watch: {
    cloneModel: function (val) {
      this.$emit("updateValueInput", this.customData.inputId, val);
    },
    model: function (val) {
      this.cloneModel = JSON.parse(JSON.stringify(val));

      if (this.customData.dataType == "Enum") {
        if (this.cloneModel != null) {
          this.click(this.cloneModel);
        }
      }

      if(!this.clicked) {
        this.originData = this.model;
      }
    },
    inputModel: function (val) {
      if (!val) {
        this.listItem = this.customData.items;
      } else {
        this.listItem = this.customData.items.filter((item) => {
          return item.toLowerCase().includes(val.toLowerCase());
        });
      }
    },
  },
  methods: {

    /**
     * Hàm thực hiện khi người dùng không focus vào dropdown nữa
     * NVTOAN 21/06/2021
     */
    hideListAndCheckChanged() {
      this.showList = false;
      if(this.originData != this.cloneModel) {
        this.$emit('dataChanged');
      }
    },

    /**
     * Hàm xử lý khi hover chuột vào một item
     * NVTOAN 12/06/2021
     */
    hover(e) {
      e.target.classList.add("comboBox__item-hover");
    },

    /**
     * Hàm xử lý khi bỏ hover chuột vào một item
     * NVTOAN 12/06/2021
     */
    unhover(e) {
      e.target.classList.remove("comboBox__item-hover");
    },

    /**
     * Hàm xử lý khi click chuột vào một item
     * NVTOAN 12/06/2021
     */
    click(index) {
      let selectItem = this.listItem[index];

      this.inputModel = selectItem;

      this.cloneModel = this.customData.items.indexOf(selectItem);
      this.currentSelectedItem = 0;

      this.showList = false;
    },

    /**
     * Hàm xử lý khi bỏ chọn item
     * NVTOAN 12/06/2021
     */
    unselectItem() {
      if(!this.clicked ) {
        this.dataChanged = true;
      }

      this.inputModel = null;
      this.currentSelectedItem = null;
      this.cloneModel = null;
    },
  },
};
</script>

<style scoped>
@import url("../../assets/css/common/comboBox.css");
</style>