import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase/app'

Vue.config.productionTip = false

let app = null

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
})

