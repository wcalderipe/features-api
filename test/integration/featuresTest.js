import {OK, CREATED, NO_CONTENT} from 'http-status'
import request from 'supertest'
import {expect} from '../testSetup'
import app from '../../src/app'

describe('features router', () => {
  describe('GET /features', () => {
    it('returns status 200', () => {
      return request(app)
        .get('/features')
        .expect(OK)
    })

    it('returns a list of features', () => {
      return request(app)
        .get('/features')
        .then((response) => {
          const features = response.body

          expect(features.length).to.equal(3)
        })
    })
  })

  describe('GET /features/:id', () => {
    it('returns status 200', () => {
      return request(app)
        .get('/features/1')
        .expect(OK)
    })

    it('returns a single feature', () => {
      return request(app)
        .get('/features/1')
        .then((response) => {
          const feature = response.body

          expect(feature).to.have.property('id')
          expect(feature).to.have.property('application_id')
          expect(feature).to.have.property('name')
        })
    })
  })

  describe('POST /features', () => {
    const feature = {
      application_id: 1,
      name: 'newFeature'
    }

    it('returns status 201', () => {
      return request(app)
        .post('/features')
        .send(feature)
        .expect(CREATED)
    })

    it('returns created feature id', () => {
      return request(app)
        .post('/features')
        .send(feature)
        .then((response) => {
          expect(response.body).to.have.property('id')
        })
    })
  })

  describe('DELETE /features/:id', () => {
    let id

    beforeEach(() => {
      return request(app)
        .post('/features')
        .send({application_id: 1, name: 'featureToDelete'})
        .then((response) => {
          id = response.body.id
        })
    })

    it('returns status 204', () => {
      return request(app)
        .delete(`/features/${id}`)
        .expect(NO_CONTENT)
    })
  })

  const updateSuite = (httpVerb) => () => {
    const application = {
      name: 'featureToUpdate'
    }

    it('returns status 200', () => {
      const requestBuilder = request(app)

      return requestBuilder[httpVerb]('/features/1')
        .send(application)
        .expect(OK)
    })

    it('returns updated feature id', () => {
      const requestBuilder = request(app)

      return requestBuilder[httpVerb]('/features/1')
        .send(application)
        .then((response) => {
          expect(response.body).to.have.property('id')
          expect(response.body).to.have.property('application_id')
          expect(response.body).to.have.property('name')
        })
    })
  }

  describe('PUT /features/:id', updateSuite('put'))
  describe('PATCH /features/:id', updateSuite('patch'))
})

