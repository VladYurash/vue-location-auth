<template>
  <nav class="deep-purple darken-1">
    <div class="container">
      <router-link :to="{name: 'GMap'}" class="left brand-logo">VueGeo</router-link>
      <ul class="right">
        <li v-if="!user"><router-link :to="{name: 'SignUp'}">SignUp</router-link></li>
        <li v-if="!user"><router-link :to="{name: 'Login'}">Login</router-link></li>
        <li v-if="user"><a>{{ user.email }}</a></li>
        <li v-if="user"><a @click="logout">LogOut</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import firebase from 'firebase/app'

export default {
  name: 'Navbar',
  data: () => ({
    user: null
  }),
  methods: {
    async logout() {
      await firebase.auth().signOut()
      await this.$router.push({name: 'Login'})
    }
  },
  created() {
    let user = firebase.auth().currentUser
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user
      } else {
        this.user = null
      }
    })
  }
}
</script>

<style lang="sass">

</style>
