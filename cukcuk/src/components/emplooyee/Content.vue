<template>
    <div class="content">
        <HeaderContent v-on:openForm="openForm"/>
        <ContentUtil/>
        <Table :customData="employeeTable" v-on:openForm="openForm"/>
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
                        fieldName: "Gender",
                        dataType: "Enum",
                        enumName: "Gender"
                    },
                    {
                        columnName: "Ngày sinh",
                        fieldName: "DateOfBirth",
                        dataType: "Date"
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
                        fieldName: "PositionName"
                    },
                    {
                        columnName: "Phòng ban",
                        fieldName: "DepartmentName"
                    },
                    {
                        columnName: "Mức lương",
                        fieldName: "Salary",
                        dataType: "Number"
                    },
                    {
                        columnName: "Trạng thái làm việc",
                        fieldName: "WorkStatus",
                        dataType: "Enum",
                        enumName: "WorkStatus"
                    }
                ],
                data: employees,
            }
        }
    },
    methods: {
        openForm(employee) {
            if(employee) {
                this.$refs.Form.openForm(employee.EmployeeId);
            } else {
                this.$refs.Form.openForm("");
            }
        }
    },
}
</script>

<style scoped>
    @import url('../../assets/css/view/employee.css');
</style>