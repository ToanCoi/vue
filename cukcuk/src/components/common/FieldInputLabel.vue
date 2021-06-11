<template>
    <div>
        <label :for="customData.inputId" class="text-label">Mã nhân viên 
            <span v-show="customData.isRequired">
                (<span style="color: red;">*</span>)
            </span>
        </label>
        <input :type="customData.inputType" class="field-input" :placeholder="customData.placeholder" :id="customData.inputId">
    </div>
</template>

<script>
export default {
    props: {
        customData: {
            type: Object,
            require: true
        }
    }
}
</script>

<style scoped>

</style>