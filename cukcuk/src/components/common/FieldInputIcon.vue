<template>
    <div class="field-input">
        <div class="field-input__icon" :class="customData.iconClass"></div>
        <input type="text" class="field-input__input" :placeholder="customData.placeholder">
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
}
</script>

<style scoped>
    @import url("../../assets/css/common/field-input-icon.css");
</style>