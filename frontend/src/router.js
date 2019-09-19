import Vue from 'vue'
import Router from 'vue-router'
import { store } from '@/store/'
import Home from '@/views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    }
  ]
})

/**
 * This route hook forces the RESTORE_MUTATION to be the first one to
 * execute on a page load. It allows the app state to be recovered
 * from storage before applying any queued actions or mutations.
 *
 * @param {Route}    to   The route to which the user is headed
 * @param {Route}    from The route from which the user is coming
 * @param {Function} next Callback that signals it's okay to proceed
 */
const waitForStorageToBeReady = async (to, from, next) => {
  // if the store has not been re-hydrated yet...
  if (!store._vm.$root.$data['storageReady']) {
    // wait for that to happen
    store._vm.$root.$on('storageReady', async () => {
      // then continue...
      next()
    })
  } else {
    next()
  }
}
router.beforeEach(waitForStorageToBeReady)

export default router
