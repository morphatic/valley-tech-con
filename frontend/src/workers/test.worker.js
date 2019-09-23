import { store } from '@/store/'

self.onmessage = ({ data: { model, ids } }) => {
  // get all the items of the model NOT in the array of IDs passed in
  store.dispatch(`${model}/find`, { query: { $limit: 50, _id: { $nin: ids } } }).then(
    result => {
      // send back a serialized copy of the returned items
      console.log(result.data)
      const items = JSON.parse(JSON.stringify(result.data))
      self.postMessage({ model, items })
    }
  )
}
