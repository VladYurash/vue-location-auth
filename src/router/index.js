import Vue from 'vue'
import Router from 'vue-router'
import GMap from '@/components/home/GMap'
import SignUp from '@/components/auth/SignUp'
import Login from '@/components/auth/Login'
import ViewProfile from '@/components/profile/ViewProfile'
import firebase from 'firebase/app'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GMap',
      component: GMap,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile/:id',
      name: 'ViewProfile',
      component: ViewProfile,
      meta: {
        requireAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requireAuth)) {
    let user = firebase.auth().currentUser
    if (user) {
      next()
    } else {
      next({name: 'Login'})
    }
  } else {
    next()
  }
})

export default router
