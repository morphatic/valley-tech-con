// sponsors-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const sponsors = new Schema({
    name: {
      type: String,
      required: true
    },
    url: {
      type: String
    },
    description: {
      type: String
    },
    logo: {
      type: String
    },
    level: {
      type: String,
      enum: ['Bronze', 'Silver', 'Gold', 'Platinum']
    },
    isVendor: {
      type: Boolean,
      default: false
    },
    events: [{
      type: Schema.Types.ObjectId,
      ref: 'Event'
    }]
  }, {
    timestamps: true
  })

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model('sponsors')
  } catch (e) {
    return mongooseClient.model('sponsors', sponsors)
  }
}
