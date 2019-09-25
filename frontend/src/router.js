import Vue from 'vue'
import Router from 'vue-router'
import { VueOfflineStorage } from 'vue-offline'
import { store } from '@/store/'
import TheHomePage from '@/components/TheHomePage'
import TheAgendaPage from '@/components/TheAgendaPage'
import TheSponsorsPage from '@/components/TheSponsorsPage'
import { EventBus } from '@/bus'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: TheHomePage
    },
    {
      path: '/sponsors',
      name: 'sponsors',
      component: TheSponsorsPage
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
      // start by assuming we're online
      let isOnline = true
      // check to see if the "is-online" key has been set
      if (VueOfflineStorage.keys.includes('is-online')) {
        // get our online status
        isOnline = VueOfflineStorage.get('is-online')
      }
      // if we are online
      if (isOnline) {
        EventBus.$emit('itemsLoaded', false)
        // for each of our key models, try to load any items missing from our store
        Promise.all(
          ['speakers', 'sponsors', 'events', 'reviews'].map(loadItems)
        ).then(() => {
          // then let the app know they're loaded
          EventBus.$emit('itemsLoaded', true)
          // and continue
          next()
        })
      } else {
        // if we are offline
        // just decide we've got all we're going to get
        EventBus.$emit('itemsLoaded')
        // and continue
        next()
      }
    })
  } else {
    next()
  }
}
router.beforeEach(waitForStorageToBeReady)

export default router
