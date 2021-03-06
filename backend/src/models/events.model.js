// events-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const events = new Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    hashtag: {
      type: String
    },
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    },
    section: {
      type: String
    },
    room: {
      type: String
    },
    speakers: [{
      type: Schema.Types.ObjectId,
      ref: 'Speaker'
    }],
    sponsor: {
      type: Schema.Types.ObjectId,
      ref: 'Sponsor'
    },
    track: {
      type: String
    }
  }, {
    timestamps: true
  })

  // validate that start and end dates are in the proper order
  events.pre('validate', function(next) {
    if (this.start > this.end) {
      next(new Error('Event cannot end before it was begun!'))
    } else {
      next()
    }
  })

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model('events')
  } catch (e) {
    return mongooseClient.model('events', events)
  }
}
