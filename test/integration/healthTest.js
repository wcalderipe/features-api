const httpStatus = require('http-status')
const request = require('supertest')
const {expect} = require('../testSetup')
const app = require('../../src/app')

describe('GET /health', () => {
  it('returns status 200 and ok response body', () => {
    return request(app)
      .get('/health')
      .expect(httpStatus.OK)
      .then((response) => {
	expect(response.body).to.deep.equal({ok: true})
      })
  })
})

