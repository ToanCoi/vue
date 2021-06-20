<template>
    <div class="content__util">
        <div class="util__left">
            <FieldInputIcon :customData="searchBox"/>
            <Dropdown :customData="departmentDropdown"/>
            <Dropdown :customData="positionDropdown"/>
        </div>   
        <div class="util__right btn btn-default" @click="refreshData">
            <div class="btn-refresh"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchBox: {
                iconClass: "search-box__icon",
                placeholder: "Tìm theo Mã, Tên hoặc Số điện thoại"
            },
            departmentDropdown: {
                defaultValue: "Tất cả phòng ban",
                items: ["Phòng nhân sự", "Phòng kế toán", "Phòng kinh doanh"],
                width: 2.8
            },
            positionDropdown: {
                defaultValue: "Tất cả vị trí",
                items: ["Nhân viên", "Giám đốc", "Trưởng phòng"],
                width: 2.8
            }
        }
    },
    methods: {
        refreshData() {
            this.$emit('refreshData');
        }
    }
}
</script>

<style scoped>
</style>