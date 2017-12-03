import knex from '../libs/knex'
import {parametersController} from '../controllers/parameters'
import {parameterRepository} from '../repositories'

const repository = parameterRepository(knex)

const controller = parametersController(repository)

const featuresRouter = (app) => {
  app.get('/parameters/:id', controller.show)
  app.post('/parameters', controller.create)
  app.put('/parameters/:id', controller.update)
  app.patch('/parameters/:id', controller.update)
  app.delete('/parameters/:id', controller.destroy)
}

export default featuresRouter

