var Resource = Resource || {};

//Kiểu dữ liệu của cột trong grid
Resource.DataTypeColumn = {
    Number: "Number",
    Date: "Date",
    Enum: "Enum",
    Email: "Email"
}

//Giới tính
Resource.Gender = {
    Male: "Nam",
    Female: "Nữ",
    Other: "Khác"
}

//Trạng thái làm việc
Resource.WorkStatus = {
    Active: "Đang làm việc",
    Intern: "Đang thử việc",
    Retired: "Đã nghỉ việc"
}

//Các chế độ của form
Resource.FormType = {
    Add: "Add",
    Edit: "Edit",
    Delete: "Delete",
    Refresh: "Refresh"
}

export default Resource;