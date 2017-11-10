import httpStatus from 'http-status'
import request from 'supertest'
import {expect} from '../testSetup'
import app from '../../src/app'

describe('GET /features', () => {
  it('returns status 200', () => {
    return request(app)
      .get('/features')
      .expect(httpStatus.OK)
  })
})

