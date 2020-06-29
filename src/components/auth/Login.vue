<template>
  <div class="container login">
    <form class="card-panel" @submit.prevent="onLogin">
      <h2 class="center deep-purple-text">Login</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" autocomplete="off" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" autocomplete="off" v-model="password">
      </div>
      <p v-if="feedback" class="red-text">{{ feedback }}</p>
      <div class="field center">
        <button class="btn deep-purple">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/app'

export default {
  name: 'Login',
  data: () => ({
    email: null,
    password: null,
    feedback: null
  }),
  methods: {
    async onLogin() {
      try {
        if (this.email && this.password) {
          await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          await this.$router.push({name: 'GMap'})
          this.feedback = null
        } else {
          this.feedback = 'Please fill both fields'
        }
      } catch (e) {
        this.feedback = e.message
      }
    }
  }
}
</script>

<style lang="sass">
.login
  max-width: 400px
  margin-top: 50px

  h2
    font-size: 2.5em

  .field
    margin-bottom: 15px
</style>
