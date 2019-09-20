// Initializes the `speakers` service on path `/speakers`
const { Speakers } = require('./speakers.class')
const createModel = require('../../models/speakers.model')
const hooks = require('./speakers.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/speakers', new Speakers(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('speakers')

  service.hooks(hooks)
}
