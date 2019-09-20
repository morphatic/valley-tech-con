import Vue from 'vue'
import Vuex from 'vuex'
import localforage from 'localforage'
import setupPersistence from '@/store/persistence'
import common from '@/store/modules/common'
import { api as appAPI, FeathersVuex, models } from '@/services/api'

// register Vue plugins
Vue.use(Vuex)
Vue.use(FeathersVuex)

// passthrough export of key objects
export const api = appAPI

// get the API service plugins
const requireModule = require.context('@/store/services', false, /.js$/)
const apiPlugins = requireModule.keys().map(path => requireModule(path).default)

// setup persistent local storage for the store modules
const persistence = setupPersistence({
  key: 'valley_tech_con_2019_vuex',
  feathersModels: models.api.byServicePath,
  storage: localforage
})

// plugin to handle when store has been restored
const handleRestore = () => {
  return store => {
    store._vm.$root.$data['storageReady'] = false
    store.subscribe(mutation => {
      if (mutation.type === 'RESTORE_MUTATION') {
        store._vm.$root.$data['storageReady'] = true
        store._vm.$root.$emit('storageReady')
      }
    })
  }
}

export const store = new Vuex.Store({
  strict: false,
  // strict: process.env.NODE_ENV !== 'production',
  modules: {
    common
  },
  mutations: {
    RESTORE_MUTATION: persistence.RESTORE_MUTATION
  },
  plugins: [
    persistence.plugin,
    handleRestore(),
    ...apiPlugins
  ]
})
