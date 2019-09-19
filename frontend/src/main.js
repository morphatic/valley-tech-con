import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import App from '@/App.vue'
import router from '@/router'
import { store } from '@/store'
import '@/registerServiceWorker'
import vuetify from '@/plugins/vuetify'

Vue.config.productionTip = false
Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_GOOGLE_ANALYTICS_TRACKING_ID,
  router
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
