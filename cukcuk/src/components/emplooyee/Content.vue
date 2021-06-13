<template>
    <div class="content">
        <HeaderContent v-on:openForm="openForm"/>
        <ContentUtil/>
        <Table :customData="employeeTable"/>
        <Paging/>
        <Form ref="Form"/>
    </div>
</template>

<script>
import HeaderContent from './HeaderContent.vue'
import ContentUtil from './ContentUtil'
import Table from '../common/Table.vue'
import Form from './Form.vue'
import Paging from './Paging.vue'
import employees from '../../data/employee.js'

export default {
    components: {
        HeaderContent,
        ContentUtil,
        Table,
        Paging,
        Form
    },
    data() {
        return {
            employeeTable: {
                column: [
                    {
                        columnName: "Mã nhân viên",
                        fieldName: "EmployeeCode"
                    },
                    {
                        columnName: "Họ và tên",
                        fieldName: "FullName"
                    },
                    {
                        columnName: "Giới tính",
                        fieldName: "Gender"
                    },
                    {
                        columnName: "Ngày sinh",
                        fieldName: "DateOfBirth"
                    },
                    {
                        columnName: "Điện thoại",
                        fieldName: "PhoneNumber"
                    },
                    {
                        columnName: "Email",
                        fieldName: "Email"
                    },
                    {
                        columnName: "Chức vụ",
                        fieldName: "Position"
                    },
                    {
                        columnName: "Phòng ban",
                        fieldName: "Department"
                    },
                    {
                        columnName: "Mức lương",
                        fieldName: "Salary"
                    },
                    {
                        columnName: "Trạng thái làm việc",
                        fieldName: "WorkStatus"
                    }
                ],
                data: employees,
            }
        }
    },
    methods: {
        openForm() {
            this.$refs.Form.openForm();
        }
    },
}
</script>

<style scoped>
    @import url('../../assets/css/view/employee.css');
</style>