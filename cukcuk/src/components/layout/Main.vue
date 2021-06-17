<template>
    <div class="main">
        <Header/>
        <Content/>
    </div>
</template>

<script>
import Header from './Header.vue'
import Content from './../employee/Content.vue'

export default {
  components: {
      Header,
      Content
  },
}
</script>

<style>

</style>