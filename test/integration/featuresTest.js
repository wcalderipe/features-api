import {OK} from 'http-status'
import request from 'supertest'
import app from '../../src/app'

describe('GET /features', () => {
  it('returns status 200', () => {
    const queryParams = {
      application: 'CoolApplication',
      country: 'us',
      language: 'en',
      tripType: 'oneway'
    }

    return request(app)
      .get('/features')
      .query(queryParams)
      .expect(OK)
  })
})

