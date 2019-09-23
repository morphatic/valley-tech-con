import Vue from 'vue'
import Router from 'vue-router'
import { store } from '@/store/'
import Home from '@/views/Home.vue'
import TheAgendaPage from '@/components/TheAgendaPage'
import { EventBus } from '@/bus'

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
    },
    {
      path: '/agenda',
      name: 'agenda',
      component: TheAgendaPage
    }
  ]
})

const loadItems = (model) => {
  // get the list of ids already loaded in the store
  const ids = store.state[model].ids
  // and then load any objects that haven't been loaded already
  return store.dispatch(`${model}/find`, { query: { $limit: 50, _id: { $nin: ids } } })
}

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
      // for each of our key models
      Promise.all(
        ['speakers', 'sponsors', 'events', 'reviews'].map(loadItems)
      ).then(() => {
        EventBus.$emit('itemsLoaded')
      })
      // then continue...
      next()
    })
  } else {
    next()
  }
}
router.beforeEach(waitForStorageToBeReady)

export default router
