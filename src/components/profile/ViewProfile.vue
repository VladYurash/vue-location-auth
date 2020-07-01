<template>
  <div class="container view-profile">
    <div class="card" v-if="profile">
      <h2 class="deep-purple-text center">{{ profile.alias }}'s Wall</h2>
      <ul class="comments collection">
        <li v-for="(comment, index) in comments" :key="index">
          <div class="deep-purple-text">{{ comment.from }}</div>
          <div class="gray-text text-darken-2">{{ comment.content }}</div>
        </li>
      </ul>
      <form @submit.prevent="addComment">
        <div class="field">
          <label for="comment">Add a comment</label>
          <input type="text" name="comment" v-model="newComment">
          <p v-if="feedback" class="center red-text">{{ feedback }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'Profile',
  data: () => ({
    profile: null,
    newComment: null,
    feedback: null,
    user: null,
    comments: []
  }),
  methods: {
    addComment() {
      if (this.newComment) {
        this.feedback = null
        db.collection('comments').add({
          to: this.$route.params.id,
          from: this.user.alias,
          content: this.newComment,
          time: Date.now()
        }).then(() => {
          this.newComment = null
        })
      } else {
        this.feedback = 'You must enter a comment'
      }
    }
  },
  async created() {
    //get users
    let user = await db.collection('users').doc(this.$route.params.id).get()
    let id = await db.collection('users').where('user_id', '==', firebase.auth().currentUser.uid).get()
    this.profile = user.data()
    id.forEach(doc => {
      this.user = {
        ...doc.data(),
        id: doc.id
      }
    })

    //get comments
    db.collection('comments').where('to', '==', this.$route.params.id)
    .onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          this.comments.unshift({
            from: change.doc.data().from,
            content: change.doc.data().content
          })
        }
      })
    })

    // let ref = db.collection('users')
    // ref.doc(this.$route.params.id).get()
    // .then(user => {
    //   this.profile = user.data()
    // })
  }
}
</script>

<style lang="sass">
.view-profile

  .card
    margin-top: 20px
    padding: 20px

  h2
    margin-top: 0
    font-size: 2em

  li
    padding: 10px
    border-bottom: 1px solid #eee

</style>
