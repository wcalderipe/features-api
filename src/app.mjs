import httpStatus from 'http-status'
import express from 'express'
import Knex from 'knex'
import controllers from './controllers'
import {applicationRepository} from './repositories/application'

const knexfile = require('../knexfile')
const knex = Knex(knexfile.development)

const app = express()

app.get('/health', (req, res) => {
  return res.status(httpStatus.OK).json({ok: true})
})

app.get('/toggles', controllers.toggles.get())

app.get('/applications', controllers.applications.list(applicationRepository(knex)))

export default app

