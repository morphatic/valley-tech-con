import { api, makeServicePlugin, BaseModel } from '@/services/api'

class Review extends BaseModel {
  static modelName = 'Review'
  // eslint-disable-next-line
  constructor (data, options) {
    super(data, options)
  }
  static instanceDefaults = () => ({
    event: null,
    rating: null,
    text: null,
    name: null,
    email: null,
    createdAt: null,
    updatedAt: null
  })
  static setupInstance = data => {
    // convert dates into Dates
    data.createdAt = (data.createdAt && new Date(data.createdAt)) || null
    data.updatedAt = (data.updatedAt && new Date(data.updatedAt)) || null
    return data
  }
}

const servicePath = 'reviews'
const servicePlugin = makeServicePlugin({
  Model: Review,
  service: api.service(servicePath),
  servicePath,
  whitelist: ['$regex', '$options']
})

export default servicePlugin
