// Initializes the `sponsors` service on path `/sponsors`
const { Sponsors } = require('./sponsors.class')
const createModel = require('../../models/sponsors.model')
const hooks = require('./sponsors.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/sponsors', new Sponsors(options, app))

  // Get our initialized service so that we can register hooks
  const service = app.service('sponsors')

  service.hooks(hooks)
}
