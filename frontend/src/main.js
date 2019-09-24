import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import App from '@/App.vue'
import router from '@/router'
import { store } from '@/store'
import '@/registerServiceWorker'
import vuetify from '@/plugins/vuetify'
import AnEventDialog from '@/components/AnEventDialog'

Vue.config.productionTip = false
Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_GOOGLE_ANALYTICS_TRACKING_ID,
  router
})
Vue.component('an-event-dialog', AnEventDialog)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
