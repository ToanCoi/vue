import BaseAPIConfig from "./BaseAPIConfig";

export default class BaseAPI {
    constructor() {
        this.controller = null;
    }

    /**
     * Hàm lấy tất cả dữ liệu
     * NVTOAN 20/06/2021
     */
    getAll() {
        return BaseAPIConfig.get(`${this.controller}`);
    }

    /**
     * Hàm lấy bản ghi theo Id
     * NVTOAN 20/06/2021
     * @param {*} id 
     */
    getById(id) {
        return BaseAPIConfig.get(`${this.controller}/${id}`)
    }

    /**
     * Hàm thêm mới dữ liệu
     * NVTOAN 20/06/2021
     * @param {*} data 
     * @returns 
     */
    insert(data) {
        return BaseAPIConfig.post(`${this.controller}`, data);
    }

    /**
     * Hàm sửa dữ liệu
     * NVTOAN 20/06/2021
     * @param {*} id 
     * @param {*} data 
     * @returns 
     */
    update(id, data) {
        return BaseAPIConfig.put(`${this.controller}/${id}`, data);
    }

    /**
     * Hàm xóa dữ liệu
     * NVTOAN 20/06/2021
     * @param {*} id 
     * @returns 
     */
    delete(id) {
        return BaseAPIConfig.delete(`${this.controller}/${id}`);
    }
}