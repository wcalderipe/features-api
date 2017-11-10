import httpStatus from 'http-status'
import request from 'supertest'
import {expect} from '../testSetup'
import app from '../../src/app'

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

