<template>
    <div class="content">
        <HeaderContent v-on:openForm="openForm"/>
        <ContentUtil/>
        <Form ref="Form"/>
    </div>
</template>

<script>
import HeaderContent from './HeaderContent.vue'
import ContentUtil from './ContentUtil'
import Form from './Form.vue'

export default {
    components: {
        HeaderContent,
        ContentUtil,
        Form
    },
    data() {
        return {
            
        }
    },
    methods: {
        openForm() {
            this.$refs.Form.openForm();
        }
    },
}
</script>

<style scoped>
    @import url('../../assets/css/view/employee.css');
</style>