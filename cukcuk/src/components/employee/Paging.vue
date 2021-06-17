<template>
    <div class="paging" id="EmployeePaging">
        <div class="paging__left">
            <span class="left__text">Hiển thị 1-10/10000 nhân viên</span>
        </div>
        <div class="paging__center">
            <div class="paging-item page-direction">
                <div class="paging-icon first-page__icon"></div>
            </div>
            <div class="paging-item page-direction">
                <div class="paging-icon pre-page__icon"></div>
            </div>
            <div class=" paging-item page__num paging-item-select">
                <span>1</span>
            </div>
            <div class="paging-item page__num">
                <span>2</span>
            </div>
            <div class="paging-item page__num">
                <span>3</span>
            </div>
            <div class="paging-item page__num">
                <span>4</span>
            </div>
            <div class="paging-item page-direction">
                <div class="paging-icon next-page__icon"></div>
            </div>
            <div class="paging-item page-direction">
                <div class="paging-icon last-page__icon"></div>
            </div>
        </div>
        <div class="paging__right">
            <span class="rigt__text">10 nhân viên/trang</span>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    @import url('../../assets/css/common/paging.css');
</style>