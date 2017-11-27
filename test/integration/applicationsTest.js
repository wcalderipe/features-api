import {OK, CREATED} from 'http-status'
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

  describe('GET /applications/:id', () => {
    it('returns status 200', () => {
      return request(app)
        .get('/applications/1')
        .expect(OK)
    })

    it('returns a single application', () => {
      return request(app)
        .get('/applications/1')
        .then((response) => {
          const {application} = response.body

          expect(application).to.have.property('id')
          expect(application).to.have.property('name')
        })
    })
  })

  describe('POST /applications', () => {
    const application = {
      name: 'NewApplication'
    }

    it('returns status 201', () => {
      return request(app)
        .post('/applications')
        .send(application)
        .expect(CREATED)
    })

    it('returns created application id', () => {
      return request(app)
        .post('/applications')
        .send(application)
        .then((response) => {
          expect(response.body).to.have.property('id')
        })
    })
  })

  const updateSuite = (httpVerb) => () => {
    const application = {
      name: 'UpdatedApp'
    }

    it('returns status 200', () => {
      const requestBuilder = request(app)

      return requestBuilder[httpVerb]('/applications/1')
        .send(application)
        .expect(OK)
    })

    it('returns updated application id', () => {
      const requestBuilder = request(app)

      return requestBuilder[httpVerb]('/applications/1')
        .send(application)
        .then((response) => {
          expect(response.body).to.have.property('application')
        })
    })
  }

  describe('PUT /applications', updateSuite('put'))
  describe('PATCH /applications', updateSuite('patch'))
})

