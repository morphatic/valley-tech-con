// import { diff } from 'deep-object-diff'
import { api, makeServicePlugin, BaseModel } from '@/services/api'

class Event extends BaseModel {
  static modelName = 'Event'
  // eslint-disable-next-line
  constructor (data, options) {
    super(data, options)
  }
  static diffOnPatch (data) {
    // not changing anything for now
    return data
  }
  static instanceDefaults = () => ({
    name: '',
    aliases: [],
    slug: '',
    abbr: '',
    colors: {
      primary: '#000000',
      secondary: '#ffffff',
      tertiary: '#777777',
      other: ''
    },
    logo: null,
    website: null,
    teams: null,
    createdAt: null,
    updatedAt: null
  })
}

const servicePath = 'events'
const servicePlugin = makeServicePlugin({
  Model: Event,
  service: api.service(servicePath),
  servicePath,
  whitelist: ['$regex', '$options']
})

export default servicePlugin
