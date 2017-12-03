import knex from '../libs/knex'
import {featuresController} from '../controllers/features'
import {featureRepository, parameterRepository} from '../repositories'

const repositories = ({
  feature: featureRepository(knex),
  parameter: parameterRepository(knex)
})

const controller = featuresController(repositories)

const featuresRouter = (app) => {
  app.get('/features/:id', controller.show)
  app.get('/features/:id/parameters', controller.parameters)
  app.post('/features', controller.create)
  app.put('/features/:id', controller.update)
  app.patch('/features/:id', controller.update)
  app.delete('/features/:id', controller.destroy)
}

export default featuresRouter

