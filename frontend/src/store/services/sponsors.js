import { api, makeServicePlugin, BaseModel } from '@/services/api'

class Sponsor extends BaseModel {
  static modelName = 'Sponsor'
  // eslint-disable-next-line
  constructor (data, options) {
    super(data, options)
  }
  static instanceDefaults = () => ({
    name: '',
    url: null,
    description: null,
    logo: null,
    level: null,
    isVendor: false
  })
}

const servicePath = 'sponsors'
const servicePlugin = makeServicePlugin({
  Model: Sponsor,
  service: api.service(servicePath),
  servicePath,
  whitelist: ['$regex', '$options']
})

export default servicePlugin
