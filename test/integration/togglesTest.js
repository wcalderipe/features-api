import {OK, NOT_FOUND} from 'http-status'
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

describe('GET /toggles', () => {
  let applicationId

  before(async () => {
    await cleanTable(PARAMETERS_TABLE_NAME)
    await cleanTable(FEATURES_TABLE_NAME)
    await cleanTable(APPLICATIONS_TABLE_NAME)

    applicationId = await applicationRepository(knex).create({
      name: 'application01'
    })

    const featureId = await featureRepository(knex).create({
      applicationId: applicationId,
      name: 'feature01'
    })

    await parameterRepository(knex).create({
      featureId: featureId,
      rule: {
        name: 'parameter01',
        type: 'always',
        returns: true
      }
    })
  })

  after(async () => {
    await cleanTable(PARAMETERS_TABLE_NAME)
    await cleanTable(FEATURES_TABLE_NAME)
    await cleanTable(APPLICATIONS_TABLE_NAME)
  })

  it('returns status 200', () => {
    const queryParams = {
      applicationId,
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
      applicationId: 999
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

