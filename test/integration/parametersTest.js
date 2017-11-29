import {OK, CREATED, NO_CONTENT} from 'http-status'
import request from 'supertest'
import {expect} from '../testSetup'
import app from '../../src/app'

describe('parameters router', () => {
  describe('GET /parameters', () => {
    it('returns status 200', () => {
      return request(app)
        .get('/parameters')
        .expect(OK)
    })

    it('returns a list of parameters', () => {
      return request(app)
        .get('/parameters')
        .then((response) => {
          const parameters = response.body

          expect(parameters.length).to.equal(3)
        })
    })
  })

  describe('GET /parameters/:id', () => {
    it('returns status 200', () => {
      return request(app)
        .get('/parameters/1')
        .expect(OK)
    })

    it('returns a single parameter', () => {
      return request(app)
        .get('/parameters/1')
        .then((response) => {
          const parameter = response.body

          expect(parameter).to.have.property('id')
          expect(parameter).to.have.property('feature_id')
          expect(parameter).to.have.property('rule_json')
        })
    })
  })

  describe('POST /parameters', () => {
    const parameter = {
      feature_id: 1,
      rule_json: '{}'
    }

    it('returns status 201', () => {
      return request(app)
        .post('/parameters')
        .send(parameter)
        .expect(CREATED)
    })

    it('returns created parameter id', () => {
      return request(app)
        .post('/parameters')
        .send(parameter)
        .then((response) => {
          expect(response.body).to.have.property('id')
        })
    })
  })

  describe('DELETE /parameters/:id', () => {
    let id

    beforeEach(() => {
      return request(app)
        .post('/parameters')
        .send({feature_id: 1, rule_json: '{}'})
        .then((response) => {
          id = response.body.id
        })
    })

    it('returns status 204', () => {
      return request(app)
        .delete(`/parameters/${id}`)
        .expect(NO_CONTENT)
    })
  })

  const updateSuite = (httpVerb) => () => {
    const parameter = {
      rule_json: '{"something":"new"}'
    }

    it('returns status 200', () => {
      const requestBuilder = request(app)

      return requestBuilder[httpVerb]('/parameters/1')
        .send(parameter)
        .expect(OK)
    })

    it('returns updated parameter id', () => {
      const requestBuilder = request(app)

      return requestBuilder[httpVerb]('/parameters/1')
        .send(parameter)
        .then((response) => {
          expect(response.body).to.have.property('id')
          expect(response.body).to.have.property('feature_id')
          expect(response.body).to.have.property('rule_json')
        })
    })
  }

  describe('PUT /parameters/:id', updateSuite('put'))
  describe('PATCH /parameters/:id', updateSuite('patch'))
})

