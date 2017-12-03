import {OK} from 'http-status'
import express from 'express'
import bodyParser from 'body-parser'
import knex from './libs/knex'
import controllers from './controllers'
import {applicationRepository, featureRepository, parameterRepository} from './repositories'
import {applicationsController} from './controllers/applications'
import {featuresController} from './controllers/features'
import {parametersController} from './controllers/parameters'
import {applicationService} from './services/application'

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/health', (req, res) => {
  return res.status(OK).json({ok: true})
})

const service = applicationService({
  applicationRepository: applicationRepository(knex),
  featureRepository: featureRepository(knex),
  parameterRepository: parameterRepository(knex)
})

app.get('/toggles', controllers.toggles.get(service))

const repositories = ({
  application: applicationRepository(knex),
  feature: featureRepository(knex),
  parameter: parameterRepository(knex)
})

const applications = applicationsController(repositories)
app.get('/applications', applications.list)
app.get('/applications/:id', applications.show)
app.get('/applications/:id/features', applications.features)
app.post('/applications', applications.create)
app.put('/applications/:id', applications.update)
app.patch('/applications/:id', applications.update)
app.delete('/applications/:id', applications.destroy)

const features = featuresController(repositories)
app.get('/features/:id', features.show)
app.get('/features/:id/parameters', features.parameters)
app.post('/features', features.create)
app.put('/features/:id', features.update)
app.patch('/features/:id', features.update)
app.delete('/features/:id', features.destroy)

const parameters = parametersController(parameterRepository(knex))
app.get('/parameters/:id', parameters.show)
app.post('/parameters', parameters.create)
app.put('/parameters/:id', parameters.update)
app.patch('/parameters/:id', parameters.update)
app.delete('/parameters/:id', parameters.destroy)

export default app

