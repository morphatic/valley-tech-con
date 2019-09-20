// reviews-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const reviews = new Schema({
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    text: {
      type: String
    },
    name: {
      type: String
    },
    email: {
      type: String,
      validator: v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v)
    }
  }, {
    timestamps: true
  })

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model('reviews')
  } catch (e) {
    return mongooseClient.model('reviews', reviews)
  }
}
