import {OK, NOT_FOUND} from 'http-status'
import request from 'supertest'
import {expect, createKnex} from '../testSetup'
import app from '../../src/app'
import {applicationRepository} from '../../src/repositories'

const knex = createKnex()

describe('GET /toggles', () => {
  let applicationId

  before(async () => {
    applicationId = await applicationRepository(knex).create({name: 'GetToggles'})
  })

  after(async () => {
    await applicationRepository(knex).destroy(applicationId)
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

