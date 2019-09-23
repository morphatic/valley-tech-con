const fs = require('fs')

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: '@import "~@/sass/main.scss"'
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') {
      config.devServer = {
        disableHostCheck: true,
        host: 'vtc.test',
        https: {
          key: fs.readFileSync('./vtc.test-key.pem', 'utf8'),
          cert: fs.readFileSync('./vtc.test.pem', 'utf8')
        }
      }
    }
  },
  // pwa: {
  //   name: 'Valley Tech Con 2019',
  //   themeColor: '#39b54a',
  //   msTileColor: '#ffffff',
  //   workboxPluginMode: 'InjectManifest',
  //   workboxOptions: {
  //     swSrc: 'src/service-worker.js'
  //   }
  // },
  transpileDependencies: [
    '@feathersjs',
    'debug',
    'feathers-vuex',
    'vuetify'
  ]
}
