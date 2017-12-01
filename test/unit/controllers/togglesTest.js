import {NOT_FOUND} from 'http-status'
import td from 'testdouble'
import {get} from '../../../src/controllers/toggles'

describe('toggles controller', () => {
  const res = {
    json: td.function(),
    status: td.function()
  }

  it('calls res.json with evaluated toggles', async () => {
    const req = {
      query: {
        applicationId: 99
      }
    }
    const expectedToggles = {
      someFeature: true,
      otherFeature: false
    }
    const fakeApplicationService = {
      createDocumentById: td.function()
    }
    const fakeEvaluate = () => expectedToggles

    td.when(fakeApplicationService.createDocumentById(99)).thenResolve({})

    await get(fakeApplicationService, fakeEvaluate)(req, res)

    td.verify(res.json({toggles: expectedToggles}))
  })

  context('when application is not found', () => {
    it('calls res.json with error code', async () => {
      const req = {
        query: {
          application: 'NotFoundApp'
        }
      }
      const fakeApplicationService = {
        createDocumentById: td.function()
      }
      const fakeEvaluate = () => {}

      td.when(fakeApplicationService.createDocumentById(99)).thenResolve(null)
      td.when(res.status(NOT_FOUND)).thenReturn(res)

      await get(fakeApplicationService, fakeEvaluate)(req, res)

      td.verify(res.json({code: 'ERR_APPLICATION_NOT_FOUND'}))
    })
  })
})

