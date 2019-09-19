/**
 * @module store/modules/common
 * Defines common app settings
 */
// mutation types
const SET_DESTINATION = 'SET_DESTINATION'
const TOGGLE_NAV_DRAWER_MINI = 'TOGGLE_NAV_DRAWER_MINI'
const TOGGLE_NAV_DRAWER_OPEN = 'TOGGLE_NAV_DRAWER_OPEN'

/**
 * @property {string}  destination     For delayed navigation, the intended destination
 * @property {boolean} navDrawerIsMini Is the app's nav drawer in the "mini" state
 * @property {boolean} navDrawerIsOpen Is the app's nav drawer open or closed
 */
const initialState = {
  destination: null,
  navDrawerIsMini: false,
  navDrawerIsOpen: true,
}

const state = { ...initialState }

const mutations = {
  [SET_DESTINATION] (state, destination) {
    state.destination = destination
  },
  [TOGGLE_NAV_DRAWER_MINI] (state) {
    state.navDrawerIsMini = !state.navDrawerIsMini
  },
  [TOGGLE_NAV_DRAWER_OPEN] (state) {
    state.navDrawerIsOpen = !state.navDrawerIsOpen
  }
}

const actions = {
  setDestination ({ commit }, destination) {
    commit(SET_DESTINATION, destination)
  },
  toggleNavDrawerMini ({ commit }) {
    commit(TOGGLE_NAV_DRAWER_MINI)
  },
  toggleNavDrawerOpen ({ commit }) {
    commit(TOGGLE_NAV_DRAWER_OPEN)
  }
}

const getters = {
  navDrawerIsMini: state => state.navDrawerIsMini,
  navDrawerIsOpen: state => state.navDrawerIsOpen
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
