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

const knex = createKnex()

describe('features router', () => {
  let featureId, applicationId

  before(async () => {
    await cleanTable(FEATURES_TABLE_NAME)
    await cleanTable(APPLICATIONS_TABLE_NAME)

    applicationId = await applicationRepository(knex).create({
      name: 'application01'
    })

    featureId = await featureRepository(knex).create({
      application_id: applicationId,
      name: 'feature01'
    })
  })

  after(async () => {
    await cleanTable(FEATURES_TABLE_NAME)
    await cleanTable(APPLICATIONS_TABLE_NAME)
  })

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

          expect(features.length).to.equal(1)
        })
    })
  })

  describe('GET /features/:id', () => {
    it('returns status 200', () => {
      return request(app)
        .get(`/features/${featureId}`)
        .expect(OK)
    })

    it('returns a single feature', () => {
      return request(app)
        .get(`/features/${featureId}`)
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
      application_id: applicationId,
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
    let createdFeatureId

    beforeEach(async () => {
      createdFeatureId = await featureRepository(knex).create({
        application_id: applicationId,
        name: 'featureToDelete'
      })
    })

    it('returns status 204', () => {
      return request(app)
        .delete(`/features/${createdFeatureId}`)
        .expect(NO_CONTENT)
    })
  })

  const updateSuite = (httpVerb) => () => {
    const feature = {
      name: 'featureToUpdate'
    }

    it('returns status 200', () => {
      const requestBuilder = request(app)

      return requestBuilder[httpVerb](`/features/${featureId}`)
        .send(feature)
        .expect(OK)
    })

    it('returns updated feature id', () => {
      const requestBuilder = request(app)

      return requestBuilder[httpVerb](`/features/${featureId}`)
        .send(feature)
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

