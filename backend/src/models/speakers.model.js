// speakers-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const speakers = new Schema({
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    bio: {
      type: String
    },
    photo: {
      type: String
    },
    linkedin: {
      type: String
    },
    org: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    org_url: {
      type: String
    },
    talk: {
      type: Schema.Types.ObjectId,
      ref: 'Event'
    }
  }, {
    timestamps: true
  })

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model('speakers')
  } catch (e) {
    return mongooseClient.model('speakers', speakers)
  }
}
