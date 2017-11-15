import {NOT_FOUND} from 'http-status'
import td from 'testdouble'
import {get} from '../../../src/controllers/toggles'

describe('toggles controller', () => {
  const res = {
    json: td.function(),
    status: td.function()
  }

  it('calls res.json with evaluated toggles', () => {
    const req = {
      query: {
        application: 'SampleApp'
      }
    }
    const expectedToggles = {
      someFeature: true,
      otherFeature: false
    }
    const fakeEvaluate = () => expectedToggles

    get(fakeEvaluate)(req, res)

    td.verify(res.json({toggles: expectedToggles}))
  })

  context('when application is not found', () => {
    it('calls res.json with error code', () => {
      const req = {
        query: {
          application: 'NotFoundApp'
        }
      }
      const fakeEvaluate = () => {}

      td.when(res.status(NOT_FOUND)).thenReturn(res)

      get(fakeEvaluate)(req, res)

      td.verify(res.json({code: 'ERR_APPLICATION_NOT_FOUND'}))
    })
  })
})

