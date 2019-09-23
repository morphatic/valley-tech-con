import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#1a75bc',
        secondary: '#39b54a',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        gybt: '#39b54a',
        biot: '#16d0ff',
        ttfp: '#e02b20'
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
})
