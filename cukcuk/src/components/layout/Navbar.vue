<template>
    <div class="nav-wrapper">
            <nav class="nav-bar" nav-type="big" id="nav-bar">
                <div class="nav__header">
                    <div class="toggle-icon" @click="toggleNav">
                    </div>
                    <div class="logo">
                    </div>
                </div>
                <div class="nav__list">
                    <router-link to="/" class="nav__list-item text-label nav__item-selected">
                        <div class="nav__item-icon">
                            <div class="item__icon icon-dashboard"></div>
                        </div>
                        <span class="nav__item-name">Tổng quan</span>
                    </router-link>
                    <div class="nav__list-item text-label">
                        <div class="nav__item-icon">
                            <div class="item__icon icon-report"></div>
                        </div>
                        <span class="nav__item-name">Báo cáo</span>
                    </div>
                    <div class="nav__list-item text-label">
                        <div class="nav__item-icon">
                            <div class="item__icon icon-dashboard"></div>
                        </div>
                        <span class="nav__item-name">Mua hàng</span>
                    </div>
                    <router-link to='/Employee' class="nav__list-item text-label">
                        <div class="nav__item-icon">
                            <div class="item__icon icon-dic-employee"></div>
                        </div>
                        <span class="nav__item-name">Danh mục nhân viên</span>
                    </router-link>
                    <div class="nav__list-item text-label">
                        <div class="nav__item-icon">
                            <div class="item__icon icon-dic-employee"></div>
                        </div>
                        <span class="nav__item-name">Danh mục nhân viên</span>
                    </div>
                    <div class="nav__list-item text-label">
                        <div class="nav__item-icon">
                            <div class="item__icon icon-setting"></div>
                        </div>
                        <span class="nav__item-name">Thiết lập hệ thống</span>
                    </div>
                </div>
            </nav>
        </div>
</template>

<script>
export default {
    data() {
        return {
            smallNav: false
        }
    },
    methods: {
        toggleNav() {
            this.$emit('toggleNav');
        }
    },
}
</script>

<style scoped>
    @import url("../../assets/css/common/navbar.css");
</style>