<template>
  <div class="map">
    <div class="google-map" id="map"></div>
  </div>
</template>

<script>
export default {
  name: 'GMap',
  data: () => ({
    lat: 53,
    lng: -2
  }),
  methods: {
    renderMap() {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: this.lat, lng: this.lng},
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false
      })
    }
  },
  mounted() {
    this.renderMap()
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
