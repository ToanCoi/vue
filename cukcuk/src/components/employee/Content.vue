<template>
    <div class="content">
        <HeaderContent v-on:openForm="openForm" v-on:openFormDelete="openFormDelete"/>
        <ContentUtil @refreshData="getDataServer"/>
        <Table ref="Table" :customData="employeeTable" v-on:openForm="openForm"/>
        <Paging/>
        <Form ref="Form" v-on:refreshData="getDataServer"/>
        <Popup ref="Popup" @refreshData="getDataServer" :customData="deletePopup"/>
    </div>
</template>

<script>
import HeaderContent from './HeaderContent.vue'
import ContentUtil from './ContentUtil'
import Table from '../common/Table.vue'
import Form from './Form.vue'
import Paging from './Paging.vue'
import Popup from '../common/Popup.vue'

export default {
    name: 'Employee',
    components: {
        HeaderContent,
        ContentUtil,
        Table,
        Paging,
        Form,
        Popup
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
                data: null,
            },

            deletePopup: {

            }
        }
    },
    created() {
        this.getDataServer();
    },
    methods: {
        /**
         * Hàm mở form 
         * NVTOAN 14/06/2021
         */
        openForm(employee) {
            if(employee) {
                this.$refs.Form.openForm(employee.EmployeeId);
            } else {
                this.$refs.Form.openForm("");
            }
        },

        /**
         * Hàm open form Delete
         * NVTOAN 17/06/2021
         */
        openFormDelete() {
            let listId = this.$refs.Table.getSelectedEmployees();
            
            this.$refs.Popup.open(listId);
        },

        /**
         * Hàm lấy dữ liệu trên server
         * NVTOAN 16/06/2021
         */
        getDataServer() {
            this.$bus.emit('loader', true);
            this.axios.get('http://cukcuk.manhnv.net/v1/Employees').then((response) => {
                this.employeeTable.data = response.data; 
                this.$bus.emit('loader', false);
            });
        },

        
    },
}
</script>

<style scoped>
    @import url('../../assets/css/view/employee.css');
</style>