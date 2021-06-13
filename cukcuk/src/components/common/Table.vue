<template>
  <table>
    <thead>
      <tr>
        <td v-for="(item, index) in customData.column" :key="index">
          {{ item.columnName }}
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in customData.data"
        :key="index"
        :class="{ 'tr-selected': currentSelectedRow == index }"
        @mouseenter="rowHover"
        @mouseleave="rowUnhover"
        @click="rowClick(index)"
      >
        <td v-for="(col, index) in customData.column" :key="index">
          {{ item[col.fieldName] }}
        </td>
      </tr>
    </tbody>
  </table>
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
        currentSelectedRow: null,
      };
  },
  methods: {
    rowHover(e) {
        e.target.classList.add("tr-hover");
    },
    rowUnhover(e) {
        e.target.classList.remove("tr-hover");
    },
    rowClick(index) {
        this.currentSelectedRow = index;
    },
  },
};
</script>

<style scoped>
@import url("../../assets/css/common/table.css");
</style>