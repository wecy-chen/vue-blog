<template>
  <div id="app">
    <v-nav></v-nav>
    	<router-view></router-view>
  </div>
</template>
<script>
import Nav from './components/Nav.vue'
export default {
  name: 'app',
  data () {
    return {}
  },
  components: {
    'v-nav': Nav
  }
}
</script>
<style>
</style>
