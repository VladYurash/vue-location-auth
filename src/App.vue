<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/lauout/Navbar'

export default {
  name: 'App',
  components: {Navbar},
}
</script>

<style lang="sass">
body
  background-color: #ddd
</style>
