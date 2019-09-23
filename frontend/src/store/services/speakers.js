import { api, makeServicePlugin, BaseModel } from '@/services/api'

class Speaker extends BaseModel {
  static modelName = 'Speaker'
  // eslint-disable-next-line
  constructor (data, options) {
    super(data, options)
  }
  static instanceDefaults = () => ({
    first_name: '',
    last_name: '',
    bio: null,
    photo: null,
    linkedin: null,
    org: null,
    org_url: null,
    title: null
  })
}

const servicePath = 'speakers'
const servicePlugin = makeServicePlugin({
  Model: Speaker,
  service: api.service(servicePath),
  servicePath,
  whitelist: ['$regex', '$options']
})

export default servicePlugin
