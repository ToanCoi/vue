<template>
    <div class="content__header">
        <div class="content__name text-title">
            <span>Danh Sách nhân viên</span>
        </div>
        <div class="btn btn-primary btn-icon btn__add" @click="openForm">
            <div class="btn__add-icon"></div>
            <span class="btn__name">Thêm nhân viên</span>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        /**
         * Hàm gọi cha mở form thêm
         * NVTOAN 13/06/2021
         */
        openForm() {
            this.$emit('openForm', null);
            this.$bus.emit('overlay', true);
        }
    },
}
</script>

<style scoped>
    @import url('../../assets/css/common/button.css');
</style>