import {OK, CREATED, NO_CONTENT} from 'http-status'
import request from 'supertest'
import {expect, createKnex, cleanTable} from '../testSetup'
import app from '../../src/app'
import {
  applicationRepository,
  TABLE_NAME as APPLICATIONS_TABLE_NAME
} from '../../src/repositories/application'
import {
  featureRepository,
  TABLE_NAME as FEATURES_TABLE_NAME
} from '../../src/repositories/feature'
import {
  parameterRepository,
  TABLE_NAME as PARAMETERS_TABLE_NAME
} from '../../src/repositories/parameter'

const knex = createKnex()

describe('parameters router', () => {
  let parameterId, featureId, applicationId

  before(async () => {
    await cleanTable(PARAMETERS_TABLE_NAME)
    await cleanTable(FEATURES_TABLE_NAME)
    await cleanTable(APPLICATIONS_TABLE_NAME)

    applicationId = await applicationRepository(knex).create({
      name: 'application01'
    })

    featureId = await featureRepository(knex).create({
      application_id: applicationId,
      name: 'feature01'
    })

    parameterId = await parameterRepository(knex).create({
      feature_id: featureId,
      rule_json: '{}'
    })
  })

  after(async () => {
    await cleanTable(PARAMETERS_TABLE_NAME)
    await cleanTable(FEATURES_TABLE_NAME)
    await cleanTable(APPLICATIONS_TABLE_NAME)
  })

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

          expect(parameters.length).to.equal(1)
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
        .get(`/parameters/${parameterId}`)
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
      feature_id: featureId,
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
    let createdParameterId

    beforeEach(async () => {
      createdParameterId = await parameterRepository(knex).create({
        feature_id:
        featureId,
        rule_json: '{}'
      })
    })

    it('returns status 204', () => {
      return request(app)
        .delete(`/parameters/${createdParameterId}`)
        .expect(NO_CONTENT)
    })
  })

  const updateSuite = (httpVerb) => () => {
    const parameter = {
      rule_json: '{"something":"new"}'
    }

    it('returns status 200', () => {
      const requestBuilder = request(app)

      return requestBuilder[httpVerb](`/parameters/${parameterId}`)
        .send(parameter)
        .expect(OK)
    })

    it('returns updated parameter id', () => {
      const requestBuilder = request(app)

      return requestBuilder[httpVerb](`/parameters/${parameterId}`)
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

