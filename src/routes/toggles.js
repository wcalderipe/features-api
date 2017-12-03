import knex from '../libs/knex'
import {applicationService} from '../services/application'
import {get} from '../controllers/toggles'
import {
  applicationRepository,
  featureRepository,
  parameterRepository
} from '../repositories'

const service = applicationService({
  applicationRepository: applicationRepository(knex),
  featureRepository: featureRepository(knex),
  parameterRepository: parameterRepository(knex)
})

const togglesRouter = (app) => {
  app.get('/toggles', get(service))
}

export default togglesRouter
