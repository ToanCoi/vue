<template>
    <div class="content__header">
        <div class="content__name text-title">
            <span>Danh Sách nhân viên</span>
        </div>
        <div class="btn btn-primary btn-icon btn__add" @click="openForm()" EmployeeToolbarItem="true" FormType="Add">
            <div class="btn__add-icon"></div>
            <span class="btn__name">Thêm nhân viên</span>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        openForm() {
            this.$emit('openForm');
            this.$bus.emit('showOverlay', true);
        }
    },
}
</script>

<style scoped>
    @import url('../../assets/css/common/button.css');
</style>