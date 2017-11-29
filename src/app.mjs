import {OK} from 'http-status'
import express from 'express'
import bodyParser from 'body-parser'
import Knex from 'knex'
import controllers from './controllers'
import {applicationRepository} from './repositories'
import {applicationController} from './controllers/applications'

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

const applications = applicationController(applicationRepository(knex))
app.get('/applications', applications.list)
app.get('/applications/:id', applications.show)
app.post('/applications', applications.create)
app.put('/applications/:id', applications.update)
app.patch('/applications/:id', applications.update)
app.delete('/applications/:id', applications.destroy)

export default app

