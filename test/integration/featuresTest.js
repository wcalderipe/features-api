const httpStatus = require('http-status')
const request = require('supertest')
const {expect} = require('testSetup')
const app = require('app')

describe('GET /features', () => {
  it('returns status 200', () => {
    return request(app)
      .get('/features')
      .expect(httpStatus.OK)
  })
})

