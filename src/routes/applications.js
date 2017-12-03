import knex from '../libs/knex'
import {applicationsController} from '../controllers/applications'
import {applicationRepository, featureRepository} from '../repositories'

const repositories = ({
  application: applicationRepository(knex),
  feature: featureRepository(knex)
})

const controller = applicationsController(repositories)

const applicationsRouter = (app) => {
  app.get('/applications', controller.list)
  app.get('/applications/:id', controller.show)
  app.get('/applications/:id/features', controller.features)
  app.post('/applications', controller.create)
  app.put('/applications/:id', controller.update)
  app.patch('/applications/:id', controller.update)
  app.delete('/applications/:id', controller.destroy)
}

export default applicationsRouter
