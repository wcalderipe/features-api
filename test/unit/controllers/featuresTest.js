import {NOT_FOUND} from 'http-status'
import td from 'testdouble'
import {get} from '../../../src/controllers/features'

describe('features controller', () => {
  it('calls res.json with features', () => {
    const req = {
      query: {
        application: 'SampleApp'
      }
    }
    const res = {
      json: td.function()
    }
    const expectedFeatures = {
      someFeature: true,
      otherFeature: false
    }
    const fakeEvaluate = () => expectedFeatures

    get(fakeEvaluate)(req, res)

    td.verify(res.json({features: expectedFeatures}))
  })

  context('when application is not found', () => {
    it('calls res.json with error code', () => {
      const req = {
        query: {
          application: 'NotFoundApp'
        }
      }
      const res = {
        json: td.function(),
        status: td.function()
      }
      const fakeEvaluate = () => {}

      td.when(res.status(NOT_FOUND)).thenReturn(res)

      get(fakeEvaluate)(req, res)

      td.verify(res.json({
        code: 'ERR_APPLICATION_NOT_FOUND'
      }))
    })
  })
})

