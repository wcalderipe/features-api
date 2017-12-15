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

describe('applications router', () => {
  let applicationId

  before(async () => {
    await cleanTable(FEATURES_TABLE_NAME)
    await cleanTable(APPLICATIONS_TABLE_NAME)

    applicationId = await applicationRepository(knex).create({
      name: 'application01'
    })

    await featureRepository(knex).create({
      applicationId: applicationId,
      name: 'feature01'
    })
  })

  after(async () => {
    await cleanTable(FEATURES_TABLE_NAME)
    await cleanTable(APPLICATIONS_TABLE_NAME)
  })

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
          const applications = response.body

          expect(applications.length).to.equal(1)
        })
    })
  })

  describe('GET /applications/:id/features', () => {
    it('returns status 200', () => {
      return request(app)
        .get(`/applications/${applicationId}/features`)
        .expect(OK)
    })

    it('returns a list of application children features', () => {
      return request(app)
        .get(`/applications/${applicationId}/features`)
        .then((response) => {
          const features = response.body

          expect(features.length).to.equal(1)
        })
    })
  })

  describe('GET /applications/:id', () => {
    it('returns status 200', () => {
      return request(app)
        .get(`/applications/${applicationId}`)
        .expect(OK)
    })

    it('returns a single application', () => {
      return request(app)
        .get(`/applications/${applicationId}`)
        .then((response) => {
          const application = response.body

          expect(application).to.have.property('id')
          expect(application).to.have.property('name')
        })
    })
  })

  describe('POST /applications', () => {
    const application = {
      name: 'newApplication'
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

  describe('DELETE /applications/:id', () => {
    let createdApplicationId

    beforeEach(async () => {
      createdApplicationId = await applicationRepository(knex).create({
        name: 'applicationToDelete'
      })
    })

    it('returns status 204', () => {
      return request(app)
        .delete(`/applications/${createdApplicationId}`)
        .expect(NO_CONTENT)
    })
  })

  const updateSuite = (httpVerb) => () => {
    const application = {
      name: 'UpdatedApp'
    }

    it('returns status 200', () => {
      const requestBuilder = request(app)

      return requestBuilder[httpVerb](`/applications/${applicationId}`)
        .send(application)
        .expect(OK)
    })

    it('returns updated application id', () => {
      const requestBuilder = request(app)

      return requestBuilder[httpVerb](`/applications/${applicationId}`)
        .send(application)
        .then((response) => {
          expect(response.body).to.have.property('id')
          expect(response.body).to.have.property('name')
        })
    })
  }

  describe('PUT /applications/:id', updateSuite('put'))
  describe('PATCH /applications/:id', updateSuite('patch'))
})

