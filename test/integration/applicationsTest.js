import {OK} from 'http-status'
import request from 'supertest'
import {expect} from '../testSetup'
import app from '../../src/app'

describe('applications router', () => {
  describe('GET /applications', () => {
    it('returns status 200', () => {
      return request(app)
        .get('/applications')
        .expect(OK)
    })

    it('returns a list of applications', () => {
      return request(app)
        .get('/applications')
        .then((response) => {
          const {applications} = response.body

          expect(applications.length).to.equal(2)
        })
    })
  })
})

