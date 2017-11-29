import {OK} from 'http-status'
import express from 'express'
import bodyParser from 'body-parser'
import Knex from 'knex'
import controllers from './controllers'
import {applicationRepository, featureRepository} from './repositories'
import {applicationsController} from './controllers/applications'
import {featuresController} from './controllers/features'

const env = process.env.NODE_ENV || 'development'
const knexfile = require('../knexfile')
const knex = Knex(knexfile[env])

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/health', (req, res) => {
  return res.status(OK).json({ok: true})
})

app.get('/toggles', controllers.toggles.get())

const applications = applicationsController(applicationRepository(knex))
app.get('/applications', applications.list)
app.get('/applications/:id', applications.show)
app.post('/applications', applications.create)
app.put('/applications/:id', applications.update)
app.patch('/applications/:id', applications.update)
app.delete('/applications/:id', applications.destroy)

const features = featuresController(featureRepository(knex))
app.get('/features', features.list)
app.get('/features/:id', features.show)
app.post('/features', features.create)
app.put('/features/:id', features.update)
app.patch('/features/:id', features.update)
app.delete('/features/:id', features.destroy)

export default app

