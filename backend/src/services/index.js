const events = require('./events/events.service.js')
const speakers = require('./speakers/speakers.service.js')
const sponsors = require('./sponsors/sponsors.service.js')
const reviews = require('./reviews/reviews.service.js')
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(events)
  app.configure(speakers)
  app.configure(sponsors)
  app.configure(reviews)
}
