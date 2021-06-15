import Resource from "./Resource"
import Enumeration from "./Enumeration"
import moment from "moment"

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
    return moment(dateSrc).format("DD/MM/YYYY");
 }

 /**
  * Format tên 
  * NVTOAN 15/06/2021
  * @param {string} name 
  * @returns 
  */
 CommonFn.formatName = name => {
     let fullName = name.split(' '),
         res = '';

     fullName.map(item => {
        item = item.charAt(0).toUpperCase() + item.slice(1);
        res += item + ' ';
     });

     return res.trim();
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

 CommonFn.formatDateForm = dateSrc => {
    return moment(dateSrc).format("YYYY-MM-DD");
 }

 /**
 * Hàm chuyển đổi dữ liệu để hiển thị lên bảng
 * NVTOAN 13/06/2021
 */
  CommonFn.convertOriginData = (data, dataType, enumName) => {
    let temp = ''; 
    
    if(data) {
        temp = data;

        if(typeof data == 'object' && data) {
            temp = {...data};
        }
    
        switch(dataType) {
            case Resource.DataTypeColumn.Number:
                temp = CommonFn.formatNumber(temp);
                break;
            case Resource.DataTypeColumn.Name:
                temp = CommonFn.formatName(temp);
                break;
            case Resource.DataTypeColumn.Date:
                temp = CommonFn.formatDate(temp);
                break;
            case Resource.DataTypeColumn.Enum:
                temp = CommonFn.getEnumValue(temp, enumName);
                break;
            case Resource.DataTypeColumn.DateForm:
                temp = CommonFn.formatDateForm(temp);
                break;
        }
    }
    
    return temp;
}

export default CommonFn;