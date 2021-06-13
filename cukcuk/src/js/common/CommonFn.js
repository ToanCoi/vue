import Resource from "./Resource";
import Enumeration from "./Enumeration";

var CommonFn = CommonFn || {};

/**
 * hàm format số nguyên
 * NVTOAN 13/06/2021
 */
 CommonFn.formatNumber = number => {
    if(number && !isNaN(number)) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
        return number;
    }
 }

 /**
  * Format ngày tháng từ dữ liệu thô
  * NVTOAN 13/06/2021
  * @param {*} dateSrc 
  * @returns 
  */
 CommonFn.formatDate = dateSrc => {
    let date = new Date(dateSrc),
        year = date.getFullYear().toString(),
        month = (date.getMonth() + 1).toString().padStart(2, '0'),
        day = date.getDate().toString().padStart(2, '0');

    return `${day}/${month}/${year}`;
 }

 /**
  * Hàm lấy dữ liệu từ dang Enum
  * NVTOAN 13/06/2021
  */
 CommonFn.getEnumValue = (data, enumName) => {
    let enumeration = Enumeration[enumName],
        resource = Resource[enumName];

    for(var prop in enumeration) {
        if(enumeration[prop] == data) {
            data = resource[prop];
        }
    }
    
    return data;
 }


export default CommonFn;