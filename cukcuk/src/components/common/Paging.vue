<template>
  <div class="paging" id="EmployeePaging">
    <div class="paging__left">
      <span class="left__text">
        Hiển thị
        <b>{{
          customData.pageSize * (currentSelectedPageNum - 1) +
          1 +
          "-" +
          customData.pageSize * currentSelectedPageNum +
          "/" +
          customData.sumRecord
        }}</b>
        nhân viên
      </span>
    </div>
    <div ref="Direction" class="paging__center">
      <div
        class="paging-item page-direction"
        :class="{ disable: currentSelectedPageNum == 1 }"
        @click="clickFirstPage"
      >
        <div class="paging-icon first-page__icon"></div>
      </div>
      <div
        class="paging-item page-direction"
        :class="{ disable: currentSelectedPageNum == 1 }"
        @click="clickPreviousPage"
      >
        <div class="paging-icon pre-page__icon"></div>
      </div>
      <div
        class="paging-item page__num"
        v-for="(item, index) in pageNumDisplay"
        :key="index"
        :class="{
          'paging-item-selected': item == currentSelectedPageNum,
          'paging-item-hover':
            item != currentSelectedPageNum && item == currentHoverPageNum,
        }"
        @mouseenter="hoverPageNum(item)"
        @mouseleave="unhoverPageNum"
        @click="clickPageNum(item)"
      >
        <span>{{ item }}</span>
      </div>
      <div
        class="paging-item page-direction"
        :class="{ disable: currentSelectedPageNum == customData.sumPageNum }"
        @click="clickNextPage"
      >
        <div class="paging-icon next-page__icon"></div>
      </div>
      <div
        class="paging-item page-direction"
        :class="{ disable: currentSelectedPageNum == customData.sumPageNum }"
        @click="clickLastPage"
      >
        <div class="paging-icon last-page__icon"></div>
      </div>
    </div>
    <div class="paging__right">
      <div class="page-size__text">
        <span
          ><b>{{ clonePageSize }}</b> nhân viên/trang</span
        >
      </div>
      <div class="page-size__direction">
        <div class="page-size__btn" @click="incresePageSize">
          <i class="fas fa-chevron-up"></i>
        </div>
        <div
          class="page-size__btn"
          :class="{ disable: clonePageSize == 1 }"
          @click="decresePageSize"
        >
          <i class="fas fa-chevron-down"></i>
        </div>
      </div>
      <!-- <span class="rigt__text"
        >{{ customData.pageSize }} nhân viên/trang</span
      > -->
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
  },
  data() {
    return {
      currentSelectedPageNum: 1,
      currentHoverPageNum: null,
      pageNumArr: [],
      pageNumDisplay: [],
      clonePageSize: this.customData.pageSize,
      timeOut: null,
    };
  },
  watch: {
    customData: {
      deep: true,
      handler(val) {
        this.clonePageSize = val.pageSize;
        this.pageNumArr = Array.from(
          { length: val.sumPageNum },
          (_, i) => i + 1
        );

        if (this.pageNumArr.length > this.customData.maxPageNumDisplay) {
          this.pageNumDisplay = Array.from(
            { length: val.maxPageNumDisplay },
            (_, i) => i + 1
          );
        } else {
          this.pageNumDisplay = JSON.parse(JSON.stringify(this.pageNumArr));
        }
      },
    },
  },
  mounted() {
    this.handlerHover();
  },
  methods: {
    /**
     * Hàm xử lý sự kiên khi hover vào các nút định hướng trên paging
     * NVTOAN 20/06/2021
     */
    handlerHover() {
      this.$refs.Direction.getElementsByClassName("paging-item").forEach(
        (element) => {
          element.onmouseenter = () => {
            element.classList.add("paging-item-hover");
          };

          element.onmouseleave = () => {
            element.classList.remove("paging-item-hover");
          };
        }
      );
    },

    /**
     * Hàm khi hover và pageNum
     * NVTOAN 20/06/2021
     */
    hoverPageNum(pageIndex) {
      this.currentHoverPageNum = pageIndex;
    },

    /**
     * Hàm khi hover và pageNum
     * NVTOAN 20/06/2021
     */
    unhoverPageNum() {
      this.currentHoverPageNum = null;
    },

    /**
     * Hàm khi click page num
     * NVTOAN 20/06/2021
     */
    clickPageNum(pageIndex) {
      this.currentSelectedPageNum = pageIndex;

      this.$emit("clickPageNum", pageIndex);
    },

    /**
     * Hàm xử lý khi ấn first page
     * NVTOAN 20/06/2021
     */
    clickFirstPage() {
      if (this.currentSelectedPageNum != 1) {
        this.currentSelectedPageNum = 1;
        this.changeDisplayPageNum(1);

        this.$emit("clickPageNum", 1);
      }
    },

    /**
     * Hàm xử lý khi ấn previous page
     * NVTOAN 20/06/2021
     */
    clickPreviousPage() {
      if (this.currentSelectedPageNum > 1) {
        this.currentSelectedPageNum--;
        this.changeDisplayPageNum(this.currentSelectedPageNum);

        this.$emit("clickPageNum", this.currentSelectedPageNum);
      }
    },

    /**
     * Hàm xử lý khi ấn next page
     * NVTOAN 20/06/2021
     */
    clickNextPage() {
      if (this.currentSelectedPageNum < this.customData.sumPageNum) {
        this.currentSelectedPageNum++;
        this.changeDisplayPageNum(this.currentSelectedPageNum);

        this.$emit("clickPageNum", this.currentSelectedPageNum);
      }
    },

    /**
     * Hàm xử lý khi ấn last page
     * NVTOAN 20/06/2021
     */
    clickLastPage() {
      if (this.currentSelectedPageNum != this.customData.sumPageNum) {
        this.currentSelectedPageNum = this.customData.sumPageNum;
        this.changeDisplayPageNum(this.customData.sumPageNum);

        this.$emit("clickPageNum", this.currentSelectedPageNum);
      }
    },

    /**
     * Hàm xử lý khi ấn nút refresh data
     * NVTOAN 20/06/2021
     */
    refreshData() {
      this.currentSelectedPageNum = 1;
    },

    /**
     * Hàm thay đổi hiển thị page num
     * NVTOAN 23/06/2021
     */
    changeDisplayPageNum(pageIndex) {
      if (this.customData.sumPageNum > this.customData.maxPageNumDisplay) {
        if (pageIndex == this.customData.sumPageNum) {
          this.pageNumDisplay = this.pageNumArr.slice(
            this.pageNumArr.length - this.customData.maxPageNumDisplay,
            this.pageNumArr.length
          );
        }

        if (pageIndex == 1) {
          this.pageNumDisplay = this.pageNumArr.slice(
            0,
            this.customData.maxPageNumDisplay
          );
        }

        if (pageIndex < this.pageNumDisplay[0]) {
          this.pageNumDisplay.pop();
          this.pageNumDisplay.unshift(this.pageNumDisplay[0] - 1);
        }

        if (pageIndex > this.pageNumDisplay[this.pageNumDisplay.length - 1]) {
          this.pageNumDisplay.shift();
          this.pageNumDisplay.push(
            this.pageNumDisplay[this.pageNumDisplay.length - 1] + 1
          );
        }
      }
    },

    /**
     * Hàm tăng page size
     * NVTOAN 23/06/2021
     */
    incresePageSize() {
      this.clonePageSize++;

      clearTimeout(this.timeOut);

      this.timeOut = setTimeout(() => {
        this.$emit("changePageSize", this.clonePageSize);
      }, 700);
    },

    /**
     * Hàm giảm page size
     * NVTOAN 23/06/2021
     */
    decresePageSize() {
      if (this.clonePageSize > 1) {
        this.clonePageSize--;
        clearTimeout(this.timeOut);

        this.timeOut = setTimeout(() => {
          this.$emit("changePageSize", this.clonePageSize);
        }, 700);
      }
    },
  },
};
</script>

<style scoped>
@import url("../../assets/css/common/paging.css");

.paging-item {
  transition: 0.1s;
}

.disable {
  opacity: 0.4;
  cursor: default;
}

.disable:hover {
  background-color: unset;
}

.disable:active {
  background-color: unset;
}
</style>