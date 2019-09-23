import { api, makeServicePlugin, BaseModel } from '@/services/api'

class Event extends BaseModel {
  static modelName = 'Event'
  // eslint-disable-next-line
  constructor (data, options) {
    super(data, options)
  }
  static instanceDefaults = () => ({
    name: '',
    description: null,
    hashtag: null,
    start: null,
    end: null,
    section: null,
    reviews: { total: 0, limit: 10, skip: 0, data: [] },
    room: null,
    track: null,
    speakers: [],
    sponsor: null,
    createdAt: null,
    updatedAt: null
  })
  static setupInstance (data, { models }) {
    const { Review, Speaker, Sponsor } = models.api
    // console.log(data.createdAt)
    data.start = new Date(data.start)
    data.end = new Date(data.end)
    // hydrate related models
    data.reviews = Review.findInStore({ query: { event: data._id } })
    data.speakers = (data.speakers && data.speakers.map(s => s._id ? s : Speaker.getFromStore(s))) || []
    if (data.sponsor) {
      data.sponsor = data.sponsor._id ? data.sponsor : Sponsor.getFromStore(data.sponsor)
    }
    return data
  }
}

const servicePath = 'events'
const servicePlugin = makeServicePlugin({
  Model: Event,
  service: api.service(servicePath),
  servicePath,
  whitelist: ['$regex', '$options']
})

export default servicePlugin
