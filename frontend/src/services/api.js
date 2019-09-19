import feathers from '@feathersjs/feathers'
import auth from '@feathersjs/authentication-client'
import feathersVuex from 'feathers-vuex'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

// instantiate a feathers client
const app = feathers()

// configure socketio
const socket = io(process.env.VUE_APP_API_URL)
app.configure(socketio(socket))


const api = app

const {
  BaseModel,
  clients,
  FeathersVuex,
  makeServicePlugin,
  models
} = feathersVuex(app, { serverAlias: 'api', idField: '_id' })

export {
  api,
  BaseModel,
  clients,
  FeathersVuex,
  makeServicePlugin,
  models
}
