import express from 'express'
import bodyParser from 'body-parser'
import {
  applicationsRouter,
  featuresRouter,
  parametersRouter,
  togglesRouter,
  healthRouter
} from './routes'

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

healthRouter(app)
applicationsRouter(app)
featuresRouter(app)
parametersRouter(app)
togglesRouter(app)

export default app

