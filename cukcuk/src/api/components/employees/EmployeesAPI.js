import BaseAPI from "../../base/BaseAPI";
import BaseAPIConfig from "../../base/BaseAPIConfig";

class EmployeesAPI extends BaseAPI {
    constructor() {
        super();

        this.controller = "v1/Employees";
    }

    /**
     * Hàm filter dữ liệu theo các tiêu chí
     * NVTOAN 20/06/2021
     * @param {*} pageSize 
     * @param {*} pageNumber 
     * @param {*} employeeCode 
     * @param {*} fullName 
     * @param {*} phoneNumber 
     * @param {*} departmentId 
     * @param {*} positionId 
     * @returns 
     */
    filter(pageSize, pageNumber, employeeCode, fullName, phoneNumber, departmentId, positionId) {
        
        return BaseAPIConfig.get(`${this.controller}/Filter?pageSize=${pageSize}
                        &pageNumber=${pageNumber}
                        ${employeeCode ? ('&employeeCode=' + employeeCode) : ''}
                        ${fullName ? ('&fullName=' + fullName) : ''}
                        ${phoneNumber ? ('&phoneNumber=' + phoneNumber) : ''}
                        ${departmentId ? ('&departmentId=' + departmentId) : ''}
                        ${positionId ? ('&positionId=' + positionId) : ''}`);
    }

    /**
     * Hàm filter employee theo một biến duy nhất
     * NVTOAN 21/06/2021
     * @param {*} pageSize 
     * @param {*} pageNumber 
     * @param {*} employeeFilter 
     * @param {*} departmentId 
     * @param {*} positionId 
     * @returns 
     */
    employeeFilter(pageSize, pageNumber, employeeFilter, departmentId, positionId) {
        return BaseAPIConfig.get(`${this.controller}/employeeFilter?pageSize=${pageSize}
                        &pageNumber=${pageNumber}
                        ${employeeFilter ? ('&employeeFilter=' + employeeFilter) : ''}
                        ${departmentId ? ('&departmentId=' + departmentId) : ''}
                        ${positionId ? ('&positionId=' + positionId) : ''}`);
    }

    /**
     * Hàm lấy mã nhân viên mới
     * NVTOAN 20/05/2021
     * @returns 
     */
    getNewEmployeeCode() {
        return BaseAPIConfig.get(`${this.controller}/NewEmployeeCode`);
    }
}

export default new EmployeesAPI();