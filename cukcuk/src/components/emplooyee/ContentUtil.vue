<template>
    <div class="content__util">
        <div class="util__left">
            <FieldInputIcon :customData="searchBox"/>
            <Dropdown :customData="departmentDropdown"/>
            <Dropdown :customData="positionDropdown"/>
        </div>   
        <div class="util__right btn btn-default">
            <div class="btn-refresh" EmployeeToolbarItem="true" FormType="Refresh"></div>
        </div>
    </div>
</template>

<script>
import FieldInputIcon from '../common/FieldInputIcon.vue'
import Dropdown from '../common/Dropdown.vue'

export default {
    components: {
        FieldInputIcon,
        Dropdown
    },
    data() {
        return {
            searchBox: {
                iconClass: "search-box__icon",
                placeholder: "Tìm theo Mã, Tên hoặc Số điện thoại"
            },
            departmentDropdown: {
                defaultValue: "Tất cả phòng ban",
                items: ["Phòng nhân sự", "Phòng kế toán", "Phòng kinh doanh"],
                width: 2.5
            },
            positionDropdown: {
                defaultValue: "Tất cả vị trí",
                items: ["Nhân viên", "Giám đốc", "Trưởng phòng"],
                width: 2.5
            }
        }
    }
}
</script>

<style scoped>

</style>