<template>
  <div class="signup container">
    <form class="card-panel" @submit.prevent="signup">
      <h2 class="center deep-purple-text">SignUp</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" autocomplete="off" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" autocomplete="off" v-model="password">
      </div>
      <div class="field">
        <label for="alias">Alias:</label>
        <input type="text" name="alias" autocomplete="off" v-model="alias">
      </div>
      <p class="center red-text" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button class="btn deep-purple">SignUp</button>
      </div>
    </form>
  </div>
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'SignUp',
  data: () => ({
    email: null,
    password: null,
    alias: null,
    feedback: null,
    slug: null
  }),
  methods: {
    async signup() {
      if (this.alias && this.email && this.password) {
        this.slug = slugify(this.alias, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-@]/g,
          lower: true
        })

        let ref = await db.collection('users').doc(this.slug)
        let refGet = await ref.get()

        if(refGet.exists) {
          this.feedback = 'This alias already exists'
        } else {
          try  {
            let cred = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            await ref.set({
              alias: this.alias,
              geolocation: null,
              user_id: cred.user.uid
            })
            this.feedback = 'This alias is free to use'
            await this.$router.push({name: 'GMap'})
          } catch (e) {
            this.feedback = e.message
          }
        }

        // let ref = db.collection('users').doc(this.slug)
        // ref.get().then(doc => {
        //   if (doc.exists) {
        //     this.feedback = 'This alias already exists'
        //   } else {
        //     firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        //     .then(cred => {
        //       ref.set({
        //         alias: this.alias,
        //         geolocation: null,
        //         user_id: cred.user.uid
        //       })
        //     }).then(() => {
        //       this.$router.push({name: 'GMap'})
        //     })
        //     .catch(err => {
        //       this.feedback = err.message
        //     })
        //
        //     this.feedback = 'This alias is free to use'
        //   }
        // })
      } else {
        this.feedback = 'You must enter all fields'
      }
    }
  }
}
</script>

<style lang="sass">
  .signup
    max-width: 400px
    margin-top: 50px

    h2
      font-size: 2.5em

    .field
      margin-bottom: 15px

</style>
