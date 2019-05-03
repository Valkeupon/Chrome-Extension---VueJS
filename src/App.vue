<template>
  <div id="app" class="popup_content">
    <List></List>
    <Form></Form>
  </div>
</template>

<script>
import List from './components/list'
import Form from './components/form'

export default {
  name: 'app',
  components: {
    List,
    Form
  }
}
</script>

<style lang="scss">
  @import './assets/stylesheet/style.css';
</style>
