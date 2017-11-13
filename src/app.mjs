import httpStatus from 'http-status'
import express from 'express'
import controllers from './controllers'

const app = express()

app.get('/health', (req, res) => {
  return res.status(httpStatus.OK).json({ok: true})
})

app.get('/features', controllers.features.get())

export default app

