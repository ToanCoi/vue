import BaseAPI from "../../base/BaseAPI";
import BaseAPIConfig from "../../base/BaseAPIConfig";

class EmployeesAPI extends BaseAPI {
    constructor() {
        super();

        this.controller = "v1/Employees";
    }

    /**
     * Hàm filter dữ liệu
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

    getNewEmployeeCode() {
        return BaseAPIConfig.get(`${this.controller}/NewEmployeeCode`);
    }
}

export default new EmployeesAPI();