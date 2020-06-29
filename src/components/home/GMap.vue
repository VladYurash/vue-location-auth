<template>
  <div class="map">
    <div class="google-map" id="map"></div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import db from '@/firebase/init'

export default {
  name: 'GMap',
  data: () => ({
    lat: 53,
    lng: -2
  }),
  methods: {
    async renderMap() {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: this.lat, lng: this.lng},
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false
      })

      let users = await db.collection('users').get()
      users.docs.forEach(doc => {
        let data = doc.data()
        if (data.geolocation) {
          let marker = new google.maps.Marker({
            position: {
              lat: data.geolocation.lat,
              lng: data.geolocation.lng
            },
            map
          })
          marker.addListener('click', () => {
            this.$router.push({name: 'ViewProfile', params: {id: doc.id}})
          })
        }
      })
    }
  },
  mounted() {
    let user = firebase.auth().currentUser

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
        this.lat = position.coords.latitude
        this.lng = position.coords.longitude
        let snapshot = await db.collection('users').where('user_id', '==', user.uid).get()
        snapshot.forEach(doc => {
          db.collection('users').doc(doc.id).update({
            geolocation: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }
          })
        })
        this.renderMap()

        // db.collection('users').where('user_id', '==', user.uid).get()
        // .then(snapshot => {
        //   snapshot.forEach(doc => {
        //     db.collection('users').doc(doc.id).update({
        //       geolocation: {
        //         lat: position.coords.latitude,
        //         lng: position.coords.longitude,
        //       }
        //     })
        //   })
        // }).then(() => (this.renderMap()))

      }, e => {
        console.error(e)
        this.renderMap()
      }, {maximumAge: 60000, timeout: 3000})
    } else {
      this.renderMap()
    }
  }
}
</script>

<style lang="sass">
.google-map
  position: absolute
  top: 0
  left: 0
  z-index: -1
  width: 100%
  height: 100%
  margin: 0 auto
  background-color: #fff
</style>
