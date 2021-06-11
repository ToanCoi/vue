<template>
    <div class="dropdown" :style="{width: customWidth}">
        <div class="dropdown__btn" @click="isShow = !isShow">
            <div class="dropdown__btn-left">
                <div class="dropdown__content">
                    <span class="dropdown__text">{{customData.defaultValue}}</span>
                </div>
                <div class="dropdown__icon-unselect">
                    <i class="fas fa-times fa-xs"></i>
                </div>
            </div>
            <div class="dropdown__icon-arrow">
                <i class="fas fa-chevron-down fa-xs"></i>
            </div>
        </div>
        <div class="dropdown__list" v-show="isShow">
            <div class="dropdown__list-item" v-for="item in customData.items" :key="item">
                <i class="fas fa-check fa-xs dropdown__item-icon"></i>
                <span class="dropdown__item-name">{{item}}</span>
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
            customWidth: "calc(var(--column-width) * " + this.customData.width +" )"
        }
    }
}
</script>

<style scoped>
    @import url("../../assets/css/common/dropdown.css");
</style>