import {OK} from 'http-status'
import request from 'supertest'
import app from '../../src/app'

describe('GET /toggles', () => {
  it('returns status 200', () => {
    const queryParams = {
      application: 'SampleApp',
      country: 'us',
      language: 'en',
      tripType: 'oneway'
    }

    return request(app)
      .get('/toggles')
      .query(queryParams)
      .expect(OK)
  })
})

