import httpStatus from 'http-status'
import express from 'express'
import bodyParser from 'body-parser'
import Knex from 'knex'
import controllers from './controllers'
import {applicationRepository} from './repositories/application'

const env = process.env.NODE_ENV || 'development'
const knexfile = require('../knexfile')
const knex = Knex(knexfile[env])

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/health', (req, res) => {
  return res.status(httpStatus.OK).json({ok: true})
})

app.get('/toggles', controllers.toggles.get())

app.get('/applications', controllers.applications.list(applicationRepository(knex)))
app.get('/applications/:id', controllers.applications.show(applicationRepository(knex)))
app.post('/applications', controllers.applications.create(applicationRepository(knex)))
app.put('/applications/:id', controllers.applications.update(applicationRepository(knex)))
app.patch('/applications/:id', controllers.applications.update(applicationRepository(knex)))
app.delete('/applications/:id', controllers.applications.destroy(applicationRepository(knex)))

export default app

