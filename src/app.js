const httpStatus = require('http-status')
const express = require('express')
const controllers = require('./controllers')

const app = express()

app.get('/health', (req, res) => {
  return res.status(httpStatus.OK).json({ok: true})
})

app.get('/features', controllers.features.get)

module.exports = app

