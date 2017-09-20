const httpStatus = require('http-status')
const express = require('express')
const app = express()

app.get('/health', (req, res) => {
  return res.status(httpStatus.OK).json({ok: true})
})

module.exports = app

