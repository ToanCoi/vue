<template>
    <div class="popup__wrapper" v-if="isShow">
        <div class="popup">
            <div class="popup__header">
                <div class="header-cancel" @click="isShow = false">
                    <div class="cancel-icon"></div>
                </div>
            </div>
            <div class="form-content">
                <div class="content-content">
                    <div class="content-header text-title"><span>Xóa bản ghi</span></div>
                    <div class="content-body">
                        <div class="icon-warning"></div>
                        <div class="text-confirm text-label">
                            Bạn có chắc muốn xóa <span class="text-label-input">{{listItem.length}}</span> bản ghi không?
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-footer">
                <div class="btn-cancel text-label" @click="isShow = false">Hủy</div>
                <div class="btn-delete text-label" @click="deleteItems">Xóa</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        customData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isShow: false,
            listItem: null
        }
    },
    methods: {
        /**
         * Hàm mở pop up
         */
        open(listId) {
            this.isShow = true;
            this.listItem = listId;
        },

        /**
         * Hàm xóa tất cả bản ghi
         */
        deleteItems() {
            this.$bus.emit('loader', true);
            for(let i = 0; i < this.listItem.length; i++) {
                this.axios.delete('http://cukcuk.manhnv.net/v1/Employees', this.listItem[i]).then((response) => {
                    console.log(response);
                });
            }
            this.isShow = false;
            this.$emit('refreshData');
        }
    }
}
</script>

<style scoped>
.popup__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* display: none; */
}
.popup {
    position: absolute;
    width: 500px;
    height: 200px;
    background-color: #fff;
    box-shadow: #ccc 1px 0px 6px 3px;
    border-radius: 4px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}

.popup__header {
    width: 100%;
    height: 24px;
    
}

.header-cancel {
    height: 35px;
    width: 35px;
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.cancel-icon {
    width: 24px;
    height: 24px;
    background: url("../../assets/icon/x.svg") no-repeat;
    background-size: 24px;
}

.header-cancel:hover {
    background-color: #f4f4f4;
}

    .popup .content-body {
        position: absolute;
        width: 100%;
        top: 48px;
        bottom: 24px;
        display: flex;
    }
    .popup .form-content {
        width: 100%;
        height: calc(100% - 84px);
        position: relative;
    }
    .popup .form-footer {
        width: 100%;
        height: 60px;
        background-color: #f4f4f4;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
.content-content {
    position: absolute;
    top: 0px;
    left: 24px;
    right: 24px;
    bottom: 0px;
}
    .content-content .content-header {
        width: 100%;
        height: 24px;
        
    }
    .content-content .content-header span {
        font-size: 18px;
    }
.icon-warning {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: rgb(235, 235, 235);
    background-image: url("../../assets/icon/icon-warning.jpg");
    background-repeat: no-repeat;
    background-size: 26px;
    background-position: center;
}
.text-confirm {
    position: absolute;
    left: 46px; 
    right: 0px;
    height: 100%;
}
.btn-delete {
    height: 40px;
    width: 80px;
    background-color: #f65454;
    border-radius: 4px;
    color: #fff;
    text-align: center;
    line-height: 40px;
    margin-right: 24px;
}
.btn-delete:hover {
    background-color: #fa7e7e;
    cursor: pointer;
}
.btn-cancel {
    height: 40px;
    width: 80px;
    background-color: #f4f4f4;
    border-radius: 4px;
    color: #000;
    text-align: center;
    line-height: 40px;
    margin-right: 16px;
}
.btn-cancel:hover {
    background-color: #e5e5e5;
    cursor: pointer;
}

</style>