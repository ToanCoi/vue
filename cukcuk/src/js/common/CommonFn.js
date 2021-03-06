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
     if(dateSrc)
        dateSrc =  moment(dateSrc).format("DD/MM/YYYY");

    return dateSrc;
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
        resource  = Resource[enumName];

    for(let propName in enumeration) {
        if(enumeration[propName] == data) {
            data = resource[propName];
        }
    }

    return data;
}

 /**
 * Hàm chuyển đổi dữ liệu để hiển thị lên bảng
 * NVTOAN 13/06/2021
 */
  CommonFn.convertOriginData = (data, dataType, enumName) => {
    let temp = ''; 
    
    if(data != null) {
        temp = data;
    
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
        }
    }
    
    return temp;
}

export default CommonFn;