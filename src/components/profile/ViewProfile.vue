<template>
  <div class="container view-profile">
    <div class="card" v-if="profile">
      <h2 class="deep-purple-text center">{{ profile.alias }}'s Wall</h2>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'Profile',
  data: () => ({
    profile: null
  }),
  async created() {
    let user = await db.collection('users').doc(this.$route.params.id).get()
    this.profile = user.data()

    // let ref = db.collection('users')
    // ref.doc(this.$route.params.id).get()
    // .then(user => {
    //   this.profile = user.data()
    // })
  }
}
</script>

<style>

</style>
