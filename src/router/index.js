import Vue from 'vue'
import Router from 'vue-router'
import GMap from '@/components/home/GMap'
import SignUp from '@/components/auth/SignUp'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GMap',
      component: GMap
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ]
})
