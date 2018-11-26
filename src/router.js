import Vue from 'vue'
import Router from 'vue-router'
import Applications from './views/Applications.vue'
import Verification from './views/Verification.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'applications',
      component: Applications
    },
    {
      path: '/verification',
      name: 'verification',
      component: Verification
    }
  ]
})
