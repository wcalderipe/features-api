import {OK, NOT_FOUND} from 'http-status'
import request from 'supertest'
import {expect} from '../testSetup'
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

  context('when application is not found', () => {
    const queryParams = {
      application: 'unkwonApp'
    }

    it('returns status 404', () => {
      return request(app)
        .get('/toggles')
        .query(queryParams)
        .expect(NOT_FOUND)
    })

    it('returns error code', () => {
      const expectedBody = {
        code: 'ERR_APPLICATION_NOT_FOUND'
      }

      return request(app)
        .get('/toggles')
        .query(queryParams)
        .then((response) => {
          expect(response.body).to.deep.equal(expectedBody)
        })
    })
  })
})

